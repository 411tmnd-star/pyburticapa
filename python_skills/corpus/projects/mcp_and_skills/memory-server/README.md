# Persistent Memory Server

A persistent memory workbench with revision history and one boundary for REST and MCP.

```
node cli.ts --data-dir memory-data --put samples/memory.json
node cli.ts --data-dir memory-data --query "cache policy"
node cli.ts --data-dir memory-data --history cache-policy
```

Needs: httpx2, mcp

| File | Open it to… |
|---|---|
| [`samples/`](samples) | files the code uses |
| [`package.json`](package.json) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
