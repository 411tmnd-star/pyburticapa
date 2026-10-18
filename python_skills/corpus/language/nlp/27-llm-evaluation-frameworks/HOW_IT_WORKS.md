# How it works: LLM Evaluation — RAGAS, DeepEval, G-Eval

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L9)
- [`def split_sentences(text)`](main.py#L13)
- [`def faithfulness(answer, context)`](main.py#L17)
- [`def answer_relevance(question, answer)`](main.py#L33)
- [`def context_precision(retrieved_chunks, relevant_chunks)`](main.py#L41)
- [`def context_recall(retrieved_chunks, gold_answer_tokens)`](main.py#L48)
- [`def g_eval_correctness(actual, expected, threshold)`](main.py#L57)
- [`def main()`](main.py#L73)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
