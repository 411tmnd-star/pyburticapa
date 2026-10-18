# How it works: Training Loop and Evaluation

## `code/main.py`

```text
Training loop and evaluation harness for the lesson 35 GPT model.

Implements: batch construction with input/target shift by one, cross entropy
loss in `calc_loss_batch`, held-out evaluation in `evaluate_model`, a qualitative
generation probe in `generate_and_print_sample`, AdamW with a decay/no-decay
split, a linear-warmup-plus-cosine learning rate schedule, gradient norm
clipping, and a JSONL log of per step loss in `outputs/losses.jsonl`.

The demo trains a tiny model on synthetic byte-level tokens for a small number
of steps, writes the JSONL log, and prints eval losses and generated samples
at the probe points. End to end runs in well under a minute on CPU.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TrainConfig`](code/main.py#L35): Training and evaluation hyperparameters for the demo run.
- [`class ModelConfig`](code/main.py#L53)
- [`class LayerNorm`](code/main.py#L65)
  - [`def forward(self, x)`](code/main.py#L72)
- [`class MultiHeadAttention`](code/main.py#L78)
  - [`def forward(self, x)`](code/main.py#L97)
- [`class FeedForward`](code/main.py#L112)
  - [`def forward(self, x)`](code/main.py#L121)
- [`class TransformerBlock`](code/main.py#L125)
  - [`def forward(self, x)`](code/main.py#L133)
- [`class GPTModel`](code/main.py#L139)
  - [`def _init_weights(module)`](code/main.py#L163)
  - [`def forward(self, tokens)`](code/main.py#L171)
- [`def make_batches(token_ids, batch_size, context_length, seed)`](code/main.py#L181): Yield (input, target) batches where target is input shifted by one position.
- [`def calc_loss_batch(model, inputs, targets)`](code/main.py#L209): Forward, flatten across batch and time, return scalar cross entropy.
- [`def evaluate_model(model, val_loader, max_batches)`](code/main.py#L223): Mean cross entropy over `max_batches` validation batches; no grad, no dropout.
- [`def generate_and_print_sample(model, prompt, max_new_tokens, temperature, top_k, seed)`](code/main.py#L245): Print a short generated continuation from a fixed prompt and return the tokens.
- [`def build_param_groups(model, weight_decay)`](code/main.py#L279): Split parameters: matrix-shaped tensors get decay; scale/bias/embedding biases do not.
- [`def cosine_with_warmup(step, warmup_steps, total_steps, max_lr, min_lr)`](code/main.py#L296): Linear warmup then cosine decay to min_lr over the remaining steps.
- [`def train(model, train_tokens, val_tokens, cfg, prompt, log_path)`](code/main.py#L312): Run the training loop, persist losses.jsonl, return the in-memory log.
- [`def _synthetic_byte_tokens(length, vocab_size, seed)`](code/main.py#L369): Deterministic synthetic tokens.
- [`def demo()`](code/main.py#L385)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
