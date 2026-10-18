# How it works: Defend One Architecture Across Six Contexts

## `code/main.py`

```text
Validate an original CCAR-F architecture scenario packet.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def issue(domain, code, message, location)`](code/main.py#L49): Return one stable architecture finding.
- [`def find_cycle(tasks)`](code/main.py#L54): Detect dependency cycles after unknown prerequisite checks.
- [`def validate_scenario(value)`](code/main.py#L76)
- [`def validate_tools(value)`](code/main.py#L89)
- [`def validate_orchestration(value, tool_names)`](code/main.py#L142)
- [`def validate_claude_code(value)`](code/main.py#L183)
- [`def validate_structured_output(value)`](code/main.py#L198)
- [`def validate_reliability(value)`](code/main.py#L214)
- [`def validate_handoff(value)`](code/main.py#L231)
- [`def evaluate_packet(packet)`](code/main.py#L241): Validate all five architecture domains and the implementation handoff.
- [`def build_demo_packet()`](code/main.py#L268): Return an original passing support-resolution architecture packet.
- [`def load_packet(path)`](code/main.py#L358)
- [`def main()`](code/main.py#L365)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
