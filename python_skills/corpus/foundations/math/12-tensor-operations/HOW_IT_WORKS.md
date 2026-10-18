# How it works: Tensor Operations

## `tensors.py`

Functions and classes, in file order (click to jump to the line):

- [`class Tensor`](tensors.py#L6)
  - [`def _flatten_nested(self, data)`](tensors.py#L27)
  - [`def _compute_strides(shape)`](tensors.py#L48)
  - [`def shape(self)`](tensors.py#L57)
  - [`def rank(self)`](tensors.py#L61)
  - [`def size(self)`](tensors.py#L65)
  - [`def strides(self)`](tensors.py#L69)
  - [`def _flat_index(self, indices)`](tensors.py#L72)
  - [`def reshape(self, new_shape)`](tensors.py#L98)
  - [`def squeeze(self, dim)`](tensors.py#L125)
  - [`def unsqueeze(self, dim)`](tensors.py#L137)
  - [`def transpose(self, dim0, dim1)`](tensors.py#L144)
  - [`def permute(self, dims)`](tensors.py#L149)
  - [`def flatten(self, start_dim, end_dim)`](tensors.py#L170)
  - [`def _elementwise_op(self, other, op)`](tensors.py#L180)
  - [`def sum(self, axis)`](tensors.py#L203)
  - [`def to_list(self)`](tensors.py#L230)
  - [`def _build_nested(self, data, shape, offset)`](tensors.py#L235)
  - [`def to_numpy(self)`](tensors.py#L247)
- [`def demo_basic_tensor()`](tensors.py#L251)
- [`def demo_reshape_operations()`](tensors.py#L276)
- [`def demo_broadcasting_numpy()`](tensors.py#L322)
- [`def demo_einsum()`](tensors.py#L380)
- [`def demo_attention_einsum()`](tensors.py#L451)
- [`def demo_memory_layout()`](tensors.py#L501)
- [`def demo_ai_tensor_shapes()`](tensors.py#L547)
- [`def demo_reduction_operations()`](tensors.py#L627)
- [`def demo_custom_tensor_class()`](tensors.py#L663)
- [`def demo_einsum_gallery()`](tensors.py#L712)

## Run and test

From this folder:

```
python tensors.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
