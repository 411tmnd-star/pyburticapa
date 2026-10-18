# How it works: Embodied VLAs: RT-2, OpenVLA, π0, GR00T

## `main.py`

```text
Embodied VLA action format toys — stdlib.

Three mini-implementations:
  1. Discrete-bin action tokenization (RT-2 / OpenVLA).
  2. A FAST-style DCT-quantize compressor.
  3. Token-count comparison across (discrete, FAST, continuous flow).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def discretize(action, bins)`](main.py#L15): Map a [-1,1]^D action to D integer bins.
- [`def undiscretize(tokens, bins)`](main.py#L25)
- [`def dct(x)`](main.py#L29): Naive type-II DCT.
- [`def fast_compress(trajectory, keep_coeff, bins)`](main.py#L41): FAST-style tokenizer: per-dim DCT + keep low-freq + quantize.
- [`def compare_formats()`](main.py#L60)
- [`def round_trip_demo()`](main.py#L82)
- [`def lineage_table()`](main.py#L95)
- [`def main()`](main.py#L112)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
