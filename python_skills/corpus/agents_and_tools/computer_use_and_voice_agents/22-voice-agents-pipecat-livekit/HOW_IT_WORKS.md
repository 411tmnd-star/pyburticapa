# How it works: Voice Agents: Pipecat and LiveKit

## `main.py`

```text
Toy Pipecat-style voice pipeline: VAD  STT  LLM  TTS  transport.

Frames travel DOWNSTREAM (source to sink) and UPSTREAM (cancel/control).
A scripted input shows normal flow plus a barge-in cancel that stops TTS.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Frame`](main.py#L14)
- [`class Processor`](main.py#L20)
  - [`def process(self, frame)`](main.py#L27)
- [`class VAD`](main.py#L35)
  - [`def process(self, frame)`](main.py#L36)
- [`class STT`](main.py#L46)
  - [`def process(self, frame)`](main.py#L47)
- [`class LLM`](main.py#L56)
  - [`def process(self, frame)`](main.py#L61)
- [`class TTS`](main.py#L75)
  - [`def process(self, frame)`](main.py#L80)
- [`class Transport`](main.py#L101)
  - [`def process(self, frame)`](main.py#L106)
- [`def link()`](main.py#L114)
- [`def main()`](main.py#L120)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
