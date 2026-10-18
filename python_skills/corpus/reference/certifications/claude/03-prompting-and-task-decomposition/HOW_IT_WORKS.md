# How it works: Turn a Request Into a Testable Contract

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/03-prompting-and-task-decomposition/docs/en.md
It validates a prompt contract, stage gates, and adversarial case coverage.
The runner evaluates structure and evidence boundaries without a provider call.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_packet(packet)`](code/main.py#L18)
- [`def score_packet(packet)`](code/main.py#L58)
- [`def load_packet(path)`](code/main.py#L69)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
