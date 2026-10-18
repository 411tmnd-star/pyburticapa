# How it works: The Actor Model for Agents — Async Messages and Typed Runtimes

## `main.py`

```text
A stdlib actor runtime modeled on AutoGen v0.4 Core.

Actors have private state and an inbox. Messages are the only interaction.
Failures in one actor are caught by the runtime and routed to a dead-letter
queue; other actors keep running.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Message`](main.py#L16)
- [`class Actor`](main.py#L24)
  - [`def receive(self, message, runtime)`](main.py#L28)
- [`class Runtime`](main.py#L33)
  - [`def register(self, actor)`](main.py#L41)
  - [`def send(self, sender, recipient, topic, body)`](main.py#L44)
  - [`def run_until_idle(self)`](main.py#L53)
- [`class ReviewerAgent`](main.py#L76)
  - [`def receive(self, message, runtime)`](main.py#L81)
- [`class ChecklistAgent`](main.py#L101)
  - [`def receive(self, message, runtime)`](main.py#L108)
- [`def main()`](main.py#L123)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
