# How it works: Convolutions from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def pad2d(x, p)`](main.py#L4)
- [`def output_size(h_in, k, p, s)`](main.py#L13)
- [`def conv2d_naive(x, w, b, stride, padding)`](main.py#L17)
- [`def im2col(x, kh, kw, stride, padding)`](main.py#L39)
- [`def conv2d_im2col(x, w, b, stride, padding)`](main.py#L57)
- [`def receptive_field(layers)`](main.py#L67)
- [`def apply_kernel(img2d, kernel)`](main.py#L85)
- [`def synthetic_step_image(size)`](main.py#L91)
- [`def test_against_naive()`](main.py#L97)
- [`def main()`](main.py#L109)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
