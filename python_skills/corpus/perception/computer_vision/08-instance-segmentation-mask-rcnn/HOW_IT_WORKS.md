# How it works: Instance Segmentation — Mask R-CNN

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def roi_align_single(feature, box, output_size, spatial_scale)`](main.py#L6)
- [`def compare_with_torchvision_roi_align()`](main.py#L24)
- [`def load_pretrained_maskrcnn()`](main.py#L45)
- [`def build_custom_maskrcnn(num_classes)`](main.py#L54)
- [`def freeze_backbone(model)`](main.py#L69)
- [`def main()`](main.py#L77)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
