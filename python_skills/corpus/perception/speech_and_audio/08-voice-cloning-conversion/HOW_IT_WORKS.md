# How it works: Voice Cloning & Voice Conversion

## `main.py`

```text
Voice cloning demo: simulate (content, speaker) decomposition and swap.

Build a tiny "content" vector from a deterministic phoneme hash and a
"speaker" vector from per-speaker tone profile. Demonstrate that the
reconstructed audio at a swapped speaker embedding preserves content
while its speaker-embedding cosine tracks the target.

Stdlib only. No real neural net — this is the lego-model of a cloning pipeline.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def content_vector(text, dim)`](main.py#L17): Deterministic 'content' representation of text — toy PPG stand-in.
- [`def speaker_vector(seed, dim)`](main.py#L24): Deterministic 'speaker embedding' — toy ECAPA-TDNN stand-in.
- [`def fake_tts(content, speaker, mix)`](main.py#L32): Pretend TTS: element-wise mix content with speaker.
- [`def extract_speaker(wave, reference_speakers)`](main.py#L37): Pretend speaker-encoder: return speaker with highest cosine.
- [`def extract_content(wave, reference_contents)`](main.py#L44)
- [`def cosine(a, b)`](main.py#L50)
- [`def watermark(wave, payload_bits, strength)`](main.py#L57): Toy inaudible watermark: per-bit DC shift on a partitioned stride.
- [`def detect_watermark(wave_original, wave_wm, n_bits)`](main.py#L72)
- [`def bit_accuracy(a, b)`](main.py#L82)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
