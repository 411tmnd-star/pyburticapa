# How it works: Browser Agent

## `pixels.py`

```text
Browser Agent screenshot verifier using the Python standard library.
See ../stages/03-visual-proof/docs/en.md for the RGB PNG subset.
Unfilter Chromium screenshot pixels and count green success pixels.
This is visual state evidence, not OCR or a general vision model.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def inspect(data)`](pixels.py#L8)

## Run and test

From this folder:

```
node cli.ts --task samples/contact.json --output browser-run.json
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
