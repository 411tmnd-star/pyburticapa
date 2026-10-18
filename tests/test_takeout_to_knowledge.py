"""End-to-end tests: fabricated ChatGPT export -> clean Markdown -> knowledge.db -> search and dossier.

Runs the real command-line scripts exactly as a user would (python -I), on the fixture from
tests/fixtures/make_takeout.py. Standard library only:  python -m unittest discover -s tests
"""
import csv
import json
import os
import subprocess
import sys
import tempfile
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPLIT = os.path.join(ROOT, "python_skills", "confirmed", "chatgpt_takeout_split", "takeout_to_clean_md.py")
RECOVER = os.path.join(ROOT, "python_skills", "confirmed", "knowledge_recovery", "recover.py")
sys.path.insert(0, os.path.join(ROOT, "tests", "fixtures"))
import make_takeout  # noqa: E402


def run(*args):
    p = subprocess.run([sys.executable, "-I", "-X", "utf8", *args], capture_output=True, text=True, encoding="utf-8")
    return p.returncode, p.stdout + p.stderr


def manifest(out):
    with open(os.path.join(out, "manifest.csv"), encoding="utf-8-sig", newline="") as f:
        return {r["conversation_id"]: r for r in csv.DictReader(f)}


class Pipeline(unittest.TestCase):
    """One shared build (split + ingest); each test reads it or makes its own copy to break."""

    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        t = cls.tmp.name
        cls.src, cls.clean, cls.db = (os.path.join(t, x) for x in ("src", "clean", "k.db"))
        cls.aliases, cls.exclude = os.path.join(t, "aliases.json"), os.path.join(t, "exclude.json")
        make_takeout.write(cls.src)
        make_takeout.write_aliases(cls.aliases)
        with open(cls.exclude, "w") as f:
            json.dump({"title_contains": [], "conversation_ids": []}, f)
        cls.split_rc, cls.split_out = run(SPLIT, "run", cls.src, cls.clean)
        cls.ingest_rc, cls.ingest_out = cls.recover("ingest", "--archive", cls.clean)

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    @classmethod
    def recover(cls, *args, db=None, exclude=None):
        return run(RECOVER, "--db", db or cls.db, "--aliases", cls.aliases, "--exclude", exclude or cls.exclude, *args)

    # ------------------------------------------------------------ takeout split
    def test_split_runs_and_verifies(self):
        self.assertEqual(self.split_rc, 0, self.split_out)
        rc, out = run(SPLIT, "verify", self.src, self.clean)
        self.assertEqual(rc, 0, out)
        self.assertIn("PASS", out)

    def test_manifest_counts_branches_and_skips(self):
        m = manifest(self.clean)
        self.assertEqual(len(m), 4)
        s = m["c0000001-sizing"]
        self.assertEqual((s["main_prompts"], s["main_replies"], s["alt_replies"]), ("3", "3", "1"))
        self.assertEqual(json.loads(s["skipped_by_type"]),
                         {"assistant/hidden": 1, "assistant/thoughts": 1, "assistant/tool_call": 1, "system/text": 1})
        self.assertEqual(m["c0000003-pricing"]["alt_prompts"], "1")  # the edited prompt
        self.assertEqual(json.loads(m["c0000003-pricing"]["skipped_by_type"]), {"assistant/empty": 1})

    def test_fork_is_linked_to_its_original(self):
        b = manifest(self.clean)["c0000002-branch"]
        self.assertTrue(b["fork_parent"].endswith("_c0000001.md"))
        self.assertEqual(b["fork_shared_messages"], "2")

    def test_image_part_becomes_a_placeholder(self):
        prompts = os.path.join(self.clean, "PROMPTS", "conversations-000")
        name = [n for n in os.listdir(prompts) if "c0000001" in n][0]
        with open(os.path.join(prompts, name), encoding="utf-8") as f:
            text = f.read()
        self.assertIn("[attachment: image_asset_pointer", text)
        self.assertIn("Here is a photo of the stall", text)

    def test_single_conversations_json_is_accepted(self):
        with tempfile.TemporaryDirectory() as t:
            make_takeout.write(os.path.join(t, "src"), single=True)
            rc, out = run(SPLIT, "run", os.path.join(t, "src"), os.path.join(t, "out"))
            self.assertEqual(rc, 0, out)
            rc, out = run(SPLIT, "verify", os.path.join(t, "src"), os.path.join(t, "out"))
            self.assertEqual(rc, 0, out)

    def test_verify_catches_edited_output(self):
        with tempfile.TemporaryDirectory() as t:
            make_takeout.write(os.path.join(t, "src"))
            out_dir = os.path.join(t, "out")
            run(SPLIT, "run", os.path.join(t, "src"), out_dir)
            folder = os.path.join(out_dir, "REPLIES", "conversations-000")
            path = os.path.join(folder, [n for n in os.listdir(folder) if "c0000001" in n][0])
            with open(path, encoding="utf-8") as f:
                text = f.read()
            with open(path, "w", encoding="utf-8") as f:
                f.write(text.replace("200 W", "900 W"))
            rc, out = run(SPLIT, "verify", os.path.join(t, "src"), out_dir)
            self.assertEqual(rc, 1, out)

    def test_hash_mismatch_stops_the_run(self):
        with tempfile.TemporaryDirectory() as t:
            make_takeout.write(os.path.join(t, "src"))
            hashes = os.path.join(t, "hashes.csv")
            with open(hashes, "w", newline="") as f:
                csv.writer(f).writerows([["Source", "SHA256"], ["conversations-000.json", "0" * 64]])
            rc, out = run(SPLIT, "run", os.path.join(t, "src"), os.path.join(t, "out"), "--hashes", hashes)
            self.assertEqual(rc, 2)
            self.assertIn("HASH MISMATCH", out)

    def test_refuses_to_overwrite_without_flag(self):
        rc, out = run(SPLIT, "run", self.src, self.clean)
        self.assertEqual(rc, 2)
        self.assertIn("--overwrite", out)

    # ------------------------------------------------------------ knowledge recovery
    def test_ingest_dedupes_branch_copies(self):
        self.assertEqual(self.ingest_rc, 0, self.ingest_out)
        self.assertIn("entries_parsed: 18", self.ingest_out)
        self.assertIn("unique_nodes: 16", self.ingest_out)  # s-u1 and s-a1 live in two files
        self.assertIn("families_with_branches: 1", self.ingest_out)

    def test_check_passes(self):
        rc, out = self.recover("check")
        self.assertEqual(rc, 0, out)
        self.assertNotIn("FAIL", out)

    def test_search_finds_misspelling_and_skips_unrelated(self):
        rc, out = self.recover("search", "SunBox", "--limit", "50")
        self.assertEqual(rc, 0, out)
        self.assertIn("one edit from 'sunbox'", out)
        self.assertIn("node p-u1", out)  # "Sunbx"
        self.assertIn("node s-a1b", out)  # the regenerated reply is searchable too
        self.assertNotIn("jollof", out.lower())
        self.assertIn("in 2 file(s)", out)  # the shared branch message is reported once, with both files

    def test_dossier_sections_and_labels(self):
        with tempfile.TemporaryDirectory() as t:
            rc, out = self.recover("dossier", "SunBox", "--out", t)
            self.assertEqual(rc, 0, out)
            with open(os.path.join(t, "sunbox_dossier.md"), encoding="utf-8") as f:
                md = f.read()
            with open(os.path.join(t, "sunbox_evidence.csv"), encoding="utf-8-sig", newline="") as f:
                rows = list(csv.DictReader(f))
        self.assertIn("5 hit + 1 context + 4 related", out)
        decision = md.split("`s-u2`")[1].split("```")[0]
        self.assertIn("user-stated-decision-candidate", decision)
        self.assertIn("pure sine inverter", md)  # RELATED: names a domain term, never the subject
        self.assertNotIn("jollof", md.lower())
        self.assertEqual(len(rows), 10)

    def test_excluded_conversation_is_left_out(self):
        with tempfile.TemporaryDirectory() as t:
            ex, db = os.path.join(t, "exclude.json"), os.path.join(t, "k.db")
            with open(ex, "w") as f:
                json.dump({"title_contains": ["Pricing"], "conversation_ids": []}, f)
            rc, out = self.recover("ingest", "--archive", self.clean, db=db, exclude=ex)
            self.assertEqual(rc, 0, out)
            rc, out = self.recover("search", "SunBox", db=db, exclude=ex)
            self.assertNotIn("node p-u1", out)
            self.assertIn("dropped as excluded: 1", out)


if __name__ == "__main__":
    unittest.main()
