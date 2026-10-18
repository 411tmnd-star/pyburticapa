# How it works: Gradient Checkpointing and Activation Recomputation

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def linear_forward(x, w, b)`](code/main.py#L4)
- [`def relu(x)`](code/main.py#L8)
- [`def layer_forward(x, w1, b1, w2, b2)`](code/main.py#L12)
- [`def model_forward(x, params)`](code/main.py#L17)
- [`def layer_backward(g, x_in, w1, b1, w2, b2)`](code/main.py#L26)
- [`def model_backward(grad_output, activations, params)`](code/main.py#L39)
- [`def model_forward_checkpointed(x, params, k)`](code/main.py#L49)
- [`def model_backward_checkpointed(grad_output, saved_inputs, params, k)`](code/main.py#L60)
- [`def checkpoint_cost(n_layers, segment_size, flops_per_layer, attention_fraction, selective)`](code/main.py#L75)
- [`def activation_memory_mb(n_layers, hidden, seq, batch, bytes_per_value)`](code/main.py#L96)
- [`def memory_after_checkpoint(n_layers, segment_size, hidden, seq, batch, bytes_per_value)`](code/main.py#L102)
- [`def optimal_segment(n_layers)`](code/main.py#L109)
- [`def should_recompute(layer_type, activation_bytes_mb, recompute_flops_ratio)`](code/main.py#L113)
- [`def make_params(n_layers, hidden, inner, seed)`](code/main.py#L121)
- [`def verify_equivalence(n_layers, hidden, inner, batch, k)`](code/main.py#L133)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
