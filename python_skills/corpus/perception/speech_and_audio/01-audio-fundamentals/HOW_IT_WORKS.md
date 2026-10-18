# How it works: Audio Fundamentals — Waveforms, Sampling, Fourier Transform

## `main.py`

```text
Audio fundamentals from scratch: synthesize, DFT, detect peak, demonstrate aliasing.

Stdlib only: math, wave, struct, os, tempfile.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sine(freq_hz, sr, seconds, amp)`](main.py#L14)
- [`def mix()`](main.py#L19)
- [`def write_wav(path, samples, sr)`](main.py#L24)
- [`def read_wav(path)`](main.py#L33)
- [`def dft(x)`](main.py#L42)
- [`def magnitudes(spectrum)`](main.py#L56)
- [`def peak_freq(samples, sr)`](main.py#L60)
- [`def downsample_naive(samples, factor)`](main.py#L68)
- [`def main()`](main.py#L72)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
