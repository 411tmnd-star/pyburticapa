# ColPali and Vision-Native Document RAG

Traditional RAG parses PDFs into text, splits into chunks, embeds chunks, stores vectors. Every step loses signal: OCR drops chart data, chunking breaks table rows, text embeddings ignore figures. ColPali (Faysse et al., July 2024) asked the simpler question: why extract text at all? Embed the page image directly via PaliGemma, use ColBERT-style late interaction for retrieval, and keep all the layout, figures, fonts, and formatting signal the document carries. Published benchmarks: 20-40% better end-to-end accuracy than text-RAG on visually-rich documents. ColQwen2, ColSmol, and VisRAG extended the pattern. This lesson reads the vision-native RAG thesis and builds a tiny ColPali-like indexer.

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
