# How it works: Local Model Evaluation Harness

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate(records)`](main.py#L4)
- [`def correct(record, labels)`](main.py#L26)
- [`def accuracy(records, labels)`](main.py#L32)
- [`def calibration(records, labels, bins)`](main.py#L47)
- [`def percentile(values, p)`](main.py#L77)
- [`def scorecard(records, labels, source)`](main.py#L83)

## `cli.py`

```text
Score a reproducible recording and optionally compare it with a prior run.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def measure(payload)`](cli.py#L11)
- [`def compare(current, baseline)`](cli.py#L36)
- [`def main()`](cli.py#L49)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `record.py`

```text
Record actual latency and structured answers from a local OpenAI-compatible server.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class NoRedirect`](record.py#L11)
  - [`def redirect_request(self, req, fp, code, msg, headers, newurl)`](record.py#L12)
- [`def record(cases, endpoint, model, revision, hardware, request)`](record.py#L16)
- [`def main()`](record.py#L80)

## Run and test

From this folder:

```
python cli.py samples/input.json --output scorecard.json --html reliability.html
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
