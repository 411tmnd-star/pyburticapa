# How it works: Moderation Systems — OpenAI, Perspective, Llama Guard

## `main.py`

```text
Three-layer moderation harness — stdlib Python.

Input moderation + output moderation + custom domain rules.
Illustrates the default 2026 production pattern.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def openai_moderation(text)`](main.py#L33): Toy OpenAI Moderation: category -> score in [0,1].
- [`def input_moderator(prompt, threshold)`](main.py#L44)
- [`def output_moderator(output, threshold)`](main.py#L50)
- [`def custom_domain_rules(prompt)`](main.py#L56): Example: financial-advice disclaimer rule.
- [`def model_respond(prompt)`](main.py#L66): Mock model response.
- [`def run(prompt)`](main.py#L73)
- [`def main()`](main.py#L100)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
