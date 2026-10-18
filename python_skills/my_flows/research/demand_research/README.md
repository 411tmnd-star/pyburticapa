# Demand research

No model output is 100% accurate, but a consolidation can be 100% traceable: every quote, number and claim points to a page you captured and opened, and you decided what it means.

- **Tools find leads.** A lead is a URL, never a fact.
- **Evidence** is a snapshot you saved, with its URL and retrieval date, containing the exact words the claim rests on.
- **Agreement between models proves little**: they can read the same page or share a blind spot. It only counts when each extractor quotes the same captured text and the quote is found there.
- **You decide.** Your review is the last layer.

## The loop

1. **One falsifiable question.** "Do [who] pay to solve [problem] today, and how?", plus what would prove you wrong.
2. **Wide pass for leads only.** Perplexity, Gemini over open tabs, HARPA on pages, YouTube searches. Output: URLs and the tool that found each. No claims yet.
3. **Capture.** Open each lead yourself; save the page, transcript or thread to `snapshots/` with URL and date. Check it is not suspiciously short.
4. **Extract with quotes.** Two tools, independently, each write claims with an exact quote.
5. **Mechanical check.** `verify_quotes.py` (for `claims.jsonl`) or `../evidence_verification/verify.py` (for `claims.md`). Counts are computed by code, never stated by a model.
6. **Adversarial pass.** Ask another tool to find evidence the demand does not exist and who is missing from your sample. Capture what it finds the same way.
7. **Human decision.** Accept or reject each row with a reason; only accepted rows feed the write-up.

When step 5 or 6 fails, go back to step 3; do not patch the claim.

## Role of each tool

| Tool | Use it for | Never for | Known risk |
|---|---|---|---|
| Perplexity | Wide first pass with source filters | Final claims | A cited link may not contain the claim |
| HARPA AI | Chat with the open page, YouTube summaries, page monitoring | Evidence on its own | Its summary is not the transcript |
| YouTube | Buyers describing the problem in their own words | Counting how common a view is | A popular video is not market size |
| Gemini in Chrome | Compare open tabs, summarise the current page | Final claims | Google says to check its responses |
| ChatGPT | Adversary: counter-evidence, holes in a claim | Source of facts | Over-complicates |
| Claude with Firecrawl | Capture pages to snapshots, extract claims with exact quotes | Pages it could not fully fetch | A partial scrape that looks complete |
| Reddit by hand | Stated pain, workarounds, willingness to pay | Measuring size | Loud minority, old threads |

Tool facts are source claims from the vendors' own pages and one secondary review; not tried here.

## The evidence record

| Field | Holds |
|---|---|
| id, claim | One statement, one idea |
| quote | Exact words from the source, at least 25 characters |
| snapshot | File name of the captured text |
| url, retrieved_at | Where and when you captured it |
| source_type, posted_at | Reddit, YouTube, web; when it was written |
| who | Role of the speaker (renter, vendor, creator). A vendor's post is not demand |
| found_by, extractor | Which tool found the lead, which wrote the claim |
| review_status, note | pending / accepted / rejected, and why |

## verify_quotes.py

```bash
cd example
python3 -I ../verify_quotes.py claims.jsonl snapshots/
```

Result (verified here): d1 passes, d2 passes despite a curly apostrophe and extra spaces in the snapshot, d3 fails (invented quote), d4 fails (no `retrieved_at`). `2/4 claims pass`, exit 1. A pass proves the words exist in your capture; whether they support the claim stays your call.

Add `--accepted accepted.md` to also write the claims that pass **and** carry `"review_status": "accepted"` in `claims.jsonl`, in the same format `verify.py` writes. That file feeds [`confirmed/demand_report`](../../../confirmed/demand_report/README.md) and [`confirmed/evidence_judge`](../../../confirmed/evidence_judge/README.md).

## Traps

| Trap | Counter |
|---|---|
| Confirmation: you search for demand and find it | Step 6, and keep the counter-evidence in the record |
| Complaint is not purchase | Prefer money signals: paying for a workaround, naming a price, switching tools |
| One story, many copies | Count threads and distinct authors by code |
| Stale pain | Record `posted_at`; `verify.py --max-age-days` |
| Vendor voice | The `who` field; vendor rows never count as demand |
| Model-stated numbers ("many users") | Compute every count from captured rows |
| Summary drift | Every sentence of the write-up cites row ids |
| Lead bias | Log `found_by`; after 20 claims see which tool's leads survived |

## Reddit

Reading threads by hand and saving short quotes for your own analysis is the safest route. Per Reddit's Developer Platform page (source claim, not legal advice): API access is for approved developers; commercial use needs permission and a contract; research goes through Reddit for Researchers; content cannot train models without consent; scraping is not addressed there, so do not assume it is allowed. Keep Reddit text out of anything public or ad-adjacent.

## Not verified

- Perplexity's Reddit/YouTube filters, HARPA's features, whether Firecrawl returns full Reddit threads
- How your DemandRecord contract maps to the record above
- Whether Reddit's commercial rules cover market research for your own business
- The 25-character minimum quote

Sources: [HARPA AI](https://harpa.ai), [Gemini in Chrome](https://www.google.com/chrome/ai-innovations/), [Perplexity review 2026](https://aiagentrank.io/blog/perplexity-review-2026), [Reddit: Accessing Reddit Data](https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data), [Evaluating AI research tools for verifiability (Bell Library)](https://www.youtube.com/watch?v=KV0LzamE0gc), [Claude vs ChatGPT vs Gemini vs Perplexity](https://www.youtube.com/watch?v=nvX2ML8IPwg).
