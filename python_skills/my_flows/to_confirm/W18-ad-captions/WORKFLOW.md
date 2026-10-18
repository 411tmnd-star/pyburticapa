# W18 · Ad captions

**Type** C: course + course · **Goals** marketing · **Status** to confirm

Captions for ad clips: transcribe the voice-over, keep timing, translate when needed, and keep brand terms fixed.

## How the parts connect

1. Voice Note Transcriber: audio → transcript and caption review page
2. Subtitle Localization Desk: translate cues while keeping timing and a fixed term list (Better Style, product names)
3. export .srt / .vtt for the ad platform

## Run (target)

```bash
python captions.py clip.wav --lang en --terms terms.txt --out clip.srt
```

## Pass

On the course's offline speech fixture, cues keep their timing and every fixed term appears unchanged.

When it passes on the laptop, it moves to `python_skills/confirmed/ad_captions` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
