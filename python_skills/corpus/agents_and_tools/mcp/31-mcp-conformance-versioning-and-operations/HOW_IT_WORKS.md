# How it works: MCP Conformance Engineering: Versioning, Evidence, and Operations

## `code/main.py`

```text
Companion code for docs/en.md: test MCP wire contracts and release evidence.
Protocol contract: https://modelcontextprotocol.io/specification/2026-07-28/basic
Transport contract: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
Run `python3 main.py` for the finite demo or `python3 -m unittest discover -s tests`.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def canonical_json(value)`](code/main.py#L42)
- [`def digest(value)`](code/main.py#L46)
- [`def is_sha256_digest(value)`](code/main.py#L50)
- [`def attach_rollback_attestation(evidence, signer, signing_key)`](code/main.py#L56)
- [`def rollback_evidence_ready(rollback, trusted_signers)`](code/main.py#L76)
- [`def canonical_field_name(key)`](code/main.py#L112)
- [`def redact(value)`](code/main.py#L116)
- [`class ProtocolViolation`](code/main.py#L128)
- [`def routing_name(body)`](code/main.py#L134)
- [`def normalized_headers(headers)`](code/main.py#L145)
- [`def encode_header_value(value)`](code/main.py#L155)
- [`def decode_header_value(value)`](code/main.py#L164)
- [`def validate_request(headers, body, era)`](code/main.py#L182)
- [`def allowed_result_types(capabilities)`](code/main.py#L226)
- [`def validate_result(result, era, capabilities)`](code/main.py#L233)
- [`def validate_method_result(method, result)`](code/main.py#L257)
- [`def select_era(observation, policy, legacy_allowed, legacy_evidence)`](code/main.py#L326)
- [`def notification_http_outcome(request)`](code/main.py#L355)
- [`class Transcript`](code/main.py#L362)
- [`class CaseResult`](code/main.py#L374)
- [`def validate_response(request, status, response, era, capabilities)`](code/main.py#L381)
- [`def validate_protocol_error_evidence(case, expected_code)`](code/main.py#L416)
- [`def run_transcript(case)`](code/main.py#L431)
- [`def modern_request(method, request_id, name)`](code/main.py#L471)
- [`def transcript_suite()`](code/main.py#L494)
- [`def compare_sdk_view(raw_result, sdk_result, era, capabilities, method)`](code/main.py#L722)
- [`def inspect_proxy(exchange)`](code/main.py#L750)
- [`def evaluate_health(health)`](code/main.py#L782)
- [`class ReleaseGate`](code/main.py#L793)
  - [`def evaluate(self, transcripts, sdk_reports, proxy_reports, health, rollback)`](code/main.py#L797)
- [`def healthy_window()`](code/main.py#L873)
- [`def demo()`](code/main.py#L883)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
