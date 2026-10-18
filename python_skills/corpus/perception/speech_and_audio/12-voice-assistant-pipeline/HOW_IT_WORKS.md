# How it works: Build a Voice Assistant Pipeline — The Phase 6 Capstone

## `main.py`

```text
End-to-end voice assistant simulator — 7 components, stub implementations.

Simulates a full user turn: mic → VAD → STT → LLM (with tool-call) → TTS.
Prints per-stage latency + decision trace.

No real models — replace each stub with Silero VAD / Whisper / GPT-4o /
Kokoro for a production pipeline.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def mic_generator(duration_s, sr, chunk_ms, speech_mask)`](main.py#L17)
- [`def vad(chunk, threshold_dbfs)`](main.py#L32)
- [`def streaming_stt(utterance, sr)`](main.py#L37)
- [`def llm_with_tools(transcript)`](main.py#L42)
- [`def dispatch_tool(name, args)`](main.py#L52)
- [`def streaming_tts(text)`](main.py#L59)
- [`def play(audio_chunks)`](main.py#L64)
- [`def main()`](main.py#L69)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
