# Payload mapping: `ujx1Bf` batchexecute response (share `bee612da159c`)

Derived from `debug/python_replay_response.bin` and checked against the browser-rendered ground truth `debug/browser_rendered_text.txt` (40,511 chars). Implemented in `gemini_parse.py`.

## 1. Framing

```
)]}'                                   <- XSSI guard, stripped
<length>                                <- decimal byte count (skipped)
[["wrb.fr","ujx1Bf","<JSON string>", ...]]        <- chunk 0: the data
<length>
[["di",<ms>],["af.httprm",<ms>, ...]]               <- chunk 1: timing info
<length>
[["e",4, ...]]                                      <- chunk 2: end marker
```

3 chunks were parsed. Exactly one `wrb.fr` entry has RPC id `ujx1Bf`. Its third element is a JSON string (103,097 chars) that `json.loads` turns into the payload `inner`.

## 2. Top level (`inner`)

| Path | Meaning | Value in this chat |
|---|---|---|
| `inner[0][1]` | list of turn records | 9 records |
| `inner[0][2][1]` | chat title | "Whats next from here and what has been done" |
| `inner[0][2][7][2]` | model label | "Flash" |
| `inner[0][3]` | share id | `bee612da159c` (equals the id in the URL) |
| `inner[0][4][0]` | publish time, epoch seconds | 1790284707 = 2026-09-24T21:18:27Z (page: "Published September 24, 2026 at 10:18 PM", UTC+1) |
| `inner[0][6]` | thumbnail image URL | not used |

## 3. One turn record `t = inner[0][1][i]`

| Path | Meaning | Evidence |
|---|---|---|
| `t[0]` | `[conversation_id, response_id]` | `["c_c0ba7df8602bcad7","r_5519af4db224056e"]` for turn 4 |
| `t[1]` | parent reference `[conversation_id, previous response_id, rc id]` | turn 4's `t[1][1]` equals turn 3's `t[0][1]` |
| **`t[2][0][0]`** | **user text** (string, empty `""` for attachment-only turns) | 8 of 9 non-empty; first words match every rendered "You said" header, in order |
| `t[2][0][4][0][3][k]` | user attachments; `[k][2]` filename (masked), `[k][3]` image URL, `[k][11]` MIME type | turns 1 (2 images), 7 and 9 |
| `t[2][4]` | model id `fbb127bbb056c959` | not used |
| **`t[3][0][0][1][0]`** | **Gemini reply text** (Markdown string) | present in all 9 turns, all matched in the render |
| `t[3][0][0][0]` | candidate id `rc_…` | not used |
| `t[3][0][0][30][0][5][4][0][4][0][0]` | embedded YouTube card `[title, video id, url, channel, null, [description], null, views, null, ISO-8601 duration, publish date, …]` | turn 1: "How to Complete Onboarding on Outlier AI (Full Guide)", Chris Tech Guide, 2412 views (rendered "2.4K views"), PT8M26S |
| `t[3][12]`, `t[3][0][0][37]` | structured copy of the same sections, plus empty placeholders | section strings repeat the Gemini text: 34 of 36 `t[3][12][0][0][k][1][2]` strings were found inside `t[3][0][0][1][0]` (the other 2 were not investigated); not used, since `t[3][0][0][1][0]` already covers the whole render |
| `t[4][0]` | turn time, epoch seconds | turn 1: 2026-09-22T15:20:31Z |

Turn 7 (index 6) has `t[2][0][0] == ""` and an attachment, so the user side is an image only. This accounts for 8 "You said" markers in the render against 9 turn records.

## 4. How the mapping was established (not assumed)

1. `debug/path_coverage.py` took every string of 25+ characters in the turns and checked its words against the rendered text. The paths above carried the rendered text: `t[2][0][0]` (8 of 8 in render) and `t[3][0][0][1][0]` (9 of 9). Other hits were the duplicate structure `t[3][12]…` and the video card. Non-hits were image tokens and URLs.
2. `debug/reverse_coverage.py` split the render at each "You said" header and checked every rendered line against the extracted user and Gemini text. Result: **1 uncovered line out of the whole page**, "Chris Tech Guide · 2.4K views", found at the card path above.
3. The final verifier repeats this on the finished Markdown (section 6).

## 5. How formatting is represented

- Text fields are already **Markdown**: headings (`### …`), bullets (`* …`), bold (`**…**`), italics (`*…*`), real links `[title](url)`, bare URLs. No conversion was needed or performed, and none of it was rewritten.
- Gemini text has Gemini-internal source markers such as `[cite: 2]` (30 in this chat). The page renders them as file chips (the word "JPG" in the render). They are kept verbatim.
- The line `http://googleusercontent.com/youtube_content/1` in turn 1 is a placeholder marking where the video card sits. It is kept verbatim, and the card's real title, URL and channel are added as a blockquote after that turn.
- **Not exercised by this chat:** fenced code blocks (0) and tables (0). Code and table preservation is therefore *untested*, though the text fields are passed through unmodified, so Markdown fences in a payload would carry through. That must be confirmed on a chat that contains code.

## 6. Verification against the browser render (16 checks, all pass)

Turn count 9; 9 `## User` / `## Gemini` pairs in order; every payload string preserved verbatim in its own turn; 8 user headers match the 8 non-empty user turns in order; **100.0000%** of 4,839 rendered word tokens present in the Markdown; **100.0000%** of the Markdown's content words present in the render; 40/40 sampled rendered lines found verbatim (formatting-normalised); 7/7 payload URLs preserved; link count 2 in payload, 3 in output (the extra is the card link); source URL preserved in front matter. Extracted 40,011 chars against 39,285 chars in the render (the render excludes the `[cite: N]` markers and the `You said` labels).

Rendered "You said …" headers were excluded from the reference because they are UI labels, some ellipsised ("project ass…").
