#!/usr/bin/env node
/**
 * Agent Guide Video Generator v2
 * ==============================
 *
 * Uses Playwright to screenshot HTML scenes (perfect Hebrew RTL + web fonts)
 * and stitches them into an MP4 with the Gemini-TTS Hebrew narration we
 * already produced for v1.
 *
 * Why v2: Pillow text rendering mangled Hebrew codepoints into gibberish.
 * HTML+CSS+Chromium handles RTL, bidi, and Heebo font shaping perfectly.
 *
 * Pipeline:
 *   1. parse the guide TS file -> grab hero/tagline/shifts/stats
 *   2. build an HTML scene document for each scene (6 total)
 *   3. Playwright screenshots each scene at 1920x1080
 *   4. ffmpeg composes frames + existing audio -> MP4
 *
 * Usage:
 *   node generate_video_v2.mjs ollama
 *   node generate_video_v2.mjs kami --skip-tts-reuse  (uses existing mp3)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync, spawnSync } from "node:child_process";
import { chromium } from "playwright";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(ROOT, "..");
const LOGOS_DIR = path.join(PROJECT_ROOT, "public/images/guide-logos");
const OUTPUT_DIR = path.join(ROOT, "output");
const FRAMES_DIR = path.join(ROOT, "frames");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(FRAMES_DIR, { recursive: true });

dotenv.config({
  path: path.join(
    process.env.HOME || process.env.USERPROFILE,
    ".claude/skills/nano-banana-poster/scripts/.env",
  ),
});
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY not found");
  process.exit(1);
}

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;

// ---------- Parse guide TS ----------
function stripMdLinks(s) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
function unescapeJSString(s) {
  return s
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\");
}
function loadGuide(slug) {
  const tsPath = path.join(PROJECT_ROOT, "src/data/agent-guides", `${slug}.ts`);
  const src = fs.readFileSync(tsPath, "utf8");

  const grab = (field) => {
    const dq = new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
    const sq = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);
    const m = src.match(dq) || src.match(sq);
    if (!m) return "";
    return stripMdLinks(unescapeJSString(m[1]));
  };

  const grabShifts = () => {
    const m = src.match(/paradigmShifts:\s*\[(.*?)\n  \]/s);
    if (!m) return [];
    const out = [];
    const re = /\{\s*before:\s*["'](.*?)["'],\s*after:\s*["'](.*?)["']/gs;
    let x;
    while ((x = re.exec(m[1])) !== null) {
      out.push({
        before: stripMdLinks(unescapeJSString(x[1])),
        after: stripMdLinks(unescapeJSString(x[2])),
      });
      if (out.length >= 4) break;
    }
    return out;
  };

  const grabStats = () => {
    const m = src.match(/stats:\s*\[(.*?)\n  \]/s);
    if (!m) return [];
    const out = [];
    const re = /\{\s*label:\s*"([^"]+)"\s*,\s*value:\s*"([^"]+)"\s*\}/g;
    let x;
    while ((x = re.exec(m[1])) !== null) {
      out.push({ label: x[1], value: x[2] });
      if (out.length >= 4) break;
    }
    return out;
  };

  const logoPath = path.join(LOGOS_DIR, `${slug}-logo.png`);
  return {
    slug,
    agentName: grab("agentName"),
    agentNameHe: grab("agentNameHe"),
    tagline: grab("tagline"),
    heroDescription: grab("heroDescription"),
    paradigmTitle: grab("paradigmTitle"),
    paradigmShifts: grabShifts(),
    stats: grabStats(),
    logoPath: fs.existsSync(logoPath) ? logoPath : null,
  };
}

// ---------- Narration (same as v1) ----------
function buildNarration(guide) {
  const sentences = guide.heroDescription.split(/(?<=[\.!?])\s+/);
  const intro = sentences.slice(0, 2).join(" ");
  const beats = [intro.slice(0, 280)];
  if (guide.paradigmShifts[0]) {
    const { before, after } = guide.paradigmShifts[0];
    beats.push(`עד היום? ${before}. מעכשיו: ${after}.`.slice(0, 220));
  }
  if (guide.stats.length) {
    const s = guide.stats.slice(0, 3).map((x) => `${x.value} ${x.label}`).join(", ");
    beats.push(`במספרים: ${s}.`.slice(0, 200));
  }
  if (guide.paradigmShifts[1]) {
    const { before, after } = guide.paradigmShifts[1];
    beats.push(`עוד שינוי תפיסתי: ${before}, והפך ל-${after}.`.slice(0, 220));
  }
  if (guide.paradigmTitle) beats.push(guide.paradigmTitle + ".");
  const lastName = guide.agentNameHe || guide.agentName;
  beats.push(`המדריך המלא ל-${lastName} מחכה לכם באתר. כל הקישורים בתיאור.`);
  return beats.filter((b) => b.trim());
}

// ---------- Scene templates (HTML + CSS) ----------
const BASE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 1920px; height: 1080px;
  font-family: 'Heebo', system-ui, sans-serif;
  direction: rtl;
  color: #fff;
  background: #03040a;
  overflow: hidden;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
}
.scene {
  width: 1920px; height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  position: relative;
  background:
    radial-gradient(ellipse 80% 60% at 30% 20%, rgba(225,29,116,.22) 0%, transparent 60%),
    radial-gradient(ellipse 80% 60% at 70% 80%, rgba(6,182,212,.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,.10) 0%, transparent 70%),
    linear-gradient(160deg, #05070f 0%, #080b18 40%, #0a0d1a 100%);
  overflow: hidden;
}
/* Noise texture */
.scene::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 1px, transparent 0);
  background-size: 48px 48px;
  pointer-events: none;
}
/* Glass glow ring — decorative */
.scene::after {
  content: '';
  position: absolute;
  top: -200px; left: -200px;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(225,29,116,.22) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
.scene .glow-right {
  position: absolute;
  bottom: -200px; right: -200px;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(6,182,212,.18) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
.logo-frame {
  position: relative;
  width: 320px; height: 320px;
  border-radius: 36px;
  background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.02) 100%);
  box-shadow:
    0 30px 80px -15px rgba(225,29,116,.5),
    0 0 120px -20px rgba(225,29,116,.35),
    inset 0 1px 0 rgba(255,255,255,.15);
  padding: 16px;
  backdrop-filter: blur(20px);
}
.logo { width: 100%; height: 100%; border-radius: 22px; object-fit: cover; }
.brand-chip {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 26px;
  border-radius: 999px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(225,29,116,.4);
  backdrop-filter: blur(10px);
  font-size: 20px;
  font-weight: 600;
  color: #fda4c3;
  letter-spacing: .2em;
  text-transform: uppercase;
  margin-bottom: 36px;
  box-shadow: 0 8px 24px -8px rgba(225,29,116,.3);
}
.brand-chip .dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #e11d74;
  box-shadow: 0 0 16px #e11d74, 0 0 32px rgba(225,29,116,.6);
}
.title-xl { font-size: 164px; font-weight: 900; line-height: 1; letter-spacing: -.03em; text-align: center; }
.title-lg { font-size: 116px; font-weight: 800; line-height: 1.08; letter-spacing: -.015em; max-width: 1680px; text-align: center; }
.title-md { font-size: 82px; font-weight: 800; line-height: 1.15; max-width: 1600px; text-align: center; }
.subtitle { font-size: 54px; font-weight: 400; line-height: 1.4; color: #cfd6ea; max-width: 1500px; text-align: center; margin-top: 36px; }
.label-small { font-size: 26px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; }
.gradient-pink {
  background: linear-gradient(135deg, #ff6ba8 0%, #e11d74 50%, #a855f7 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 30px rgba(225,29,116,.4));
}
.gradient-cyan {
  background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #3b82f6 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.gradient-amber {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ef4444 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.gradient-emerald {
  background: linear-gradient(135deg, #34d399 0%, #10b981 50%, #06b6d4 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.glass-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  padding: 40px;
}
.divider-line {
  width: 200px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
  margin: 32px auto;
}
`;

function sceneIntro(guide, iconDataUri) {
  // Intro: center the logo + compact title. Scale down title when the name is long.
  const name = guide.agentNameHe || guide.agentName;
  const titleSize =
    name.length > 20 ? 96 :
    name.length > 16 ? 112 :
    name.length > 12 ? 128 :
    name.length > 9 ? 144 :
    156;
  return `
<div class="scene">
  <div class="glow-right"></div>
  <div class="brand-chip"><span class="dot"></span>רשת הסוכנים · 2026</div>
  ${iconDataUri ? `<div class="logo-frame"><img class="logo" src="${iconDataUri}" alt="" /></div>` : ""}
  <h1 class="gradient-pink" style="margin-top: 48px; font-size: ${titleSize}px; font-weight: 900; line-height: 1; letter-spacing: -.025em; text-align: center; max-width: 1700px;">${escapeHtml(name)}</h1>
  <div class="divider-line" style="margin: 28px auto 20px;"></div>
  <p class="subtitle" style="font-size: 46px; max-width: 1400px;">${escapeHtml(guide.tagline)}</p>
</div>`;
}

function sceneBeforeAfter(guide, before, after) {
  // Make content font-size responsive to length so long lines don't overflow cards.
  const beforeSize = before.length > 80 ? 38 : before.length > 50 ? 46 : 52;
  const afterSize = after.length > 80 ? 46 : after.length > 50 ? 54 : 62;
  return `
<div class="scene" style="justify-content: center;">
  <div class="glow-right"></div>
  <div class="brand-chip"><span class="dot"></span>שינוי תפיסתי</div>
  <div style="display: grid; gap: 32px; width: 100%; max-width: 1520px;">
    <div class="glass-card" style="border-color: rgba(239,68,68,.22); background: rgba(239,68,68,.05); padding: 36px 44px;">
      <div class="label-small" style="color: #fca5a5; margin-bottom: 14px;">לפני</div>
      <div style="font-size: ${beforeSize}px; font-weight: 500; line-height: 1.35; color: #cbd5e1;">
        ${escapeHtml(before)}
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin: -8px 0;">
      <div style="height: 1px; flex: 1; background: linear-gradient(90deg, transparent, rgba(225,29,116,.6), transparent);"></div>
      <div style="font-size: 56px; color: #e11d74; filter: drop-shadow(0 0 20px rgba(225,29,116,.8));">↓</div>
      <div style="height: 1px; flex: 1; background: linear-gradient(90deg, transparent, rgba(225,29,116,.6), transparent);"></div>
    </div>
    <div class="glass-card" style="border-color: rgba(16,185,129,.3); background: rgba(16,185,129,.06); box-shadow: 0 20px 60px -15px rgba(16,185,129,.3); padding: 36px 44px;">
      <div class="label-small" style="color: #86efac; margin-bottom: 14px;">עכשיו</div>
      <div style="font-size: ${afterSize}px; font-weight: 700; line-height: 1.25; color: #fff;">${escapeHtml(after)}</div>
    </div>
  </div>
</div>`;
}

function sceneStats(guide) {
  const cells = guide.stats.slice(0, 4).map((s, i) => {
    const gradients = ["gradient-pink", "gradient-cyan", "gradient-amber", "gradient-emerald"];
    return `
      <div class="glass-card" style="text-align: center;">
        <div class="${gradients[i]}" style="font-size: 130px; font-weight: 900; line-height: 1; letter-spacing: -.02em;">${escapeHtml(s.value)}</div>
        <div style="font-size: 32px; color: #b8c5e3; margin-top: 20px; font-weight: 500;">${escapeHtml(s.label)}</div>
      </div>`;
  }).join("");
  return `
<div class="scene">
  <div class="glow-right"></div>
  <div class="brand-chip"><span class="dot"></span>במספרים</div>
  <h2 class="title-lg" style="margin-bottom: 56px; font-size: 88px;">מה ${escapeHtml(guide.agentName)} מביא לכם</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; width: 100%; max-width: 1400px;">
    ${cells}
  </div>
</div>`;
}

function sceneParadigmTitle(guide) {
  return `
<div class="scene">
  <div class="glow-right"></div>
  <div class="brand-chip"><span class="dot"></span>הרעיון המרכזי</div>
  <h2 class="gradient-pink" style="font-size: 148px; font-weight: 900; line-height: 1.05; letter-spacing: -.025em; text-align: center; max-width: 1700px;">${escapeHtml(guide.paradigmTitle)}</h2>
</div>`;
}

function sceneCTA(guide, iconDataUri) {
  const url = guide.slug === "claude-code"
    ? "fullstack-eladjak.co.il/claude-code"
    : `fullstack-eladjak.co.il/guide/${guide.slug}`;
  // URL fits in a pill — size drops based on URL length so nothing crops.
  const urlSize = url.length > 40 ? 38 : url.length > 32 ? 44 : 50;
  return `
<div class="scene">
  <div class="glow-right"></div>
  ${iconDataUri ? `<div class="logo-frame" style="width: 240px; height: 240px;"><img class="logo" src="${iconDataUri}" alt="" /></div>` : ""}
  <h2 class="gradient-pink" style="font-size: 104px; font-weight: 900; margin-top: 44px; line-height: 1.05; letter-spacing: -.025em; text-align: center;">המדריך המלא מחכה לכם</h2>
  <p class="subtitle" style="margin-top: 24px; font-size: 42px;">התקנה, שימוש וטיפים מייצור — הכל בעברית, הכל חינם</p>
  <div style="margin-top: 48px; padding: 24px 52px; border: 2px solid rgba(225,29,116,.6); border-radius: 999px; background: rgba(225,29,116,.1); backdrop-filter: blur(10px); box-shadow: 0 20px 60px -15px rgba(225,29,116,.5); max-width: 90%;">
    <span style="font-size: ${urlSize}px; font-weight: 700; font-family: 'Heebo', sans-serif; white-space: nowrap;" dir="ltr" class="gradient-pink">${escapeHtml(url)}</span>
  </div>
</div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildScenes(guide, iconDataUri) {
  const scenes = [sceneIntro(guide, iconDataUri)];
  if (guide.paradigmShifts[0]) {
    const { before, after } = guide.paradigmShifts[0];
    scenes.push(sceneBeforeAfter(guide, before, after));
  }
  if (guide.stats.length) scenes.push(sceneStats(guide));
  if (guide.paradigmShifts[1]) {
    const { before, after } = guide.paradigmShifts[1];
    scenes.push(sceneBeforeAfter(guide, before, after));
  }
  if (guide.paradigmTitle) scenes.push(sceneParadigmTitle(guide));
  scenes.push(sceneCTA(guide, iconDataUri));
  return scenes;
}

// ---------- Audio duration ----------
function audioDuration(p) {
  const r = spawnSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=nokey=1:noprint_wrappers=1",
    p,
  ]);
  return parseFloat(r.stdout.toString().trim());
}

// ---------- Logo as data URI (avoids file://) ----------
function dataUri(filePath) {
  if (!filePath) return "";
  const buf = fs.readFileSync(filePath);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// ---------- Render pipeline ----------
async function render(slug, { skipTts = false } = {}) {
  console.log(`[1/5] Loading guide: ${slug}`);
  const guide = loadGuide(slug);
  console.log(`      agent: ${guide.agentName} / ${guide.agentNameHe}`);
  console.log(`      shifts: ${guide.paradigmShifts.length}, stats: ${guide.stats.length}`);

  const audioPath = path.join(OUTPUT_DIR, `${slug}.mp3`);
  if (skipTts && fs.existsSync(audioPath)) {
    console.log(`[2/5] Reusing existing audio`);
  } else {
    console.log(`[2/5] Generating TTS narration (Gemini Charon)`);
    const narration = buildNarration(guide).join(" ");
    await ttsGemini(narration, audioPath);
  }
  const duration = audioDuration(audioPath);
  console.log(`      audio duration: ${duration.toFixed(2)}s`);

  console.log(`[3/5] Building HTML scenes`);
  const iconDataUri = dataUri(guide.logoPath);
  const scenes = buildScenes(guide, iconDataUri);
  console.log(`      ${scenes.length} scenes`);

  console.log(`[4/5] Screenshotting scenes (once each)`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const runFrames = path.join(FRAMES_DIR, slug);
  if (fs.existsSync(runFrames)) fs.rmSync(runFrames, { recursive: true });
  fs.mkdirSync(runFrames, { recursive: true });

  const sceneImages = [];
  for (let i = 0; i < scenes.length; i++) {
    const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${scenes[i]}</body></html>`;
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const shotPath = path.join(runFrames, `scene-${i}.png`);
    await page.screenshot({ path: shotPath, type: "png" });
    sceneImages.push(shotPath);
    console.log(`      scene ${i + 1}/${scenes.length}`);
  }
  await browser.close();

  console.log(`[5/5] Composing animated MP4 (ffmpeg zoompan + crossfade)`);
  // Build a filter_complex that:
  //  - loops each still image for its share of the duration
  //  - applies zoompan (Ken Burns scale 1→1.04 + gentle pan)
  //  - concatenates with 0.5s crossfade between scenes
  const sceneCount = sceneImages.length;
  const sceneDur = duration / sceneCount;
  const fadeDur = 0.7;

  // Build per-scene zoompan + scale segment.
  const inputs = sceneImages.flatMap((p) => ["-loop", "1", "-t", sceneDur.toFixed(3), "-i", p]);
  // For each input: scale to 2x (to give zoompan room to crop), then zoompan.
  const segs = sceneImages.map((_, i) => {
    const totalF = Math.round(sceneDur * FPS);
    // Scale 1.00→1.06 over the scene; minor left pan to feel alive.
    return `[${i}:v]scale=${WIDTH * 2}:${HEIGHT * 2}:flags=lanczos,` +
      `zoompan=z='min(zoom+0.00060,1.08)':d=${totalF}:x='iw/2-(iw/zoom/2)-(on*0.35)':y='ih/2-(ih/zoom/2)':s=${WIDTH}x${HEIGHT}:fps=${FPS}[v${i}]`;
  });
  // Chain xfade transitions between consecutive scenes.
  let xfadeChain = "";
  let prevLabel = "v0";
  for (let i = 1; i < sceneCount; i++) {
    const offset = (i * sceneDur - fadeDur).toFixed(3);
    const outLabel = i === sceneCount - 1 ? "vout" : `x${i}`;
    xfadeChain += `[${prevLabel}][v${i}]xfade=transition=fade:duration=${fadeDur}:offset=${offset}[${outLabel}];`;
    prevLabel = outLabel;
  }
  const filter = [...segs, xfadeChain.slice(0, -1)].join(";");

  const outPath = path.join(OUTPUT_DIR, `${slug}.mp4`);
  const ffArgs = [
    "-y",
    ...inputs,
    "-i", audioPath,
    "-filter_complex", filter,
    "-map", "[vout]",
    "-map", `${sceneCount}:a`,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
    "-c:a", "aac", "-b:a", "192k",
    "-shortest",
    outPath,
  ];
  const ff = spawnSync("ffmpeg", ffArgs, { stdio: "pipe" });
  if (ff.status !== 0) {
    console.error(ff.stderr.toString().slice(-2000));
    throw new Error("ffmpeg failed");
  }

  const sizeMB = fs.statSync(outPath).size / 1024 / 1024;
  console.log(`      done: ${outPath} (${sizeMB.toFixed(1)} MB)`);
  return outPath;
}

// Early-return placeholder — function ends here
async function __unused_old_compose() {

  // (old frame-based path — kept for reference but unused)
  return;
}

// ---------- Gemini TTS ----------
async function ttsGemini(text, outPath, voice = "Charon") {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/" +
    "models/gemini-2.5-flash-preview-tts:generateContent" +
    `?key=${GEMINI_API_KEY}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
        },
      },
    }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Gemini TTS failed ${resp.status}: ${err.slice(0, 300)}`);
  }
  const data = await resp.json();
  const b64 = data.candidates[0].content.parts[0].inlineData.data;
  const pcm = Buffer.from(b64, "base64");

  // Wrap PCM (24kHz mono 16-bit) into WAV and convert to MP3.
  const wavPath = outPath.replace(/\.mp3$/, ".wav");
  const wavBuf = Buffer.concat([
    Buffer.from("RIFF"),
    int32LE(36 + pcm.length),
    Buffer.from("WAVEfmt "),
    int32LE(16), int16LE(1), int16LE(1),
    int32LE(24000), int32LE(48000), int16LE(2), int16LE(16),
    Buffer.from("data"),
    int32LE(pcm.length),
    pcm,
  ]);
  fs.writeFileSync(wavPath, wavBuf);

  spawnSync("ffmpeg", ["-y", "-i", wavPath, "-b:a", "128k", outPath], { stdio: "ignore" });
  fs.unlinkSync(wavPath);
}
function int32LE(n) { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b; }
function int16LE(n) { const b = Buffer.alloc(2); b.writeUInt16LE(n); return b; }

// ---------- CLI ----------
const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const skipTts = argv.includes("--reuse-audio");
if (!slug) {
  console.error("Usage: node generate_video_v2.mjs <slug> [--reuse-audio]");
  process.exit(1);
}
render(slug, { skipTts }).catch((err) => {
  console.error(err);
  process.exit(1);
});
