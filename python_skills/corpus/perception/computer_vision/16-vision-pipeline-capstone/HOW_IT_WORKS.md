# How it works: Build a Complete Vision Pipeline — Capstone

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Detection`](main.py#L10)
- [`class Classification`](main.py#L17)
- [`class PipelineResult`](main.py#L24)
- [`class StubDetector`](main.py#L31): Minimal stand-in for Mask R-CNN that produces a fixed set of detections.
  - [`def forward(self, images)`](main.py#L38)
- [`class StubClassifier`](main.py#L56)
  - [`def forward(self, x)`](main.py#L65)
- [`class VisionPipeline`](main.py#L69)
  - [`def preprocess(self, image)`](main.py#L78)
  - [`def detect(self, image_tensor)`](main.py#L92)
  - [`def classify(self, crops)`](main.py#L96)
  - [`def run(self, image, image_id)`](main.py#L105)
- [`def benchmark(pipe, num_runs, image_size)`](main.py#L152)
- [`def main()`](main.py#L193)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
