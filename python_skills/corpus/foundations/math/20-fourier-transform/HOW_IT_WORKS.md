# How it works: The Fourier Transform

## `code/fourier.py`

Functions and classes, in file order (click to jump to the line):

- [`class Complex`](code/fourier.py#L4)
  - [`def magnitude(self)`](code/fourier.py#L32)
  - [`def phase(self)`](code/fourier.py#L35)
  - [`def conjugate(self)`](code/fourier.py#L38)
- [`def euler(theta)`](code/fourier.py#L48)
- [`def dft(x)`](code/fourier.py#L52)
- [`def idft(X)`](code/fourier.py#L65)
- [`def fft(x)`](code/fourier.py#L78)
- [`def ifft(X)`](code/fourier.py#L98)
- [`def power_spectrum(X)`](code/fourier.py#L105)
- [`def magnitude_spectrum(X)`](code/fourier.py#L109)
- [`def spectral_analysis(signal, sample_rate)`](code/fourier.py#L113)
- [`def hann_window(N)`](code/fourier.py#L121)
- [`def hamming_window(N)`](code/fourier.py#L125)
- [`def apply_window(signal, window)`](code/fourier.py#L129)
- [`def convolve_direct(x, h)`](code/fourier.py#L133)
- [`def convolve_fft(x, h)`](code/fourier.py#L147)
- [`def generate_signal(frequencies, amplitudes, N, sample_rate)`](code/fourier.py#L167)
- [`def positional_encoding(pos, d_model)`](code/fourier.py#L176)
- [`def demo_pure_sine()`](code/fourier.py#L186)
- [`def demo_multi_frequency()`](code/fourier.py#L216)
- [`def demo_fft_vs_dft()`](code/fourier.py#L258)
- [`def demo_reconstruction()`](code/fourier.py#L301)
- [`def demo_convolution_theorem()`](code/fourier.py#L332)
- [`def demo_windowing()`](code/fourier.py#L369)
- [`def demo_parseval()`](code/fourier.py#L417)
- [`def demo_positional_encoding()`](code/fourier.py#L442)
- [`def demo_frequency_scaling()`](code/fourier.py#L483)
- [`def write_prompt_output()`](code/fourier.py#L502)
- [`def print_summary()`](code/fourier.py#L550)

## Run and test

From this folder:

```
python code/fourier.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
