# How it works: Audio Evaluation — WER, MOS, UTMOS, MMAU, FAD, and the Open Leaderboards

## `main.py`

```text
Audio evaluation metrics, from scratch.

Implements WER, CER, EER, simple SECS, FAD-shaped embedding distance,
and a MMAU-style multiple-choice accuracy. Stdlib-only.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _edit_distance(a_tokens, b_tokens)`](main.py#L13)
- [`def normalize(text)`](main.py#L26)
- [`def wer(ref, hyp)`](main.py#L34)
- [`def cer(ref, hyp)`](main.py#L39)
- [`def eer_from_scores(same, diff)`](main.py#L43)
- [`def cosine(a, b)`](main.py#L55)
- [`def embedding_fad_like(real_embeds, fake_embeds)`](main.py#L62)
- [`def mmau_accuracy(predictions, golds)`](main.py#L75)
- [`def main()`](main.py#L80)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
