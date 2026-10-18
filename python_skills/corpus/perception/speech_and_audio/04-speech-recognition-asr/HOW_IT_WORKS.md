# How it works: Speech Recognition (ASR) — CTC, RNN-T, Attention

## `main.py`

```text
ASR basics: greedy CTC decode, beam CTC decode, Word Error Rate.

Stdlib only. Builds a tiny hand-rolled CTC example and computes WER.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def ctc_greedy(frame_probs)`](main.py#L16)
- [`def ctc_beam(frame_probs, beam_width)`](main.py#L27)
- [`def wer(ref, hyp)`](main.py#L50)
- [`def one_hot_like(char, noise, vocab_size)`](main.py#L68)
- [`def build_frame_probs(target, duration_per_char, blank_runs)`](main.py#L75)
- [`def corrupt(probs, n_swaps, swap_strength)`](main.py#L86)
- [`def main()`](main.py#L99)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
