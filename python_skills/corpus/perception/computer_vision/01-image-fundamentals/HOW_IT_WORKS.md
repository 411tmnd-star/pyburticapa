# How it works: Image Fundamentals — Pixels, Channels, Color Spaces

## `main.py`

```text
Runnable companion for the Image Fundamentals lesson.
Builds a deterministic RGB image and transforms it as a NumPy tensor.
Implements nearest, bilinear, and bicubic resizing from scratch.
See ../docs/en.md for the derivations and production-library comparison.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def synthetic_image(height, width, seed)`](main.py#L14)
- [`def inspect(arr, label)`](main.py#L25)
- [`def hwc_to_chw(arr)`](main.py#L40)
- [`def chw_to_hwc(arr)`](main.py#L44)
- [`def rgb_to_grayscale(rgb)`](main.py#L48)
- [`def rgb_to_hsv(rgb)`](main.py#L53)
- [`def preprocess_imagenet(rgb_uint8)`](main.py#L76)
- [`def deprocess_imagenet(chw_float32)`](main.py#L83)
- [`def resize_coordinates(source_length, target_length)`](main.py#L90)
- [`def nearest_resize(arr, target_height, target_width)`](main.py#L100)
- [`def bilinear_resize(arr, target_height, target_width)`](main.py#L106)
- [`def cubic_weight(distance, tension)`](main.py#L125)
- [`def bicubic_resize(arr, target_height, target_width)`](main.py#L132)
- [`def resize_compare(arr, scale)`](main.py#L160)
- [`def local_roughness(x)`](main.py#L172)
- [`def main()`](main.py#L178)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
