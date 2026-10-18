# How it works: Weight Initialization and Training Stability

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def zero_init(fan_in, fan_out)`](main.py#L5)
- [`def random_init(fan_in, fan_out, scale)`](main.py#L9)
- [`def xavier_init(fan_in, fan_out)`](main.py#L13)
- [`def kaiming_init(fan_in, fan_out)`](main.py#L18)
- [`def sigmoid(x)`](main.py#L23)
- [`def tanh_act(x)`](main.py#L28)
- [`def relu(x)`](main.py#L32)
- [`def forward_deep(init_fn, activation_fn, n_layers, width, n_samples)`](main.py#L36)
- [`def magnitude_report(name, magnitudes)`](main.py#L64)
- [`def symmetry_demo()`](main.py#L78)
- [`def variance_analysis()`](main.py#L96)
- [`def run_experiment()`](main.py#L126)
- [`def training_comparison()`](main.py#L157)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
