# GPT from scratch

[Corpus](../../../README.md) / [projects](../../README.md)  ·  Course: [ai_engineering/phases/19-capstone-projects](../../../../course/ai_engineering/phases/19-capstone-projects)

Each folder holds the Python of one lesson or project. Open it, read the script, run it.

| Folder | What the script does | Run |
|---|---|---|
| [30-bpe-tokenizer-from-scratch/](30-bpe-tokenizer-from-scratch/README.md) | Byte-Pair Encoding tokenizer from scratch | `python main.py` |
| [31-tokenized-dataset-sliding-window/](31-tokenized-dataset-sliding-window/README.md) | Tokenized dataset with sliding window for next-token training | `python main.py` |
| [32-token-positional-embeddings/](32-token-positional-embeddings/README.md) | Token and positional embeddings | `python main.py` |
| [33-multihead-self-attention/](33-multihead-self-attention/README.md) | Multi-head self-attention with causal mask, single QKV projection, and weight inspection | `python main.py` |
| [34-transformer-block/](34-transformer-block/README.md) | Transformer block from scratch: LayerNorm, multi head causal attention, residual, MLP, residual | `python code/main.py` |
| [35-gpt-model-assembly/](35-gpt-model-assembly/README.md) | Assemble the lesson 34 transformer block into a 124M parameter GPT model | `python code/main.py` |
| [36-training-loop-eval/](36-training-loop-eval/README.md) | Training loop and evaluation harness for the lesson 35 GPT model | `python code/main.py` |
| [37-loading-pretrained-weights/](37-loading-pretrained-weights/README.md) | Load pretrained GPT-2-style weights from safetensors into the lesson 35 architecture | `python code/main.py` |
| [38-classifier-finetuning/](38-classifier-finetuning/README.md) | Classifier fine-tuning by head swap | `python main.py` |
| [39-instruction-tuning-sft/](39-instruction-tuning-sft/README.md) | Instruction tuning by supervised fine-tuning (SFT) | `python main.py` |
| [40-dpo-from-scratch/](40-dpo-from-scratch/README.md) | Direct Preference Optimization (DPO) from scratch | `python main.py` |
| [41-eval-pipeline/](41-eval-pipeline/README.md) | Full evaluation pipeline for a tiny language model | `python main.py` |
