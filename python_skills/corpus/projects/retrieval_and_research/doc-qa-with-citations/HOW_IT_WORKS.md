# How it works: Document QA With Citations and LangChain

## `cli.py`

```text
Search local text documents and retain exact source evidence.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def terms(text)`](cli.py#L31)
- [`def extract(prompt)`](cli.py#L35)
- [`def query(root, question, model)`](cli.py#L47)
- [`def main()`](cli.py#L67)

## `adapter.py`

```text
Use a framework splitter without losing offsets.

Lesson: projects/doc-qa-with-citations/stages/04-adapter/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def adapt_splits(doc, parts)`](adapter.py#L12)
- [`def framework_qa(question, doc, response)`](adapter.py#L34)

## `answer.py`

```text
Accept only answers grounded in retrieved spans.

Lesson: projects/doc-qa-with-citations/stages/03-answer/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def answer(question, chunks, model)`](answer.py#L11)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `documents.py`

```text
Load local documents with stable provenance.

Lesson: projects/doc-qa-with-citations/stages/01-documents/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def load_documents(root)`](documents.py#L12)
- [`def chunk_document(doc, size, overlap)`](documents.py#L32)

## `framework_demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `retrieval.py`

```text
Rank chunks with an inspectable keyword score.

Lesson: projects/doc-qa-with-citations/stages/02-retrieval/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def retrieve(chunks, query, k)`](retrieval.py#L13)

## Run and test

From this folder:

```
python cli.py samples/docs "When does cache expire?" --output answer.json --html answer.html
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
