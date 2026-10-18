# How it works: Production Agent Runtimes — Fast Instantiation and Typed Workflows

## `main.py`

```text
Side-by-side toys: Agno-shaped (stateless FastAPI) vs Mastra-shaped
(primitive-rich). Stdlib only; meant to show the structural difference.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class AgnoAgent`](main.py#L13)
  - [`def run(self, prompt)`](main.py#L17)
- [`class AgnoSession`](main.py#L21)
  - [`def append(self, session_id, turn)`](main.py#L25)
  - [`def history(self, session_id)`](main.py#L28)
- [`def agno_request_handler(session, agent, session_id, prompt)`](main.py#L32)
- [`class MastraTool`](main.py#L45)
- [`class MastraAgent`](main.py#L52)
  - [`def run(self, prompt, tool_calls)`](main.py#L57)
- [`class MastraWorkflow`](main.py#L72)
  - [`def run(self, payload)`](main.py#L75)
- [`def _agno_agent_fn(prompt)`](main.py#L84)
- [`def _mastra_tool_fn(query)`](main.py#L88)
- [`def main()`](main.py#L92)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
