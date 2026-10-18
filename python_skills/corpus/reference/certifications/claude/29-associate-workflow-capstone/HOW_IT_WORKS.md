# How it works: Ship a Week of Work, Not a Perfect Prompt

## `code/main.py`

```text
Deterministic validator for the Associate workflow capstone.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def finding(code, message, location, severity)`](code/main.py#L42): Create one stable validation finding.
- [`def parse_iso_date(value)`](code/main.py#L52): Parse YYYY-MM-DD values without guessing other formats.
- [`def validate_sources(sources, as_of)`](code/main.py#L62): Validate the source registry and return a source lookup.
- [`def validate_claims(claims, source_lookup)`](code/main.py#L133): Check claim-source integrity and support strength.
- [`def validate_governance(governance)`](code/main.py#L173): Check approval, data-class, and human-authority boundaries.
- [`def validate_handoff(handoff)`](code/main.py#L211): Ensure a reviewer can decide and recover without rediscovery.
- [`def evaluate_packet(packet, as_of)`](code/main.py#L228): Evaluate a complete packet and return a release recommendation.
- [`def build_demo_packet()`](code/main.py#L268): Return a small passing packet for learning and local verification.
- [`def load_packet(path)`](code/main.py#L327): Load a user packet or return an isolated copy of the demo.
- [`def main()`](code/main.py#L335)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
