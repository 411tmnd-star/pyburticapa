# MCP Tasks Extension: Durable Work on a Stateless Core

Stateless MCP does not mean every operation must finish in one request. The official Tasks extension gives long-running work an explicit durable handle. A server can return that handle from `tools/call`, any instance can answer `tasks/get`, and client input arrives through `tasks/update` without reviving protocol sessions.

```
python code/main.py
```

Needs: standard library only  ·  Tests: `python -m unittest discover -s code/tests`

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/tests/`](code/tests) | the tests |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
