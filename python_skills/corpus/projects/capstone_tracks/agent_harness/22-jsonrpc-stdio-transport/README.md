# JSON-RPC 2.0 Over Newline-Delimited Stdio

The transport between a model client and a tool server is JSON-RPC over stdio. Hand-rolling it once teaches you what every framing layer is paying for.

```
python main.py
```

Needs: standard library only  ·  Tests: `python -m unittest discover -s tests`

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`tests/`](tests) | the tests |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
