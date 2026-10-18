# Audio-Language Models: the Whisper to Audio Flamingo 3 Arc

Whisper (Radford et al., December 2022) settled speech recognition — 680k hours of weakly-supervised multilingual speech, a simple encoder-decoder transformer, a benchmark that made every subsequent ASR release cite it. But recognition is not reasoning. Asking "what instruments are in this recording" or "what emotion is the speaker expressing" or "what happened at minute 3" requires audio understanding, not transcription. Qwen-Audio, SALMONN, LTU, and NVIDIA's Audio Flamingo 3 (AF3, July 2025) progressively built that stack: keep Whisper-class encoders, bolt on Q-formers, train on audio-text instruction data, add chain-of-thought reasoning. This lesson walks the arc.

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
