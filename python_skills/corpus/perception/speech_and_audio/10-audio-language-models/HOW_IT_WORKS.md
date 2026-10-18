# How it works: Audio-Language Models — Qwen2.5-Omni, Audio Flamingo, GPT-4o Audio

## `main.py`

```text
Audio-Language Model skeleton.

Walks through the 3-component template every 2026 LALM uses:
audio encoder → projector → LLM decoder. No neural net — this is the
shape every real implementation fills in.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def fake_audio_encoder(audio_seconds, dim)`](main.py#L14)
- [`def projector(features, audio_dim, llm_dim)`](main.py#L20)
- [`def interleave_with_text(audio_tokens, text_tokens)`](main.py#L31)
- [`def fake_llm_answer(interleaved)`](main.py#L35)
- [`def main()`](main.py#L41)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
