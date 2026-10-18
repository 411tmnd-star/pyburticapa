Constellation Core v0 milestone (locked 2026-10-13, after the polish pass).
Recovery copy of every Constellation Core file in the working copy, plus hashes of the key evidence files.
Source of truth for restoring: copy web_kit\* over the working copy's web_kit\ (files are additive; serve-gl.mjs carries three extra route lines).
Verified: tsc clean; 222/222 JS tests; browser check 67/70 after the polish with 3 failures that are frame-rate checks affected by battery throttling (see CONSTELLATION-CORE-POLISH-AND-LOCK.md).
PENDING: frame pacing after the polish must be re-run on AC power: node preview/core-check.mjs <dir> (harness served on :5354).
