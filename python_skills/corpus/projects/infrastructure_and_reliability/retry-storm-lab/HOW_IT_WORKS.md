# How it works: Retry Storm Lab

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
go run . --clients 20 --budget 60 --jitter=false --out /tmp/synchronized.json
go run . --clients 20 --budget 60 --jitter=true --seed 7 --out /tmp/jittered.json
go run . --clients 20 --budget 12 --seed 7 --out /tmp/retry.json
node --experimental-strip-types cli.ts /tmp/retry.json /tmp/amplification.json
go run . --local-http --clients 20 --budget 12 --out /tmp/retry-wire.json
node --experimental-strip-types cli.ts /tmp/retry-wire.json
python demo.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
