# How it works: Vision-Language Models — The ViT-MLP-LLM Pattern

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Projector`](main.py#L6)
  - [`def forward(self, x)`](main.py#L15)
- [`class ToyVLM`](main.py#L19)
  - [`def forward(self, vision_tokens)`](main.py#L25)
- [`def cross_modal_error_rate(image_emb, text_emb, text_confidence, sim_threshold, conf_threshold)`](main.py#L31)
- [`def deepstack_features(per_layer_features)`](main.py#L40): Simulate DeepStack: per_layer_features is list of (N_patches, d) tensors
- [`def synthetic_vision_class_data(num_classes, num_patches, d_vit, per_class, seed)`](main.py#L48)
- [`def main()`](main.py#L62)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
