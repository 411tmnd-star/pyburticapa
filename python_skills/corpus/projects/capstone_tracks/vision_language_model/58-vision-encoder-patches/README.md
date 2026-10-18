# Vision Encoder Patches

A vision model that reads pixels needs a tokenizer for pixels. Patch embedding is that tokenizer. Cut the image into a grid of squares, flatten each square, project it through one linear layer, then add a 2D position signal so the transformer knows where each square sat in the original image.

```
python code/main.py
python code/test_main.py
```

Needs: numpy, torch

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/test_main.py`](code/test_main.py) | run it (command above) |
| [`outputs/`](outputs) | files the code reads or writes (kept in the course's layout) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
