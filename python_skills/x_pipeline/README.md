# x_pipeline

Turns X/Twitter status links into one markdown note each (text, captions, quoted post, full X Article, images, video, transcript).

## One link (or a few)

```
pip install -r requirements.txt
python x_link.py https://x.com/someone/status/1234567890123456789
python x_link.py LINK1 LINK2 --out x_inbox --model small
```

`x_link.py` runs the four steps on just the links you give, inside its own `x_inbox/` folder, so `output_notes/` is not touched. It writes `x_inbox/SUMMARY.md` showing what was captured for each link. Exit code 0 = all captured, 1 = a link failed, 2 = no valid links. Re-runs skip finished work.

Tests (no network): `python -B tests/test_x_link.py`

Transcripts come from a local speech model, so names and numbers can be wrong.

## Many links

`python run_all.py LINK_OR_FILE ...` runs the four original steps into `output_notes/`. Give it links, or text files containing links. There is no built-in link list.
