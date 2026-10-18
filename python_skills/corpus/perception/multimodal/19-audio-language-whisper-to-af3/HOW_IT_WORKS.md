# How it works: Audio-Language Models: the Whisper to Audio Flamingo 3 Arc

## `main.py`

```text
Audio-LLM toys: log-Mel spectrogram + audio Q-former + cascaded vs end-to-end.

Stdlib. Computes a naive DFT-based log-Mel spec from a synthetic waveform,
runs a toy Q-former over the resulting frames, and compares task coverage
between cascaded and end-to-end pipelines.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def synth_waveform(duration_s, sr)`](main.py#L17)
- [`def window_frames(x, sr, win_ms, hop_ms)`](main.py#L25)
- [`def naive_dft_mag(frame, n_bins)`](main.py#L36): Compute magnitude spectrum at n_bins frequencies using naive DFT.
- [`def mel_filterbank(n_bins, n_mels)`](main.py#L51): Triangular Mel filter bank (simplified, linear warp as proxy).
- [`def apply_mel(spec_mag, fbank)`](main.py#L65)
- [`def log_compress(xs)`](main.py#L69)
- [`def demo_melspec()`](main.py#L73)
- [`class QFormer`](main.py#L90)
  - [`def forward(self, frames)`](main.py#L98): Naive cross-attention: each query attends over all frames.
- [`def demo_qformer()`](main.py#L113)
- [`def task_coverage_table()`](main.py#L124)
- [`def main()`](main.py#L146)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
