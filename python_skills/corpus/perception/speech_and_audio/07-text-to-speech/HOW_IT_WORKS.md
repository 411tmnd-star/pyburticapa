# How it works: Text-to-Speech (TTS) — From Tacotron to F5 and Kokoro

## `main.py`

```text
TTS internals demo: phoneme lookup + duration estimation + mel frame schedule.

Stdlib only. Builds a toy English grapheme-to-phoneme table, estimates
durations, and prints the frame schedule a FastSpeech-style model would
use. For real synthesis, install kokoro or f5-tts (see docs).

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def phonemize(text)`](main.py#L53)
- [`def duration(phones, jitter, seed)`](main.py#L72)
- [`def mel_schedule(phones, durs, hop_ms)`](main.py#L82)
- [`def main()`](main.py#L91)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
