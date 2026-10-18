# How it works: LLaVA and Visual Instruction Tuning

## `main.py`

```text
LLaVA 2-layer MLP projector + prompt builder — stdlib Python.

Walks the LLaVA forward pass:
  - toy ViT emits 16 patch tokens of dim 16
  - 2-layer MLP projects each patch to dim 24 (the 'LLM' dim)
  - build a LLaVA-format prompt with <image> placeholder replaced by the 16
    projected tokens
  - report context budget at 2k / 32k / 128k LLM windows

No numpy, no torch. Linear layers and GELU implemented by hand.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def vec(n)`](main.py#L26)
- [`def mat(rows, cols)`](main.py#L30)
- [`def linear(W, b, x)`](main.py#L34)
- [`def gelu(x)`](main.py#L39)
- [`def gelu_vec(v)`](main.py#L43)
- [`class MLPProjector`](main.py#L47)
  - [`def forward(self, x)`](main.py#L54)
  - [`def num_params(self)`](main.py#L58)
- [`def fake_vit_output()`](main.py#L63)
- [`def build_llava_prompt(system, user, image_tokens)`](main.py#L67)
- [`def visualize_context(num_image_tokens, text_tokens)`](main.py#L82)
- [`def demo_projector()`](main.py#L94)
- [`def demo_prompt()`](main.py#L110)
- [`def demo_anyres()`](main.py#L128)
- [`def main()`](main.py#L145)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
