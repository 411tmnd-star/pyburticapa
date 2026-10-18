# How it works: Computer Use: Claude, OpenAI CUA, Gemini

## `main.py`

```text
Computer-use simulation with per-step safety classifier and confirmation gate.

No real screen. We model the screen as labeled rectangles at pixel coordinates,
render what the agent would "see," classify each action before execution, and
require human-in-the-loop confirmation on sensitive actions.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Element`](main.py#L15)
- [`class Screen`](main.py#L26)
  - [`def element_at(self, x, y)`](main.py#L30)
- [`class Action`](main.py#L38)
- [`class SafetyVerdict`](main.py#L44)
- [`class SafetyClassifier`](main.py#L50)
  - [`def assess(self, action, screen)`](main.py#L59)
  - [`def _dom_has_injection(self, screen)`](main.py#L87)
- [`def run_agent(actions, screen, classifier, human_confirm)`](main.py#L92)
- [`def main()`](main.py#L115)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
