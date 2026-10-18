# How it works: Omni Models: Qwen2.5-Omni and the Thinker-Talker Split

## `main.py`

```text
Thinker-Talker streaming pipeline — TTFAB calculator + VAD turn-taking.

Stdlib. No audio processing; focus on the latency budget and concurrency of
parallel streaming between Thinker (text) and Talker (speech).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class StreamConfig`](main.py#L13)
- [`class LatencyComponent`](main.py#L21)
- [`def ttfab(cfg)`](main.py#L26)
- [`def print_ttfab(cfg)`](main.py#L50)
- [`class VADEvent`](main.py#L71)
- [`def simulate_turn_taking(silence_threshold_ms)`](main.py#L76): Simulate a user turn ending detected by silence.
- [`def demo_vad()`](main.py#L88)
- [`def duplex_modes()`](main.py#L96)
- [`def main()`](main.py#L108)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
