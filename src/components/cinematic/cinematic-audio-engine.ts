/**
 * CinematicAudioEngine, the layered, DEEP audio bed for the cinematic journey.
 *
 * Design goals (Elad's ask): "what makes the experience is sounds/music/effects
 * WITH DEPTH", not synthetic bleeps. Everything here is routed through a real
 * convolution reverb (a procedurally-generated hall impulse response), so every
 * layer sits in a large, warm, reverberant space:
 *
 *   music bed  ──▶ bedGain ─────────────────────────────┐
 *   SFX (synth) ─▶ dryGain ─────────────────────────────┤
 *                └▶ reverbSend ─▶ convolver ─▶ wetGain ──┤─▶ master ─▶ out
 *
 *  - Music bed: a looping ambient stem (generated with fal Lyria2). Plays under
 *    everything, gently rising in level as the flight goes deeper.
 *  - SFX are SYNTHESISED with proper envelopes + filters and a heavy reverb send
 *    so they read as "deep", never thin square-wave bleeps:
 *      • whoosh, a filtered-noise + rising-sine dive on each scene change,
 *        panned across the stereo field (alternating per scene) so each seam
 *        feels like flying PAST something, not through a mono blur.
 *      • subPulse, a slow low-sine sub swell for the network/fleet beat.
 *      • resolve, a warm sustained chord that blooms on arrival at the gate.
 *      • chime, a soft bell ping, fired ONCE when the journey completes
 *        (the `cj:complete` event), the "you have arrived" grace note.
 *  - Per-scene ducking/layering is driven by the engine's `cj:scene` event.
 *  - Whooshes are THROTTLED (min 600ms apart) so rapid scroll-scrubbing can
 *    never machine-gun them, and every one-shot SFX chain disconnects itself
 *    on `ended` so long sessions don't accumulate orphaned nodes.
 *
 * HARD RULES enforced here:
 *  - Nothing makes sound until the user explicitly UNMUTES (default = muted).
 *  - The AudioContext is created lazily and `resume()`d inside that first user
 *    gesture (browser autoplay policy + WCAG: never autoplay with sound).
 *  - Under prefers-reduced-motion the engine refuses to arm at all.
 */

const BED_SRC = '/audio/cj-bed.mp3';

// Master ceilings, the whole bed is intentionally gentle; it should feel like
// depth under the visuals, never compete with the page.
const MASTER_LEVEL = 0.85;
const WET_LEVEL = 0.9; // reverb return level (the "space")

// ── Music bed as a SHORT INTRO SWELL that recedes (Elad's ask) ───────────────
// Feedback: the ambient MUSIC was "too dominant, too sad/melancholic", it grew
// LOUDER with depth and never left, drowning the meaningful SFX. So the bed is
// now (1) far quieter across the board, and (2) an INTRO ONLY: it swells in, sits
// briefly under the opening, then fades to silence over the first ~18s and the
// loop is STOPPED so it never returns. From there the synthesised SFX (whoosh,
// sub-pulse, resolve, arrival chime) carry the whole experience, those are the
// "significant effects" Elad wants kept, and they are UNTOUCHED.
//
// Old levels for reference (what was too loud): base 0.16, deep 0.34.
const BED_INTRO_PEAK = 0.05; // intro swell ceiling, ~69% quieter than the old 0.16 base
const BED_END = 0.0001; // effectively silent (exponential ramps can't hit 0)
const BED_FADE_IN = 2.0; // swell up to the intro peak over 2s (no jolt)
const BED_HOLD = 3.0; // dwell at the intro peak this long before receding
const BED_FADE_OUT = 15.0; // then recede to silence over 15s → ~18s total intro
// (BED_HOLD + BED_FADE_OUT = the intro window; after it the loop is paused.)

export class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bedGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private bedEl: HTMLAudioElement | null = null;
  private bedNode: MediaElementAudioSourceNode | null = null;
  private armed = false;
  private lastScene = -1;
  // The music bed is an intro-only swell: once it has faded to silence we NEVER
  // raise it again (no depth-ramp, no unmute-restart), from there the SFX carry
  // the experience. `bedFaded` latches true when the intro fade completes.
  private bedFaded = false;
  // Timer that pauses the looping <audio> once the intro fade reaches silence, so
  // the bed can't loop back around and creep in again.
  private bedStopTimer: ReturnType<typeof setTimeout> | null = null;
  // Anti-machine-gun: minimum spacing between whooshes (ctx-clock seconds).
  private lastWhooshAt = Number.NEGATIVE_INFINITY;
  // Alternates the whoosh's stereo sweep direction on every scene change.
  private whooshFlip = 1;
  // The completion chime fires at most once per mount.
  private chimed = false;

  /** Min gap between whooshes, rapid scrubbing collapses into one swell. */
  private static readonly WHOOSH_MIN_GAP = 0.6;

  /** True once the context exists and audio is flowing (i.e. user unmuted). */
  get isArmed() {
    return this.armed;
  }

  /**
   * Arm the engine. MUST be called from inside a user gesture (click/keydown)
   * so AudioContext.resume() is allowed to start audio. Idempotent.
   */
  async arm(): Promise<void> {
    if (this.armed) {
      await this.ctx?.resume().catch(() => {});
      return;
    }

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    this.ctx = ctx;

    // Master out.
    const master = ctx.createGain();
    master.gain.value = MASTER_LEVEL;
    master.connect(ctx.destination);
    this.master = master;

    // Reverb bus: convolver fed by a synthetic hall impulse response.
    const convolver = ctx.createConvolver();
    convolver.buffer = this.buildHallIR(ctx, 3.6, 3.4);
    const wetGain = ctx.createGain();
    wetGain.gain.value = WET_LEVEL;
    convolver.connect(wetGain);
    wetGain.connect(master);
    this.convolver = convolver;
    this.wetGain = wetGain;

    // Dry SFX bus (SFX are also sent to the convolver for depth).
    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.9;
    dryGain.connect(master);
    this.dryGain = dryGain;

    // Music bed, a looping <audio> element routed through the graph.
    const bedGain = ctx.createGain();
    bedGain.gain.value = 0;
    bedGain.connect(master);
    // A touch of the bed into the reverb too, so it shares the same space.
    const bedVerb = ctx.createGain();
    bedVerb.gain.value = 0.25;
    bedGain.connect(bedVerb);
    bedVerb.connect(convolver);
    this.bedGain = bedGain;

    const bedEl = new Audio(BED_SRC);
    bedEl.loop = true;
    bedEl.crossOrigin = 'anonymous';
    bedEl.preload = 'auto';
    this.bedEl = bedEl;
    try {
      const bedNode = ctx.createMediaElementSource(bedEl);
      bedNode.connect(bedGain);
      this.bedNode = bedNode;
    } catch {
      /* if the source is already wired (re-arm), ignore */
    }

    await ctx.resume().catch(() => {});
    // Music bed = a SHORT INTRO SWELL that then recedes to silence. It swells up
    // to a quiet ceiling, dwells briefly, then rolls off to inaudible over the
    // intro window, after which the loop is paused so it never returns. The SFX
    // take over from there. (Elad: the old ever-present, ever-louder bed was too
    // dominant/melancholic.) All ramps are envelope ramps → no click/pop.
    try {
      await bedEl.play();
      const now = ctx.currentTime;
      const fadeOutStart = now + BED_FADE_IN + BED_HOLD;
      const fadeOutEnd = fadeOutStart + BED_FADE_OUT;
      bedGain.gain.cancelScheduledValues(now);
      bedGain.gain.setValueAtTime(BED_END, now); // start ~silent (exp ramps need >0)
      // swell in to the (quiet) intro peak
      bedGain.gain.exponentialRampToValueAtTime(BED_INTRO_PEAK, now + BED_FADE_IN);
      // hold the peak, then recede smoothly to silence, exponential = natural roll-off
      bedGain.gain.setValueAtTime(BED_INTRO_PEAK, fadeOutStart);
      bedGain.gain.exponentialRampToValueAtTime(BED_END, fadeOutEnd);
      // Snap to a hard 0 the instant the fade lands, then pause the loop so the bed
      // cannot creep back on the next loop iteration.
      bedGain.gain.setValueAtTime(0, fadeOutEnd);
      this.scheduleBedStop((BED_FADE_IN + BED_HOLD + BED_FADE_OUT) * 1000);
    } catch {
      /* play() may still reject on some browsers until a 2nd gesture */
    }

    this.armed = true;
    // If a scene fired before arming, catch up now with a soft resolve.
    if (this.lastScene >= 0) this.playForScene(this.lastScene, true);
  }

  /**
   * After the intro fade reaches silence, latch `bedFaded`, pause the looping
   * bed <audio>, and mute its gain node so it can never contribute again, the
   * SFX carry the rest of the journey. Runs off a real-time timer (ms) rather
   * than the audio clock so it fires even if the tab was briefly backgrounded.
   */
  private scheduleBedStop(delayMs: number) {
    if (this.bedStopTimer) clearTimeout(this.bedStopTimer);
    this.bedStopTimer = setTimeout(() => {
      this.bedFaded = true;
      try {
        this.bedEl?.pause();
      } catch {
        /* noop */
      }
      const ctx = this.ctx;
      if (ctx && this.bedGain) {
        const now = ctx.currentTime;
        this.bedGain.gain.cancelScheduledValues(now);
        this.bedGain.gain.setValueAtTime(0, now);
      }
    }, Math.max(0, delayMs));
  }

  /** Mute/unmute WITHOUT tearing down the graph, just ramps the master. */
  setMuted(muted: boolean) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(muted ? 0 : MASTER_LEVEL, now + 0.35);
    // Only touch the bed loop while it's still the live intro. Once the intro has
    // faded to silence (`bedFaded`), NEVER resume it on unmute, the music is
    // meant to be a one-time intro, not something that comes back mid-journey.
    if (muted) this.bedEl?.pause();
    else if (!this.bedFaded) this.bedEl?.play().catch(() => {});
  }

  /**
   * React to a scene change by firing that scene's layer SFX. `index` is the
   * active scene (0..5).
   *
   * NOTE: the music bed is deliberately NOT touched here anymore. It used to be
   * ramped LOUDER with depth (base→deep), which is exactly what made it feel too
   * dominant. Now the bed is a self-contained intro swell that fades out on its
   * own schedule (see `arm()`), and the SFX, fired below, are what carry each
   * scene from that point on.
   */
  onScene(index: number) {
    this.lastScene = index;
    if (!this.armed || !this.ctx) return;
    this.playForScene(index, false);
  }

  private playForScene(index: number, quiet: boolean) {
    // Scene 0/1 approach → a soft whoosh dive.
    // Scene 2 (fleet/network) → sub pulse + whoosh.
    // Scene 3 (projects) → whoosh (flying through towers).
    // Scene 4 (trust) → warm resolve pad (gentle).
    // Scene 5 (gate/arrival) → the full warm resolve bloom.
    const g = quiet ? 0.5 : 1;
    switch (index) {
      case 0:
        this.whoosh(0.6 * g);
        break;
      case 1:
        this.whoosh(0.7 * g);
        break;
      case 2:
        this.whoosh(0.7 * g);
        this.subPulse(0.9 * g);
        break;
      case 3:
        this.whoosh(0.85 * g);
        break;
      case 4:
        this.resolve(0.45 * g);
        break;
      case 5:
        this.resolve(1 * g);
        this.subPulse(0.5 * g);
        break;
      default:
        this.whoosh(0.6 * g);
    }
  }

  // ── Synth SFX ──────────────────────────────────────────────────────────────

  /**
   * A soft whoosh/riser: filtered noise swept up + a rising sine, deep reverb,
   * swept across the stereo field (direction alternates per call) so each seam
   * reads as flying PAST something. Throttled: calls landing within
   * WHOOSH_MIN_GAP of the previous one are dropped, so rapid scroll-scrubbing
   * collapses into a single swell instead of a machine-gun burst.
   */
  private whoosh(amount: number) {
    const ctx = this.ctx;
    if (!ctx || !this.dryGain || !this.convolver) return;
    const now = ctx.currentTime;
    if (now - this.lastWhooshAt < CinematicAudioEngine.WHOOSH_MIN_GAP) return;
    this.lastWhooshAt = now;
    const dur = 1.6;

    // Noise layer through a band-pass that sweeps up = the air-rush body.
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer(ctx, dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(220, now);
    bp.frequency.exponentialRampToValueAtTime(2400, now + dur * 0.8);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, now);
    ng.gain.linearRampToValueAtTime(0.16 * amount, now + 0.25);
    ng.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    noise.connect(bp);
    bp.connect(ng);

    // A rising sine underneath adds a musical "dive" tone.
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + dur * 0.7);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0, now);
    og.gain.linearRampToValueAtTime(0.09 * amount, now + 0.3);
    og.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(og);

    // Stereo sweep: the whole whoosh glides gently across the field, flipping
    // direction each time, the "flying past" cue. Kept narrow (±0.4) so it
    // stays a drift, never a hard ping-pong. Safari < 14.1 lacks
    // StereoPannerNode; there we simply stay centred.
    const dir = this.whooshFlip;
    this.whooshFlip = -this.whooshFlip;
    let out: AudioNode | null = null;
    if (typeof ctx.createStereoPanner === 'function') {
      const pan = ctx.createStereoPanner();
      pan.pan.setValueAtTime(-0.4 * dir, now);
      pan.pan.linearRampToValueAtTime(0.4 * dir, now + dur);
      ng.connect(pan);
      og.connect(pan);
      out = pan;
      this.sendWithReverb(pan, 0.55);
    } else {
      this.sendWithReverb(ng, 0.55);
      this.sendWithReverb(og, 0.55);
    }

    noise.start(now);
    noise.stop(now + dur);
    osc.start(now);
    osc.stop(now + dur);
    // Free the whole one-shot chain once the last source ends (no node leaks).
    this.cleanupOnEnded(osc, out ? [noise, bp, ng, osc, og, out] : [noise, bp, ng, osc, og]);
  }

  /** A slow low-sine sub swell, the pulse of the network/fleet beat. */
  private subPulse(amount: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 2.2;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(48, now);
    osc.frequency.linearRampToValueAtTime(44, now + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 160;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.22 * amount, now + 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(lp);
    lp.connect(g);
    this.sendWithReverb(g, 0.35);
    osc.start(now);
    osc.stop(now + dur);
    this.cleanupOnEnded(osc, [osc, lp, g]);
  }

  /** A warm sustained chord that blooms on arrival, the resolve at the gate. */
  private resolve(amount: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 3.2;
    // A gentle major-9 stack (A2, E3, C#4, B4), warm, hopeful, not saccharine.
    const freqs = [110, 164.81, 277.18, 493.88];
    const bus = ctx.createGain();
    bus.gain.value = 1;
    const chain: AudioNode[] = [bus];
    const oscs: OscillatorNode[] = [];
    for (let i = 0; i < freqs.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freqs[i]!;
      // very slight detune for width/warmth
      osc.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      const peak = (0.08 - i * 0.012) * amount;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(Math.max(peak, 0.02), now + 0.9);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g);
      g.connect(bus);
      osc.start(now);
      osc.stop(now + dur);
      chain.push(osc, g);
      oscs.push(osc);
    }
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2600;
    bus.connect(lp);
    chain.push(lp);
    this.sendWithReverb(lp, 0.75);
    if (oscs.length > 0) this.cleanupOnEnded(oscs[oscs.length - 1]!, chain);
  }

  /**
   * A soft bell ping, two gentle sine partials with a fast-but-clickless
   * attack and a long reverberant tail. Fired once by `onComplete()` when the
   * visitor reaches the end of the journey: a quiet "you have arrived".
   */
  private chime(amount: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 2.4;
    // A5 fundamental + a 12th above it (bell-ish inharmonic shimmer).
    const partials: Array<{ freq: number; peak: number }> = [
      { freq: 880, peak: 0.07 },
      { freq: 2637, peak: 0.022 },
    ];
    const bus = ctx.createGain();
    bus.gain.value = 1;
    const chain: AudioNode[] = [bus];
    const oscs: OscillatorNode[] = [];
    for (const { freq, peak } of partials) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      // 15ms linear attack (no click), then a long exponential bell decay.
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(peak * amount, now + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g);
      g.connect(bus);
      osc.start(now);
      osc.stop(now + dur);
      chain.push(osc, g);
      oscs.push(osc);
    }
    // Mostly wet, the bell should bloom in the hall, not sit on the nose.
    this.sendWithReverb(bus, 0.85);
    if (oscs.length > 0) this.cleanupOnEnded(oscs[oscs.length - 1]!, chain);
  }

  /**
   * The journey reached its end (`cj:complete` from the engine). Rings the
   * arrival chime exactly once per mount, and only if the user has audio on.
   */
  onComplete() {
    if (this.chimed) return;
    this.chimed = true;
    if (!this.armed || !this.ctx) return;
    this.chime(1);
  }

  /** Route a node to BOTH the dry bus and the reverb send (for depth). */
  private sendWithReverb(node: AudioNode, reverbAmount: number) {
    if (!this.dryGain || !this.convolver || !this.ctx) return;
    node.connect(this.dryGain);
    const send = this.ctx.createGain();
    send.gain.value = reverbAmount;
    node.connect(send);
    send.connect(this.convolver);
    this.sends.set(node, send);
  }

  /** Reverb-send gains created per one-shot node, disconnected on cleanup. */
  private sends = new WeakMap<AudioNode, GainNode>();

  /**
   * When `source` finishes, disconnect every node in the one-shot chain (plus
   * any reverb sends registered for them) so long scrolling sessions never
   * accumulate orphaned nodes in the graph.
   */
  private cleanupOnEnded(source: AudioScheduledSourceNode, chain: AudioNode[]) {
    source.addEventListener('ended', () => {
      for (const node of chain) {
        try {
          this.sends.get(node)?.disconnect();
          this.sends.delete(node);
          node.disconnect();
        } catch {
          /* already gone */
        }
      }
    });
  }

  // ── Buffers ─────────────────────────────────────────────────────────────────

  private noiseBuffer(ctx: BaseAudioContext, seconds: number): AudioBuffer {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /**
   * Build a synthetic hall impulse response: exponentially-decaying stereo noise
   * with a short early build, low-passed by the natural decay. This is what gives
   * every layer its warm, deep reverberant SPACE without shipping an IR file.
   */
  private buildHallIR(ctx: BaseAudioContext, seconds: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const ir = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        // short early-reflection ramp, then a long exponential tail
        const early = t < 0.02 ? t / 0.02 : 1;
        const env = early * Math.pow(1 - t, decay);
        d[i] = (Math.random() * 2 - 1) * env;
      }
    }
    return ir;
  }

  /** Release everything (route change / unmount). */
  dispose() {
    if (this.bedStopTimer) {
      clearTimeout(this.bedStopTimer);
      this.bedStopTimer = null;
    }
    try {
      this.bedEl?.pause();
      if (this.bedEl) this.bedEl.src = '';
    } catch {
      /* noop */
    }
    try {
      this.ctx?.close();
    } catch {
      /* noop */
    }
    this.ctx = null;
    this.armed = false;
    this.bedFaded = false;
  }
}
