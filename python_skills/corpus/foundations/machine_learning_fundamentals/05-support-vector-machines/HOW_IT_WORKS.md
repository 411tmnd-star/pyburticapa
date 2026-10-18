# How it works: Support Vector Machines

## `svm.py`

Functions and classes, in file order (click to jump to the line):

- [`def dot(a, b)`](svm.py#L5)
- [`def vec_add(a, b)`](svm.py#L9)
- [`def vec_sub(a, b)`](svm.py#L13)
- [`def vec_scale(a, s)`](svm.py#L17)
- [`def vec_norm(a)`](svm.py#L21)
- [`def linear_kernel(x, z)`](svm.py#L25)
- [`def polynomial_kernel(x, z, degree, c)`](svm.py#L29)
- [`def rbf_kernel(x, z, gamma)`](svm.py#L33)
- [`def hinge_loss(X, y, w, b)`](svm.py#L38)
- [`def svm_objective(X, y, w, b, lambda_param)`](svm.py#L47)
- [`class LinearSVM`](svm.py#L53)
  - [`def fit(self, X, y)`](svm.py#L62)
  - [`def predict(self, X)`](svm.py#L92)
  - [`def decision_function(self, X)`](svm.py#L95)
  - [`def margin_width(self)`](svm.py#L98)
  - [`def find_support_vectors(self, X, y, tol)`](svm.py#L104)
- [`def accuracy(y_true, y_pred)`](svm.py#L113)
- [`def generate_linear_data(n_samples, margin, seed)`](svm.py#L118)
- [`def generate_noisy_data(n_samples, noise, seed)`](svm.py#L135)
- [`def generate_circular_data(n_samples, seed)`](svm.py#L149)
- [`def train_test_split(X, y, test_ratio, seed)`](svm.py#L164)
- [`def compute_kernel_matrix(X, kernel_fn)`](svm.py#L180)
- [`def demo_hinge_loss()`](svm.py#L191)
- [`def demo_linear_svm()`](svm.py#L214)
- [`def demo_c_parameter()`](svm.py#L253)
- [`def demo_kernel_functions()`](svm.py#L289)
- [`def demo_kernel_matrix()`](svm.py#L323)
- [`def demo_linear_vs_nonlinear()`](svm.py#L371)
- [`def demo_support_vectors()`](svm.py#L414)
- [`def demo_svm_vs_logistic()`](svm.py#L468)
- [`def demo_margin_effect()`](svm.py#L511)
- [`def print_summary()`](svm.py#L539)

## Run and test

From this folder:

```
python svm.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
