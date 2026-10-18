# How it works: CLIP and Contrastive Vision-Language Pretraining

## `main.py`

```text
CLIP / SigLIP contrastive loss toy — stdlib Python.

Implements InfoNCE (softmax) and sigmoid pairwise loss on a hand-constructed
similarity matrix. Also runs a tiny zero-shot-classification walkthrough using
synthetic image and text embeddings.

No numpy. No torch. The point is to see the loss math and the argmax pattern.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def normalize(v)`](main.py#L16)
- [`def cosine(a, b)`](main.py#L21)
- [`def similarity_matrix(images, texts, tau)`](main.py#L25)
- [`def log_sum_exp(row)`](main.py#L38)
- [`def infonce_loss(S)`](main.py#L43): Symmetric InfoNCE over rows and columns.
- [`def sigmoid(x)`](main.py#L56)
- [`def sigmoid_loss(S, bias)`](main.py#L64): SigLIP-style per-pair BCE. Positives are the diagonal.
- [`def zero_shot_classify(image, class_texts)`](main.py#L81): Argmax cosine similarity over class prompts.
- [`def make_fake_embedding(seed, dim)`](main.py#L92)
- [`def demo_infonce()`](main.py#L97)
- [`def demo_shuffled()`](main.py#L111)
- [`def demo_zero_shot()`](main.py#L128)
- [`def demo_prompt_ensemble()`](main.py#L147)
- [`def main()`](main.py#L171)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
