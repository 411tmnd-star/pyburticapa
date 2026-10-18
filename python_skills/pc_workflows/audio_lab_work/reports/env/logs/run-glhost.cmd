@echo off
cd /d "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\web_kit"
set PYTHONDONTWRITEBYTECODE=1
node preview/glhost-check.mjs > "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\glhost-check.out" 2>&1
echo GLHOST_EXIT=%ERRORLEVEL% >> "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\glhost-check.out"

