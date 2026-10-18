# Log Volume Reduction Lab

Shrink a noisy log stream while keeping evidence of rare failures.

```
rustc --edition 2021 main.rs -o /tmp/log-context
/tmp/log-context fixtures/burst.log 8 rarity /tmp/context.jsonl
python main.py fixtures/burst.log /tmp/context.jsonl --out /tmp/coverage.json
python demo.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`demo.py`](demo.py) | run it (command above) |
| [`main.rs`](main.rs) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
