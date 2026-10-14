"""Edits to the TOOLKIT copies only (pipeline.py and discover.py). Originals in the Harness are not touched."""
import json, os

T = r"C:\Users\USER\Desktop\Python_Toolkit"

# ---- 1. pipeline: unknown-structure files are treated as documents (user decision), not refused
p = os.path.join(T, "tools", "prompt_reply_pipeline", "pipeline.py")
s = open(p, encoding="utf-8").read()
if "DOCUMENT_BUCKET" not in s:
    old = '''        else:
            raise ValueError("no role markers and no known export format; refused, not guessed")
    except Exception as e:'''
    new = '''        else:
            # DOCUMENT_BUCKET: no role markers and no known export format. By decision these are treated as
            # documents: kept byte-for-byte, never split into prompts/replies, never claimed to be replies.
            log["status"] = "document"
            log["reason"] = "no role markers; treated as a document by decision (may contain prompts)"
            write_text(os.path.join(out, "documents", st + ".md"), text)
            write_json(os.path.join(out, "logs", st + ".json"), log)
            return log
    except Exception as e:'''
    assert s.count(old) == 1
    s = s.replace(old, new)
    # a chat-format file whose structure fails to parse is still refused (never guessed)
    s = s.replace('"unsure/ ... never guessed' , '"unsure/ ... never guessed')
    open(p, "w", encoding="utf-8", newline="").write(s)
    print("pipeline.py patched")

# ---- 2. discover copy: optional --extra-sources FILE (default behaviour unchanged)
p = os.path.join(T, "discover", "discover.py")
s = open(p, encoding="utf-8").read()
if "--extra-sources" not in s:
    old = '            d = os.path.join(notes_root, *rel.split("/"))\n'
    assert s.count(old) == 1
    s = s.replace(old, '            d = rel if os.path.isabs(rel) else os.path.join(notes_root, *rel.split("/"))   # TOOLKIT COPY: absolute extra source dirs allowed\n')
    old = '    ap.add_argument("--root", default=default_root())\n'
    assert s.count(old) == 1
    s = s.replace(old, old + '    ap.add_argument("--extra-sources", default=None, help="TOOLKIT COPY: JSON file [[absolute_dir, pattern], ...] of extra read-only note folders (e.g. pipeline output)")\n')
    old = "    c = Corpus(a.root)\n"
    assert s.count(old) == 1
    s = s.replace(old, '''    if a.extra_sources:                       # TOOLKIT COPY: opt-in only; without the flag behaviour is identical to the original
        global NOTE_SOURCES
        with open(a.extra_sources, encoding="utf-8") as f:
            NOTE_SOURCES = tuple(NOTE_SOURCES) + tuple((d, pt) for d, pt in json.load(f))
''' + old)
    open(p, "w", encoding="utf-8", newline="").write(s)
    print("discover.py patched")
