# Telling a Modern MCP Server From a Legacy One

Modern MCP has no opening handshake, so a client that must work with both current and older servers has to work out which kind it is talking to from how the very first exchange behaves, not from anything either side announces up front.

```
python code/main.py
```

Needs: standard library only  ·  Tests: `python -m unittest discover -s code/tests`

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/tests/`](code/tests) | the tests |
| [`outputs/`](outputs) | files the code reads or writes (kept in the course's layout) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
