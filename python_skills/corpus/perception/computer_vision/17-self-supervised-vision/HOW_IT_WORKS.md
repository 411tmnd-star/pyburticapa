# How it works: Self-Supervised Vision — SimCLR, DINO, MAE

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def info_nce(z1, z2, tau)`](main.py#L5)
- [`def random_mask_indices(num_patches, mask_ratio, seed)`](main.py#L15)
- [`class DinoHead`](main.py#L24): Toy DINO head to demonstrate centring + sharpening.
  - [`def student(self, x, temp)`](main.py#L36)
  - [`def teacher(self, x, temp)`](main.py#L39)
  - [`def update_centre(self, teacher_out)`](main.py#L44)
- [`def main()`](main.py#L48)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
