# How it works: Voice Activity Detection & Turn-Taking — Silero, Cobra, and the Flush Trick

## `main.py`

```text
VAD cascade + turn-detection state machine.

Three-tier cascade: energy gate → (pretend) Silero → turn-detector state machine.
Run a synthetic stream: speech + silence + cough + speech, verify
the turn-detector fires START and END at the right moments.

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def synth_chunk(kind, rng, sr, chunk_ms)`](main.py#L14)
- [`def energy_vad(chunk, threshold_dbfs)`](main.py#L23)
- [`def fake_silero_vad(chunk, prev_state, threshold)`](main.py#L28)
- [`class TurnDetector`](main.py#L39)
  - [`def update(self, is_speech, chunk_ms)`](main.py#L48)
- [`def main()`](main.py#L66)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
