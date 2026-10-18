# Embodied VLAs: RT-2, OpenVLA, π0, GR00T

The first time a model read a recipe off a website and executed it in a kitchen robot was RT-2 (Google DeepMind, July 2023). RT-2 discretized actions as text tokens, co-fine-tuned a VLM on web data plus robot-action data, and proved that web-scale vision-language knowledge transfers to robotic control. OpenVLA (June 2024) shipped the open 7B reference. Physical Intelligence's π0 series (2024-2025) added flow-matching action experts. NVIDIA's GR00T N1 (March 2025) delivered dual-system (System 1 / System 2) control for humanoid robots at scale. The VLA primitive — vision-language-action, a single model that sees, reads, and acts — is the bridge between this phase's understanding models and the autonomous systems in Phase 15.

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
