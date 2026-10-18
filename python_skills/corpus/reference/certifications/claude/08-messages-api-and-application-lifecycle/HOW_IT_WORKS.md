# How it works: The Messages API Is a State Machine

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/08-messages-api-and-application-lifecycle/docs/en.md
It models the Messages API lifecycle without network calls.
Protocol concepts follow the official Anthropic Messages API documentation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ProtocolError`](code/main.py#L18): Raised when a simulated provider response violates the protocol.
- [`class RunResult`](code/main.py#L23)
- [`class AccessNeeds`](code/main.py#L30): Workload facts used to choose a client and completion pattern.
- [`def choose_access_pattern(needs)`](code/main.py#L40): Choose SDK versus REST separately from sync, stream, or batch.
- [`class ScriptedTransport`](code/main.py#L57): A stateless transport that returns scripted API responses.
  - [`def create(self, messages)`](code/main.py#L64)
- [`class MessageLifecycle`](code/main.py#L71): Own conversation state and advance it until the model ends the turn.
  - [`def run(self, user_text)`](code/main.py#L86)
  - [`def _execute_tool(self, block)`](code/main.py#L113)
- [`def _validated_blocks(response)`](code/main.py#L146)
- [`def _text_from_blocks(blocks)`](code/main.py#L155)
- [`def collect_stream_text(events)`](code/main.py#L159): Collect only text deltas while checking that a stream terminates.
- [`def batch(items, size)`](code/main.py#L178)
- [`def stable_cache_key(model, stable_prefix)`](code/main.py#L184)
- [`def build_multimodal_request(prompt, image_bytes, reusable_file_id)`](code/main.py#L193): Build an offline request body with inline vision and a reusable file asset.
- [`def validate_multimodal_request(request, owned_file_ids)`](code/main.py#L227): Validate content blocks and reject file references outside an application allowlist.
- [`def asset_boundary_ledger(request)`](code/main.py#L272): Return auditable asset metadata without copying asset bytes or opaque file IDs.
- [`def multimodal_lab_fixture()`](code/main.py#L302): Create the deterministic access and asset fixture shipped with the lesson.
- [`def demo()`](code/main.py#L340)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
