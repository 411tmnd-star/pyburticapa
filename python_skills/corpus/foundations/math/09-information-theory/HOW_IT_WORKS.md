# How it works: Information Theory

## `information_theory.py`

Functions and classes, in file order (click to jump to the line):

- [`def information_content(p, base)`](information_theory.py#L5)
- [`def entropy(probs, base)`](information_theory.py#L13)
- [`def cross_entropy(p, q, base)`](information_theory.py#L20)
- [`def kl_divergence(p, q, base)`](information_theory.py#L30)
- [`def mutual_information(joint_probs, base)`](information_theory.py#L34)
- [`def softmax(logits)`](information_theory.py#L50)
- [`def cross_entropy_loss(true_class, logits)`](information_theory.py#L57)
- [`def negative_log_likelihood(labels, all_logits)`](information_theory.py#L62)
- [`def perplexity(avg_cross_entropy, base)`](information_theory.py#L69)
- [`def conditional_entropy(joint_probs, base)`](information_theory.py#L75)
- [`def joint_entropy(joint_probs, base)`](information_theory.py#L91)
- [`def label_smoothing_demo()`](information_theory.py#L100)
- [`def feature_selection_mi_demo()`](information_theory.py#L134)

## Run and test

From this folder:

```
python information_theory.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
