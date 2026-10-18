# How it works: Capstone 03 — Real-Time Voice Assistant (ASR to LLM to TTS)

## `main.py`

```text
Real-time voice pipeline — VAD + turn-detection + barge-in scheduler.

The hard architectural primitive in a 2026 voice agent is not the ASR or the
TTS. It is the streaming scheduler that arbitrates between VAD events, ASR
partials, turn-completion scores, LLM streaming, TTS streaming, and user
barge-in, all with bounded latency. This scaffold simulates audio frames and
implements the scheduler in full: state machine, barge-in cancellation, tool
side-channel with filler injection, latency accounting.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Frame`](main.py#L26)
- [`def synth_call(script, start_ms, noise)`](main.py#L32): Generate a frame stream for a simulated caller utterance.
- [`def turn_completion_score(partial)`](main.py#L59): Tiny stand-in for the LiveKit turn-detector model.
- [`class State`](main.py#L78)
- [`class Metrics`](main.py#L88)
  - [`def log(self, msg)`](main.py#L96)
  - [`def latency_ms(self)`](main.py#L99)
- [`class Tool`](main.py#L110)
- [`def run_session(frames, use_tool, barge_in_at_ms)`](main.py#L123)
- [`def main()`](main.py#L209)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
