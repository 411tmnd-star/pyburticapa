# How it works: Visual Evidence Library

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate_manifest(manifest, root)`](main.py#L14)
- [`def terms(text)`](main.py#L83)
- [`def search(assets, query, limit)`](main.py#L87)
- [`def validate_proposal(proposal, width, height)`](main.py#L114)
- [`def request_vision(path, endpoint, model, width, height, api_key)`](main.py#L159)
- [`def image_data(asset)`](main.py#L211)
- [`def export_library(assets, query, out)`](main.py#L269)
- [`def main()`](main.py#L302)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python main.py --manifest ./fixtures/manifest.json --query "return dry seeds" --out ./visual-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
