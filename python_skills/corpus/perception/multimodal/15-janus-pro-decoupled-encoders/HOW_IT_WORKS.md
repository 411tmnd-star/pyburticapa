# How it works: Janus-Pro: Decoupled Encoders for Unified Multimodal Models

## `main.py`

```text
Janus-Pro decoupled-encoder routing — stdlib.

Two mock encoders (semantic SigLIP-like, reconstruction VQ-like), one shared
transformer body, a router that picks based on task tag. Traces three example
prompts through the pipeline.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SiglipStub`](main.py#L17)
  - [`def encode(self, image_seed)`](main.py#L20)
- [`class VQStub`](main.py#L26)
  - [`def encode(self, image_seed)`](main.py#L30)
  - [`def decode(self, tokens)`](main.py#L34)
- [`class SharedBody`](main.py#L39)
  - [`def process(self, input_stream, kind)`](main.py#L42)
- [`def route(prompt)`](main.py#L50): Classify task as `understand` or `generate`.
- [`def run_pipeline(prompt, image_seed)`](main.py#L64)
- [`def demo_routing()`](main.py#L94)
- [`def data_scale_table()`](main.py#L110)
- [`def main()`](main.py#L126)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
