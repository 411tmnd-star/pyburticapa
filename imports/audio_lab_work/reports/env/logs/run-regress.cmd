@echo off
cd /d "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\web_kit"
node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/cdp-check.mjs > "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\regress-cdp-check.out" 2>&1
echo CDP_EXIT=%ERRORLEVEL% >> "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\regress-cdp-check.out"
node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/squall-check.mjs > "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\regress-squall-check.out" 2>&1
echo SQUALL_EXIT=%ERRORLEVEL% >> "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\regress-squall-check.out"

