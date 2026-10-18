# Kill Switches, Circuit Breakers, and Canary Tokens

A kill switch is a boolean held outside the agent's edit surface — a Redis key, a feature flag, a signed config — that disables the agent entirely. A circuit breaker is finer-grained: it trips on a specific pattern (five identical tool calls in a row), pauses the offending path, and escalates to a human. A canary token inherits from classical deception: a fake credential or honeypot record an agent has no legitimate reason to touch, whose access triggers an alert. eBPF-based datapaths (e.g. Cilium) can rewrite a quarantined pod's egress to a forensic honeypot at the kernel layer; published Cilium benchmarks report sub-millisecond P99 datapath latency under load (your propagation budget depends on how a policy update reaches the node, not the datapath itself). Statistical detectors (EWMA, CUSUM) that adapt to a moving baseline will quietly accept drift — layer them with hard constitutional limits that do not bend.

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
