# How it works: Paper Writer

## `code/main.py`

```text
LaTeX paper skeleton generator with figure injection and a mocked prose generator.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 lessons 50-53 (earlier auto-research stages)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class PaperValidationError`](code/main.py#L19): Raised when the paper fails a structural gate before render.
- [`class BibEntry`](code/main.py#L24)
  - [`def to_bibtex(self)`](code/main.py#L29)
- [`class Figure`](code/main.py#L39)
  - [`def label(self)`](code/main.py#L46)
- [`class Section`](code/main.py#L51)
  - [`def label(self)`](code/main.py#L59)
- [`class Paper`](code/main.py#L64)
- [`def _validate(paper)`](code/main.py#L76)
- [`def _escape_latex(text)`](code/main.py#L106)
- [`def render_latex(paper)`](code/main.py#L125): Render a Paper to a full LaTeX document string.
- [`def render_bibtex(paper)`](code/main.py#L166)
- [`class MockProseGenerator`](code/main.py#L170): Deterministic prose generator. Substitutes for a model in tests and demos.
- [`def read_experiment_manifest(manifests, paper_dir)`](code/main.py#L188): Convert experiment output manifests into Figure records.
- [`class PaperWriter`](code/main.py#L217)
  - [`def fill_prose(self, paper)`](code/main.py#L220)
  - [`def write(self, paper, out_dir)`](code/main.py#L226): Validate, fill prose, render, and write three files. Returns the manifest dict.
- [`def demo(out_dir)`](code/main.py#L263): Self-contained demo. Builds a small paper from two mocked experiments.

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
