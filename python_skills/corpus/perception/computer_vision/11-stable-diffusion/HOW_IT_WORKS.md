# How it works: Stable Diffusion — Architecture & Fine-Tuning

## `main.py`

```text
Stable Diffusion usage examples. Requires `diffusers`, `transformers`, and a GPU
for any real inference. Running this on CPU without the model is a no-op summary.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def has_diffusers()`](main.py#L10)
- [`def describe_pipeline()`](main.py#L18)
- [`def cfg_sweep_demo()`](main.py#L27)
- [`def text_to_image_stub(prompt, seed)`](main.py#L41)
- [`def lora_training_sketch()`](main.py#L62)
- [`def main()`](main.py#L80)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
