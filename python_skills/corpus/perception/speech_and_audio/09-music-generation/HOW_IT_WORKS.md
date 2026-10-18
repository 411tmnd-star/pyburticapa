# How it works: Music Generation — MusicGen, Stable Audio, Suno, and the Licensing Earthquake

## `main.py`

```text
Music-generation cartoon: symbolic chord/drum generation from a prompt.

This is a pedagogical stand-in. Real music-gen uses neural codec LM
(MusicGen / ACE-Step) or latent diffusion (Stable Audio). Here we walk
through the "tokens over time" idea at a symbolic level so the shape is
visible.

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def chord_progression(key, genre, bars)`](main.py#L38)
- [`def drum_pattern(genre, bars)`](main.py#L46)
- [`def fake_generate(prompt, rng)`](main.py#L51)
- [`def visualize(piece)`](main.py#L82)
- [`def main()`](main.py#L89)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
