# LLaVA-OneVision: Single-Image, Multi-Image, Video in One Model

Before LLaVA-OneVision (Li et al., August 2024) the open-VLM world had separate lineages: LLaVA-1.5 for single images, multi-image models like Mantis and VILA, video models like Video-LLaVA and Video-LLaMA. Each won its benchmark and failed at the others. LLaVA-OneVision argued a single curriculum could train one model to dominate all three scenarios, and that the emergent task-transfer effects (single-image skills exported to video, multi-image reasoning exported to single-image) beat the sum of specialists. The recipe is deceptively simple: a visual-token budget that stays constant across scenarios, plus an explicit curriculum that moves from single-image to OneVision (multi-image) to video. This lesson reads the budget, the curriculum, and the emergent behaviors.

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
