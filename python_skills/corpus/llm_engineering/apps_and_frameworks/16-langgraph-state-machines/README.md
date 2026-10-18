# Agent State Machines — Graphs, Nodes, Checkpoints

A ReAct loop written by hand is a `while True`. The same loop written as an explicit graph is something you can checkpoint, interrupt, branch, and time-travel through. The agent hasn't changed. The harness around it has.

```
python main.py
```

Needs: langchain_anthropic, langchain_core, langgraph

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
