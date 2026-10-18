# Projection Layer for Modality Alignment

A vision encoder produces image tokens. A text decoder consumes text tokens. The two live in different vector spaces. A small two-layer MLP projects image tokens into the text embedding space, and a cosine alignment loss against a paired caption pulls the two spaces into agreement. That projection is the smallest piece of a vision-language model and the one that matters most for transfer.

```
python code/main.py
python code/test_main.py
```

Needs: numpy, torch

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/test_main.py`](code/test_main.py) | run it (command above) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
