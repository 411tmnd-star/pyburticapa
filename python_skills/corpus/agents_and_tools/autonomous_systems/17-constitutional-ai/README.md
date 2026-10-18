# Constitutional AI and Rule Overrides

Anthropic's January 22, 2026 Claude Constitution runs 79 pages and is CC0. It moves from rule-based to reason-based alignment and establishes a four-tier priority hierarchy: (1) safety and supporting human oversight, (2) ethics, (3) Anthropic guidelines, (4) helpfulness. Behaviours split into hardcoded prohibitions (bioweapons uplift, CSAM) that operators and users cannot override and soft-coded defaults that operators can adjust within defined bounds. The 2022 original (Bai et al.) trained harmlessness via self-critique and RLAIF against a constitution. The honest caveat: reason-based alignment relies on the model generalising principles to unanticipated situations. Anthropic's own 2023 participatory experiment showed ~50% divergence between public-sourced and corporate principles; the 2026 version did not incorporate those findings.

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
