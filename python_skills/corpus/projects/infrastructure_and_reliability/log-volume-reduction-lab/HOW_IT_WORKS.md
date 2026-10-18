# How it works: Log Volume Reduction Lab

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def coverage(source, compact, rare_max)`](main.py#L7)
- [`def main()`](main.py#L37)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
rustc --edition 2021 main.rs -o /tmp/log-context
/tmp/log-context fixtures/burst.log 8 rarity /tmp/context.jsonl
python main.py fixtures/burst.log /tmp/context.jsonl --out /tmp/coverage.json
python demo.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
