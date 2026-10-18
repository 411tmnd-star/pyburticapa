# Research

Our research workflows. Each folder is one workflow: its Python, a worked example you can run, and a README that says what a pass proves and what it does not. Everything here counts as **our workflow** when `../to_confirm/` joins it with the course.

| Folder | What it does | Run it | Expected |
|---|---|---|---|
| [evidence_verification/](evidence_verification/) | Checks every claim's quote is literally in the snapshot it cites (`claims.md` + `snapshots/`) | `cd evidence_verification/example && python3 -I ../verify.py claims.md snapshots/` | `7/13 claims pass`, exit 1 (the 6 failures are built in on purpose) |
| [demand_research/](demand_research/) | The 7-step demand loop; `verify_quotes.py` is the same check for `claims.jsonl` rows | `cd demand_research/example && python3 -I ../verify_quotes.py claims.jsonl snapshots/` | `2/4 claims pass`, exit 1 |
| [job_leads/](job_leads/) | Scrape, filter, enrich and draft job leads as markdown for review. Never sends | `cd job_leads && python3 -I leads.py --dry-run --out leads_out` | `1 draft(s) for review, 4 not drafted` |
| [411_lifecycle/](411_lifecycle/) | Proposed extension: demand to verified product to feedback, with three approval gates and a lifecycle ID | read only; Claude Code writes a gap report first | |
| [3d_marketing_engine/](3d_marketing_engine/) | The 3D model wearing a brand's merch, for the site and Snapchat ads. Body route: **Anny**. `legibility.py` checks a detail is visible at the render size | `python3 -I 3d_marketing_engine/legibility.py`; build is W10 in `../to_confirm/` | camera table: hero camera `5.11 - 6.51 mm / px` |
| [ads_layer/](ads_layer/) | Catalogue, creative, launch, tracking, report, decide; Snap Ads API steps; [Meta API path](ads_layer/META_API.md) | plan only; build is W15 | |
| [sources/](sources/) | Where each workflow came from, and the playbooks behind them | | |

Rules that hold across all of them:

- A model finds leads and drafts text; code checks; you decide. Your review is the last layer.
- Every fact carries an origin: **verified here**, **source claim**, **our inference**, **unchecked**.
- No keys in files: they come from environment variables.
- No real people's names or emails in the repo. Live outputs (`leads_out/`, snapshots of real pages) stay on your machine; `.gitignore` keeps them out.
