# How it works: Capstone Lesson 38: Classifier Fine-Tuning by Head Swap

## `main.py`

```text
Classifier fine-tuning by head swap.

See: phases/19-capstone-projects/38-classifier-finetuning/docs/en.md

Compares two strategies on a synthetic spam/ham fixture:
  - Head-only: body frozen, only the linear classification head trains.
  - Full FT:   body and head both train.

The demo at the bottom pretrains a tiny transformer body briefly, then
fine-tunes under both regimes and prints precision, recall, F1, and the
confusion matrix for each. Exits 0 on success.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ByteTokenizer`](main.py#L35): Maps printable bytes to ids 0..255. Reserves PAD as id 256.
  - [`def encode(self, text, max_len)`](main.py#L41): Return (ids, attention_mask). Pads to max_len.
  - [`def decode(self, ids)`](main.py#L50)
- [`class MultiHeadAttention`](main.py#L59)
  - [`def forward(self, x, mask)`](main.py#L69)
- [`class FeedForward`](main.py#L84)
  - [`def forward(self, x)`](main.py#L90)
- [`class Block`](main.py#L94)
  - [`def forward(self, x, mask)`](main.py#L102)
- [`class LMBody`](main.py#L108): Embedding + position + N transformer blocks. Returns hidden states.
  - [`def forward(self, ids, mask)`](main.py#L119)
- [`def mean_pool(hidden, mask)`](main.py#L133): Mask-weighted mean across the sequence dimension.
- [`class Classifier`](main.py#L141)
  - [`def forward(self, ids, mask)`](main.py#L148)
- [`class LMHead`](main.py#L154): Token-prediction head, used during the brief pretraining pass.
  - [`def forward(self, ids, mask)`](main.py#L163)
- [`def freeze_body(model)`](main.py#L173): Set requires_grad=False on every body parameter. Returns count frozen.
- [`def unfreeze_body(model)`](main.py#L182)
- [`def trainable_params(model)`](main.py#L190)
- [`def fill(template, rng)`](main.py#L238)
- [`def make_dataset(n_per_class, seed)`](main.py#L247)
- [`def stratified_split(texts, labels, test_frac, seed)`](main.py#L262)
- [`class ClassificationDataset`](main.py#L292)
- [`class LMDataset`](main.py#L311): Causal LM dataset over the spam/ham strings. Used for the warm-up pretraining.
- [`def pretrain_quick(body, tok, texts, max_len, epochs, batch_size, lr, seed)`](main.py#L335): A short LM pretraining pass to give the body non-trivial weights.
- [`class TrainReport`](main.py#L380)
- [`def train_classifier(model, train_loader, epochs, lr, seed)`](main.py#L386)
- [`class Metrics`](main.py#L421)
  - [`def confusion(self)`](main.py#L430)
- [`def precision_recall_f1(tp, fp, fn)`](main.py#L438)
- [`def evaluate(model, loader, positive)`](main.py#L446)
- [`class Config`](main.py#L471)
- [`def build_model(cfg)`](main.py#L486)
- [`class DemoReport`](main.py#L499)
  - [`def passed(self)`](main.py#L507)
- [`def run_demo(cfg)`](main.py#L512)
- [`def _clone_body(body)`](main.py#L603): Deep-copy a body so two regimes start from the same pretrained weights.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
