# pretraining at scale

[Corpus](../../../README.md) / [projects](../../README.md)  ·  Course: [ai_engineering/phases/19-capstone-projects](../../../../course/ai_engineering/phases/19-capstone-projects)

Each folder holds the Python of one lesson or project. Open it, read the script, run it.

| Folder | What the script does | Run |
|---|---|---|
| [42-large-corpus-downloader/](42-large-corpus-downloader/README.md) | Streaming corpus downloader with resume, MinHash plus LSH dedup, and a shard manifest | `python main.py` |
| [43-hdf5-tokenized-corpus/](43-hdf5-tokenized-corpus/README.md) | Streaming tokenization into resizable, sharded HDF5 datasets with mmap reads | `python main.py` |
| [44-cosine-lr-warmup/](44-cosine-lr-warmup/README.md) | AdamW with cosine learning-rate schedule and linear warmup | `python main.py` |
| [45-gradient-clipping-amp/](45-gradient-clipping-amp/README.md) | Gradient clipping and mixed-precision training step | `python main.py` |
| [46-gradient-accumulation/](46-gradient-accumulation/README.md) | Gradient accumulation from scratch | `python main.py` |
| [47-checkpoint-save-resume/](47-checkpoint-save-resume/README.md) | Checkpoint save and resume from scratch | `python code/main.py` |
| [48-distributed-fsdp-ddp/](48-distributed-fsdp-ddp/README.md) | Distributed data parallel from scratch on the gloo backend | `python main.py` |
| [49-lm-eval-harness/](49-lm-eval-harness/README.md) | Language model evaluation harness from scratch | `python main.py` |
