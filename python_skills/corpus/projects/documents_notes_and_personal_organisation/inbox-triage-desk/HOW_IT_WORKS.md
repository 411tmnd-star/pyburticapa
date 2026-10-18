# How it works: Inbox Triage Desk

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def parse_message(raw)`](main.py#L21)
- [`def group_threads(messages)`](main.py#L56)
- [`def triage(message, rules)`](main.py#L86)
- [`def build_draft(message, decision)`](main.py#L138)
- [`def _validate_endpoint(endpoint)`](main.py#L181)
- [`class _NoRedirect`](main.py#L229)
  - [`def redirect_request(self, request, fp, code, message, headers, new_url)`](main.py#L230)
- [`def provider_proposal(message, endpoint, model, api_key)`](main.py#L234)
- [`def export_desk(messages, out, rules)`](main.py#L275)
- [`def main()`](main.py#L315)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python main.py --input ./fixtures --out ./inbox-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
