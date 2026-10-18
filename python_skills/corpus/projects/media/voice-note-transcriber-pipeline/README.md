# Voice Note Transcriber Pipeline

Turn a selected WAV into an inspectable transcript and caption review page using a real optional HTTP recognizer, with an honest offline speech fixture.

```
python pipeline.py --input fixtures/repair-note.wav --transcript-file fixtures/reference.json --out voice-output
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`activity.py`](activity.py) | the code |
| [`captions.py`](captions.py) | part of the code |
| [`demo.py`](demo.py) | part of the code |
| [`pcm.py`](pcm.py) | part of the code |
| [`pipeline.py`](pipeline.py) | run it (command above) |
| [`provider.py`](provider.py) | part of the code |
| [`transcribe.py`](transcribe.py) | part of the code |
| [`fixtures/`](fixtures) | files the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
