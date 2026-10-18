# How it works: Heritage of FIPA-ACL and Speech Acts

## `main.py`

```text
FIPA-ACL translator and mini contract-net demo, stdlib only.

Shows that every 2026 agent-protocol message (MCP tools/call, MCP
resources/read, A2A task creation) reduces to a FIPA-ACL envelope with a
different syntax. Then runs a 3-bidder contract-net negotiation using the
canonical cfp / propose / accept-proposal / reject-proposal performatives.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ACLMessage`](main.py#L23)
  - [`def render(self)`](main.py#L38)
- [`def mcp_tools_call_to_acl(req)`](main.py#L56): MCP tools/call JSON-RPC message -> FIPA-ACL request.
- [`def mcp_resources_read_to_acl(req)`](main.py#L71): MCP resources/read JSON-RPC message -> FIPA-ACL query-ref.
- [`def a2a_task_create_to_acl(task)`](main.py#L86): A2A POST /tasks body -> FIPA-ACL request inside a contract-net-like flow.
- [`def a2a_subscribe_to_acl(task_id, client, agent)`](main.py#L101): A2A SSE subscription -> FIPA-ACL subscribe.
- [`class Bid`](main.py#L116)
- [`class ContractNet`](main.py#L123)
  - [`def cfp(self, task, conv)`](main.py#L128)
  - [`def propose(self, bidder, bid, conv)`](main.py#L141)
  - [`def award(self, winner, losers, conv)`](main.py#L153)
- [`def demo_round_trip()`](main.py#L175)
- [`def demo_contract_net()`](main.py#L218)
- [`def main()`](main.py#L243)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
