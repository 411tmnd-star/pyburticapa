# Capstone 03 — Real-Time Voice Assistant (ASR to LLM to TTS)

A voice agent that feels right has end-to-end latency under 800ms, knows when you have stopped talking, handles barge-in, and can call a tool without stalling. Retell, Vapi, LiveKit Agents, and Pipecat all hit this bar in 2026. They do it with the same shape: a streaming ASR, a turn-detector, a streaming LLM, and a streaming TTS, all wired through WebRTC with aggressive latency budgets at every hop. Build one, measure WER and MOS and false-cutoff rate, and run it under packet loss.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`ts/`](ts) | files the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
