# How it works: Loss Functions

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def mse(predictions, targets)`](main.py#L5)
- [`def mse_gradient(predictions, targets)`](main.py#L14)
- [`def binary_cross_entropy(predictions, targets, eps)`](main.py#L23)
- [`def bce_gradient(predictions, targets, eps)`](main.py#L33)
- [`def softmax(logits)`](main.py#L43)
- [`def categorical_cross_entropy(logits, target_index, eps)`](main.py#L50)
- [`def cce_gradient(logits, target_index)`](main.py#L56)
- [`def label_smoothed_cce(logits, target_index, num_classes, alpha, eps)`](main.py#L63)
- [`def cosine_similarity(a, b)`](main.py#L76)
- [`def contrastive_loss(anchor, positive, negatives, temperature)`](main.py#L86)
- [`def sigmoid(x)`](main.py#L98)
- [`def make_circle_data(n, seed)`](main.py#L103)
- [`class LossComparisonNetwork`](main.py#L114)
  - [`def forward(self, x)`](main.py#L126)
  - [`def backward(self, target)`](main.py#L139)
  - [`def compute_loss(self, pred, target)`](main.py#L159)
  - [`def train(self, data, epochs)`](main.py#L167)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
