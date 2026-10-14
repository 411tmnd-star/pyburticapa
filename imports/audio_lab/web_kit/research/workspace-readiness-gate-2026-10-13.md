# Workspace readiness gate (Accretion v0)

Date: 2026-10-13, about 00:25 local. Follows the Step 0 baseline and the Step 0 review (both unchanged). Written for the project owner. Scope: find out whether anything can still write to the Motion Lab project, explain the `preview/dist` discrepancy, and set the safe working method. Nothing was implemented, installed, rebuilt, repaired, committed or published. Local clock is UTC+1 relative to the session logs (verified: the snapshot's `squall.js` mtime 20:16:54 local matches the Squall session's build at 19:16:49Z).

Labels: **VERIFIED**, **INFERRED**, **PROPOSED**, **UNKNOWN**.

---

## 1. Active processes and concurrent writers

**Node processes (VERIFIED, `Win32_Process` with parent PIDs):**

| PID | Started (local) | Parent | Command line |
|---|---|---|---|
| 19432 | 12 Oct 20:43:50 | cmd.exe 8876 | `node npx-cli.js -y @nanonets/graft mcp` |
| 10504 | 12 Oct 20:43:53 | cmd.exe 17604 | `node npx-cli.js -y @nanonets/graft mcp` |
| 14832 | 12 Oct 20:43:53 | cmd.exe 1080 | `node .../npm-cache/_npx/.../@nanonets/graft/dist/cli.js mcp` |
| 18148 | 12 Oct 20:43:56 | cmd.exe 9644 | `node .../@nanonets/graft/dist/cli.js mcp` |

These are the graft code-index MCP server (launch and child process). Their current working directory is not exposed by the tooling available here (UNKNOWN). They are the only node processes running.

**Other processes checked (VERIFIED):** no esbuild, tailwindcss, `serve.mjs`, Edge automation or preview-port listeners. Ports 5353, 9333, 9444 and 9445 are not listening. The `msedgewebview2` processes belong to Windows Search (`SearchHost.exe`), started 19:40, and are not project-related. `handle.exe` is not installed, so open file handles could not be listed (UNKNOWN for handles).

**Writes into the project (VERIFIED):**
- No file under `audio_lab` (excluding `.venv` and `node_modules`) has a modification time after **20:28:19 local**, which is my own Step 0 report. This covers the period through 00:24 today.
- The only file modified in the 3 hours before now is my Step 0 report.

**Graft storage (VERIFIED):** `C:\Users\USER\.graft` was last written 11 Oct 23:48. The npm cache for the graft package was last written 2 Oct. The project has no `.graft` folder. Graft does not appear to write into the project.

**Sessions (VERIFIED from `.claude/projects` logs):** the only session file modified in the last 3 hours is the current conversation. The Squall session (`c055ddcc`) ended at 19:21Z, and the earlier build and tool-harness sessions ended well before that.

**Conclusion on the writer:** no active writer was observed in the last four hours. I cannot prove that the graft processes never write (their behaviour and cache location were not inspected in depth), and a person can run the README build commands at any time. So a concurrent writer is **not ruled out**, though none is active.

---

## 2. The `preview/dist` discrepancy

### What is on disk

| File | Snapshot (Step 0, 20:16) | Live (20:19) |
|---|---|---|
| `squall.js` | 312,999 B, SHA-256 `4A273FE2…42B` | 2,102,262 B, SHA-256 `B73A4B86…E507` |
| `squall.css` | 25,286 B, SHA-256 `C1115499…11EB` | 35,764 B, SHA-256 `18B03D2B…3E89` |

The live pair is preserved, unchanged, in `C:\Users\USER\Desktop\audio_lab_snapshots\2026-10-13_live-dist-evidence\` with `HASHES.csv`. I verified that the preserved copies match the live files byte-for-byte. The live files and the snapshot were not modified.

### Traced source

1. **The snapshot pair is the minified build.** The Squall session ran `esbuild … --minify` and `tailwindcss … --minify` at 19:16:49Z (`c055ddcc`, line 661), and the Squall suite passed against it. Its output timestamps match the snapshot (20:16:54 and 20:16:57 local) (VERIFIED).
2. **The live pair is what the README's commands produce without `--minify`.** `preview/README.txt` was appended by the Squall session at 19:11:24Z, with esbuild and tailwind commands under "Preview (Windows PowerShell)". Those commands contain no `--minify`.
   - Rebuilding `squall.js` from the same source with the README's esbuild command, run in PowerShell, gave **2,102,262 bytes and a matching SHA-256** to the live file (VERIFIED in this session, with the hash comparison).
   - The README's tailwind command without `--minify` gave **35,764 bytes, matching the live `squall.css`** (VERIFIED).
   - The mechanism is INFERRED: PowerShell strips the inner double quotes from `--define:process.env.NODE_ENV='"development"'`, so esbuild receives an unquoted identifier. esbuild warns about exactly this, and the bundle becomes a development build. The 2.1 MB size is consistent with that.
3. **Timing.** The live files were written at 19:19:19Z and 19:19:21Z. No session log contains a command writing to the project at that time. The Squall session's last command was at 19:16:49Z, and its final text reported Squall finished at 19:17:25Z.

**Which actor:** UNKNOWN. The writer is most likely a person or a session following the README in PowerShell at 20:19 local. The process has since exited, and no session log records it.

### Consequences
- The live `preview/dist/squall.js` is a development build. `preview/serve.mjs` serves it at `/squall` now.
- The Squall browser suite results (70 checks and 17 checks) were recorded against the **minified** build, before 19:19Z. Whether they hold against the live development build is **not verified** and should not be assumed.
- **Compatibility baseline:** the snapshot build, as you directed. The live pair is kept for investigation and is not used.

---

## 3. Other findings that affect the workspace

1. **A stale divergent copy exists.** The tool-harness session's scratch folder `…\tool-harness\723e77bb…\scratchpad\web353` still holds a second `web_kit`. It differs from the live `web_kit` (11 lines in `src`, 4 in `tests`, 8 in `preview`). That session copied files into the live project with `Copy-Item` and `cp -r` at 14:22, 14:42 and 15:35 local, so any repeat of that copy would overwrite live work. **Do not use this folder as a source.**
2. **Dependencies were installed into the live `web_kit` by an earlier session.** At 17:03 local, the Squall session ran `npm install --no-package-lock` and `npm install --no-save … esbuild tailwindcss@3 playwright-core` in `web_kit`. That explains the 71 undeclared packages (Step 0, section 5). The state of `node_modules` before that point is not recoverable. `node_modules` is replaceable, and `package.json` shows mtime 14:33, before the snapshot.
3. **There are no lockfiles**, as recorded in Step 0.
4. **Scratch cleanup.** I wrote three hash lists to `/tmp` during this review, outside the scratchpad convention, and have removed them.

---

## 4. Separate working copy: required

**Yes.** Reasons:
- A writer cannot be fully excluded (section 1).
- The documented build commands write into the live `preview/dist` whenever someone runs them (section 2).
- The live project already contains an unexplained rebuild and a divergent scratch copy (section 3).

Implementation must happen in a separate copy, created from a fresh second snapshot. The original project then stays read-only for the whole implementation.

---

## 5. Recovery and hash-comparison procedure (PROPOSED)

**Rules:** never write into an existing snapshot folder; the script refuses to run if the destination exists. Hashes use SHA-256 via `Get-FileHash`. Relative paths use forward slashes internally.

**A. Second snapshot (at implementation start, before any change):**
1. `$dst = 'C:\Users\USER\Desktop\audio_lab_snapshots\<YYYY-MM-DD>_pre-accretion-impl'`. Stop if it exists.
2. `robocopy <live> "$dst\audio_lab" /E /COPY:DAT /R:1 /W:1 /XD .venv node_modules .next __pycache__ .pytest_cache *.egg-info`
3. Build `MANIFEST.sha256.csv` from the **copy**, with columns `Path` (relative), `Bytes`, `Sha256`, sorted by path. Exclusions match step A2.
4. Verify by re-hashing the copy against its manifest (0 mismatches expected). Verify the live project against the same manifest, and **record any difference as a pre-existing discrepancy before continuing**.
5. Write `README.txt` next to the manifest with the restore command.

**B. Working copy:**
1. Create the working copy from the second snapshot, never from the live project or the scratch copy: `robocopy "$dst\audio_lab" <work> /E /COPY:DAT`.
2. Dependencies in the working copy are reinstalled only when the implementation step explicitly allows it, and the install is recorded.

**C. Before-and-after comparison (after each implementation step, and at the end):**
1. Build `M1` from the working copy with the same method (exclusions identical, `.venv` and `node_modules` excluded).
2. Compare `M1` with the baseline manifest `M0` on path, size and SHA-256. Classify every difference:
   - **MODIFIED**, allowed only for `web_kit/package.json`, and only the `three` and `@types/three` lines. Check this with a JSON diff.
   - **ADDED**, allowed only for paths on an explicit allowlist written before implementation. The allowlist is the Accretion v0 file list from the Step 0 report, section 6.3, plus this report's folder for any new research note.
   - **DELETED**, never allowed.
   - **RENAMED**: a path present in `M0` only, with the same hash as a path present in `M1` only. Report it; it is never allowed by default.
   - **UNEXPLAINED**: any other change, including any change in a path outside the allowlist.
3. A run passes only with zero UNEXPLAINED entries and zero DELETED or RENAMED entries.
4. **Original project proof:** repeat the same comparison on the live project at the end. It must show no differences except the two live `dist` files already preserved, and no added files other than those created by the Step 0 report.

**D. Browser and build outputs:** generated files (`preview/dist`, `shots`) are written only in the working copy. Any file not in the allowlist and not in `M0` counts as UNEXPLAINED, so the check catches stray outputs.

---

## 6. Remaining risks and next safe action

| Risk | Severity | Mitigation |
|---|---|---|
| A person or session rebuilds into the live `preview/dist` | Medium | Implementation happens only in the working copy |
| The graft processes could write to the project | Low (no evidence) | Watch the project for writes during implementation (step C); stop graft if writes appear (the user decides) |
| The live development `squall.js` is served at `/squall`, while the Squall suite was validated against the minified build | Medium | Use the snapshot build as the compatibility baseline; rebuild Squall only in the working copy |
| The divergent scratch copy is reused by mistake | Medium | Mark it do-not-use; do not copy from it |
| `node_modules` history before 17:03 is lost | Low | `node_modules` is replaceable; record the installed versions |
| No lockfiles | Medium | Record `npm ls` and `pip freeze` at the second snapshot |
| Browser-harness results are software-rendered | Known | Accretion GPU runs use a new launcher (Step 0 section 6.1) |

**Next safe action:** create the second snapshot (procedure A) into a new folder and verify it. This changes nothing in the live project.

---

## 7. Decision

**SAFE TO PREPARE WORKSPACE.**

Reasons: no active writer has been observed in four hours; the `preview/dist` discrepancy is traced to a reproducible README build; both live versions are preserved with hashes; and the next step, a new snapshot plus a separate working copy, only reads the project. Implementation may begin only after the second snapshot is verified and the allowlist is written. The writer is **not fully excluded**, so the working copy is mandatory and the original project must stay untouched throughout.

---

## 8. Changes made in this gate

- **Created:** this report, and the evidence folder `C:\Users\USER\Desktop\audio_lab_snapshots\2026-10-13_live-dist-evidence\` (two preserved live files and `HASHES.csv`).
- **Read only:** processes, file metadata, session logs, the graft storage folders.
- **Not changed:** the live project, the snapshot, the manifest, `DESIGN.md`, the earlier reports, dependencies, lockfiles, build output.
- Removed my own three `/tmp` scratch files. Nothing was committed, pushed, deployed or published.
