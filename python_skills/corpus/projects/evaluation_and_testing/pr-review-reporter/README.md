# PR Review Reporter

A local patch-review artifact that preserves Git line evidence and can enter CI as SARIF.

```
node cli.ts --diff samples/change.diff --output review.json --html review.html --sarif review.sarif
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`diff_parser.py`](diff_parser.py) | the code |
| [`samples/`](samples) | files the code uses |
| [`.gitignore`](.gitignore) | a file the code uses |
| [`package.json`](package.json) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
