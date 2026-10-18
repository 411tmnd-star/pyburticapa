# distributed training

[Corpus](../../../README.md) / [projects](../../README.md)  ·  Course: [ai_engineering/phases/19-capstone-projects](../../../../course/ai_engineering/phases/19-capstone-projects)

Each folder holds the Python of one lesson or project. Open it, read the script, run it.

| Folder | What the script does | Run |
|---|---|---|
| [76-collective-ops-from-scratch/](76-collective-ops-from-scratch/README.md) | Collective communication primitives over multiprocessing.Queue, verified against gloo | `python main.py` |
| [77-data-parallel-ddp/](77-data-parallel-ddp/README.md) | DistributedDataParallel from scratch on the gloo backend | `python main.py` |
| [78-zero-parameter-sharding/](78-zero-parameter-sharding/README.md) | ZeRO stage 1 optimiser state sharding on the gloo backend | `python main.py` |
| [79-pipeline-parallel/](79-pipeline-parallel/README.md) | Pipeline parallel with GPipe schedule and bubble analysis | `python main.py` |
| [80-checkpoint-sharded-resume/](80-checkpoint-sharded-resume/README.md) | Sharded checkpoint with atomic write and verified resume | `python code/main.py` |
| [81-end-to-end-distributed-train/](81-end-to-end-distributed-train/README.md) | End-to-end distributed training: tiny GPT, 4 ranks, DDP + ZeRO-1 + sharded checkpoint | `python main.py` |
