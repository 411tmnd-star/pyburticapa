# How it works: Dialogue State Tracking

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def extract_cuisine(utterance)`](main.py#L21)
- [`def extract_area(utterance)`](main.py#L31)
- [`def extract_price(utterance)`](main.py#L39)
- [`def extract_people(utterance)`](main.py#L47)
- [`def is_correction(utterance)`](main.py#L64)
- [`def is_negation(utterance, slot)`](main.py#L68)
- [`def update_state(state, utterance)`](main.py#L73)
- [`def render_dialog(turns)`](main.py#L85)
- [`def main()`](main.py#L89)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
