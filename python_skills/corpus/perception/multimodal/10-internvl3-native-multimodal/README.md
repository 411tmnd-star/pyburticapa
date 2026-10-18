# InternVL3: Native Multimodal Pretraining

Every open VLM before InternVL3 followed the same three-step recipe: take a text LLM trained on trillions of text tokens, bolt on a vision encoder, then fine-tune the seams. This works but has alignment debt — the text LLM has spent its full pretraining budget on pure text and does not natively understand visual tokens. When you add vision post-hoc, the LLM has to re-learn how to relate visual input to its text reasoning without forgetting the text. InternVL3 (Zhu et al., April 2025) rejects the post-hoc approach: one pretraining run, text and multimodal interleaved from step one. The result matches Gemini 2.5 Pro on MMMU-Pro at 78B params open. This lesson reads the case for native pretraining and what changes when you make it.

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
