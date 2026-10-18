# How it works: MCP Model Input: Sampling Migration and Stateless MRTR

## `code/main.py`

```text
Phase 13 Lesson 11: model input through stateless MCP MRTR.

Lesson: ../docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
This example uses only Python's standard library.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class McpError`](code/main.py#L55)
- [`def request_meta()`](code/main.py#L61)
- [`def _server_meta()`](code/main.py#L70)
- [`def complete()`](code/main.py#L74)
- [`def validate_request_meta(params)`](code/main.py#L78)
- [`def server_discover(params)`](code/main.py#L97)
- [`def tools_list(params)`](code/main.py#L107)
- [`def _b64(data)`](code/main.py#L116)
- [`def _unb64(value)`](code/main.py#L120)
- [`def _arguments_digest(arguments)`](code/main.py#L124)
- [`def seal_request_state(payload)`](code/main.py#L129)
- [`def verify_request_state(token)`](code/main.py#L135)
- [`def _sampling_request(prompt)`](code/main.py#L166)
- [`def _input_required(key, prompt, state)`](code/main.py#L183)
- [`def _sampling_text(input_responses, key)`](code/main.py#L198)
- [`def tools_call(params)`](code/main.py#L213)
- [`def dispatch(request)`](code/main.py#L284)
- [`def fake_host_model(input_request)`](code/main.py#L316)
- [`def run_mrtr()`](code/main.py#L333)
- [`def main()`](code/main.py#L369)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
