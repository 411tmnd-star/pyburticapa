# How it works: Kubernetes Event Storyboard

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
go run . --input fixtures/rollout.json --out /tmp/context-pack.json
node --experimental-strip-types cli.ts /tmp/context-pack.json /tmp/timeline.html
python demo.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
