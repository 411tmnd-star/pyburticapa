# How it works: Open-Vocabulary Vision — CLIP

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class TwoTower`](main.py#L6)
  - [`def encode_image(self, x)`](main.py#L13)
  - [`def encode_text(self, x)`](main.py#L16)
  - [`def forward(self, img_feats, txt_feats)`](main.py#L19)
- [`def clip_loss(i, t, logit_scale)`](main.py#L25)
- [`def zero_shot_classify(model, image_feats, class_text_feats, class_names)`](main.py#L35)
- [`def main()`](main.py#L43)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
