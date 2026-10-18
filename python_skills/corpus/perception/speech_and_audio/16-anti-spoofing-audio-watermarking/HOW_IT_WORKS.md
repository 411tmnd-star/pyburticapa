# How it works: Voice Anti-Spoofing & Audio Watermarking — ASVspoof 5, AudioSeal, WaveVerify

## `main.py`

```text
Toy anti-spoofing + toy watermark, to illustrate the shape.

Real production uses AASIST / RawNet2 for detection and AudioSeal for
watermarking — both are neural nets. Here we simulate the interface
with simple numeric tricks so the pipeline is visible.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def synth_real_speech(n_samples, seed)`](main.py#L14)
- [`def synth_fake_speech(n_samples, seed)`](main.py#L25)
- [`def magnitude_spectrum(audio, n_fft)`](main.py#L35)
- [`def toy_detector_score(audio)`](main.py#L50)
- [`def toy_watermark_embed(audio, payload_bits)`](main.py#L57)
- [`def toy_watermark_detect(audio, n_bits)`](main.py#L67)
- [`def main()`](main.py#L77)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
