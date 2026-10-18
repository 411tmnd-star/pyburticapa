# How it works: The Tool Interface — Why Agents Need Structured I/O

## `main.py`

```text
Phase 13 Lesson 01 - the tool interface, four-step loop, no LLM.

Implements the describe -> decide -> execute -> observe cycle used by every
2026 tool-calling stack (OpenAI, Anthropic, Gemini, MCP, A2A). The "decide"
step is faked with a keyword router so the loop runs offline; replace it with
any real provider in Lesson 02.

The harness:
  - registers three tools (add, get_time, get_weather)
  - validates tool-call arguments against a minimal JSON Schema subset
  - prints each step so you can read the choreography
  - bounds iteration at MAX_TURNS to prevent runaway loops

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Tool`](main.py#L32)
- [`def tool_add(args)`](main.py#L40)
- [`def tool_get_time(args)`](main.py#L44)
- [`def tool_get_weather(args)`](main.py#L50)
- [`def validate(schema, value)`](main.py#L109)
- [`def fake_decide(user_msg, history)`](main.py#L131): Stand-in for the model. Routes by keyword so the loop runs offline.
- [`def run_loop(user_msg)`](main.py#L178)
- [`def describe_registry()`](main.py#L216)
- [`def main()`](main.py#L225)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
