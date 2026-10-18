# Meta API: the technical path for the ads layer

The Meta side of [README.md](README.md) (which has the Snap path). Our proposal; nothing here is built or run yet. Every fact below is a **source claim** from the research done on 2026-10-18 unless it says otherwise. Rates and dates change: re-check on Meta's pages before relying on them.

## What to build on

Three jobs fit the ads layer: WhatsApp order and support replies, click-to-WhatsApp ads with tracking, and server-side conversion events (Conversions API). All Graph-based products share one app, one business portfolio, one token model and one webhook system, so learning one makes the rest easier.

| API | What it does | Key permissions |
|---|---|---|
| WhatsApp Business Platform (Cloud API) | Send and receive messages, templates, analytics: `POST /{PHONE_NUMBER_ID}/messages` | `whatsapp_business_messaging`, `whatsapp_business_management` |
| Marketing API | Campaigns, ad sets, ads, creatives, audiences, insights | `ads_read`, `ads_management`, `business_management` |
| Conversions API and Pixel | Server-side events: Purchase, Lead, AddToCart | System-user token on the dataset |
| Catalog and Commerce | Product catalogues, batch updates, feeds | `catalog_management` |
| Lead Ads | Webhook `leadgen`, then fetch the lead | `leads_retrieval`, `pages_manage_ads` (leads cannot be fetched while the app is in Development mode) |
| Instagram, Messenger, Pages | DMs, comments, publishing, insights | per product |
| Business Management | Portfolios, system users, partners, assets | `business_management` |

Version: Graph and Marketing API v26.0 (released 2026-07-29). Pin the version in **one constant** so a removal is a one-line change. Several removals hit every version on 2026-10-27 (including the Commerce Order Management API and some placements), so pinning an old version does not protect you.

## Setup path (done by you in Meta's tools; the scripts start after)

1. Developer account on a personal account with two-factor authentication.
2. A Business-type app by use case, connected to a business portfolio.
3. Business verification (company documents). It unlocks Advanced Access and a higher WhatsApp starting limit.
4. App Review only for permissions on users or businesses with no role on your app: a screencast per permission, a privacy policy and a data-deletion URL.
5. Switch the app from Development to Live.

Standard Access is enough to build, test and serve one client from that client's own app. Working on a client's assets: partner access (client shares specific assets, easy to revoke) is preferred; a client-owned app with you as developer is best for a one-off build.

## Tokens

| Token | Lifetime | Use |
|---|---|---|
| Short-lived user | about 1 to 2 hours | Testing, first consent |
| Long-lived user | about 60 days | Derive Page tokens |
| Page | non-expiring if derived from a long-lived user token | Pages, Messenger, Instagram via Facebook Login |
| System user | non-expiring or 60-day options | Production: Conversions API, reporting, WhatsApp |

Tokens and the App Secret live in environment variables on the server. Never in client-side code, never in the repo.

## Webhooks

- **Verification (GET):** Meta sends `hub.mode`, `hub.verify_token`, `hub.challenge`; return the raw challenge with HTTP 200.
- **Payloads (POST):** check `X-Hub-Signature-256`, an HMAC-SHA256 of the raw body keyed with the App Secret, compared in constant time. The verify token is not the signing key.
- Reply fast, queue the work, de-duplicate by message ID.

## Conversions API essentials

Each event needs `event_name`, `event_time`, `user_data` and `action_source`. Meta de-duplicates Pixel and server events when `event_name` and `event_id` match within about 48 hours. Hash `em`, `ph`, `fn`, `ln` and similar keys with SHA-256 after normalising; send `client_ip_address`, `client_user_agent`, `fbc` and `fbp` unhashed. For click-to-WhatsApp use `action_source: "chat"`. Test with `test_event_code` in Events Manager before real events.

## WhatsApp message cost (Nigeria list rates, USD per message)

Source claim: Meta's rate card as reproduced by a third party, cross-checked 2026-10-18. Download the CSV from Meta's pricing page before quoting anything.

| Category | USD |
|---|---|
| Marketing | 0.0516 |
| Utility | 0.0067 |
| Authentication | 0.0067 |
| Service (free-form replies in the 24-hour window) | 0.0067 after the first 1,000 per number per month |

Free: messages from customers, and everything inside the 72-hour window opened by a click-to-WhatsApp ad, when you reply within 24 hours. Rates change only on 1 January, 1 April, 1 July and 1 October.

## Tools for an MCP server (split by risk)

An MCP server wraps chosen Graph calls as typed tools so Claude never holds tokens or raw HTTP. Start read-only; add each write tool only after a week of clean reads and tests. This matches the rule that human review is the final layer.

| Tool | Wraps | Risk | Gate |
|---|---|---|---|
| `ads_insights(account, level, date_range)` | `GET /{object}/insights` | Read | none |
| `list_templates(waba)` | `/{WABA_ID}/message_templates` | Read | none |
| `inbox_summary(since)` | our own message store fed by the webhook | Read | none |
| `draft_reply(conversation_id)` | nothing sent; returns text | Draft | none |
| `send_whatsapp(to, template, params)` | `POST /{PHONE_NUMBER_ID}/messages` | Write, costs money, reaches a customer | human approval, opt-in check, daily cap |
| `send_capi_event(event)` | `POST /{DATASET_ID}/events` | Write, changes ad learning | validate fields, `test_event_code` first |
| `create_campaign(spec)` | Marketing API | Write, spends money | create **paused** only; a human activates |

Design rules: keep tokens server-side; make writes idempotent (message ID, `event_id`); return Meta's error text in structured errors; log every write with who approved it; build in Python (FastMCP) and test with a fake Graph client first.

## Compliance that the code must respect

- Business-initiated WhatsApp messages need opt-in: a person gave their number and agreed to hear from that named business. Honour STOP immediately. Keep timestamped opt-in records.
- Nigeria Data Protection Act 2023: consent for direct marketing must be freely given, informed, specific and as easy to withdraw as to give.
- Do not scrape the Ad Library or Instagram pages. Meta prohibits automated collection without written permission, and the Ad Library API does not return Nigerian commercial ads.
- Never record customers' or commenters' personal data in logs or sheets.

## Not verified

- Whether maintained third-party Meta MCP servers exist, and what they cost or permit
- Meta's current rate card on the day you quote
- App Review turnaround (estimated at a few days to two weeks)
- ARCON and FCCPC rules for land, loans or health ads

Pricing and client-finding notes from the same research stay in the chat doc "Meta API"; they are business planning, not code.
