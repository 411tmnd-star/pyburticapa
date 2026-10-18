# How it works: MIO and Any-to-Any Streaming Multimodal Models

## `main.py`

```text
MIO-style four-modality tokenizer allocation + streaming decode latency calc.

Stdlib. Prints the vocab layout and a step-by-step latency trace for a
spoken-dialogue request where MIO consumes speech, generates speech.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class VocabSlot`](main.py#L13)
  - [`def end(self)`](main.py#L19)
- [`def build_vocab()`](main.py#L23)
- [`def print_vocab(slots)`](main.py#L45)
- [`def route_inputs(inputs)`](main.py#L55): Classify each input and assign a tokenizer path.
- [`class LatencyTrace`](main.py#L75)
- [`def streaming_decode_latency(prompt_audio_seconds, model_size_b)`](main.py#L80)
- [`def print_trace(trace)`](main.py#L98)
- [`def demo_chain_of_visual_thought()`](main.py#L115)
- [`def main()`](main.py#L131)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
