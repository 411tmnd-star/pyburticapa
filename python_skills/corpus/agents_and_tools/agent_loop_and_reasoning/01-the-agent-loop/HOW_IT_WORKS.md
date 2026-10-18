# How it works: The Agent Loop: Observe, Think, Act

## `main.py`

```text
Toy ReAct agent loop — stdlib only.

Implements the five ingredients from docs/en.md:
  1. message buffer
  2. tool registry
  3. stop condition
  4. turn budget
  5. observation formatter

ToyLLM is a scripted policy so the loop runs offline and deterministic. Swap
ToyLLM for a real provider client and the control flow is identical.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ToolCall`](main.py#L21)
- [`class Turn`](main.py#L27)
- [`class ToolRegistry`](main.py#L34)
  - [`def register(self, name, fn)`](main.py#L38)
  - [`def names(self)`](main.py#L41)
  - [`def dispatch(self, call)`](main.py#L44)
- [`def calculator(expr)`](main.py#L56)
- [`class KVStore`](main.py#L66)
  - [`def get(self, key)`](main.py#L70)
  - [`def set(self, key, value)`](main.py#L73)
- [`class ToyLLM`](main.py#L78): Scripted ReAct policy. Returns one assistant turn per call.
  - [`def respond(self, history)`](main.py#L89)
- [`class AgentLoop`](main.py#L98)
  - [`def run(self, user_message)`](main.py#L104)
- [`def pretty_trace(history)`](main.py#L124)
- [`def build_demo_agent()`](main.py#L139)
- [`def main()`](main.py#L162)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
