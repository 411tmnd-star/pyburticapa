# How it works: Semantic Notes Search

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def normalize(text, aliases)`](main.py#L7)
- [`def build_index(documents, aliases)`](main.py#L20)
- [`def search(index, query, k)`](main.py#L40)
- [`def evaluate(index, cases, k)`](main.py#L68)

## `cli.py`

```text
Search a caller-owned markdown folder; no service or model required.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def run(folder, query, aliases, k)`](cli.py#L8)
- [`def main()`](cli.py#L28)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
