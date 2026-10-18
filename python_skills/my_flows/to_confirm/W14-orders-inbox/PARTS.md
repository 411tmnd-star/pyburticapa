# W14 parts

Paths are relative to `python_skills/`. Course paths point at the untouched course; the matching corpus unit (same id) has the exact Python plus HOW_IT_WORKS and THEORY pages.

## Ours

- none (this workflow is new)

## Course

| Id | Title | Course path | What it is | Code |
|---|---|---|---|---|
| `P-signed-webhook-inbox` | Signed Webhook Inbox | `course/ai_engineering/projects/signed-webhook-inbox` | Accept a delivery once and retain the evidence needed to replay it safely. | no Python here (Go): port the idea to Python |

## Outside

- https://github.com/supabase/supabase-py (MIT)
- Paystack webhooks (the storefront-payment-check chat skill holds the checks)

## Port note

The Python in this workflow is a port. Its course source is `P-signed-webhook-inbox` (Go), left untouched under `course/`. The port keeps the signed webhook inbox's behaviour and fixtures' intent, in stdlib Python tested with unittest.
