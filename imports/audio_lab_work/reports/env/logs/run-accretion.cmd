@echo off
cd /d "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\web_kit"
node preview/accretion-check.mjs "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\evidence" > "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\accretion-check.out" 2>&1
echo ACCRETION_EXIT=%ERRORLEVEL% >> "C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\env\logs\accretion-check.out"

