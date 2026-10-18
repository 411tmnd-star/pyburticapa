# How it works: Prompt Templates and Argument Completion

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/13-prompts-and-completion/docs/en.md
A prompts server with pagination, argument templates, and completion.
Sources: MCP 2026-07-28 Prompts and Completion pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L26)
- [`def make_result(request_id, result_type)`](code/main.py#L37)
- [`def make_error(request_id, code, message, data)`](code/main.py#L41)
- [`class Prompt`](code/main.py#L49)
  - [`def definition(self)`](code/main.py#L56)
  - [`def required(self)`](code/main.py#L64)
- [`def render_code_review(args)`](code/main.py#L68)
- [`def render_bug_triage(args)`](code/main.py#L92)
- [`def handle_prompts_list(request_id, params)`](code/main.py#L140)
- [`def handle_prompts_get(request_id, params)`](code/main.py#L157)
- [`def _cap(matches)`](code/main.py#L175)
- [`def _complete_prompt_argument(argument_name, value, context_arguments)`](code/main.py#L180)
- [`def _complete_resource_path(value)`](code/main.py#L192)
- [`def handle_completion_complete(request_id, params)`](code/main.py#L197)
- [`class PromptServer`](code/main.py#L216)
  - [`def _server_meta(self)`](code/main.py#L220)
  - [`def handle(self, message)`](code/main.py#L223)
- [`class Client`](code/main.py#L243)
  - [`def send(self, method, params)`](code/main.py#L249)
  - [`def list_prompts(self, cursor)`](code/main.py#L256)
  - [`def get_prompt(self, name, arguments)`](code/main.py#L260)
  - [`def complete(self, ref, argument, context)`](code/main.py#L263)
- [`def run_scenario()`](code/main.py#L270)
- [`def transcript()`](code/main.py#L290)
- [`def demo()`](code/main.py#L294)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
