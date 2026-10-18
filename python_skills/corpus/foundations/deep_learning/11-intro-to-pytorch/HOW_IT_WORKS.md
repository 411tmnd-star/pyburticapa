# How it works: Introduction to PyTorch

## `pytorch_intro.py`

Functions and classes, in file order (click to jump to the line):

- [`def download_mnist(path)`](pytorch_intro.py#L19)
- [`def load_images(filepath)`](pytorch_intro.py#L28)
- [`def load_labels(filepath)`](pytorch_intro.py#L37)
- [`class MNISTModel`](pytorch_intro.py#L45)
  - [`def forward(self, x)`](pytorch_intro.py#L58)
- [`class MNISTModelWithBatchNorm`](pytorch_intro.py#L62)
  - [`def forward(self, x)`](pytorch_intro.py#L75)
- [`def train_one_epoch(model, loader, criterion, optimizer, device)`](pytorch_intro.py#L79)
- [`def evaluate(model, loader, criterion, device)`](pytorch_intro.py#L98)
- [`def load_data(data_path)`](pytorch_intro.py#L115)
- [`def create_loaders(train_images, train_labels, test_images, test_labels, batch_size)`](pytorch_intro.py#L124)
- [`def run_experiment(name, model, train_loader, test_loader, optimizer, device, epochs)`](pytorch_intro.py#L136)
- [`def experiment_adam(train_loader, test_loader, device)`](pytorch_intro.py#L169)
- [`def experiment_sgd(train_loader, test_loader, device)`](pytorch_intro.py#L178)
- [`def experiment_batchnorm(train_loader, test_loader, device)`](pytorch_intro.py#L187)
- [`def experiment_sgd_cosine(train_loader, test_loader, device, epochs)`](pytorch_intro.py#L196)
- [`def show_model_info(model, name)`](pytorch_intro.py#L237)
- [`def demo_tensor_basics()`](pytorch_intro.py#L248)
- [`def demo_autograd()`](pytorch_intro.py#L270)

## Run and test

From this folder:

```
python pytorch_intro.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
