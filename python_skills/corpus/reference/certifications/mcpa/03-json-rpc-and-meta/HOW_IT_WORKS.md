# How it works: The JSON-RPC Envelope

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/03-json-rpc-and-meta/docs/en.md
Classify JSON-RPC message shapes and validate _meta keys.
Sources: JSON-RPC 2.0; MCP 2026-07-28 basic protocol and _meta rules; SEP-414.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L29)
- [`def make_result(request_id, result_type)`](code/main.py#L40)
- [`def make_error(request_id, code, message, data)`](code/main.py#L44)
- [`def make_notification(method, params)`](code/main.py#L51)
- [`def is_valid_request_id(value)`](code/main.py#L58)
- [`def classify_message(message)`](code/main.py#L62)
- [`def validate_notification_shape(message)`](code/main.py#L78)
- [`def validate_result_shape(message)`](code/main.py#L87)
- [`def validate_error_shape(message)`](code/main.py#L100)
- [`def meta_key_status(key)`](code/main.py#L113)
- [`def check_required_request_meta(message)`](code/main.py#L132)
- [`def handle_request(message)`](code/main.py#L146)
- [`def run_scenario()`](code/main.py#L164)
- [`def transcript()`](code/main.py#L222)
- [`def demo()`](code/main.py#L226)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
