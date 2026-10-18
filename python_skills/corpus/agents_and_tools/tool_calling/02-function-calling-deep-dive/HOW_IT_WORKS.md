# How it works: Function Calling Deep Dive — OpenAI, Anthropic, Gemini

## `main.py`

```text
Phase 13 Lesson 02 - function calling deep dive across three providers.

Takes one canonical Tool, emits the OpenAI, Anthropic, and Gemini declaration
payloads, then parses a hand-crafted response of each shape back into a
provider-agnostic Call object. Stdlib only; no network.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Tool`](main.py#L18)
- [`class Call`](main.py#L26)
- [`class ToolChoice`](main.py#L33)
- [`def to_openai(tool)`](main.py#L56)
- [`def to_anthropic(tool)`](main.py#L68)
- [`def _gemini_schema(node)`](main.py#L76)
- [`def to_gemini(tool)`](main.py#L92)
- [`def tool_choice_openai(tc)`](main.py#L104)
- [`def tool_choice_anthropic(tc)`](main.py#L116)
- [`def tool_choice_gemini(tc)`](main.py#L128)
- [`def parse_openai(resp)`](main.py#L201)
- [`def parse_anthropic(resp)`](main.py#L210)
- [`def parse_gemini(resp)`](main.py#L218)
- [`def diff_line(a, b, c)`](main.py#L227)
- [`def main()`](main.py#L233)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
