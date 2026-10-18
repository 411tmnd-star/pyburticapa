# How it works: Audio Classification — From k-NN on MFCCs to AST and BEATs

## `main.py`

```text
Audio classification baseline: k-NN on mean+var pooled MFCCs.

Synthetic 4-class dataset: pure tones at {200, 400, 800, 1600} Hz with
Gaussian noise. Trains, tests, prints confusion matrix.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sine(freq_hz, sr, seconds, amp, phase)`](main.py#L14)
- [`def add_noise(signal, sigma)`](main.py#L19)
- [`def hann(N)`](main.py#L23)
- [`def dft_mag(x)`](main.py#L27)
- [`def frame_signal(sig, frame_len, hop)`](main.py#L42)
- [`def stft_mag(sig, frame_len, hop)`](main.py#L47)
- [`def hz_to_mel(f)`](main.py#L53)
- [`def mel_to_hz(m)`](main.py#L57)
- [`def mel_filterbank(n_mels, n_fft, sr)`](main.py#L61)
- [`def apply_filterbank(spec, fb)`](main.py#L77)
- [`def log_transform(x, eps)`](main.py#L85)
- [`def dct_ii(x, n_coeffs)`](main.py#L89)
- [`def featurize(signal, sr, n_mfcc, n_mels, frame_len, hop)`](main.py#L97)
- [`def summarize(frames)`](main.py#L105)
- [`def cosine(a, b)`](main.py#L112)
- [`def knn(q, bank, labels, k)`](main.py#L119)
- [`def main()`](main.py#L125)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
