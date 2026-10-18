# How it works: ASCII Art and Visual Jailbreaks

## `main.py`

```text
ArtPrompt encoding toy — stdlib Python.

Given a harmful prompt and a list of "safety words" to cloak:
  1. identify the words,
  2. render each as ASCII art,
  3. build a cloaked prompt that bypasses a substring-match safety filter.

Pedagogical: real ArtPrompt uses bigger glyphs and multi-model workflow.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def render_word(word)`](main.py#L31): Render a word as a 5-row ASCII-art block.
- [`def cloak_prompt(prompt, words_to_cloak)`](main.py#L44): Replace each safety word with [ASCII ART], placing the art inline.
- [`def keyword_filter(text, forbidden)`](main.py#L58): Simple substring-based safety filter. Returns True iff filter blocks.
- [`def perplexity_heuristic(text)`](main.py#L64): Toy PPL proxy: ratio of non-ASCII / non-alphanumeric chars to total.
- [`def main()`](main.py#L72)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
