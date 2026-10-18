# How it works: Qwen-VL Family and Dynamic-FPS Video

## `main.py`

```text
Qwen-VL family: M-RoPE positions + dynamic-FPS sampler + JSON tool-call parser.

Three toy implementations:
  1. M-RoPE rotation table across text, image, and video tokens.
  2. Dynamic-FPS sampler that picks frames-per-second from a target token budget.
  3. JSON-output parser for Qwen2.5-VL-style agent tool calls.

Stdlib only. The intent is a working mental model, not production code.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MRoPEConfig`](main.py#L19)
- [`def mrope_angles(cfg, t, h, w)`](main.py#L27): Return per-pair rotation angles for each band given a (t, h, w) position.
- [`def mrope_rotate(cfg, vec, t, h, w)`](main.py#L40): Apply M-RoPE to a vector of length cfg.hidden.
- [`class VideoPlan`](main.py#L63)
  - [`def fps(self)`](main.py#L69)
  - [`def frame_times(self)`](main.py#L82)
  - [`def total_tokens(self)`](main.py#L88)
- [`def parse_tool_call(raw)`](main.py#L92): Qwen2.5-VL emits JSON tool calls; parse with fallback.
- [`def demo_mrope()`](main.py#L107)
- [`def demo_sampler()`](main.py#L123)
- [`def demo_tool_parser()`](main.py#L140)
- [`def main()`](main.py#L156)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
