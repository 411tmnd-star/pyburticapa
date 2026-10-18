# Streaming Speech-to-Speech — Moshi, Hibiki, and Full-Duplex Dialogue

2024-2026 redefined voice AI. Moshi ships a single model that listens and speaks simultaneously at 200 ms latency. Hibiki does speech-to-speech translation chunk-by-chunk. Both abandon the ASR → LLM → TTS pipeline for a unified full-duplex architecture over Mimi codec tokens. This is the new reference design.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
