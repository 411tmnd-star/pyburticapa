# Job leads: leads.py

Scrape job postings, filter them against your skills, find a verified decision-maker address, and draft a short pitch, all as markdown files you review by hand. **Nothing is ever sent.**

```
scrape (Apify actor) -> filter (Claude, JSON verdict) -> enrich (Anymailfinder v5.1) -> draft (Claude) -> you review
```

## Run

Dry run, no keys, fixture data only:

```bash
python3 -I leads.py --dry-run --out leads_out
```

Verified here: `1 draft(s) for review, 4 not drafted. Nothing was sent.` The five fixture jobs cover each path: one drafted, one rejected by the filter, one with no company website, one where no verified address exists, one whose website is a LinkedIn page (never a company's own domain).

Live run (on your machine): set `APIFY_TOKEN`, `ANYMAILFINDER_KEY`, `ANTHROPIC_API_KEY`, then

```bash
python3 -I leads.py --search-url "<linkedin jobs search url>" --skills skills.md --out leads_out
```

## Output (in `leads_out/`, which git ignores)

| File | Holds |
|---|---|
| `snapshots/<job id>.md` | The posting itself, with `url`, `retrieved_at`, `source` front matter. This is evidence `verify.py` can check quotes against |
| `drafts/<job id>.md` | The draft: `status: needs-review`, recipient, a link to its snapshot |
| `run.md` | One line per job: drafted, skipped (and why) or error |

Live output contains real people's addresses. It stays on your machine; never commit it.

## What it gets right

- Uses the v5.1 decision-maker endpoint and keeps only `valid_email` (verified) results; risky ones are dropped.
- `verdict_of()` accepts only an explicit JSON `{"verdict": true}`; anything else is a rejection.
- `domain_of()` refuses social and job-board hosts (LinkedIn, Indeed, Lever, Greenhouse, Workday ...) and strips `www.` / `careers.` / `jobs.` prefixes.
- Retries on 429 and 5xx with backoff; one bad call is logged and the run continues.
- The draft prompt treats job text as data, never instructions.

## Not checked

- The Apify actor's input field names (its page does not list them), so the input is a template you can change with `--actor-input`.
- LinkedIn's terms on scraping and cold-email rules where recipients live. Check both before a live run.

Checked 2026-10-18 against the vendors' pages: the Anymailfinder endpoint, header and response fields; the actor's output fields (`title`, `companyName`, `companyWebsite`, `link`, `descriptionText`).

Course parts that upgrade this workflow: `W02` in [../../to_confirm/](../../to_confirm/).
