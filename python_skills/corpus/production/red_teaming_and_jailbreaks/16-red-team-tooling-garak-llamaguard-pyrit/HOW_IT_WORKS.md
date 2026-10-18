# How it works: Red-Team Tooling — Garak, Llama Guard, PyRIT

## `main.py`

```text
Red-team tooling simulator — stdlib Python.

Three toy tools:
  guard_classify(text)  : Llama-Guard-style multi-category classifier.
  garak_scan(target)    : Garak-style probe-detector loop.
  pyrit_campaign(target): PyRIT-style multi-turn converter chain.

Not a real classifier. Demonstrates the architectural differences.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def guard_classify(text)`](main.py#L40): Toy multi-category classifier. Returns {category: score in [0,1]}.
- [`def is_unsafe(text, threshold)`](main.py#L51)
- [`class Probe`](main.py#L57)
- [`def garak_scan(target_fn)`](main.py#L74): Run every probe, score detection by target_fn.
- [`def paraphrase_converter(s)`](main.py#L86)
- [`def encode_converter(s)`](main.py#L90)
- [`def pyrit_campaign(target_fn, seed, max_turns)`](main.py#L94): Multi-turn campaign with escalating converters.
- [`def toy_target(prompt)`](main.py#L113): A target that refuses if its (simpler) safety classifier fires.
- [`def main()`](main.py#L123)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
