# How it works: MCP Registry Supply Chain: Admission, Drift, and Rollback

## `code/main.py`

```text
Companion code for docs/en.md: admit, pin, monitor, and roll back MCP servers.
Protocol contract: https://modelcontextprotocol.io/specification/2026-07-28/server/discover
Registry contract: https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/official-registry-requirements.md
Run `python3 main.py` for the finite demo or `python3 -m unittest discover -s tests`.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def canonical_json(value)`](code/main.py#L24)
- [`def digest(value)`](code/main.py#L28)
- [`def namespace_for_domain(domain)`](code/main.py#L32)
- [`def namespace_matches(server_name, verified_namespace)`](code/main.py#L39)
- [`def normalized_tools(tools)`](code/main.py#L44)
- [`def registry_status(api_meta)`](code/main.py#L48)
- [`def is_sha256_digest(value)`](code/main.py#L53)
- [`def normalize_https_remote_url(value)`](code/main.py#L59)
- [`def is_valid_https_remote_url(value)`](code/main.py#L101)
- [`def reported_server_info(live)`](code/main.py#L105)
- [`class Decision`](code/main.py#L114)
- [`class AdmissionLedger`](code/main.py#L120)
  - [`def append(self, event, server_name, version, outcome, reasons, evidence)`](code/main.py#L127)
  - [`def verify(self)`](code/main.py#L151)
- [`class RegistryAdmissionController`](code/main.py#L165)
  - [`def _record_errors(self, record)`](code/main.py#L176)
  - [`def _source_errors(self, record, provenance_evidence)`](code/main.py#L231)
  - [`def _live_errors(self, live)`](code/main.py#L296)
  - [`def admit(self, record, api_meta, verified_namespace, provenance_evidence, live, registry_source)`](code/main.py#L330)
  - [`def check_live(self, server_name, version, live)`](code/main.py#L387)
  - [`def observe_registry_status(self, server_name, version, status)`](code/main.py#L414)
  - [`def rollback(self, server_name, target_version, reason)`](code/main.py#L433)
- [`def sample_record(version)`](code/main.py#L452)
- [`def sample_live(version, extra_tool)`](code/main.py#L470)
- [`def evidence_for(version)`](code/main.py#L501)
- [`def demo()`](code/main.py#L513)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
