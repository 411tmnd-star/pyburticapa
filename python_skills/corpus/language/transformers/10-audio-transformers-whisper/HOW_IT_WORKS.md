# How it works: Audio Transformers — Whisper Architecture

## `main.py`

```text
Whisper pipeline in pure stdlib — framing, per-frame energy, task prompt.

Full log-mel spectrogram requires FFT. For pedagogy we show the framing
shape (which is all the transformer ever sees) plus the task-token prefix
that controls Whisper's behavior.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sine_wave(freq, duration_s, sr)`](main.py#L18)
- [`def frame_signal(x, frame_size, hop)`](main.py#L23)
- [`def frame_energy(frame)`](main.py#L30): Sum-of-squares energy, log-scaled. Stand-in for mel power.
- [`def pad_or_clip(frames, target)`](main.py#L36)
- [`def whisper_prompt(lang, task, timestamps)`](main.py#L43)
- [`def main()`](main.py#L50)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
