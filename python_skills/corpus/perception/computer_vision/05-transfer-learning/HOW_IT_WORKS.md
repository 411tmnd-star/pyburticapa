# How it works: Transfer Learning & Fine-Tuning

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def synthetic_dataset(num_per_class, num_classes, size, seed)`](main.py#L11)
- [`class ArrayDataset`](main.py#L32)
- [`def make_feature_extractor(num_classes)`](main.py#L47)
- [`def make_fine_tune(num_classes)`](main.py#L55)
- [`def discriminative_param_groups(model, base_lr, decay)`](main.py#L63)
- [`def freeze_bn_stats(model)`](main.py#L82)
- [`def train_and_eval(model, train_loader, val_loader, device, epochs, base_lr, freeze_bn)`](main.py#L91)
- [`def trainable_param_count(model)`](main.py#L131)
- [`def main()`](main.py#L135)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
