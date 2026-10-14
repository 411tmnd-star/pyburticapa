"""Pipeline output -> discover.py (toolkit copy). Synthetic inputs only, generated here.

Discovery runs against an EMPTY root folder, so the Harness is never read. The only data searched is the
synthetic pipeline output, passed with --extra-sources.
Run: python -B -X utf8 test_discovery_link.py
"""
import json
import os
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.dirname(HERE)
TOOLKIT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DISCOVER = os.path.join(TOOLKIT, "discover", "discover.py")
sys.path.insert(0, PIPE)
sys.path.insert(0, HERE)
import convert_for_pipeline as A  # noqa: E402
import make_discovery_fixture as F  # noqa: E402


def discover(query, root, extra=None):
    cmd = [sys.executable, "-B", "-I", "-X", "utf8", DISCOVER, "--root", root, "--class", "note", "--json", "--top", "400"]
    if extra:
        cmd += ["--extra-sources", extra]
    r = subprocess.run(cmd + query.split(), capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        raise AssertionError("discover failed: " + r.stderr[-300:])
    return json.loads(r.stdout)["direct"]


def hits_from(items, marker):
    return [i for i in items if marker in json.dumps(i)]


class DiscoveryLinkTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.src = os.path.join(cls.tmp.name, "src")
        cls.out = os.path.join(cls.tmp.name, "out")
        cls.empty = os.path.join(cls.tmp.name, "empty_root")
        os.makedirs(cls.empty)
        os.makedirs(cls.src)
        F.write_jsonl(os.path.join(cls.src, "zorbex_session_synthetic.jsonl"))
        F.write_notes(os.path.join(cls.src, "quillfin_notes_synthetic.md"))
        with open(os.path.join(HERE, "fixtures", "google_ai_mode_synthetic.mht"), "rb") as f:
            data = f.read()
        with open(os.path.join(cls.src, "google_ai_mode_synthetic.mht"), "wb") as f:
            f.write(data)
        cls.rc = A.main([cls.src, cls.out])
        cls.config = os.path.join(cls.out, "discover_extra_sources.json")

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def test_pipeline_ran_and_config_excludes_prompts(self):
        self.assertEqual(self.rc, 0)
        with open(self.config, encoding="utf-8") as f:
            sources = json.load(f)
        self.assertEqual(sorted(s[0].split("/")[-1] for s in sources), ["documents", "replies"])
        self.assertFalse(any("prompts" in s[0] for s in sources))

    def test_reply_text_is_discoverable_with_provenance(self):
        items = discover("Zorbex kettle plug", self.empty, self.config)
        hits = hits_from(items, "Zorbex")
        self.assertTrue(hits, "no synthetic reply found")
        for h in hits:
            self.assertIn("replies/zorbex_session_synthetic.md", h["ref"]["file"].replace(chr(92), "/"))
        self.assertTrue(all("research note passage" in h["status"] for h in hits))

    def test_document_text_is_discoverable(self):
        items = discover("fabricated warranty ninety days", self.empty, self.config)
        self.assertTrue(any("documents/quillfin_notes_synthetic.md" in json.dumps(i).replace(chr(92), "/") for i in items))

    def test_prompt_only_word_is_never_returned_from_pipeline_output(self):
        # "colour" appears only in a PROMPT in the synthetic session, never in a reply or document
        prompts = os.path.join(self.out, "prompts", "zorbex_session_synthetic.md")
        with open(prompts, encoding="utf-8") as f:
            self.assertIn("colour", f.read())          # the word really is in a prompt (the test is not vacuous)
        items = discover("colour", self.empty, self.config)
        self.assertEqual(hits_from(items, "pipeline_out"), [])

    def test_control_without_config_finds_nothing(self):
        items = discover("Zorbex kettle plug", self.empty, None)
        self.assertEqual(hits_from(items, "Zorbex"), [])

    def test_repeatable(self):
        a = sorted(json.dumps(i, sort_keys=True) for i in discover("Quillfin lamp lumens", self.empty, self.config))
        b = sorted(json.dumps(i, sort_keys=True) for i in discover("Quillfin lamp lumens", self.empty, self.config))
        self.assertEqual(a, b)


if __name__ == "__main__":
    unittest.main(verbosity=2)
