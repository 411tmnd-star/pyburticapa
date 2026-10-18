# Shadow Traffic, Canary Rollout, and Progressive Deployment for LLMs

LLM rollouts combine the hardest parts of software deployment: no unit tests, diffuse failure modes, delayed signals. The sequence is (1) shadow mode — duplicate prod requests to candidate model, log, compare with zero user impact; catches obvious distribution issues but is not a quality guarantee; (2) canary rollout — progressive traffic shift 10% → 25% → 50% → 75% → 100% with gates at each step; track latency percentiles, cost/request, error/refusal rate, output length distribution, user-feedback rate; (3) A/B testing for distinct alternatives after stability confirmed. Non-determinism is irreducible — up to 15% accuracy variation across runs with identical inputs due to GPU FP non-associativity plus batch-size variance. Cost is a variable, not constant — a 20% better model can be 3x more expensive per call. Rollback speed is decisive: if rollback requires redeploy, you are too slow. Policy lives in config/flags; model lives in registry with pinned digests; rollback = flip policy + revert threshold + pin old model in seconds.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
