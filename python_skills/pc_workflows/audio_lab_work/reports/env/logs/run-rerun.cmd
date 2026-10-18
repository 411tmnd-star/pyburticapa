@echo off
cd /d "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\web_kit"
set PYTHONDONTWRITEBYTECODE=1
node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/squall-check.mjs states a11y > "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\squall-check-rerun-states-a11y.out" 2>&1
echo RERUN_EXIT=%ERRORLEVEL% >> "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\squall-check-rerun-states-a11y.out"
