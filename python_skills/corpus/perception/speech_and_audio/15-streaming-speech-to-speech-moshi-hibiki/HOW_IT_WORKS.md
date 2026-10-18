# How it works: Streaming Speech-to-Speech — Moshi, Hibiki, and Full-Duplex Dialogue

## `main.py`

```text
Moshi-style full-duplex simulation.

Models the shape of Moshi's parallel-stream architecture:
  - user Mimi token stream (input)
  - moshi Mimi token stream (output)
  - moshi text stream (inner monologue)

Runs a cartoon "conversation" through the loop; measures latency per
80 ms frame. No real codec or transformer — just structure.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def fake_mimi_encode(audio_80ms)`](main.py#L24)
- [`def fake_mimi_decode(tokens)`](main.py#L30)
- [`def depth_transformer(context_text, context_user_mimi, context_moshi_mimi)`](main.py#L36)
- [`def inner_monologue_next_token(text_so_far, user_mimi_stream)`](main.py#L42)
- [`def simulate_user_speech(n_frames)`](main.py#L47)
- [`def main()`](main.py#L55)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
