# Retry Storm Lab

Watch many reasonable retries combine into an overloaded service.

```
go run . --clients 20 --budget 60 --jitter=false --out /tmp/synchronized.json
go run . --clients 20 --budget 60 --jitter=true --seed 7 --out /tmp/jittered.json
go run . --clients 20 --budget 12 --seed 7 --out /tmp/retry.json
node --experimental-strip-types cli.ts /tmp/retry.json /tmp/amplification.json
go run . --local-http --clients 20 --budget 12 --out /tmp/retry-wire.json
node --experimental-strip-types cli.ts /tmp/retry-wire.json
python demo.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`demo.py`](demo.py) | read and run the code |
| [`cli.ts`](cli.ts) | a file the code uses |
| [`go.mod`](go.mod) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
