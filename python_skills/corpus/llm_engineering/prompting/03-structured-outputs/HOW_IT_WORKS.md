# How it works: Structured Outputs: JSON, Schema Validation, Constrained Decoding

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate_schema(data, schema)`](main.py#L4)
- [`def _validate(data, schema, path, errors)`](main.py#L10)
- [`class SchemaField`](main.py#L67)
- [`def python_type_to_schema(field)`](main.py#L77)
- [`def model_to_schema(name, fields)`](main.py#L105)
- [`def next_valid_tokens(partial_json, schema)`](main.py#L121)
- [`def demonstrate_constrained_decoding()`](main.py#L157)
- [`def simulate_llm_extraction(text, schema, attempt)`](main.py#L178)
- [`def extract_with_retry(text, schema, max_retries)`](main.py#L193)
- [`def run_schema_validation_demo()`](main.py#L224)
- [`def run_schema_generation_demo()`](main.py#L248)
- [`def run_constrained_decoding_demo()`](main.py#L287)
- [`def run_extraction_pipeline_demo()`](main.py#L294)
- [`def run_nested_schema_demo()`](main.py#L315)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
