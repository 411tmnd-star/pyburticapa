# ASCII Art and Visual Jailbreaks

Jiang, Xu, Niu, Xiang, Ramasubramanian, Li, Poovendran, "ArtPrompt: ASCII Art-based Jailbreak Attacks against Aligned LLMs" (ACL 2024, arXiv:2402.11753). Mask the safety-relevant tokens in a harmful request, replace them with ASCII-art renderings of the same letters, and send the cloaked prompt. GPT-3.5, GPT-4, Gemini, Claude, Llama-2 all fail to robustly recognize ASCII-art tokens. The attack bypasses PPL (perplexity filters), Paraphrase defenses, and Retokenization. Related: the ViTC benchmark measures recognition of non-semantic visual prompts; StructuralSleight generalizes to Uncommon Text-Encoded Structures (trees, graphs, nested JSON) as a family of encoding attacks.

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
