# How it works: Constitutional AI and Rule Overrides

## `main.py`

```text
Four-tier priority resolver — stdlib Python.

Models Anthropic's January 2026 Claude Constitution tier hierarchy:
  1. safety and supporting human oversight
  2. ethics
  3. guidelines
  4. helpfulness

Hardcoded prohibitions refuse regardless of tier scoring; soft-coded
defaults resolve by tier weight.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TierScore`](main.py#L35)
- [`def hardcoded_block(action)`](main.py#L42)
- [`def resolve(action, score)`](main.py#L50)
- [`def main()`](main.py#L92)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
