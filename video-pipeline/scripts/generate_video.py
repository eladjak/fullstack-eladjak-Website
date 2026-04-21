#!/usr/bin/env python3
"""
Agent Guide Video Generator
===========================

Produces a 60-90 second marketing explainer video for a single agent guide
on fullstack-eladjak.co.il.

Pipeline:
1. Reads guide data (hero title, tagline, hero description, paradigm shifts, stats)
2. Generates a natural Hebrew narration script (template-based, 6 beats)
3. Sends script to Gemini TTS (voice: Charon, male Hebrew) -> audio.mp3
4. Uses audio duration to time scenes
5. Renders each scene as PNG frames using Pillow
6. Composites frames + audio into MP4 via ffmpeg

Usage:
    python generate_video.py kami
    python generate_video.py ollama --out ../output/

Requires:
    - GEMINI_API_KEY in ~/.claude/skills/nano-banana-poster/scripts/.env
    - ffmpeg in PATH
    - Pillow, requests, python-dotenv
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

import requests
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont

# ---------- Config ----------
ROOT = Path(__file__).resolve().parent.parent
PROJECT_ROOT = ROOT.parent
LOGOS_DIR = PROJECT_ROOT / "public" / "images" / "guide-logos"
HEROES_DIR = PROJECT_ROOT / "public" / "images" / "guides"
OUTPUT_DIR = ROOT / "output"
FRAMES_DIR = ROOT / "frames"
OUTPUT_DIR.mkdir(exist_ok=True)

# Load Gemini API key from the existing .env used by nano-banana-poster.
load_dotenv(Path.home() / ".claude" / "skills" / "nano-banana-poster" / "scripts" / ".env")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY not found", file=sys.stderr)
    sys.exit(1)

# Video specs
WIDTH, HEIGHT = 1920, 1080
FPS = 30

# ---------- Fonts ----------
def _find_font(candidates: list[str]) -> str:
    for c in candidates:
        p = Path(c)
        if p.exists():
            return str(p)
    raise FileNotFoundError(f"No font found among: {candidates}")

FONT_HE_BOLD = _find_font([
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\ariblk.ttf",
    r"C:\Windows\Fonts\seguiemj.ttf",
])
FONT_HE_REG = _find_font([
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
])

# ---------- Guide Data ----------
@dataclass
class GuideData:
    slug: str
    agent_name: str
    agent_name_he: str
    tagline: str
    hero_description: str  # markdown-link-free
    paradigm_title: str
    paradigm_shifts: list[tuple[str, str]]  # (before, after)
    stats: list[tuple[str, str]]  # (label, value)
    primary_color: str  # hex like #E11D74
    logo_path: Optional[Path]


def _strip_md_links(text: str) -> str:
    return re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)


def load_guide(slug: str) -> GuideData:
    """Parse the .ts guide file and extract the fields we need.

    Uses lightweight regex since the TS is just a declarative object literal.
    """
    ts_path = PROJECT_ROOT / "src" / "data" / "agent-guides" / f"{slug}.ts"
    if not ts_path.exists():
        raise FileNotFoundError(ts_path)
    src = ts_path.read_text(encoding="utf-8")

    def _grab_string(field: str) -> str:
        m = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', src)
        if not m:
            m = re.search(rf"{field}:\s*'((?:[^'\\]|\\.)*)'", src)
        if not m:
            return ""
        return _strip_md_links(
            m.group(1).encode("utf-8").decode("unicode_escape", errors="ignore")
        ).replace('\\"', '"').replace("\\'", "'")

    def _grab_paradigm_shifts() -> list[tuple[str, str]]:
        """Grab before/after pairs from paradigmShifts array."""
        block_m = re.search(r"paradigmShifts:\s*\[(.*?)\n\s{2}\]", src, re.S)
        if not block_m:
            return []
        block = block_m.group(1)
        pairs = []
        for shift in re.finditer(r"\{\s*before:\s*[\"'](.*?)[\"'],\s*after:\s*[\"'](.*?)[\"']", block, re.S):
            before = _strip_md_links(shift.group(1)).replace('\\"', '"').replace("\\'", "'")
            after = _strip_md_links(shift.group(2)).replace('\\"', '"').replace("\\'", "'")
            pairs.append((before, after))
        return pairs[:4]

    def _grab_stats() -> list[tuple[str, str]]:
        block_m = re.search(r"stats:\s*\[(.*?)\n\s{2}\]", src, re.S)
        if not block_m:
            return []
        out = []
        for stat in re.finditer(r'\{\s*label:\s*"([^"]+)"\s*,\s*value:\s*"([^"]+)"\s*\}', block_m.group(1)):
            out.append((stat.group(1), stat.group(2)))
        return out[:4]

    logo_path = LOGOS_DIR / f"{slug}-logo.png"
    return GuideData(
        slug=slug,
        agent_name=_grab_string("agentName"),
        agent_name_he=_grab_string("agentNameHe"),
        tagline=_grab_string("tagline"),
        hero_description=_grab_string("heroDescription"),
        paradigm_title=_grab_string("paradigmTitle"),
        paradigm_shifts=_grab_paradigm_shifts(),
        stats=_grab_stats(),
        primary_color="#E11D74",  # brand rose
        logo_path=logo_path if logo_path.exists() else None,
    )


# ---------- Script Builder ----------
def build_narration(guide: GuideData) -> list[str]:
    """Build a 6-beat narration. Each string = one scene, ~10-15s of speech."""
    # Trim hero description to first 2 sentences for the intro beat
    sentences = re.split(r"(?<=[\.!?])\s+", guide.hero_description)
    intro = " ".join(sentences[:2]) if sentences else guide.hero_description

    # Beat 2: one memorable paradigm shift if available
    shift_line = ""
    if guide.paradigm_shifts:
        before, after = guide.paradigm_shifts[0]
        shift_line = f"עד היום? {before}. מעכשיו: {after}."

    # Beat 3: stats punchline
    stat_line = ""
    if guide.stats:
        stat_line = "במספרים: " + ", ".join(f"{v} {l}" for l, v in guide.stats[:3]) + "."

    # Beat 4: second shift if available
    shift2 = ""
    if len(guide.paradigm_shifts) >= 2:
        before, after = guide.paradigm_shifts[1]
        shift2 = f"עוד שינוי תפיסתי: {before}, והפך ל-{after}."

    cta = f"המדריך המלא ל-{guide.agent_name_he or guide.agent_name} מחכה לכם באתר. כל הקישורים בתיאור."

    beats = [
        intro[:280],  # hero intro (longest)
        shift_line[:200],
        stat_line[:180],
        shift2[:200],
        guide.paradigm_title + "." if guide.paradigm_title else "",
        cta,
    ]
    return [b for b in beats if b.strip()]


# ---------- Gemini TTS ----------
def tts_gemini(text: str, out_path: Path, voice: str = "Charon") -> Path:
    """Call Gemini 2.5 Flash Preview TTS -> save PCM WAV.

    API: generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent
    Returns base64 PCM audio at 24kHz 16-bit mono.
    """
    import base64

    url = (
        "https://generativelanguage.googleapis.com/v1beta/"
        "models/gemini-2.5-flash-preview-tts:generateContent"
        f"?key={GEMINI_API_KEY}"
    )
    payload = {
        "contents": [{"parts": [{"text": text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {"voiceName": voice}
                }
            },
        },
    }
    resp = requests.post(url, json=payload, timeout=60)
    if resp.status_code != 200:
        raise RuntimeError(f"Gemini TTS failed: {resp.status_code} {resp.text[:300]}")
    data = resp.json()
    b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    pcm_bytes = base64.b64decode(b64)

    # Wrap PCM (24kHz, 16-bit, mono) in WAV header so ffmpeg can read it.
    import struct
    wav_path = out_path.with_suffix(".wav")
    with open(wav_path, "wb") as f:
        data_size = len(pcm_bytes)
        f.write(b"RIFF")
        f.write(struct.pack("<I", 36 + data_size))
        f.write(b"WAVEfmt ")
        f.write(struct.pack("<IHHIIHH", 16, 1, 1, 24000, 48000, 2, 16))
        f.write(b"data")
        f.write(struct.pack("<I", data_size))
        f.write(pcm_bytes)

    # Convert WAV -> MP3 for smaller size.
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(wav_path), "-b:a", "128k", str(out_path)],
        check=True, capture_output=True,
    )
    wav_path.unlink(missing_ok=True)
    return out_path


def audio_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nokey=1:noprint_wrappers=1", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


# ---------- Text Layout (Hebrew RTL safe) ----------
def _wrap_text_rtl(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines = []
    current = []
    for word in words:
        trial = " ".join(current + [word])
        bbox = font.getbbox(trial)
        if (bbox[2] - bbox[0]) <= max_width:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def _draw_rtl_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    center_x: int,
    top_y: int,
    color: tuple,
    max_width: int,
    line_height_mul: float = 1.35,
) -> int:
    """Draw multi-line Hebrew text centered horizontally. Returns final y."""
    import unicodedata
    lines = _wrap_text_rtl(text, font, max_width)
    y = top_y
    for line in lines:
        # Pillow handles right-to-left correctly when the string contains RTL
        # characters. We just center it horizontally.
        bbox = font.getbbox(line)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        x = center_x - w // 2
        # Small shadow for readability
        draw.text((x + 3, y + 3), line, font=font, fill=(0, 0, 0, 180))
        draw.text((x, y), line, font=font, fill=color)
        y += int(h * line_height_mul)
    return y


# ---------- Scene Rendering ----------
def _bg_gradient(color_hex: str) -> Image.Image:
    """Create a dark navy -> brand-tinted gradient background."""
    img = Image.new("RGB", (WIDTH, HEIGHT), (8, 10, 22))
    draw = ImageDraw.Draw(img)
    # Radial-ish gradient via concentric rectangles with the brand color.
    from PIL import ImageColor
    brand = ImageColor.getrgb(color_hex)
    for i in range(0, 120, 4):
        alpha = int(60 * (1 - i / 120))
        overlay = Image.new("RGBA", (WIDTH - i * 6, HEIGHT - i * 4), (*brand, alpha))
        img.paste(overlay, (i * 3, i * 2), overlay)
    return img


def _scene_intro(guide: GuideData) -> Image.Image:
    """Scene 1: Big logo + agent name + tagline."""
    img = _bg_gradient(guide.primary_color)
    draw = ImageDraw.Draw(img, "RGBA")

    # Logo
    if guide.logo_path:
        logo = Image.open(guide.logo_path).convert("RGBA")
        size = 420
        logo.thumbnail((size, size), Image.LANCZOS)
        img.paste(logo, ((WIDTH - logo.width) // 2, 180), logo)

    # Agent name
    font_title = ImageFont.truetype(FONT_HE_BOLD, 120)
    title = guide.agent_name_he or guide.agent_name
    bbox = font_title.getbbox(title)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH - w) // 2 + 3, 653), title, font=font_title, fill=(0, 0, 0, 180))
    draw.text(((WIDTH - w) // 2, 650), title, font=font_title, fill=(255, 255, 255))

    # Tagline
    font_sub = ImageFont.truetype(FONT_HE_REG, 48)
    _draw_rtl_text(
        draw, guide.tagline, font_sub,
        center_x=WIDTH // 2, top_y=820,
        color=(200, 210, 230), max_width=WIDTH - 240,
    )
    return img


def _scene_text(guide: GuideData, big: str, sub: str = "") -> Image.Image:
    img = _bg_gradient(guide.primary_color)
    draw = ImageDraw.Draw(img, "RGBA")

    font_big = ImageFont.truetype(FONT_HE_BOLD, 88)
    y = _draw_rtl_text(
        draw, big, font_big,
        center_x=WIDTH // 2, top_y=280,
        color=(255, 255, 255), max_width=WIDTH - 240,
        line_height_mul=1.3,
    )
    if sub:
        font_sub = ImageFont.truetype(FONT_HE_REG, 56)
        _draw_rtl_text(
            draw, sub, font_sub,
            center_x=WIDTH // 2, top_y=y + 60,
            color=(210, 220, 240), max_width=WIDTH - 300,
        )
    return img


def _scene_before_after(guide: GuideData, before: str, after: str) -> Image.Image:
    img = _bg_gradient(guide.primary_color)
    draw = ImageDraw.Draw(img, "RGBA")

    # Labels
    font_lbl = ImageFont.truetype(FONT_HE_BOLD, 40)
    font_body = ImageFont.truetype(FONT_HE_REG, 44)

    # "לפני" label
    draw.text((WIDTH // 2 - 240, 220), "לפני", font=font_lbl, fill=(240, 150, 150))
    _draw_rtl_text(
        draw, before, font_body,
        center_x=WIDTH // 2, top_y=300,
        color=(200, 200, 200), max_width=WIDTH - 360,
        line_height_mul=1.35,
    )

    # Divider arrow
    arrow_font = ImageFont.truetype(FONT_HE_BOLD, 72)
    draw.text((WIDTH // 2 - 30, HEIGHT // 2 - 36), "↓", font=arrow_font, fill=(225, 29, 116))

    # "אחרי" label
    draw.text((WIDTH // 2 - 240, HEIGHT // 2 + 80), "עכשיו", font=font_lbl, fill=(130, 230, 170))
    _draw_rtl_text(
        draw, after, font_body,
        center_x=WIDTH // 2, top_y=HEIGHT // 2 + 160,
        color=(255, 255, 255), max_width=WIDTH - 360,
        line_height_mul=1.35,
    )
    return img


def _scene_stats(guide: GuideData) -> Image.Image:
    img = _bg_gradient(guide.primary_color)
    draw = ImageDraw.Draw(img, "RGBA")

    font_title = ImageFont.truetype(FONT_HE_BOLD, 72)
    _draw_rtl_text(
        draw, "במספרים", font_title,
        center_x=WIDTH // 2, top_y=180,
        color=(255, 255, 255), max_width=WIDTH - 240,
    )

    # Grid of up to 4 stats
    font_value = ImageFont.truetype(FONT_HE_BOLD, 120)
    font_label = ImageFont.truetype(FONT_HE_REG, 36)
    stats = guide.stats[:4]
    cols = 2 if len(stats) <= 2 else 2
    col_w = WIDTH // cols
    row_h = 300
    start_y = 380
    for i, (label, value) in enumerate(stats):
        col = i % cols
        row = i // cols
        cx = col_w * col + col_w // 2
        y = start_y + row * row_h
        # value
        bbox = font_value.getbbox(value)
        vw = bbox[2] - bbox[0]
        draw.text((cx - vw // 2 + 3, y + 3), value, font=font_value, fill=(0, 0, 0, 180))
        draw.text((cx - vw // 2, y), value, font=font_value, fill=(225, 29, 116))
        # label
        _draw_rtl_text(
            draw, label, font_label,
            center_x=cx, top_y=y + 140,
            color=(210, 220, 240), max_width=col_w - 100,
        )
    return img


def _scene_cta(guide: GuideData) -> Image.Image:
    img = _bg_gradient(guide.primary_color)
    draw = ImageDraw.Draw(img, "RGBA")

    # Logo small
    if guide.logo_path:
        logo = Image.open(guide.logo_path).convert("RGBA")
        logo.thumbnail((220, 220), Image.LANCZOS)
        img.paste(logo, ((WIDTH - logo.width) // 2, 180), logo)

    font_big = ImageFont.truetype(FONT_HE_BOLD, 96)
    _draw_rtl_text(
        draw, "המדריך המלא מחכה לך", font_big,
        center_x=WIDTH // 2, top_y=460,
        color=(255, 255, 255), max_width=WIDTH - 240,
    )
    font_url = ImageFont.truetype(FONT_HE_BOLD, 64)
    url = f"fullstack-eladjak.co.il/guide/{guide.slug}"
    if guide.slug == "claude-code":
        url = "fullstack-eladjak.co.il/claude-code"
    bbox = font_url.getbbox(url)
    uw = bbox[2] - bbox[0]
    draw.text(((WIDTH - uw) // 2 + 3, 680 + 3), url, font=font_url, fill=(0, 0, 0, 180))
    draw.text(((WIDTH - uw) // 2, 680), url, font=font_url, fill=(225, 29, 116))

    return img


# ---------- Main Pipeline ----------
def build_scenes(guide: GuideData) -> list[Image.Image]:
    intro_big = guide.agent_name_he or guide.agent_name
    intro_sub = guide.tagline
    scenes = [_scene_intro(guide)]

    if guide.paradigm_shifts:
        before, after = guide.paradigm_shifts[0]
        scenes.append(_scene_before_after(guide, before, after))
    if guide.stats:
        scenes.append(_scene_stats(guide))
    if len(guide.paradigm_shifts) >= 2:
        before, after = guide.paradigm_shifts[1]
        scenes.append(_scene_before_after(guide, before, after))
    if guide.paradigm_title:
        scenes.append(_scene_text(guide, guide.paradigm_title))
    scenes.append(_scene_cta(guide))
    return scenes


def render_video(guide: GuideData, audio_path: Path, out_path: Path) -> Path:
    duration = audio_duration(audio_path)
    scenes = build_scenes(guide)
    per_scene = duration / len(scenes)

    # Frames dir specific to this run
    run_frames = FRAMES_DIR / guide.slug
    if run_frames.exists():
        import shutil
        shutil.rmtree(run_frames)
    run_frames.mkdir(parents=True)

    frame_idx = 0
    total_frames = int(duration * FPS)
    frames_per_scene = total_frames // len(scenes)

    for scene_idx, scene in enumerate(scenes):
        for _ in range(frames_per_scene):
            scene.save(run_frames / f"f{frame_idx:05d}.png")
            frame_idx += 1

    # Pad any remainder with the last scene
    while frame_idx < total_frames:
        scenes[-1].save(run_frames / f"f{frame_idx:05d}.png")
        frame_idx += 1

    # ffmpeg: stitch frames + audio
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(run_frames / "f%05d.png"),
        "-i", str(audio_path),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        str(out_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug", help="Guide slug (e.g. kami, ollama, docker)")
    ap.add_argument("--out", default=None, help="Output MP4 path")
    ap.add_argument("--skip-tts", action="store_true",
                    help="Reuse existing audio if present")
    args = ap.parse_args()

    print(f"[1/4] Loading guide: {args.slug}")
    guide = load_guide(args.slug)
    print(f"      agent: {guide.agent_name} ({guide.agent_name_he})")
    print(f"      shifts: {len(guide.paradigm_shifts)}, stats: {len(guide.stats)}")

    print("[2/4] Building narration script")
    beats = build_narration(guide)
    narration = " ".join(beats)
    print(f"      {len(narration)} chars across {len(beats)} beats")

    audio_path = OUTPUT_DIR / f"{args.slug}.mp3"
    if args.skip_tts and audio_path.exists():
        print(f"[3/4] Skipping TTS (reusing {audio_path})")
    else:
        print("[3/4] Generating Hebrew narration via Gemini TTS (voice: Charon)")
        tts_gemini(narration, audio_path, voice="Charon")
        print(f"      saved: {audio_path} ({audio_duration(audio_path):.1f}s)")

    out_path = Path(args.out) if args.out else OUTPUT_DIR / f"{args.slug}.mp4"
    print(f"[4/4] Rendering video -> {out_path}")
    render_video(guide, audio_path, out_path)
    print(f"      done: {out_path} ({out_path.stat().st_size / 1024 / 1024:.1f}MB)")


if __name__ == "__main__":
    main()
