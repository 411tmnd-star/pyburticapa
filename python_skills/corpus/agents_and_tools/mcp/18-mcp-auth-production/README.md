# MCP Auth in Production: Issuer-Bound Enrollment and Tokens

Lesson 16 built the OAuth 2.1 state machine. This lesson hardens its production boundaries for MCP 2026-07-28: Client ID Metadata Documents first, deprecated dynamic registration only for compatibility, authorization-response issuer validation, issuer-keyed client credentials, JWKS refresh, and audience-pinned tokens on every stateless request.

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
