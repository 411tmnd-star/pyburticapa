# How it works: Hypothesis Generator

## `code/main.py`

```text
Hypothesis generator: temperature ramped sampling, novelty filter, ranked queue.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 Track A lessons 20-29 (agent harness primitives)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Hypothesis`](code/main.py#L33)
  - [`def to_dict(self)`](code/main.py#L44)
- [`class ParserError`](code/main.py#L58): Raised when a sampler response does not match the hypothesis tag schema.
- [`def _tokenise(text)`](code/main.py#L62)
- [`def hashed_embed(text, dim)`](code/main.py#L66): Hashed bag of tokens embedding, L2 normalised. Deterministic stdlib only.
- [`def cosine_distance(a, b)`](code/main.py#L80)
- [`def parse_response(raw)`](code/main.py#L86)
- [`def temperature_bucket(temperature)`](code/main.py#L110): Map a continuous temperature to a discrete bucket index.
- [`class MockLLM`](code/main.py#L121): Scripted sampler keyed on (prompt_signature, temperature_bucket).
  - [`def prompt_signature(prompt)`](code/main.py#L133)
  - [`def sample(self, prompt, temperature, seed)`](code/main.py#L136)
- [`class GeneratorConfig`](code/main.py#L145)
  - [`def schedule(self)`](code/main.py#L156)
- [`class GenerationLog`](code/main.py#L166)
  - [`def to_dict(self)`](code/main.py#L174)
- [`class HypothesisGenerator`](code/main.py#L185): Drives the mock LLM over a temperature schedule and ranks the survivors.
  - [`def _specificity_score(self, h)`](code/main.py#L198)
  - [`def _testability_score(self, h)`](code/main.py#L202)
  - [`def _score(self, h)`](code/main.py#L209)
  - [`def _novelty(self, candidate, survivors)`](code/main.py#L216)
  - [`def run(self, seed_prompt)`](code/main.py#L221)
- [`def build_demo_scripts()`](code/main.py#L258): Scripted responses for the demo seed prompt across temperature buckets.
- [`def _demo()`](code/main.py#L298)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
