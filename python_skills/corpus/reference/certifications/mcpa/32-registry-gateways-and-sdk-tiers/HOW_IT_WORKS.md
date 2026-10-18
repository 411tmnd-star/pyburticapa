# How it works: Finding, Routing To, and Trusting a Server

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/32-registry-gateways-and-sdk-tiers/docs/en.md
A registry admission check, an SDK tier lookup, and a gateway that routes on headers and
partitions its cache by caller.
Sources: MCP Registry documentation; SEP-1730 (SDK tiers); SEP-2243.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L30)
- [`def make_result(request_id, result_type)`](code/main.py#L41)
- [`def make_error(request_id, code, message, data)`](code/main.py#L45)
- [`def schema_version_from_url(schema_url)`](code/main.py#L55)
- [`def looks_like_version_range(version)`](code/main.py#L63)
- [`class ServerPackage`](code/main.py#L74)
- [`class ServerRemote`](code/main.py#L82)
- [`class ServerEntry`](code/main.py#L88)
- [`class AdmissionResult`](code/main.py#L98)
- [`def split_namespace(name)`](code/main.py#L103)
- [`def admit_to_registry(entry, publisher_id, verified_owners)`](code/main.py#L108)
- [`def resolve_install_target(entry, prefer)`](code/main.py#L121)
- [`def tier_requirement(tier, field_name)`](code/main.py#L141)
- [`def relegate(tier, conformance_pct, weeks_failing)`](code/main.py#L145)
- [`class Tool`](code/main.py#L156)
- [`class Resource`](code/main.py#L164)
- [`class Backend`](code/main.py#L172)
  - [`def _server_meta(self)`](code/main.py#L179)
  - [`def handle(self, message)`](code/main.py#L182)
  - [`def _call_tool(self, request_id, params)`](code/main.py#L195)
  - [`def _read_resource(self, request_id, params)`](code/main.py#L205)
- [`def principal_ref(token)`](code/main.py#L221)
- [`class Gateway`](code/main.py#L228)
  - [`def _next_id(self)`](code/main.py#L235)
  - [`def _headers_for(self, method, name)`](code/main.py#L239)
  - [`def _validate_headers(self, headers, message)`](code/main.py#L242)
  - [`def _cache_key(self, scope, token, name)`](code/main.py#L257)
  - [`def call_tool(self, token, name, arguments)`](code/main.py#L262)
  - [`def call_tool_with_mismatched_method_header(self, token, name, arguments, reason)`](code/main.py#L280)
  - [`def _serve_from_cache(self, uri, scope, cached)`](code/main.py#L290)
  - [`def _read_through(self, token, uri)`](code/main.py#L299)
  - [`def read_resource(self, token, uri)`](code/main.py#L323)
- [`def build_accounts_backend()`](code/main.py#L333)
- [`def build_status_backend()`](code/main.py#L350)
- [`def build_gateway()`](code/main.py#L361)
- [`def run_scenario()`](code/main.py#L372)
- [`def transcript()`](code/main.py#L387)
- [`def demo()`](code/main.py#L395)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
