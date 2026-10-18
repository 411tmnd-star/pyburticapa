# W12 · Scroll product story

**Type** B: course + outside repo · **Goals** design, sales, marketing · **Status** to confirm

A Better Style product page that tells one product's story on scroll: frames from a product clip, smooth scroll, copy that changes at set points.

## How the parts connect

1. a product clip (ours, or a W09/W10 render) → frames.py → frames/
2. L04-01: colour space and compression choices for the frames (JPEG quality vs size per frame)
3. scroll_scrub page + lenis for smooth scroll; scrollytelling patterns for multi-scene stories
4. ui-design-guardrails brief first

## Run (target)

```bash
python frames.py product.mp4 page/frames --fps 24 --width 1280 && python -m http.server -d page
```

## Pass

Scrolling forwards and back shows the exact frame for the position; total frames under a size budget you set; reduced motion shows one frame.

When it passes on the laptop, it moves to `python_skills/confirmed/scroll_story` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
