/* ────────────────────────────────────────────────────────────────────────────
   שער הכניסה v2 — מסך פתיחה חי לשלושת האתרים (26.7.2026)
   ────────────────────────────────────────────────────────────────────────────

   ההחלטות שמאחורי הקוד:

   1. אין קובצי אודיו. אף אחד. כל צליל מסונתז ב-Web Audio בזמן אמת — פדים,
      ארפג'ים, drone, בליפים, whoosh. אפס מדיה, אפס רישוי, עובד אופליין,
      וכל אתר מקבל אופי אחר בלי להחליף נכסים.

   2. דפדפן לא מנגן בלי מחווה. לכן כפתור הסאונד הוא עצמו המחווה: ברגע
      שמדליקים אותו האמביינט מתחיל לנגן *בזמן שמסתכלים על השער*, ובלחיצה על
      "להיכנס" הוא מתעצם לשיא ואז דועך. לא ממתינים לכניסה כדי לשמוע משהו.

   3. הרקע הוא קנבס חי, לא gradient. לכל אתר מערכת חלקיקים משלו. הלולאה
      נעצרת ברגע שהשער נסגר, ואף פעם לא רצה מתחת לדף.

   4. הסימן מצייר את עצמו (stroke-dashoffset), הטקסט עולה בשלבים, והיציאה
      היא רצף: התפרצות חלקיקים, whoosh, ואיריס שנפתח אל הדף.

   5. פעם אחת בסשן. שער בכל ניווט הוא עונש.

   6. תמיד אפשר לדלג — Enter, רווח, Esc. הפוקוס נכנס לכפתור וחוזר לדף.

   7. prefers-reduced-motion מכבה הכל: אין קנבס, אין נגינה, אין השהיה.

   8. הכל נוצר ומוסר ב-JS. אם JS נופל, האתר נטען כרגיל. סורקים לא רואים דבר.

   שימוש:  Gateway.mount({ theme: "personal" | "ops" | "portfolio" })
   ──────────────────────────────────────────────────────────────────────────── */
(function (global) {
  "use strict";

  var THEMES = {
    personal: {
      key: "gw-personal", track: "/audio/gw-personal.mp3", field: "bloom", audio: "warm", shape: "bloom",
      title: "אלעד יעקובוביץ'",
      kicker: "תיאטרון · מוזיקה · איור · סוכני AI",
      line: "יש כאן כמה עולמות. אפשר להיכנס לכולם.",
      cta: "בואו נתחיל", enterTxt: "נכנסים…", hint: "או פשוט הקישו Enter",
      bg: "#FFFAF5", bg2: "#FFF0E6", ink: "#2D2319",
      accent: "#E85D75", accent2: "#F6BD60", accent3: "#2EC4B6",
      glowA: "rgba(232,93,117,.20)", glowB: "rgba(246,189,96,.24)",
      parts: ["#E85D75", "#F4845F", "#F6BD60", "#2EC4B6", "#9B5DE5"],
    },
    ops: {
      key: "gw-ops", track: "/audio/gw-ops.mp3", field: "embers", audio: "epic", shape: "crystal",
      title: "מפקדת המורדים",
      kicker: "רשת הסוכנים · מצב תפעולי",
      line: "הצוות ער. הגביש דולק. אפשר להיכנס.",
      cta: "כניסה למפקדה", enterTxt: "פותחים את השער…", hint: "Enter כדי להיכנס",
      bg: "#07090F", bg2: "#0E1220", ink: "#E7ECF5",
      accent: "#E8B24A", accent2: "#23539C", accent3: "#6A4A9E",
      glowA: "rgba(232,178,74,.26)", glowB: "rgba(35,83,156,.32)",
      parts: ["#E8B24A", "#F0C978", "#23539C", "#6A4A9E"],
    },
    portfolio: {
      key: "gw-portfolio", track: "/audio/gw-portfolio.mp3", field: "net", audio: "fusion", shape: "grid",
      title: "Elad Yaakobovitch",
      kicker: "Full-Stack Developer · AI Engineer",
      line: "קוד שרץ בפרודקשן, לא מצגת.",
      cta: "להיכנס", enterTxt: "מתחברים…", hint: "Enter",
      bg: "#08080B", bg2: "#101018", ink: "#FAFAFA",
      accent: "#E11D74", accent2: "#22D3EE", accent3: "#A855F7",
      glowA: "rgba(225,29,116,.24)", glowB: "rgba(34,211,238,.22)",
      parts: ["#E11D74", "#22D3EE", "#A855F7"],
    },
  };

  /* ══ סאונד ══════════════════════════════════════════════════════════════
     שתי שכבות: אמביינט שמתחיל כשמדליקים סאונד וממשיך כל עוד השער פתוח,
     ו"סטינגר" קצר בכניסה. הכל דועך ונסגר — ההקשר עצמו נסגר בסוף כדי לא
     להשאיר עיבוד אודיו רץ מתחת לאתר. */
  function makeAudio(kind) {
    var Ctx = global.AudioContext || global.webkitAudioContext;
    if (!Ctx) return null;
    var ctx;
    try { ctx = new Ctx(); } catch (e) { return null; }

    var master = ctx.createGain(); master.gain.value = 0.0001;
    var comp = ctx.createDynamicsCompressor();
    var verb = ctx.createConvolver();
    /* reverb קטן מיוצר בקוד — שנייה וחצי של רעש דועך */
    (function () {
      var n = Math.floor(ctx.sampleRate * 1.6), b = ctx.createBuffer(2, n, ctx.sampleRate);
      for (var c = 0; c < 2; c++) {
        var d = b.getChannelData(c);
        for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6);
      }
      verb.buffer = b;
    })();
    var wet = ctx.createGain(); wet.gain.value = 0.32;
    master.connect(comp); comp.connect(ctx.destination);
    comp.connect(wet); wet.connect(verb); verb.connect(ctx.destination);

    var live = [];   /* מקורות מתמשכים, לעצירה בסגירה */

    function tone(type, freq, at, dur, peak, detune, dest) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      if (detune) o.detune.value = detune;
      var t = ctx.currentTime + at;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + dur * 0.22);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(dest || master);
      o.start(t); o.stop(t + dur + 0.06);
      return o;
    }

    function noise(at, dur, from, to, peak, q) {
      var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      var buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      var src = ctx.createBufferSource(); src.buffer = buf;
      var f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = q || 1.2;
      var t = ctx.currentTime + at;
      f.frequency.setValueAtTime(from, t);
      f.frequency.exponentialRampToValueAtTime(to, t + dur);
      var g = ctx.createGain(); g.gain.value = peak;
      src.connect(f).connect(g).connect(master);
      src.start(t);
      return src;
    }

    /* ── מנוע הפרוגרסיה ────────────────────────────────────────────────
       פד שלא מתחלף נשמע כמו צליל-המתנה. כאן יש מהלך-אקורדים אמיתי שמתקדם,
       קו-בס שנע איתו, ומלודיה עם משפט והפוגה. כל אקורד נבנה מחדש ודועך,
       כך שאין אוסצילטור נצחי שנשאר תקוע אחרי שהשער נסגר. */

    var VOICE = {
      warm:   { pad: "sine",     lead: "triangle", bass: "sine",     det: 6,  padLvl: 0.048, leadLvl: 0.038, bassLvl: 0.075 },
      epic:   { pad: "sawtooth", lead: "sine",     bass: "sawtooth", det: 8,  padLvl: 0.026, leadLvl: 0.045, bassLvl: 0.055 },
      fusion: { pad: "sawtooth", lead: "square",   bass: "triangle", det: 10, padLvl: 0.022, leadLvl: 0.026, bassLvl: 0.070 },
    };

    /* מהלכי-אקורדים. כל אקורד: [בס, ...צלילי-הפד] בהרץ.
       warm  — I  vi  IV  V  בדו מז'ור: הפתיחה החמה והמוכרת של פופ אופטימי.
       epic  — i  VI  III VII בלה מינור: המהלך ה"אפי" הקלאסי, נשגב אבל לא עצוב.
       fusion— i  VII VI  VII במי מינור: מודאלי, נע, קצה טכנולוגי. */
    var PROGRESSIONS = {
      warm: [
        [130.81, 261.63, 329.63, 392.00, 493.88],   /* Cmaj7  */
        [110.00, 220.00, 329.63, 392.00, 493.88],   /* Am7    */
        [174.61, 261.63, 349.23, 440.00, 523.25],   /* Fmaj7  */
        [196.00, 246.94, 293.66, 392.00, 493.88],   /* G       */
      ],
      epic: [
        [55.00,  110.00, 164.81, 261.63, 329.63],   /* Am      */
        [ 87.31, 174.61, 261.63, 349.23, 440.00],   /* F       */
        [ 65.41, 130.81, 196.00, 261.63, 392.00],   /* C       */
        [ 98.00, 196.00, 293.66, 392.00, 493.88],   /* G       */
      ],
      fusion: [
        [ 82.41, 164.81, 246.94, 329.63, 493.88],   /* Em9     */
        [ 73.42, 146.83, 220.00, 293.66, 440.00],   /* D       */
        [ 65.41, 130.81, 196.00, 261.63, 392.00],   /* C       */
        [ 73.42, 146.83, 220.00, 293.66, 466.16],   /* D7      */
      ],
    };

    /* מוטיבים מלודיים — אינדקסים לתוך הסולם של האקורד הנוכחי, כדי שהמלודיה
       תמיד תשב נכון גם כשהאקורד מתחלף. null = שתיקה, וזה חשוב לא פחות
       מהצלילים: בלי הפוגות זה לא משפט מוזיקלי אלא רצף. */
    var MOTIFS = {
      warm:   [[4, null, 3, 4], [null, 2, 3, null], [4, 3, 2, 3], [null, null, 4, null]],
      epic:   [[3, null, null, 4], [null, null, 3, null], [4, null, 3, 2], [null, null, null, null]],
      fusion: [[4, 3, 4, 2], [3, null, 4, 3], [2, 4, 3, 4], [4, null, 2, null]],
    };

    var BAR = { warm: 3.2, epic: 4.4, fusion: 2.4 };   /* אורך אקורד בשניות */

    var progTimer = null, bar = 0;

    function playChord(chord, dur) {
      var v = VOICE[kind] || VOICE.warm;
      /* בס — ארוך ורציף, מחזיק את הקרקע */
      tone(v.bass, chord[0], 0, dur * 1.05, v.bassLvl);
      tone(v.bass, chord[0] * 2, 0.03, dur * 0.9, v.bassLvl * 0.35, v.det);
      /* פד — הצלילים נכנסים בהיסט קטן זה מזה, כמו קשת שמתפרשת */
      for (var i = 1; i < chord.length; i++) {
        tone(v.pad, chord[i], i * 0.055, dur * 1.02, v.padLvl, i % 2 ? v.det : -v.det);
      }
    }

    function playMelody(chord, dur) {
      var v = VOICE[kind] || VOICE.warm;
      var motif = (MOTIFS[kind] || MOTIFS.warm)[bar % 4];
      var step = dur / motif.length;
      motif.forEach(function (idx, n) {
        if (idx === null) return;                      /* ההפוגה היא חלק מהמשפט */
        var f = chord[Math.min(idx, chord.length - 1)] * 2;
        tone(v.lead, f, n * step, step * 1.25, v.leadLvl);
        tone(v.lead, f * 2, n * step + 0.02, step * 0.5, v.leadLvl * 0.22);
      });
    }

    function texture(dur) {
      if (kind === "epic") {
        noise(0, dur * 0.7, 90, 500, 0.014, 0.8);      /* רוח בחדר */
        if (bar % 2 === 1) tone("sine", 1318.51, dur * 0.55, 1.6, 0.03);  /* הגביש */
      } else if (kind === "fusion") {
        /* ארפג'יו של שש-עשרה, הקצה הדיגיטלי */
        var arp = [329.63, 493.88, 659.25, 987.77, 659.25, 493.88, 415.30, 493.88];
        for (var i = 0; i < 8; i++) tone("square", arp[i], i * (dur / 8), 0.16, 0.012);
      } else {
        noise(0, dur * 0.5, 700, 3200, 0.010);         /* נשימה רכה */
      }
    }

    function startProgression() {
      var prog = PROGRESSIONS[kind] || PROGRESSIONS.warm;
      var dur = BAR[kind] || 3.2;
      function step() {
        var chord = prog[bar % prog.length];
        playChord(chord, dur);
        playMelody(chord, dur);
        texture(dur);
        bar++;
      }
      step();
      progTimer = setInterval(step, dur * 1000);
    }

    var STINGER = {
      warm: function () {
        [261.63, 329.63, 392.0, 523.25, 659.25].forEach(function (f, i) {
          tone("sine", f, i * 0.055, 2.2, 0.09);
        });
        noise(0, 1.1, 500, 5200, 0.03);
      },
      epic: function () {
        tone("sawtooth", 55, 0, 2.6, 0.07, -8);
        tone("sawtooth", 110, 0, 2.6, 0.05, 8);
        noise(0, 1.5, 80, 1800, 0.05, 0.7);
        [659.25, 987.77, 1318.51].forEach(function (f, i) {
          tone("sine", f, 0.5 + i * 0.16, 1.9, 0.055);
        });
      },
      fusion: function () {
        [329.63, 493.88, 659.25, 987.77, 1318.51].forEach(function (f, i) {
          tone("square", f, i * 0.05, 0.9, 0.035);
        });
        tone("sawtooth", 82.41, 0, 2.2, 0.08, 10);
        noise(0, 1.3, 300, 7000, 0.04);
      },
    };

    var started = false;
    return {
      /* מתחיל לנגן ברגע שהמשתמש הדליק סאונד — עוד לפני הכניסה */
      ambient: function () {
        if (started) return;
        started = true;
        if (ctx.state === "suspended") ctx.resume();
        startProgression();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(0.0001, ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 1.4);
      },
      swell: function () {
        if (!started) return;
        (STINGER[kind] || STINGER.warm)();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value || 0.3, ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.95, ctx.currentTime + 0.5);
      },
      whoosh: function () { if (started) noise(0, 0.85, 4000, 120, 0.09, 0.6); },
      tick: function () {
        if (!started) return;
        tone("sine", kind === "epic" ? 1318.51 : 1046.5, 0, 0.06, 0.03);
      },
      end: function () {
        if (progTimer) clearInterval(progTimer);
        try {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setValueAtTime(master.gain.value || 0.0001, ctx.currentTime);
          master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
        } catch (e) { /* לא קריטי */ }
        setTimeout(function () {
          live.forEach(function (n) { try { n.stop(); } catch (e) {} });
          try { ctx.close(); } catch (e) {}
        }, 900);
      },
    };
  }

  /* ══ נגן הפסקול ════════════════════════════════════════════════════════
     מוזיקה אמיתית מסונו. אותו ממשק בדיוק כמו מנוע-הסינתזה, כדי שהשער לא
     יצטרך לדעת מי מנגן לו. אם הקובץ לא נטען — מחזירים null והקורא נופל
     לסינתזה. אף פעם לא משאירים את המשתמש בשקט בלי סיבה. */
  function makeTrack(url, onFail) {
    var a = new Audio();
    a.src = url;
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    var dead = false, fadeTimer = null;

    a.addEventListener("error", function () {
      dead = true;
      if (onFail) onFail();
    });

    function fadeTo(target, ms) {
      if (fadeTimer) clearInterval(fadeTimer);
      var steps = Math.max(1, Math.round(ms / 50));
      var from = a.volume, i = 0;
      fadeTimer = setInterval(function () {
        i++;
        a.volume = Math.max(0, Math.min(1, from + (target - from) * (i / steps)));
        if (i >= steps) { clearInterval(fadeTimer); fadeTimer = null; }
      }, 50);
    }

    return {
      ambient: function () {
        if (dead) return;
        var pr = a.play();
        /* play() נדחה כשאין מחווה — לא שגיאה, פשוט עוד לא הזמן */
        if (pr && pr.catch) pr.catch(function () {});
        fadeTo(0.45, 1200);
      },
      swell: function () { if (!dead) fadeTo(0.85, 500); },
      whoosh: function () { /* היציאה נשמעת בדעיכה עצמה */ },
      tick: function () { /* אין קליק על הקלטה — הוא היה נשמע כמו תקלה */ },
      end: function () {
        fadeTo(0, 700);
        setTimeout(function () { try { a.pause(); a.src = ""; } catch (e) {} }, 900);
      },
      /* המעבר אל תוך האתר: לא לעצור — לרדת לעוצמת-רקע ולהמשיך. */
      linger: function (vol) { if (!dead) fadeTo(vol, 1800); },
      setVolume: function (v) { if (!dead) { if (fadeTimer) clearInterval(fadeTimer); a.volume = v; } },
      stop: function () {
        if (fadeTimer) clearInterval(fadeTimer);
        try { a.pause(); } catch (e) {}
      },
      resume: function () {
        if (dead) return;
        var pr = a.play();
        if (pr && pr.catch) pr.catch(function () {});
        fadeTo(0.20, 900);
      },
      isPlaying: function () { return !dead && !a.paused; },
    };
  }

  /* ══ הפקד שנשאר ══════════════════════════════════════════════════════════
     כפתור קטן, קבוע, שמאפשר להשתיק בלחיצה אחת. הוא הסיבה שמותר להשאיר
     מוזיקה דולקת: מוזיקה שאי-אפשר לעצור היא בדיוק מה שגורם לאנשים לשנוא
     אתרים עם מוזיקה. הבחירה נזכרת, וביקור הבא מכבד אותה בלי ויכוח. */
  function mountControl(t, player, startMuted) {
    var doc = global.document;
    if (doc.querySelector(".gw-ctl")) return;
    var st = doc.createElement("style");
    st.textContent = [
      '.gw-ctl{position:fixed;inset-block-end:16px;inset-inline-start:16px;z-index:2147482000;',
      'min-width:44px;min-height:44px;padding:0 14px;border-radius:999px;cursor:pointer;',
      'display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:13px;font-weight:600;',
      'background:', t.bg, ';color:', t.ink, ';border:1px solid ', t.accent, ';',
      'box-shadow:0 6px 20px rgba(0,0,0,.18);opacity:.55;',
      'transition:opacity .18s ease,transform .18s ease}',
      '.gw-ctl:hover,.gw-ctl:focus-visible{opacity:1;transform:translateY(-2px)}',
      '.gw-ctl:focus-visible{outline:2px solid ', t.accent2, ';outline-offset:3px}',
      '.gw-ctl .bars{display:inline-flex;align-items:flex-end;gap:2px;height:13px}',
      '.gw-ctl .bars i{width:2.5px;background:', t.accent, ';border-radius:1px;height:35%;',
      'animation:gw-eq .9s ease-in-out infinite alternate}',
      '.gw-ctl .bars i:nth-child(2){animation-delay:.18s;height:85%}',
      '.gw-ctl .bars i:nth-child(3){animation-delay:.36s;height:55%}',
      '@keyframes gw-eq{to{height:100%}}',
      '.gw-ctl[aria-pressed="true"] .bars i{animation:none;height:35%;opacity:.4}',
      '@media (prefers-reduced-motion: reduce){.gw-ctl .bars i{animation:none}}',
    ].join("");
    doc.head.appendChild(st);

    var b = doc.createElement("button");
    b.className = "gw-ctl";
    b.type = "button";
    b.innerHTML = '<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span><span class="lbl"></span>';
    var lbl = b.querySelector(".lbl");

    function paint(muted) {
      b.setAttribute("aria-pressed", muted ? "true" : "false");
      b.setAttribute("aria-label", muted ? "הפעלת המוזיקה" : "השתקת המוזיקה");
      lbl.textContent = muted ? "מוזיקה כבויה" : "מוזיקה";
    }
    var muted = !!startMuted;
    paint(muted);
    b.addEventListener("click", function () {
      muted = !muted;
      paint(muted);
      try { localStorage.setItem("gw-sound", muted ? "0" : "1"); } catch (e) {}
      if (muted) { player.stop(); } else { player.resume(); }
    });
    doc.body.appendChild(b);
  }

  /* ══ שדה החלקיקים ══════════════════════════════════════════════════════ */
  function makeField(canvas, t) {
    var ctx2d = canvas.getContext("2d");
    if (!ctx2d) return { stop: function () {}, burst: function () {} };
    var W = 0, H = 0, dpr = Math.min(global.devicePixelRatio || 1, 2);
    var raf = 0, dead = false, bursting = 0;
    var P = [];

    function size() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    global.addEventListener("resize", size);

    var COUNT = Math.min(110, Math.round((W * H) / 12000));
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function color() { return t.parts[Math.floor(Math.random() * t.parts.length)]; }

    for (var i = 0; i < COUNT; i++) {
      P.push({
        x: rnd(0, W), y: rnd(0, H),
        vx: rnd(-0.25, 0.25), vy: t.field === "bloom" ? rnd(-0.5, -0.12) : rnd(-0.22, 0.22),
        r: t.field === "net" ? rnd(1, 2.4) : rnd(1.2, 4.2),
        a: rnd(0.25, 0.85), c: color(), ph: rnd(0, 6.28),
      });
    }

    function frame(ts) {
      if (dead) return;
      ctx2d.clearRect(0, 0, W, H);
      var time = ts / 1000;

      /* net: קווים בין שכנים — תחושת רשת/גרף */
      if (t.field === "net") {
        ctx2d.lineWidth = 1;
        for (var a = 0; a < P.length; a++) {
          for (var b = a + 1; b < P.length; b++) {
            var dx = P[a].x - P[b].x, dy = P[a].y - P[b].y;
            var d2 = dx * dx + dy * dy;
            if (d2 < 15000) {
              ctx2d.globalAlpha = (1 - d2 / 15000) * 0.22;
              ctx2d.strokeStyle = t.accent2;
              ctx2d.beginPath(); ctx2d.moveTo(P[a].x, P[a].y); ctx2d.lineTo(P[b].x, P[b].y); ctx2d.stroke();
            }
          }
        }
      }

      for (var k = 0; k < P.length; k++) {
        var p = P[k];
        p.x += p.vx * (bursting ? 9 : 1);
        p.y += p.vy * (bursting ? 9 : 1);
        if (t.field === "embers") p.x += Math.sin(time * 0.7 + p.ph) * 0.28;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx2d.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(time * 1.6 + p.ph));
        ctx2d.fillStyle = p.c;
        ctx2d.beginPath(); ctx2d.arc(p.x, p.y, p.r, 0, 6.2832); ctx2d.fill();
      }

      /* ops: קו סריקה שעובר לאט — חדר בקרה, לא טפט */
      if (t.field === "embers") {
        var sy = ((time * 42) % (H + 160)) - 80;
        var grad = ctx2d.createLinearGradient(0, sy - 60, 0, sy + 60);
        grad.addColorStop(0, "rgba(35,83,156,0)");
        grad.addColorStop(0.5, "rgba(35,83,156,.16)");
        grad.addColorStop(1, "rgba(35,83,156,0)");
        ctx2d.globalAlpha = 1; ctx2d.fillStyle = grad;
        ctx2d.fillRect(0, sy - 60, W, 120);
      }
      ctx2d.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return {
      burst: function () {
        bursting = 1;
        var cx = W / 2, cy = H / 2;
        P.forEach(function (p) {
          var ang = Math.atan2(p.y - cy, p.x - cx) + rnd(-0.3, 0.3);
          var sp = rnd(0.9, 2.6);
          p.vx = Math.cos(ang) * sp; p.vy = Math.sin(ang) * sp;
        });
      },
      stop: function () {
        dead = true;
        cancelAnimationFrame(raf);
        global.removeEventListener("resize", size);
      },
    };
  }

  /* ══ CSS ═══════════════════════════════════════════════════════════════ */
  function css(t) {
    return [
      '.gw{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;overflow:hidden;',
      'background:radial-gradient(120% 100% at 50% 42%,', t.bg2, ' 0%,', t.bg, ' 72%);',
      'color:', t.ink, ';direction:rtl;',
      "font-family:'Heebo','Assistant','Segoe UI',system-ui,sans-serif}",
      '.gw-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}',
      '.gw-orb{position:absolute;border-radius:50%;filter:blur(70px);',
      'animation:gw-drift 11s ease-in-out infinite alternate;pointer-events:none}',
      '.gw-o1{width:52vmin;height:52vmin;background:', t.glowA, ';top:4%;inset-inline-start:2%}',
      '.gw-o2{width:44vmin;height:44vmin;background:', t.glowB, ';bottom:2%;inset-inline-end:4%;animation-delay:-5s}',
      '@keyframes gw-drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(4vmin,-4vmin,0) scale(1.18)}}',

      '.gw-card{position:relative;text-align:center;padding:0 24px;max-width:660px;z-index:2}',
      '.gw-mark{width:110px;height:110px;margin:0 auto 24px;display:block;overflow:visible}',
      '.gw-mark .dr{stroke-dasharray:var(--len,400);stroke-dashoffset:var(--len,400);',
      'animation:gw-draw 1.5s cubic-bezier(.4,0,.2,1) forwards}',
      '@keyframes gw-draw{to{stroke-dashoffset:0}}',

      '.gw-rise{opacity:0;transform:translateY(16px);animation:gw-rise .8s cubic-bezier(.2,.7,.3,1) forwards}',
      '@keyframes gw-rise{to{opacity:1;transform:none}}',
      '.gw-kicker{font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;opacity:0;',
      'margin-bottom:12px;font-weight:700;animation-delay:.85s}',
      '.gw-kicker.gw-rise{animation-name:gw-riseDim}',
      '@keyframes gw-riseDim{to{opacity:.62;transform:none}}',
      '.gw-title{font-size:clamp(2rem,6.4vw,3.4rem);font-weight:800;line-height:1.14;',
      'letter-spacing:-.02em;margin-bottom:14px;animation-delay:1.02s}',
      '.gw-line{font-size:clamp(1rem,2.5vw,1.14rem);margin-bottom:32px;line-height:1.75;',
      'animation-delay:1.2s}',
      '.gw-line.gw-rise{animation-name:gw-riseDim}',
      '.gw-btnwrap{animation-delay:1.4s}',

      '.gw-btn{position:relative;appearance:none;border:0;cursor:pointer;font:inherit;font-weight:800;',
      'font-size:1.05rem;padding:16px 44px;min-height:56px;border-radius:999px;overflow:hidden;',
      'color:', t.bg, ';background:', t.accent, ';',
      'box-shadow:0 12px 34px ', t.glowA, ';transition:transform .18s cubic-bezier(.2,.7,.3,1),box-shadow .18s}',
      '.gw-btn::after{content:"";position:absolute;inset:0;border-radius:inherit;',
      'background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.55),transparent 60%);',
      'opacity:0;transform:scale(.2);transition:opacity .5s,transform .5s}',
      '.gw-btn:active::after{opacity:1;transform:scale(1.6);transition:0s}',
      '.gw-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 20px 46px ', t.glowA, '}',
      '.gw-btn:focus-visible{outline:3px solid ', t.accent2, ';outline-offset:5px}',
      '.gw-btn[disabled]{cursor:default;transform:none}',
      /* טבעת פעימה סביב הכפתור — הזמנה ללחוץ */
      '.gw-ring{position:absolute;inset:-10px;border-radius:999px;border:2px solid ', t.accent, ';',
      'opacity:0;pointer-events:none;animation:gw-ping 2.6s ease-out 2s infinite}',
      '@keyframes gw-ping{0%{opacity:.55;transform:scale(.96)}70%{opacity:0;transform:scale(1.22)}100%{opacity:0}}',

      '.gw-hint{margin-top:18px;font-size:.8rem;opacity:0;animation:gw-riseDim .8s 1.7s forwards}',
      '.gw-sound{position:absolute;top:18px;inset-inline-start:18px;z-index:3;background:none;',
      'border:1px solid currentColor;color:inherit;opacity:.5;border-radius:999px;',
      'min-width:44px;min-height:44px;padding:0 16px;cursor:pointer;font:inherit;font-size:.82rem;',
      'transition:opacity .2s,background .2s}',
      '.gw-sound:hover,.gw-sound:focus-visible{opacity:1}',
      '.gw-sound[aria-pressed="true"]{opacity:1;background:', t.glowA, '}',

      /* יציאה: איריס נפתח + הכל דוהה */
      '.gw-iris{position:absolute;inset:0;z-index:4;pointer-events:none;background:', t.bg, ';',
      'clip-path:circle(150% at 50% 50%);opacity:0}',
      '.gw[data-out="1"] .gw-iris{opacity:1;animation:gw-iris 1s cubic-bezier(.6,0,.3,1) forwards}',
      '@keyframes gw-iris{from{clip-path:circle(150% at 50% 50%)}to{clip-path:circle(0% at 50% 50%)}}',
      '.gw[data-out="1"] .gw-card{animation:gw-away .6s cubic-bezier(.6,0,.3,1) forwards}',
      '@keyframes gw-away{to{opacity:0;transform:scale(1.14)}}',
      '.gw[data-out="1"]{animation:gw-fade .95s .25s forwards}',
      '@keyframes gw-fade{to{opacity:0}}',

      '.gw-bar{position:absolute;bottom:0;inset-inline:0;height:3px;background:', t.accent2, ';',
      'transform-origin:right;transform:scaleX(0);z-index:5}',
      '.gw-bar[data-run="1"]{transition:transform 3.6s linear;transform:scaleX(1)}',

      '@media (prefers-reduced-motion: reduce){',
      '.gw *,.gw{animation:none !important;transition:none !important}',
      '.gw-kicker,.gw-line{opacity:.62}.gw-title,.gw-btnwrap,.gw-hint{opacity:1;transform:none}',
      '.gw-mark .dr{stroke-dashoffset:0}}',
    ].join("");
  }

  function mark(t) {
    var a = t.accent, b = t.accent2, c = t.accent3;
    if (t.shape === "crystal") {
      return '<svg class="gw-mark" viewBox="0 0 100 100" aria-hidden="true">' +
        '<circle cx="50" cy="50" r="43" fill="none" stroke="' + b + '" stroke-width="1.3" opacity=".5" class="dr" style="--len:280"/>' +
        '<polygon class="dr" style="--len:210" points="50,7 71,42 50,93 29,42" fill="none" stroke="' + a + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<polygon points="50,25 61,44 50,72 39,44" fill="' + a + '" opacity=".2">' +
        '<animate attributeName="opacity" values=".18;.72;.18" dur="2.4s" repeatCount="indefinite"/></polygon>' +
        '<circle cx="50" cy="47" r="3" fill="#fff" opacity=".9">' +
        '<animate attributeName="r" values="2;5;2" dur="2.4s" repeatCount="indefinite"/></circle></svg>';
    }
    if (t.shape === "grid") {
      return '<svg class="gw-mark" viewBox="0 0 100 100" aria-hidden="true">' +
        '<rect class="dr" style="--len:300" x="15" y="15" width="70" height="70" rx="16" fill="none" stroke="' + a + '" stroke-width="3"/>' +
        '<path class="dr" style="--len:150" d="M15 50h70M50 15v70" stroke="' + b + '" stroke-width="1.4" opacity=".55"/>' +
        '<circle cx="50" cy="50" r="9" fill="' + c + '"><animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/></circle>' +
        '<circle cx="50" cy="50" r="9" fill="none" stroke="' + b + '" stroke-width="1.5">' +
        '<animate attributeName="r" values="9;30;9" dur="2.6s" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" values=".8;0;.8" dur="2.6s" repeatCount="indefinite"/></circle></svg>';
    }
    return '<svg class="gw-mark" viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle class="dr" style="--len:280" cx="50" cy="50" r="43" fill="none" stroke="' + c + '" stroke-width="1.6" opacity=".5"/>' +
      '<circle class="dr" style="--len:210" cx="50" cy="50" r="32" fill="none" stroke="' + b + '" stroke-width="3"/>' +
      '<circle cx="50" cy="50" r="19" fill="' + a + '"><animate attributeName="r" values="17;23;17" dur="3s" repeatCount="indefinite"/></circle></svg>';
  }

  /* ══ הרכבה ═════════════════════════════════════════════════════════════ */
  function mount(opts) {
    opts = opts || {};
    var t = THEMES[opts.theme] || THEMES.personal;
    var doc = global.document;
    if (!doc || !doc.body) return;
    var seen = false;
    try {
      seen = global.sessionStorage && sessionStorage.getItem(t.key) === "1";
    } catch (e) { /* אחסון חסום — מציגים */ }

    if (seen) {
      /* עמוד שני, או רענון. השער לא חוזר — אבל אם המוזיקה הייתה דלוקה, היא
         נעצרה עם הניווט ואי-אפשר להחזיר אותה לבד: דפדפן דורש מחווה חדשה בכל
         טעינה. אז מעלים את הפקד לבד, כבוי, ולחיצה אחת מחזירה אותה. עדיף
         להציע מאשר להשתיק בשקט. */
      var want = false;
      try { want = localStorage.getItem("gw-sound") === "1"; } catch (e) {}
      var reduced = global.matchMedia &&
        global.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (want && t.track && !reduced) {
        mountControl(t, makeTrack(t.track, function () {}), true);
      }
      return;
    }

    var reduce = global.matchMedia &&
      global.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var style = doc.createElement("style");
    style.textContent = css(t);
    doc.head.appendChild(style);

    var el = doc.createElement("div");
    el.className = "gw";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "מסך כניסה — " + t.title);
    el.innerHTML =
      (reduce ? "" : '<canvas class="gw-canvas" aria-hidden="true"></canvas>' +
        '<span class="gw-orb gw-o1" aria-hidden="true"></span>' +
        '<span class="gw-orb gw-o2" aria-hidden="true"></span>') +
      '<button class="gw-sound" type="button" aria-pressed="false">🔇 סאונד</button>' +
      '<div class="gw-card">' + mark(t) +
      '<div class="gw-kicker gw-rise">' + t.kicker + '</div>' +
      '<h1 class="gw-title gw-rise">' + t.title + '</h1>' +
      '<p class="gw-line gw-rise">' + t.line + '</p>' +
      '<div class="gw-btnwrap gw-rise" style="position:relative;display:inline-block">' +
      '<span class="gw-ring" aria-hidden="true"></span>' +
      '<button class="gw-btn" type="button">' + t.cta + '</button></div>' +
      '<div class="gw-hint">' + t.hint + '</div></div>' +
      '<div class="gw-iris" aria-hidden="true"></div>' +
      '<div class="gw-bar" aria-hidden="true"></div>';
    doc.body.appendChild(el);

    var prevOverflow = doc.body.style.overflow;
    doc.body.style.overflow = "hidden";

    var btn = el.querySelector(".gw-btn");
    var sndBtn = el.querySelector(".gw-sound");
    var bar = el.querySelector(".gw-bar");
    var canvas = el.querySelector(".gw-canvas");
    var lastFocus = doc.activeElement;
    var field = (!reduce && canvas) ? makeField(canvas, t) : null;
    var audio = null, closed = false, wantSound = false;
    try { wantSound = localStorage.getItem("gw-sound") === "1"; } catch (e) {}

    function paintSound() {
      sndBtn.textContent = wantSound ? "🔊 סאונד" : "🔇 סאונד";
      sndBtn.setAttribute("aria-pressed", wantSound ? "true" : "false");
    }
    paintSound();

    /* אם הסאונד כבר מודלק מהביקור הקודם — עדיין צריך מחווה כדי לפתוח
       הקשר אודיו. הראשונה שתגיע (לחיצה או מקש) תפעיל אותו. */
    function armAudio() {
      if (reduce || !wantSound || audio) return;
      if (t.track) {
        /* אם ההקלטה נופלת אחרי שכבר התחלנו — מחליפים לסינתזה בלי שהמשתמש
           ישים לב שמשהו קרה. */
        audio = makeTrack(t.track, function () {
          audio = makeAudio(t.audio);
          if (audio) audio.ambient();
        });
      } else {
        audio = makeAudio(t.audio);
      }
      if (audio) audio.ambient();
    }
    ["pointerdown", "keydown"].forEach(function (evt) {
      doc.addEventListener(evt, armAudio, { once: false });
    });

    function close() {
      if (closed) return;
      closed = true;
      if (audio) {
        audio.whoosh();
        /* אם יש הקלטה — היא ממשיכה פנימה בעוצמת-רקע, עם פקד להשתקה.
           מנוע הסינתזה לעומת זאת נסגר: הוא נכתב כפתיחה, לא כפסקול-רקע. */
        if (t.track && audio.linger) {
          audio.linger(0.20);
          mountControl(t, audio);
        } else {
          audio.end();
        }
      }
      if (field) field.burst();
      el.setAttribute("data-out", "1");
      doc.body.style.overflow = prevOverflow;
      try { sessionStorage.setItem(t.key, "1"); } catch (e) {}
      setTimeout(function () {
        if (field) field.stop();
        if (el.parentNode) el.parentNode.removeChild(el);
        if (style.parentNode) style.parentNode.removeChild(style);
        if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      }, reduce ? 0 : 1150);
      doc.removeEventListener("keydown", onKey);
    }

    function enter() {
      if (closed) return;
      if (!reduce && wantSound) {
        armAudio();
        if (audio) audio.swell();
        bar.setAttribute("data-run", "1");
        btn.disabled = true;
        btn.textContent = t.enterTxt;
        setTimeout(close, 3600);
        return;
      }
      close();
    }

    function onKey(e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        if (doc.activeElement === sndBtn) return;
        e.preventDefault(); enter();
      } else if (e.key === "Escape") {
        e.preventDefault(); close();
      } else if (e.key === "Tab") {
        var f = [sndBtn, btn].filter(function (n) { return !n.disabled; });
        var i = f.indexOf(doc.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    }

    btn.addEventListener("click", enter);
    btn.addEventListener("pointerenter", function () { if (audio) audio.tick(); });
    sndBtn.addEventListener("click", function () {
      wantSound = !wantSound;
      paintSound();
      try { localStorage.setItem("gw-sound", wantSound ? "1" : "0"); } catch (e) {}
      if (wantSound) { armAudio(); }
      else if (audio) { audio.end(); audio = null; }
    });
    doc.addEventListener("keydown", onKey);
    setTimeout(function () { try { btn.focus(); } catch (e) {} }, 40);

    if (reduce) setTimeout(close, 250);
  }

  global.Gateway = { mount: mount, themes: THEMES };
})(typeof window !== "undefined" ? window : this);
