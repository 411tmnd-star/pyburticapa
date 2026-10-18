# How it works: Spectrograms, Mel Scale & Audio Features

## `main.py`

```text
Spectrograms, mel filterbanks, MFCCs — built from stdlib math.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sine(freq_hz, sr, seconds, amp, phase)`](main.py#L9)
- [`def chirp(f0, f1, sr, seconds, amp)`](main.py#L14)
- [`def hann(N)`](main.py#L24)
- [`def dft_mag(x)`](main.py#L28)
- [`def frame_signal(signal, frame_len, hop)`](main.py#L43)
- [`def stft_magnitude(signal, frame_len, hop)`](main.py#L50)
- [`def hz_to_mel(f)`](main.py#L56)
- [`def mel_to_hz(m)`](main.py#L60)
- [`def mel_filterbank(n_mels, n_fft, sr, fmin, fmax)`](main.py#L64)
- [`def apply_filterbank(stft_mag, fb)`](main.py#L85)
- [`def log_transform(mel_spec, eps)`](main.py#L100)
- [`def dct_ii(x, n_coeffs)`](main.py#L104)
- [`def main()`](main.py#L112)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
