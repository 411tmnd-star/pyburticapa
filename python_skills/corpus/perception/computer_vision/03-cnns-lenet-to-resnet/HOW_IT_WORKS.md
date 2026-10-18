# How it works: CNNs — LeNet to ResNet

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class LeNet5`](main.py#L6)
  - [`def forward(self, x)`](main.py#L16)
- [`class VGGBlock`](main.py#L25)
  - [`def forward(self, x)`](main.py#L34)
- [`class MiniVGG`](main.py#L40)
  - [`def forward(self, x)`](main.py#L54)
- [`class BasicBlock`](main.py#L58)
  - [`def forward(self, x)`](main.py#L73)
- [`class TinyResNet`](main.py#L80)
  - [`def _make_group(self, in_c, out_c, num_blocks, stride)`](main.py#L98)
  - [`def forward(self, x)`](main.py#L104)
- [`def summary(name, net, x)`](main.py#L113)
- [`def per_group_params(net)`](main.py#L123)
- [`def main()`](main.py#L127)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
