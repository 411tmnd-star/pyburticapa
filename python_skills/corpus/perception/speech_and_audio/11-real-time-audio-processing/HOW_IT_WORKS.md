# How it works: Real-Time Audio Processing

## `main.py`

```text
Real-time voice agent pipeline simulator.

Simulates an audio chunk stream through VAD → STT → LLM → TTS with a
latency budget. No real models; tracks timing to show where budget goes.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def rms_dbfs(chunk)`](main.py#L18)
- [`def simulate_chunk(is_speech, rng)`](main.py#L23)
- [`def vad(chunk, threshold_dbfs)`](main.py#L30)
- [`def fake_stt(utterance_duration_s)`](main.py#L34)
- [`def fake_llm(text)`](main.py#L40)
- [`def fake_tts_first_audio(text)`](main.py#L45)
- [`def main()`](main.py#L50)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
