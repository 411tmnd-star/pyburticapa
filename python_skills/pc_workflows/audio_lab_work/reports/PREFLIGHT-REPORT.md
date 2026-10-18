# Accretion v0: reproducibility preflight

Date: 2026-10-13. Written for the project owner. Stored outside the working copy so the copy remains clean. No application source, test, `DESIGN.md` or `package.json` was edited. Nothing was committed, pushed, deployed or published. No Accretion code was written.

Labels: **VERIFIED** (run in this session), **INFERRED**, **PROPOSED**, **UNKNOWN**.

Workspace: `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\` (writable copy). Environments (outside the copy): `...\2026-10-13_accretion-v0\env\venv-py311\`, `...\env\js-lock\`. Logs: `...\env\logs\`.

---

## 1. Python environment

**Reconstruction**
- Python 3.11.0 (`C:\Users\USER\AppData\Local\Programs\Python\Python311\python.exe`), the same interpreter as the original `.venv` (`pyvenv.cfg`).
- The original `.venv` has no lockfile. The versions come from the recorded `dist-info` names (`env\python-dist-info-from-venv.txt`), converted to 48 exact pins (`env\requirements-recorded.txt`). The `audiolab` editable entry was excluded.
- Installed fresh with `pip install --no-deps --only-binary=:all: -r requirements-recorded.txt` (exit 0). Nothing was upgraded, and no source distribution was built.
- `pip check`: "No broken requirements found", exit 0.
- **No `.pth` file pointing at the live source** exists in the new venv (only `distutils-precedence.pth`). The old `.venv` is not used.

**Import resolution (VERIFIED):** with `PYTHONPATH=<work>\src`, `audiolab.__file__` is `...\2026-10-13_accretion-v0\audio_lab\src\audiolab\__init__.py`. No live path and no live venv appears on `sys.path`. Note: `-I` ignores `PYTHONPATH`, so the import check and the suite run without `-I`, using `-B` and `-p no:cacheprovider` instead. This is a deviation from the Step 0 command, recorded here.

**Test result (VERIFIED):** `python -B -m pytest -p no:cacheprovider -q --no-header` in the working copy → **385 passed, 5 warnings, exit 0**, 121.7 s. The count matches the Step 0 baseline exactly. No `__pycache__` or `.pytest_cache` was created in the copy.

**Gaps:** there is no Python lockfile, so the environment is reproduced by version pin, not by hash. The original wheel hashes were not recorded, so byte-identity with the original venv is **UNKNOWN**.

---

## 2. JavaScript environment

**Recorded inventory:** `node_modules/.package-lock.json` (npm's hidden lockfile, 84 packages, each with version and SHA-512 integrity) was saved to the snapshot's `env\` folder. `package.json` declares six devDependencies with caret ranges.

**Declared versus installed (VERIFIED):**

| Package | Declared | Recorded | Note |
|---|---|---|---|
| react, react-dom | ^19.3.0 | 19.3.0 | within range |
| @types/react, @types/react-dom | ^19.3.0 | 19.3.0 | within range |
| @types/node | ^22.20.5 | 22.20.5 | within range |
| typescript | ^5.9.3 | 5.9.3 | within range |
| esbuild | **not declared** | 0.28.2 | used by the build |
| tailwindcss | **not declared** | 3.4.19 | used by the build |
| playwright-core | **not declared** | 1.64.0 | used by the browser harness |

**Why `npm ci` needed reconstruction (VERIFIED):**
1. The recorded tree contains the three undeclared tools above. A plain install from `package.json` leaves them out, and `npm ci` installed only 9 packages. Those three were added as direct devDependencies **in the environment-only copy** of `package.json`, pinned to the recorded versions. The project's `package.json` was not changed.
2. The hidden lockfile omits 26 optional, platform-filtered packages (25 `@esbuild/*` binaries and `fsevents`), so `npm ci` refused to run ("lock file out of sync"). Those 26 entries were added to the environment lock with version pins from esbuild's own optionalDependencies, and tarball URLs and integrity hashes from the npm registry. **These 26 entries are reconstructed, not copied from the original record.** They are marked `_reconstructed` in the environment lock.

**Result (VERIFIED):** `npm ci` (npm 11.19.0, Node 24.20.0) exit 0, "added 84 packages". All 84 recorded packages are installed at their recorded versions (**0 mismatches**). The tree was copied into the working copy's `web_kit\node_modules` (robocopy; excluded from the manifest).

**Caveat:** npm 11 reported `esbuild@0.28.2 (postinstall: node install.js)` as not run under its install-script policy. esbuild works (`esbuild --version` → 0.28.2, exit 0, and the minified build below reproduces byte-for-byte). Whether the original install ran that script is **UNKNOWN**.

**Commands and results (VERIFIED):**

| Command (in `web_kit`) | Exit | Result |
|---|---|---|
| `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json` | 0 | no errors (TypeScript 5.9.3) |
| `node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/lib.test.ts tests/instrument.test.ts tests/pipeline.test.ts tests/squall.test.ts` | 0 | **99 pass, 0 fail**, 24 suites |

**Exact reproducibility verdict:** the **version set and integrity hashes** of the recorded tree are reproduced (84/84), but the original `node_modules` was not byte-compared, and 26 entries came from the registry rather than the original record. I do **not** claim byte-exact reproduction.

**Not installed, as required:** `three`, `@types/three`.

---

## 3. Squall compatibility baseline

Command (run in the working copy with Bash, from the Step 0 documented command, minified): 
- `node_modules/.bin/esbuild preview/squall-entry.tsx --bundle --minify --outfile=preview/dist/squall.js --jsx=automatic --alias:@=./src --define:process.env.NODE_ENV='"production"'` → exit 0.
- `node node_modules/tailwindcss/lib/cli.js -c tailwind.config.cjs -i preview/input.css -o preview/dist/squall.css --minify` → exit 0.

| File | Output (working copy) | Step 0 snapshot | Result |
|---|---|---|---|
| `squall.js` | 312,999 B, `4A273FE2…42B` | 312,999 B, `4A273FE2…42B` | **byte-identical** |
| `squall.css` | 25,286 B, `C1115499…11EB` | 25,286 B, `C1115499…11EB` | **byte-identical** |

The copy's previous `dist` (the live development build, `b73a4b86…` / `18b03d2b…`) was overwritten **in the working copy only**. The live project's `dist` and the Step 0 snapshot are untouched, and the preserved evidence was re-verified against `HASHES.csv` in the previous step.

Earlier attribution is confirmed: the live development bundle is what the PowerShell-quoted README command produces. The documented minified command reproduces the baseline exactly, so the Squall compatibility baseline is **reproducible in this environment (VERIFIED)**.

---

## 4. Browser validation

Harness: `preview/serve.mjs` (port 5353, serving the working copy) with Microsoft Edge 155 over the DevTools Protocol. Every launch passes `--disable-gpu`, both in `cdp-lib.mjs` and in `cdp-check.mjs`.

| Suite | Run | Exit | Result | Authoritative? |
|---|---|---|---|---|
| `cdp-check.mjs` (Constellation, pipeline) | 2 runs | 0 | **13/13 passed** both times | yes (exit 0, every check printed) |
| `squall-check.mjs`, full | 1 run | **1** | printed "70/70 checks passed", but the log shows `Error: could not connect to Edge` at `squall-check.mjs:521` (the `launch({port:9445})` in section 7). Sections 7 (remainder) and 8 never ran. | **No.** The summary is printed in `finally`, so a crash still prints "N/N passed". |
| `squall-check.mjs states a11y` (rerun of the failed sections) | 1 run | 0 | **17/17 passed**, including all unsupported-capability, canvas, reduced-motion and accessible-name checks | yes for those sections |

**Interpretation:** every Squall section has passed in some run, with 0 failures recorded, but **no single full run completed cleanly**. The launch failure on port 9445 is intermittent: it happened in the full run and not in the rerun. It is the same failure recorded in Step 0. I did not change the shared helper, as instructed.

**Limitations:**
- All browser results are software-rendered (`--disable-gpu`). They say nothing about GPU frame pacing and must not be used as performance evidence.
- Edge only. No Chrome, Firefox, Safari or mobile.
- No listening, real fullscreen or real microphone.
- The `squall-check` summary cannot be trusted alone. Use the exit code and the `== N.` section headers.

---

## 5. Change control

Method: manifest before any environment work (`env\logs\manifest-PRE-preflight.csv`, 358 rows, identical to the baseline manifest), and manifest after all runs (`env\logs\manifest-POST-preflight.csv`, 358 rows). Excluded from both: `.venv`, `node_modules`, `__pycache__`, `.pytest_cache`, `*.egg-info`, which are environment artifacts recorded separately.

**Classification of every difference:**

| Category | Files | Status |
|---|---|---|
| Added | none | — |
| Removed | none | — |
| Renamed | none | — |
| Source, test, config, `DESIGN.md` | **none changed** | expected (no edits) |
| `package.json` | unchanged (byte-identical to baseline) | expected |
| `web_kit/preview/dist/squall.js`, `squall.css` | rebuilt with the documented minified command (byte-identical to the baseline) | **expected**: generated build output in the working copy |
| `web_kit/shots/*.png`, `pipe_*.png`, `squall-results.json`, `pipe_live_vs_offline.json` (32 files) | rewritten by the browser runs | **expected**: generated test evidence in the working copy. The Step 0 baseline copies of these files are still preserved in the snapshot. |
| Environment artifacts outside the manifest: `web_kit\node_modules` (copied from the verified environment), `env\venv-py311`, `env\js-lock`, `env\logs` | created | expected, recorded separately |

**Unexpected changes: none.** The live project still matches its baseline manifest (0 mismatches). The working copy has 0 reparse points (links) and no `__pycache__` or `.pytest_cache`.

---

## 6. Files changed or generated

- **Working copy, expected:** `web_kit\node_modules\` (copied), `web_kit\preview\dist\squall.js`, `squall.css` (rebuilt, byte-identical to baseline), `web_kit\shots\` (32 files rewritten by browser runs).
- **Workspace, outside the copy:** `env\venv-py311\`, `env\js-lock\` (environment-only `package.json` with the three added devDependencies, and the reconstructed `package-lock.json`), `env\requirements-recorded.txt`, `env\logs\` (all logs, manifests, and `add-optional-lock.cjs`, `edit-js-lock.cjs`, `missing-from-lock.json`, `run-browser.cmd`, `run-rerun.cmd`), `PREFLIGHT-REPORT.md`.
- **Live project, snapshots, evidence:** not changed.

Mistakes made and corrected during this preflight, for transparency:
- A relative-path bug in one PowerShell command (no effect on any file).
- An environment `package.json` and lock with a UTF-8 BOM, which broke JSON parsing; rewritten without BOM.
- A first `npm ci` attempt that installed only 9 packages (fixed as described in section 2).
- A `taskkill /im node.exe` line in one browser script, which I removed before it ran, because it would have stopped other sessions' node processes.

---

## 7. Remaining reproducibility gaps

1. Python: no lockfile and no recorded wheel hashes. Byte-identity with the original venv is UNKNOWN.
2. JavaScript: 26 optional-platform lock entries were reconstructed from the registry, not copied from the original record. The original `node_modules` was not byte-compared. The original esbuild postinstall state is UNKNOWN.
3. Undeclared dependencies (esbuild, tailwindcss, playwright-core and their tree) remain undeclared in `package.json`. This is a known project issue and was intentionally not fixed in this step.
4. The Squall browser suite has an intermittent launch failure (port 9445) that ends the full run early, and its summary line is not authoritative. Fixing it means changing the shared helper, which this preflight did not do.
5. No GPU-enabled browser run exists yet. The Accretion frame-pacing criteria cannot be checked until one is set up.

---

## 8. Can implementation proceed?

Pure parameter layer (`toAccretionParams` and its tests): **yes.** It needs only TypeScript and the Node unit tests, and both pass (`tsc` exit 0, 99/99, exit 0). No browser check is needed for that step.

Browser and GPU verification: **not yet.** The Squall suite needs one clean full run (or a documented harness fix, decided by you) before it can serve as a regression gate. The GPU launcher is still to be written.

---

## Decision

**PREFLIGHT PASSED — READY TO IMPLEMENT THE PURE ACCRETION PARAMETER LAYER**

Conditions carried forward, which must be resolved before the browser or GPU stages but do not block the pure layer:
- Obtain one clean full Squall browser run (exit 0, all sections), or agree a fix for the port-9445 launch failure.
- Treat the JavaScript tree as version-reproduced, not byte-reproduced, and record that in any later claim.
- Create the GPU-enabled launcher in a new file before any frame-pacing claim.
