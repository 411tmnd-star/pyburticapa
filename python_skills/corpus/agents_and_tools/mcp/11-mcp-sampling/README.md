# MCP Model Input: Sampling Migration and Stateless MRTR

MCP 2026-07-28 deprecates Sampling for new designs and removes the server-to-client request channel. If an existing workflow still needs the client's model, the server returns an `input_required` result and the client retries the original request with the model output. The reasoning loop becomes explicit, bounded, and stateless at the protocol layer.

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
