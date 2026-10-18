# How it works: Image Classification

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def synthetic_cifar(num_per_class, num_classes, seed)`](main.py#L10)
- [`class ArrayDataset`](main.py#L32)
- [`def standardize(mean, std)`](main.py#L49)
- [`def random_hflip(p)`](main.py#L57)
- [`def random_crop(pad)`](main.py#L65)
- [`def compose()`](main.py#L75)
- [`def mixup_batch(x, y, num_classes, alpha)`](main.py#L83)
- [`def soft_cross_entropy(logits, soft_targets)`](main.py#L94)
- [`class MiniClassifier`](main.py#L99)
  - [`def forward(self, x)`](main.py#L122)
- [`def train_one_epoch(model, loader, optimizer, device, num_classes, use_mixup)`](main.py#L126)
- [`def evaluate(model, loader, device, num_classes)`](main.py#L150)
- [`def per_class_report(cm)`](main.py#L168)
- [`def main()`](main.py#L178)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
