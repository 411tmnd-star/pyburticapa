"""Create the Toolkit copy of discover.py. The original is only read.
Adjustments are made to the COPY only and each one is listed in discover/CHANGES_FROM_ORIGINAL.md."""
import difflib, hashlib, json, os, shutil

H1 = r"C:\Users\USER\Desktop\tool harness\1_PY"
D = r"C:\Users\USER\Desktop\Python_Toolkit\discover"
os.makedirs(D, exist_ok=True)


def sha(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()


def rd(p):
    return open(p, encoding="utf-8").read()


files = ["discover.py", "test_discover.py", "test_ollama_synthesis.py"]
for f in files:
    dst = os.path.join(D, f)
    if os.path.exists(dst):
        print("exists, not overwritten:", f)
        continue
    shutil.copy2(os.path.join(H1, f), dst)
    assert sha(os.path.join(H1, f)) == sha(dst)

# config: the Harness folder that holds registry/, assets/ and WORKFLOW_DISCOVERY_CATALOGUE.md
cfg = os.path.join(D, "discover_config.json")
if not os.path.exists(cfg):
    open(cfg, "w", encoding="utf-8").write(json.dumps({"root": H1, "note": "Harness folder read by discover.py. Change this when the registry moves."}, indent=1) + "\n")

changes = []
# 1) discover.py: default --root comes from discover_config.json (fallback: own folder, as before)
p = os.path.join(D, "discover.py")
s = rd(p)
if "def default_root" not in s:
    old = 'HERE = os.path.dirname(os.path.abspath(__file__))\n'
    new = old + (
        '\n\ndef default_root():\n'
        '    """TOOLKIT COPY: --root default read from discover_config.json beside this file; falls back to HERE."""\n'
        '    try:\n'
        '        with open(os.path.join(HERE, "discover_config.json"), encoding="utf-8") as f:\n'
        '            return json.load(f)["root"]\n'
        '    except (OSError, KeyError, ValueError):\n'
        '        return HERE\n'
    )
    assert s.count(old) == 1
    s = s.replace(old, new)
    old2 = 'ap.add_argument("--root", default=HERE)'
    assert s.count(old2) == 1
    s = s.replace(old2, 'ap.add_argument("--root", default=default_root())')
    open(p, "w", encoding="utf-8", newline="").write(s)
    changes.append("discover.py: added `default_root()` and made `--root` default to it (reads discover_config.json; falls back to the script folder). No other line changed.")

# 2) test_discover.py: script lives in the toolkit, data root is the Harness 1_PY
p = os.path.join(D, "test_discover.py")
s = rd(p)
if "SCRIPT_DIR" not in s:
    s = s.replace('HERE = os.path.dirname(os.path.abspath(__file__))\n',
                  'SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))   # TOOLKIT COPY: where discover.py lives\n'
                  'HERE = json.load(open(os.path.join(SCRIPT_DIR, "discover_config.json"), encoding="utf-8"))["root"]   # Harness data root\n', 1)
    s = s.replace('os.path.join(HERE, "discover.py")', 'os.path.join(SCRIPT_DIR, "discover.py")')
    s = s.replace('sys.path.insert(0, HERE)', 'sys.path.insert(0, SCRIPT_DIR)')
    if "import json" not in s.split("SCRIPT_DIR")[0]:
        s = s.replace("import subprocess", "import json\nimport subprocess", 1)
    open(p, "w", encoding="utf-8", newline="").write(s)
    changes.append("test_discover.py: `SCRIPT_DIR` (toolkit copy of discover.py) separated from `HERE` (Harness data root from discover_config.json); discover.py path and sys.path now use SCRIPT_DIR.")

# diff evidence
for f in ("discover.py", "test_discover.py"):
    a = rd(os.path.join(H1, f)).splitlines(keepends=True)
    b = rd(os.path.join(D, f)).splitlines(keepends=True)
    diff = "".join(difflib.unified_diff(a, b, "ORIGINAL/" + f, "TOOLKIT/" + f))
    open(os.path.join(D, f + ".diff"), "w", encoding="utf-8").write(diff)
    print(f, "diff lines:", diff.count("\n"))

open(os.path.join(D, "CHANGES_FROM_ORIGINAL.md"), "w", encoding="utf-8").write(
    "# Changes from the original Harness copy\n\nOriginals in `tool harness\\1_PY\\` are untouched.\n\n"
    + "\n".join("- " + c for c in changes) + "\n\n`*.diff` files hold the exact line differences.\n")
print("done; changes:", len(changes))
