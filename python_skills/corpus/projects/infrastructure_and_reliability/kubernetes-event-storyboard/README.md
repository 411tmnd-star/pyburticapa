# Kubernetes Event Storyboard

Turn workload events into a timeline with the exact objects behind each clue.

```
go run . --input fixtures/rollout.json --out /tmp/context-pack.json
node --experimental-strip-types cli.ts /tmp/context-pack.json /tmp/timeline.html
python demo.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`demo.py`](demo.py) | read and run the code |
| [`fixtures/`](fixtures) | files the code uses |
| [`cli.ts`](cli.ts) | a file the code uses |
| [`go.mod`](go.mod) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
