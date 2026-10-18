# MIO and Any-to-Any Streaming Multimodal Models

GPT-4o ships a product most open models cannot replicate: an agent that hears voice, sees video, and speaks back in real time. The open-ecosystem answer by late 2024 was MIO (Wang et al., September 2024). MIO tokenizes text, image, speech, and music, trains one causal transformer over the interleaved sequences, and generates any modality to any modality. AnyGPT (Zhan et al., February 2024) was the proof of concept; MIO is the scale-up; Unified-IO 2 (Allen AI, December 2023) is the cousin with vision + action grounding. This lesson reads the any-to-any pattern — four tokenizers, one transformer, streaming-friendly decode.

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
