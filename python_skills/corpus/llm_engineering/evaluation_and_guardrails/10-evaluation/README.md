# Evaluation & Testing LLM Applications

You would never deploy a web app without tests. You would never ship a database migration without a rollback plan. But right now, most teams ship LLM applications by reading 10 outputs and saying "yeah, looks good." That is not evaluation. That is hope. Hope is not an engineering practice. Every prompt change, every model swap, every temperature tweak changes your output distribution in ways you cannot predict by reading a handful of examples. Evaluation is the only thing standing between your application and silent degradation.

```
python eval_framework.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`eval_framework.py`](eval_framework.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
