# How it works: Capstone 08 — Production RAG Chatbot for a Regulated Vertical

## `main.py`

```text
Production RAG chatbot — cache-aware prompt assembly scaffold.

The hard architectural primitive in a 2026 regulated-domain chatbot is the
cache-aware prompt assembly that preserves stable prefixes for prompt caching
while still filtering retrieval by role and jurisdiction. This scaffold
implements cache-key construction, role+jurisdiction filtering, hybrid
retrieval with RRF, a prompt-cache simulator, citation enforcement, and a
stub safety gate. The point is to show how the prefixes line up.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Chunk`](main.py#L25)
  - [`def anchor(self)`](main.py#L32)
- [`def tokenize(s)`](main.py#L59)
- [`def bm25_score(query, chunk)`](main.py#L63)
- [`def dense_score(query, chunk)`](main.py#L71): Stand-in for a real Voyage-3 or Nomic embedding cosine.
- [`def retrieve(query, role, jurisdiction, corpus, k)`](main.py#L80)
- [`class PromptLayout`](main.py#L109): Represents the cache-key structure: stable prefix + extensible tail.
  - [`def cache_key(self)`](main.py#L125)
- [`class PromptCache`](main.py#L130)
  - [`def check(self, key)`](main.py#L136)
  - [`def hit_rate(self)`](main.py#L145)
- [`def llama_guard_input(query)`](main.py#L161)
- [`def presidio_scrub(text)`](main.py#L168): Simple PII scrub stand-in: redact emails and SSN-shaped tokens.
- [`def chat_turn(query, role, jurisdiction, corpus, cache)`](main.py#L179)
- [`def main()`](main.py#L216)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
