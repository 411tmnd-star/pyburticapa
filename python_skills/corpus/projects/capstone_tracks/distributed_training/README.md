# Capstone track: distributed training

[Corpus](../../../README.md) / [projects](../../README.md)  ·  6 entries  ·  discovery 6

**Course:** [ai_engineering/phases/19-capstone-projects](../../../../course/ai_engineering/phases/19-capstone-projects)

| ID | Entry | Python | Needs | Status |
|---|---|---|---|---|
| L19-76 | [Collective Ops From Scratch](../../../../course/ai_engineering/phases/19-capstone-projects/76-collective-ops-from-scratch "The four collective operations that hold distributed training together are allreduce, broadcast, allgather, and reduce_scatter. Every other ") | 2 files | torch | discovery |
| L19-77 | [Data Parallel DDP From Scratch](../../../../course/ai_engineering/phases/19-capstone-projects/77-data-parallel-ddp "DistributedDataParallel is a hook on top of allreduce. Wrap a model, broadcast the initial parameters from rank 0 so every rank starts ident") | 2 files | torch | discovery |
| L19-78 | [ZeRO Optimizer State Sharding](../../../../course/ai_engineering/phases/19-capstone-projects/78-zero-parameter-sharding "Adam stores two moment estimates per parameter, both in float32. A 7B-parameter model carries 56 GB of optimiser state. ZeRO stage 1 shards ") | 2 files | torch | discovery |
| L19-79 | [Pipeline Parallel and Bubble Analysis](../../../../course/ai_engineering/phases/19-capstone-projects/79-pipeline-parallel "Tensor parallelism splits the matrix multiply across ranks. Pipeline parallelism splits the model across ranks, one stage per rank. Microbat") | 2 files | torch | discovery |
| L19-80 | [Sharded Checkpoint and Atomic Resume](../../../../course/ai_engineering/phases/19-capstone-projects/80-checkpoint-sharded-resume "A 70B-parameter training job is paused by a node failure every few hours. The checkpoint format decides whether you lose 30 minutes or 30 ho") | 2 files | torch | discovery |
| L19-81 | [End-to-End Distributed Training](../../../../course/ai_engineering/phases/19-capstone-projects/81-end-to-end-distributed-train "Lessons 76 through 80 each built one piece. This is the assembly: a tiny GPT trained across 4 simulated ranks with DDP for gradient sync, Ze") | 2 files | torch | discovery |
