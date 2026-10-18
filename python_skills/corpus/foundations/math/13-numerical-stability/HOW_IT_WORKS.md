# How it works: Numerical Stability

## `numerical.py`

Functions and classes, in file order (click to jump to the line):

- [`def softmax_naive(logits)`](numerical.py#L6)
- [`def softmax_stable(logits)`](numerical.py#L12)
- [`def logsumexp_naive(values)`](numerical.py#L19)
- [`def logsumexp_stable(values)`](numerical.py#L23)
- [`def log_softmax_stable(logits)`](numerical.py#L28)
- [`def cross_entropy_naive(true_class, logits)`](numerical.py#L34)
- [`def cross_entropy_stable(true_class, logits)`](numerical.py#L39)
- [`def sigmoid_naive(x)`](numerical.py#L44)
- [`def sigmoid_stable(x)`](numerical.py#L48)
- [`def binary_cross_entropy_naive(y_true, y_pred)`](numerical.py#L57)
- [`def binary_cross_entropy_stable(y_true, logit)`](numerical.py#L61)
- [`def numerical_gradient(f, x, h)`](numerical.py#L66)
- [`def check_gradient(analytical, numerical, tolerance)`](numerical.py#L77)
- [`def clip_by_value(gradients, max_val)`](numerical.py#L90)
- [`def clip_by_norm(gradients, max_norm)`](numerical.py#L94)
- [`def check_tensor(name, values)`](numerical.py#L102)
- [`def simulate_bfloat16(x)`](numerical.py#L114)
- [`def simulate_float16(x)`](numerical.py#L122)
- [`def kahan_sum(values)`](numerical.py#L130)
- [`def welford_variance(values)`](numerical.py#L141)
- [`def variance_naive(values)`](numerical.py#L156)
- [`def layer_norm(values, epsilon, gamma, beta)`](numerical.py#L163)
- [`def demo_float_precision()`](numerical.py#L171)
- [`def demo_catastrophic_cancellation()`](numerical.py#L202)
- [`def demo_overflow_underflow()`](numerical.py#L235)
- [`def demo_softmax_stability()`](numerical.py#L273)
- [`def demo_logsumexp()`](numerical.py#L310)
- [`def demo_cross_entropy()`](numerical.py#L346)
- [`def demo_sigmoid_stability()`](numerical.py#L388)
- [`def demo_gradient_checking()`](numerical.py#L407)
- [`def demo_nan_inf()`](numerical.py#L454)
- [`def demo_gradient_clipping()`](numerical.py#L488)
- [`def demo_mixed_precision()`](numerical.py#L523)
- [`def demo_layer_norm()`](numerical.py#L586)
- [`def demo_common_bugs()`](numerical.py#L610)
- [`def demo_format_comparison()`](numerical.py#L671)

## Run and test

From this folder:

```
python numerical.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
