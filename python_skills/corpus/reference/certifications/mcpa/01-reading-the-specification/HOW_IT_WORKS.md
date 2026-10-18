# How it works: Reading the MCP Specification

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/01-reading-the-specification/docs/en.md
A spec navigator over keyword strength, feature lifecycle, and changelog data.
Sources: MCP 2026-07-28 changelog and deprecated-features registry; RFC 2119; RFC 8174;
SEP-2596.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L27)
- [`def make_result(request_id, result_type)`](code/main.py#L38)
- [`def make_error(request_id, code, message, data)`](code/main.py#L42)
- [`def revision_state(revision)`](code/main.py#L58)
- [`def classify_requirement(text)`](code/main.py#L81)
- [`class Feature`](code/main.py#L89)
- [`def find_feature(name)`](code/main.py#L123)
- [`def feature_state(name, revision)`](code/main.py#L127)
- [`def migration_path(name)`](code/main.py#L138)
- [`def add_months(date_str, months)`](code/main.py#L143)
- [`def earliest_removal(name)`](code/main.py#L151)
- [`class ChangelogEntry`](code/main.py#L164)
- [`def changelog_lookup(sep)`](code/main.py#L195)
- [`class SpecServer`](code/main.py#L199)
  - [`def _server_meta(self)`](code/main.py#L203)
  - [`def handle(self, message)`](code/main.py#L206)
- [`class Client`](code/main.py#L233)
  - [`def send(self, method, params, version)`](code/main.py#L239)
  - [`def discover(self)`](code/main.py#L246)
- [`def run_scenario()`](code/main.py#L250)
- [`def transcript()`](code/main.py#L257)
- [`def demo()`](code/main.py#L271)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
