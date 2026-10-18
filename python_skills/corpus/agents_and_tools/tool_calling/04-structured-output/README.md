# Structured Output — JSON Schema, Pydantic, Zod, Constrained Decoding

"Ask the model nicely to return JSON" fails 5 to 15 percent of the time, even on frontier models. Structured outputs close that gap with constrained decoding: the model is literally prevented from emitting a token that would violate the schema. OpenAI's strict mode, Anthropic's schema-typed tool use, Gemini's `responseSchema`, Pydantic AI's `output_type`, and Zod's `.parse` are five surface forms of the same idea. This lesson builds the schema validator and the strict-mode contract learners will use for every production extraction pipeline.

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
