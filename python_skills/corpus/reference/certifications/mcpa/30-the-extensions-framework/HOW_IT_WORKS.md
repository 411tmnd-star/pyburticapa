# How it works: The Extensions Framework

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/30-the-extensions-framework/docs/en.md
Negotiating optional MCP extensions per request, falling back to core behavior, and rejecting a
call that needs an extension neither side mutually activated.
Sources: SEP-2133; MCP extensions overview (extension negotiation).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L30)
- [`def make_result(request_id, result_type)`](code/main.py#L41)
- [`def make_error(request_id, code, message, data)`](code/main.py#L45)
- [`def is_well_formed_extension_id(identifier)`](code/main.py#L52)
- [`def negotiate_extensions(client_extensions, server_extensions)`](code/main.py#L59)
- [`def _summarize_incidents(arguments, active)`](code/main.py#L67)
- [`def _export_dataset(arguments, active)`](code/main.py#L75)
- [`class Tool`](code/main.py#L81)
  - [`def definition(self)`](code/main.py#L88)
- [`class Server`](code/main.py#L93)
  - [`def add(self, tool)`](code/main.py#L98)
  - [`def _server_meta(self)`](code/main.py#L101)
  - [`def handle(self, message)`](code/main.py#L104)
  - [`def _discover(self, request_id)`](code/main.py#L126)
  - [`def _list_tools(self, request_id)`](code/main.py#L136)
  - [`def _call(self, request_id, params, meta)`](code/main.py#L140)
- [`def build_server()`](code/main.py#L165)
- [`class Client`](code/main.py#L184)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L190)
- [`def run_scenario()`](code/main.py#L199)
- [`def transcript()`](code/main.py#L231)
- [`def demo()`](code/main.py#L235)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
