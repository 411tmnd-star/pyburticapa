# Transformers

[Corpus](../../README.md) / [language](../README.md)  ·  Course: [ai_engineering/phases/07-transformers-deep-dive](../../../course/ai_engineering/phases/07-transformers-deep-dive)

Each folder holds the Python of one lesson or project. Open it, read the script, run it.

| Folder | What the script does | Run |
|---|---|---|
| [01-why-transformers/](01-why-transformers/README.md) | Why Transformers - demonstrate the serial-depth gap between RNN-style recurrence and attention-style parallel reduction | `python main.py` |
| [02-self-attention-from-scratch/](02-self-attention-from-scratch/README.md) |  | `python self_attention.py` |
| [03-multi-head-attention/](03-multi-head-attention/README.md) | Multi-head attention from scratch in pure stdlib | `python main.py` |
| [04-positional-encoding/](04-positional-encoding/README.md) | Positional encoding — sinusoidal, RoPE, ALiBi | `python main.py` |
| [05-full-transformer/](05-full-transformer/README.md) | The full transformer: encoder + decoder blocks in pure stdlib | `python main.py` |
| [06-bert-masked-language-modeling/](06-bert-masked-language-modeling/README.md) | BERT-style masked language modeling — the masking rules demystified | `python main.py` |
| [07-gpt-causal-language-modeling/](07-gpt-causal-language-modeling/README.md) | GPT-style causal language modeling — causal mask, loss shift, sampling | `python main.py` |
| [08-t5-bart-encoder-decoder/](08-t5-bart-encoder-decoder/README.md) | T5 span corruption + BART denoising noise functions | `python main.py` |
| [09-vision-transformers/](09-vision-transformers/README.md) | Vision Transformer (ViT) — the patchify + embed front end | `python main.py` |
| [10-audio-transformers-whisper/](10-audio-transformers-whisper/README.md) | Whisper pipeline in pure stdlib — framing, per-frame energy, task prompt | `python main.py` |
| [11-mixture-of-experts/](11-mixture-of-experts/README.md) | Mixture of Experts (MoE) in pure stdlib | `python main.py` |
| [12-kv-cache-flash-attention/](12-kv-cache-flash-attention/README.md) | KV cache + tiled (Flash-style) attention in pure stdlib | `python main.py` |
| [13-scaling-laws/](13-scaling-laws/README.md) | Scaling laws — Chinchilla loss equation, compute-optimal (N, D), over-training cost | `python main.py` |
| [14-build-a-transformer-capstone/](14-build-a-transformer-capstone/README.md) | Capstone: decoder-only transformer from scratch | `python main.py` |
| [15-attention-variants/](15-attention-variants/README.md) | Attention variants: full, sliding-window, local+strided sparse, differential | `python main.py` |
| [16-speculative-decoding/](16-speculative-decoding/README.md) | Speculative decoding: core algorithm and distribution equivalence | `python main.py` |
