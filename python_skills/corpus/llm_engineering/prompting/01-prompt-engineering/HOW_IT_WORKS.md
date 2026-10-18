# How it works: Prompt Engineering: Techniques & Patterns

## `prompt_engineering.py`

Functions and classes, in file order (click to jump to the line):

- [`def build_prompt(pattern_name, variables, system_override)`](prompt_engineering.py#L170)
- [`def build_multi_turn(pattern_name, turns, system_override)`](prompt_engineering.py#L194)
- [`def format_openai_request(prompt)`](prompt_engineering.py#L211)
- [`def format_anthropic_request(prompt)`](prompt_engineering.py#L223)
- [`def format_google_request(prompt)`](prompt_engineering.py#L235)
- [`def simulate_llm_call(model_name, request)`](prompt_engineering.py#L255)
- [`def run_prompt_test(prompt, models)`](prompt_engineering.py#L295)
- [`def score_response(response_text, criteria)`](prompt_engineering.py#L321)
- [`def compare_models(test_results, criteria)`](prompt_engineering.py#L375)
- [`def run_test_suite()`](prompt_engineering.py#L480)
- [`def run_pattern_catalog_demo()`](prompt_engineering.py#L531)
- [`def run_single_prompt_demo()`](prompt_engineering.py#L543)

## Run and test

From this folder:

```
python prompt_engineering.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
