# Watermarking — SynthID, Stable Signature, C2PA

Three technologies structure 2026 AI-generated-content provenance. SynthID (Google DeepMind) — image watermarking launched August 2023, text+video May 2024 (Gemini + Veo), text open-sourced October 2024 via Responsible GenAI Toolkit, unified multi-media detector November 2025 alongside Gemini 3 Pro. Text watermarking adjusts next-token sampling probabilities imperceptibly; image/video watermarks survive compression, cropping, filters, frame-rate changes. Stable Signature (Fernandez et al., ICCV 2023, arXiv:2303.15435) — fine-tunes the latent diffusion decoder so every output contains a fixed message; cropped (10% of content) generated images detected >90% at FPR<1e-6. Follow-up "Stable Signature is Unstable" (arXiv:2405.07145, May 2024) — fine-tuning removes the watermark while preserving quality. C2PA — cryptographically signed, tamper-evident metadata standard (C2PA 2.2 Explainer 2025). Watermarking and C2PA are complementary: metadata can be stripped but carries richer provenance; watermarks persist through transcoding but carry less information.

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
