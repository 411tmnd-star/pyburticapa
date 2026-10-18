# How it works: Multi Round-Trip Requests and Elicitation

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/14-multi-round-trip-requests-and-elicitation/docs/en.md
A deploy tool gated by MRTR elicitation and HMAC-protected requestState.
Sources: SEP-2322 (multi round-trip requests); MCP 2026-07-28 Elicitation page.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L28)
- [`def make_result(request_id, result_type)`](code/main.py#L39)
- [`def make_error(request_id, code, message, data)`](code/main.py#L43)
- [`class Clock`](code/main.py#L71)
  - [`def advance(self, ticks)`](code/main.py#L74)
- [`def digest_request(name, arguments)`](code/main.py#L78)
- [`def mint_request_state(secret, principal, name, arguments, issued_at, nonce, ttl_ticks)`](code/main.py#L83)
- [`class StateVerdict`](code/main.py#L97)
- [`def verify_request_state(secret, state, principal, name, arguments, now, consumed)`](code/main.py#L103)
- [`class DeployServer`](code/main.py#L127)
  - [`def _server_meta(self)`](code/main.py#L136)
  - [`def _mint_nonce(self)`](code/main.py#L139)
  - [`def handle(self, message, principal)`](code/main.py#L143)
  - [`def _call(self, request_id, params, client_capabilities, principal)`](code/main.py#L154)
  - [`def _ask_for_confirmation(self, request_id, name, arguments, client_capabilities, principal)`](code/main.py#L172)
  - [`def _resume(self, request_id, name, arguments, params, principal)`](code/main.py#L211)
- [`class Client`](code/main.py#L248)
  - [`def call(self, arguments, input_responses, request_state, violation)`](code/main.py#L256)
- [`def run_scenario()`](code/main.py#L271)
- [`def transcript()`](code/main.py#L354)
- [`def demo()`](code/main.py#L360)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
