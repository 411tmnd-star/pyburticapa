"""Input/output-folder behaviour of the converters: nothing is hardcoded, nothing runs on import.

Standard library only (the PDF test is skipped when PyMuPDF is not installed).
    python -m unittest discover -s tests
"""
import importlib.util
import inspect
import json
import os
import subprocess
import sys
import tempfile
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = lambda *p: os.path.join(ROOT, "python_skills", *p)


def py(*args, cwd=None):
    p = subprocess.run([sys.executable, "-B", "-X", "utf8", *args], capture_output=True, text=True, encoding="utf-8", cwd=cwd)
    return p.returncode, p.stdout + p.stderr


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    sys.path.insert(0, os.path.dirname(path))
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.path.pop(0)
    return mod


class ConvertJson(unittest.TestCase):
    def test_import_has_no_side_effects_and_cli_takes_folders(self):
        with tempfile.TemporaryDirectory() as t:
            cwd = os.path.join(t, "cwd")
            os.makedirs(cwd)
            before = os.getcwd()
            os.chdir(cwd)
            try:
                load(T("knowledge_extraction", "v2", "convert.py"), "convert_mod")
            finally:
                os.chdir(before)
            self.assertEqual(os.listdir(cwd), [], "importing convert.py must not create anything")
            src, out = os.path.join(t, "in"), os.path.join(t, "out")
            os.makedirs(src)
            with open(os.path.join(src, "c.json"), "w", encoding="utf-8") as f:
                json.dump({"title": "T", "messages": [{"author": {"role": "user"}, "content": {"parts": ["hi"]}, "text": "hi"}]}, f)
            rc, text = py(T("knowledge_extraction", "v2", "convert.py"), src, "--out", out)
            self.assertEqual(rc, 0, text)
            self.assertTrue(os.path.exists(os.path.join(out, "c.md")))


class ChatReplyExtractor(unittest.TestCase):
    def test_no_file_names_or_markers_in_the_code(self):
        code = open(T("chat_reply_extractor", "chat_reply_extractor.py"), encoding="utf-8").read()
        for needle in ("kaka", "Untitled document", "Content Discovery", "youtu.be", "Yes—we need", "potential customers"):
            self.assertNotIn(needle, code)

    def test_handlers_file_drives_the_run(self):
        with tempfile.TemporaryDirectory() as t:
            src, out = os.path.join(t, "src"), os.path.join(t, "out")
            os.makedirs(src)
            with open(os.path.join(src, "my chat.md"), "w", encoding="utf-8") as f:
                f.write("a\nSTART here\nmiddle\nthe END marker\nz\n")
            cfg = os.path.join(t, "h.json")
            with open(cfg, "w", encoding="utf-8") as f:
                json.dump({"convert": [{"label": "mine", "source": "my chat.md", "output": "mine_replies.md", "handler": "untitled",
                                        "options": {"start_marker": "START", "end_marker": "END marker"}}]}, f)
            rc, text = py(T("chat_reply_extractor", "chat_reply_extractor.py"), src, "--out", out, "--handlers", cfg)
            self.assertEqual(rc, 0, text)
            self.assertEqual(open(os.path.join(out, "mine_replies.md"), encoding="utf-8").read(), "START here\nmiddle\nthe END marker\n")

    def test_bad_handlers_file_is_exit_2(self):
        with tempfile.TemporaryDirectory() as t:
            cfg = os.path.join(t, "h.json")
            with open(cfg, "w", encoding="utf-8") as f:
                json.dump({"convert": [{"label": "x", "source": "a.md", "output": "b.md", "handler": "nope"}]}, f)
            rc, text = py(T("chat_reply_extractor", "chat_reply_extractor.py"), t, "--handlers", cfg)
            self.assertEqual(rc, 2, text)
            self.assertIn("unknown handler", text)

    def test_shipped_handlers_file_is_valid(self):
        mod = load(T("chat_reply_extractor", "chat_reply_extractor.py"), "cre_mod")
        cfg = mod.load_handlers(mod.DEFAULT_HANDLERS_FILE)
        self.assertTrue(cfg["convert"])


class NoPersonalPaths(unittest.TestCase):
    def test_knowledge_recovery_has_no_desktop_default(self):
        for name, needle in (("store.py", "CHATGPT_CLEAN"), ("recover.py", "Desktop")):
            with open(T("knowledge_recovery", name), encoding="utf-8") as f:
                self.assertNotIn(needle, f.read())


class Gemini(unittest.TestCase):
    def test_verify_has_no_built_in_turn_count(self):
        gp = load(T("gemini_md2", "gemini_parse.py"), "gp_mod")
        self.assertIsNone(inspect.signature(gp.verify).parameters["expected_turns"].default)

    def test_batch_does_nothing_on_import_and_needs_an_output_folder(self):
        try:
            import requests  # noqa: F401
        except ImportError:
            self.skipTest("requests not installed")
        with tempfile.TemporaryDirectory() as t:
            before = os.getcwd()
            os.chdir(t)
            try:
                load(T("gemini_md2", "gemini_batch.py"), "gb_mod")
            finally:
                os.chdir(before)
            self.assertEqual(os.listdir(t), [])
        rc, text = py(T("gemini_md2", "gemini_batch.py"), "https://share.gemini.google/x")
        self.assertNotEqual(rc, 0)
        self.assertIn("--out", text)


class PdfFolder(unittest.TestCase):
    def test_folder_in_folder_out(self):
        try:
            import fitz  # noqa: F401
        except ImportError:
            self.skipTest("PyMuPDF not installed")
        import fitz
        with tempfile.TemporaryDirectory() as t:
            src, out = os.path.join(t, "pdfs"), os.path.join(t, "md")
            os.makedirs(src)
            for n in ("a", "b"):
                d = fitz.open()
                d.new_page().insert_text((72, 72), f"hello {n}")
                d.save(os.path.join(src, n + ".pdf"))
            rc, text = py(T("pdf_to_md", "pdf_to_md.py"), src, out)
            self.assertEqual(rc, 0, text)
            self.assertEqual(sorted(os.listdir(out)), ["a.md", "b.md"])


if __name__ == "__main__":
    unittest.main()
