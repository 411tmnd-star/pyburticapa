# How it works: Loading Pretrained Weights

## `code/main.py`

```text
Load pretrained GPT-2-style weights from safetensors into the lesson 35 architecture.

Reads a safetensors file using the `safetensors` library, maps the pretrained
parameter names (`wte`, `wpe`, `h.N.attn.c_attn`, ...) onto the local names
(`tok_embed`, `pos_embed`, `blocks.N.attn.qkv`, ...), checks shapes, transposes
the conv1d-style weight layout used by published GPT-2 checkpoints, and assigns
under `torch.no_grad()`. The LM head is a weight tying alias on `tok_embed`,
so it is not in the file.

To keep the demo offline, `make_stub_safetensors` generates a fixture at first
run with the exact pretrained naming convention. Swap the fixture for a real
GPT-2 file and the loader works without modification.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ModelConfig`](code/main.py#L36): Configuration aligned with the lesson 35 reference; the stub uses a smaller d_model.
- [`class LayerNorm`](code/main.py#L50)
  - [`def forward(self, x)`](code/main.py#L57)
- [`class MultiHeadAttention`](code/main.py#L63)
  - [`def forward(self, x)`](code/main.py#L82)
- [`class FeedForward`](code/main.py#L97)
  - [`def forward(self, x)`](code/main.py#L106)
- [`class TransformerBlock`](code/main.py#L110)
  - [`def forward(self, x)`](code/main.py#L118)
- [`class GPTModel`](code/main.py#L124)
  - [`def forward(self, tokens)`](code/main.py#L142)
- [`class LoadReport`](code/main.py#L157): Outcome of a load. Print this; it tells you whether the load succeeded.
  - [`def summary(self)`](code/main.py#L165)
  - [`def ok(self)`](code/main.py#L173)
- [`def make_pretrained_to_local(num_layers)`](code/main.py#L182): Return the full pretrained->local name map for a model with `num_layers` blocks.
- [`def _needs_transpose(pretrained_name)`](code/main.py#L208)
- [`def load_safetensors(model, path, verbose)`](code/main.py#L212): Load weights into model. Refuse to assign on shape mismatch. Returns a report.
- [`def make_stub_safetensors(path, cfg, seed)`](code/main.py#L283): Generate a fixture file with the pretrained naming convention.
- [`def quick_generate(model, prompt, n, seed)`](code/main.py#L328)
- [`def _state_fingerprint(model)`](code/main.py#L340): Sum of L2 norms across parameters; coarse fingerprint that changes on load.
- [`def demo()`](code/main.py#L345)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
