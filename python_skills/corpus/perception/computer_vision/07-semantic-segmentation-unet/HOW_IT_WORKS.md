# How it works: Semantic Segmentation — U-Net

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class DoubleConv`](main.py#L9)
  - [`def forward(self, x)`](main.py#L21)
- [`class Down`](main.py#L25)
  - [`def forward(self, x)`](main.py#L30)
- [`class Up`](main.py#L34)
  - [`def forward(self, x, skip)`](main.py#L40)
- [`class UNet`](main.py#L48)
  - [`def forward(self, x)`](main.py#L62)
- [`def dice_loss(logits, targets, num_classes, eps)`](main.py#L75)
- [`def combined_loss(logits, targets, num_classes, lam)`](main.py#L85)
- [`def iou_per_class(logits, targets, num_classes)`](main.py#L92)
- [`def synthetic_segmentation(num_samples, size, seed)`](main.py#L104)
- [`class SegDataset`](main.py#L129)
- [`def main()`](main.py#L143)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
