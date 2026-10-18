# Indirect Prompt Injection — Production Attack Surface

Indirect prompt injection (IPI) embeds instructions inside external content — a web page, an email, a shared document, a support ticket — consumed by an agentic system without explicit user action. IPI is the dominant 2026 production threat: it bypasses user-input filters because the attacker never touches the user, it scales silently as agents process more external content, and it targets automated workflows where nobody is reading the prompt. MDPI Information 17(1):54 (January 2026) synthesizes 2023-2025 research. NDSS 2026's IPI-defense paper frames the core challenge: injected instructions can be semantically benign ("please print Yes"), so detection requires more than keyword filtering. "The Attacker Moves Second" (Nasr et al., joint OpenAI/Anthropic/DeepMind, October 2025): adaptive attacks (gradient, RL, random search, human red-team) broke >90% of 12 published defenses that had originally reported near-zero attack success rates.

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
