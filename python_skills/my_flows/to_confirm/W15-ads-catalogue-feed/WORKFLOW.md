# W15 · Ads catalogue feed

**Type** A: course + our workflow · **Goals** marketing, sales · **Status** to confirm

The first two steps of the ads layer: one clean product feed from the storefront, reconciled against the ad catalogue, with bad rows quarantined before anything reaches an ad platform.

## How the parts connect

1. storefront export → feed rows (id, title, price, image, link with UTM)
2. Dataset Contract Gate: rules per field; invalid rows quarantined, the run fails on a broken feed
3. Catalog Record Linker: reconcile the feed with what is already in the ad catalogue without silently merging different products
4. only then the Snap upload step (dry run first)

## Run (target)

```bash
python feed.py storefront_export.csv --out feed/ --dry-run
```

## Pass

On a fixture export with 3 planted errors, the 3 rows are quarantined with reasons and the clean feed matches the rest exactly.

When it passes on the laptop, it moves to `python_skills/confirmed/ads_feed` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
