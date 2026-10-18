# W14 · Orders inbox

**Type** B: course + outside repo · **Goals** sales · **Status** to confirm

Receive Better Style payment webhooks once and safely: verify the signature, store the delivery, check the amount against the order, fulfil exactly once.

## How the parts connect

1. Signed Webhook Inbox: accept a delivery once and keep what is needed to replay it
2. verify the Paystack signature, amount in kobo, currency, reference
3. match to the order row in Supabase; fulfil once (idempotency key = reference)
4. every rejected delivery logged with the reason

## Run (target)

```bash
python -m pytest orders_inbox/tests
```

## Pass

Fixture deliveries: a valid one fulfils once, the same one replayed does nothing, a bad signature and a wrong amount are rejected with reasons.

When it passes on the laptop, it moves to `python_skills/confirmed/orders_inbox` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
