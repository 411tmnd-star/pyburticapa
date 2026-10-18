# How it works: SAM 3 & Open-Vocabulary Segmentation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class ConceptDetection`](main.py#L9)
- [`def split_concepts(sentence)`](main.py#L17)
- [`def rle_encode(binary_mask)`](main.py#L27)
- [`def rle_decode(rle_str, shape)`](main.py#L45)
- [`class OpenVocabSeg`](main.py#L59)
  - [`def detect(self, image, concept)`](main.py#L61)
- [`class StubOpenVocabSeg`](main.py#L65): Pipeline-testable stand-in for SAM 3 / Grounded SAM 2.
  - [`def detect(self, image, concept)`](main.py#L68)
- [`def run_multi_concept(model, image, user_utterance)`](main.py#L92)
- [`def main()`](main.py#L100)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
