# UI Specifics 01

Entry 01 of the UI Specifics learning stream: every design shown in a 22-minute talk on scaling intent, quality and artistry with AI ([video](https://www.youtube.com/watch?v=GLvFTMtw4Jk)), taken down to the minimum: where it appears, the HTML and CSS, the motion timing, and the workflow that made it. Then originals built the same way. Open [index.html](index.html) in a browser.

Code only. Screenshots, thumbnails and the clay render stay out of the repo; the Blender script makes the render locally.

## Pages

| Page | What it is |
|---|---|
| `zombie/01-…09-*.html` + `kit.js` | The nine generic landing pages from the slide, rebuilt one per file. Small copy is a best reading of blurry text; fonts are close matches |
| `dezombie/zombie-bbq.html`, `dezombie/bulmat.html` | The de-zombie exercise: one fictional restaurant, template versus point of view |
| `../../breakdown/crit.html` | The lettered-pin crit sheet as a working tool |
| `tree.html` + `tree.js` | The prune-and-grow tree, with the talk's timing and a scrubber |
| `motion.html` | The campfire film pipeline, version 1 versus final, and the same camera grammar in Blender |
| `marbling.html` + `marbling.js` | Paper marbling simulated (drops, combs, waves, fine comb) |

## Anatomy: the formula all nine share

Counted from the frame. ● present, ○ absent.

| Element | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | Count |
|---|---|---|---|---|---|---|---|---|---|---|
| Two-line headline, line 2 tinted, italic or gradient | ● | ● | ● | ● | ● | ● | ● | ● | ● | 9 |
| One-sentence subhead in a muted tone | ● | ● | ● | ● | ● | ● | ● | ● | ● | 9 |
| Primary pill + secondary ghost button | ● | ● | ● | ● | ● | ● | ● | ○ | ● | 8 |
| Decorative glow, streak, blob or botanical | ● | ● | ● | ● | ● | ● | ● | ○ | ● | 8 |
| Product mock (dashboard, form, phone, docs) | ● | ● | ● | ○ | ● | ● | ● | ○ | ● | 7 |
| Serif display face | ● | ● | ○ | ○ | ● | ● | ○ | ● | ● | 6 |
| Big KPI numbers | ● | ● | ● | ● | ● | ○ | ○ | ○ | ● | 6 |
| "New / announcement" pill above the headline | ○ | ○ | ● | ○ | ● | ○ | ● | ○ | ● | 4 |
| Smooth area line chart | ● | ○ | ● | ○ | ● | ○ | ○ | ○ | ● | 4 |
| Donut, pie or progress ring | ● | ● | ○ | ○ | ○ | ● | ○ | ○ | ● | 4 |
| Stock-photo hero | ○ | ○ | ○ | ● | ○ | ○ | ○ | ● | ○ | 2 |

What none of the nine has: a fact only that business would know, a real product detail, a unit of its trade, or an image you couldn't swap onto another of the nine. That missing layer is the "point of view" (our inference).

## The method, for every next video

1. **Capture.** Screen-record each design with audio, about ten seconds either side.
2. **Timestamp.** Transcribe the recording, match it to the full transcript, read any scrubber on screen.
3. **Rebuild the generic.** Templates and slides get a faithful HTML/CSS rebuild with the formula counted.
4. **Break down the distinctive.** Artworks and films get a shot list, timings, tools seen, and an original piece made the same way.
5. **Go further.** Add the repos that push past what was shown, with licence checked ([../../references/DESIGN_REPOS.md](../../references/DESIGN_REPOS.md)).

## Not checked

- Which AI tools made the campfire film's style frames and video
- The talk's internal tools (a CLI with templates, a copy checker) are described, not shown
- Talk timestamps outside the user's recordings are interpolated from speaking pace
- Revenue and conversion figures quoted in the talk's sources are the company's own claims
