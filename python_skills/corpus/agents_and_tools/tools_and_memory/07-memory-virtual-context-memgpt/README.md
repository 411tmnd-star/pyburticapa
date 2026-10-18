# Agent Memory — Virtual Context and Memory Paging

Context windows are finite. Conversations, documents, and tool traces are not. The fix is OS virtual memory restated — main context is RAM, external store is disk, the agent pages between them. MemGPT (Packer et al., 2023) named the pattern; many production memory systems build on it.

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
