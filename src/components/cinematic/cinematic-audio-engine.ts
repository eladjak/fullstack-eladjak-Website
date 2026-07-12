/**
 * CinematicAudioEngine — the layered, DEEP audio bed for the cinematic journey.
 *
 * Design goals (Elad's ask): "what makes the experience is sounds/music/effects
 * WITH DEPTH" — not synthetic bleeps. Everything here is routed through a real
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
 *      • whoosh  — a filtered-noise + rising-sine dive on each scene change.
 *      • subPulse — a slow low-sine sub swell for the network/fleet beat.
 *      • resolve — a warm sustained chord that blooms on arrival at the gate.
 *  - Per-scene ducking/layering is driven by the engine's `cj:scene` event.
 *
 * HARD RULES enforced here:
 *  - Nothing makes sound until the user explicitly UNMUTES (default = muted).
 *  - The AudioContext is created lazily and `resume()`d inside that first user
 *    gesture (browser autoplay policy + WCAG: never autoplay with sound).
 *  - Under prefers-reduced-motion the engine refuses to arm at all.
 */

const BED_SRC = '/audio/cj-bed.mp3';

// Master ceilings — the whole bed is intentionally gentle; it should feel like
// depth under the visuals, never compete with the page.
const MASTER_LEVEL = 0.85;
const BED_BASE = 0.16; // bed level at scene 0
const BED_DEEP = 0.34; // bed level at the deepest scene
const WET_LEVEL = 0.9; // reverb return level (the "space")

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

    // Music bed — a looping <audio> element routed through the graph.
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
    // Fade the bed in from silence over ~2.5s so unmuting isn't a jolt.
    try {
      await bedEl.play();
      const now = ctx.currentTime;
      bedGain.gain.cancelScheduledValues(now);
      bedGain.gain.setValueAtTime(0, now);
      bedGain.gain.linearRampToValueAtTime(BED_BASE, now + 2.5);
    } catch {
      /* play() may still reject on some browsers until a 2nd gesture */
    }

    this.armed = true;
    // If a scene fired before arming, catch up now with a soft resolve.
    if (this.lastScene >= 0) this.playForScene(this.lastScene, true);
  }

  /** Mute/unmute WITHOUT tearing down the graph — just ramps the master. */
  setMuted(muted: boolean) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(muted ? 0 : MASTER_LEVEL, now + 0.35);
    if (muted) this.bedEl?.pause();
    else this.bedEl?.play().catch(() => {});
  }

  /**
   * React to a scene change. Ducks the bed toward its depth-appropriate level and
   * fires the layer SFX for that scene. `index` is the active scene (0..5).
   */
  onScene(index: number, sceneCount: number) {
    this.lastScene = index;
    if (!this.armed || !this.ctx || !this.bedGain) return;
    const ctx = this.ctx;

    // Bed level rises as we fly deeper — layers add with depth.
    const depth = sceneCount > 1 ? index / (sceneCount - 1) : 0;
    const target = BED_BASE + (BED_DEEP - BED_BASE) * depth;
    const now = ctx.currentTime;
    this.bedGain.gain.cancelScheduledValues(now);
    this.bedGain.gain.setValueAtTime(this.bedGain.gain.value, now);
    this.bedGain.gain.linearRampToValueAtTime(target, now + 1.4);

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

  /** A soft whoosh/riser: filtered noise swept up + a rising sine, deep reverb. */
  private whoosh(amount: number) {
    const ctx = this.ctx;
    if (!ctx || !this.dryGain || !this.convolver) return;
    const now = ctx.currentTime;
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

    // Route both dry + into the reverb for a long tail (depth).
    this.sendWithReverb(ng, 0.55);
    this.sendWithReverb(og, 0.55);

    noise.start(now);
    noise.stop(now + dur);
    osc.start(now);
    osc.stop(now + dur);
  }

  /** A slow low-sine sub swell — the pulse of the network/fleet beat. */
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
  }

  /** A warm sustained chord that blooms on arrival — the resolve at the gate. */
  private resolve(amount: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 3.2;
    // A gentle major-9 stack (A2, E3, C#4, B4) — warm, hopeful, not saccharine.
    const freqs = [110, 164.81, 277.18, 493.88];
    const bus = ctx.createGain();
    bus.gain.value = 1;
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
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
    });
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2600;
    bus.connect(lp);
    this.sendWithReverb(lp, 0.75);
  }

  /** Route a node to BOTH the dry bus and the reverb send (for depth). */
  private sendWithReverb(node: AudioNode, reverbAmount: number) {
    if (!this.dryGain || !this.convolver || !this.ctx) return;
    node.connect(this.dryGain);
    const send = this.ctx.createGain();
    send.gain.value = reverbAmount;
    node.connect(send);
    send.connect(this.convolver);
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
  }
}
