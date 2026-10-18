# How it works: Speaker Recognition & Verification

## `main.py`

```text
Speaker verification: toy MFCC-stat embeddings, cosine scoring, EER.

Synthetic "speakers" are sinusoid mixtures with different harmonic profiles.
We enroll each speaker, build same/diff trial pairs, compute the EER.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tone_mix(freqs, sr, seconds, amp, noise)`](main.py#L14)
- [`def hann(N)`](main.py#L28)
- [`def dft_mag(x)`](main.py#L32)
- [`def frame_signal(sig, frame_len, hop)`](main.py#L47)
- [`def stft_mag(sig, frame_len, hop)`](main.py#L52)
- [`def hz_to_mel(f)`](main.py#L58)
- [`def mel_to_hz(m)`](main.py#L62)
- [`def mel_filterbank(n_mels, n_fft, sr)`](main.py#L66)
- [`def apply_filterbank(spec, fb)`](main.py#L82)
- [`def log_transform(x, eps)`](main.py#L86)
- [`def dct_ii(x, n_coeffs)`](main.py#L90)
- [`def featurize(signal, sr, n_mfcc, n_mels, frame_len, hop)`](main.py#L95)
- [`def l2_normalize(v)`](main.py#L103)
- [`def embed_mfcc_stats(signal, sr)`](main.py#L108)
- [`def cosine(a, b)`](main.py#L117)
- [`def eer(same_scores, diff_scores)`](main.py#L121)
- [`def main()`](main.py#L135)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
