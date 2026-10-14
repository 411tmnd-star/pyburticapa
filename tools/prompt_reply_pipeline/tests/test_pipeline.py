"""Independent tests for pipeline.py using only the synthetic fixtures in ./fixtures (fabricated content).
Run:  python -B -X utf8 test_pipeline.py        (no network, no model, no Harness or historical files)
All outputs go to temporary folders; the fixture folder is checked for changes."""
import hashlib
import json
import os
import sys
import tempfile
import unittest
import urllib.request
from unittest import mock

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
FIX = os.path.join(HERE, "fixtures")
sys.path.insert(0, os.path.dirname(HERE))
import pipeline as P  # noqa: E402


def rb(path):
    with open(path, "rb") as f:
        return f.read()


def rt(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def wt(path, text):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def rj(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def tree_hash(root):
    out = {}
    for dp, _, fs in os.walk(root):
        for f in fs:
            p = os.path.join(dp, f)
            out[os.path.relpath(p, root)] = hashlib.sha256(rb(p)).hexdigest()
    return out


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.before = tree_hash(FIX)
        self.tmp = tempfile.TemporaryDirectory()
        self.out = os.path.join(self.tmp.name, "out")
        # any network use is a test failure
        self.net = mock.patch.object(urllib.request, "urlopen", side_effect=AssertionError("network call attempted"))
        self.net.start()

    def tearDown(self):
        self.net.stop()
        self.tmp.cleanup()
        self.assertEqual(self.before, tree_hash(FIX), "fixtures were modified")

    def summary(self):
        return {r["file"]: r for r in P.cmd_separate(FIX, self.out)}

    def test_fixture_set_is_synthetic(self):
        for f in os.listdir(FIX):
            text = rt(os.path.join(FIX, f)).lower()
            self.assertTrue("synthetic" in text or "fabricated" in text or "fictional" in text, f)

    def test_json_export_split_is_exact(self):
        s = self.summary()["chatgpt_export_synthetic.md"]
        self.assertEqual((s["format"], s["status"]), ("chatgpt_json", "ok"))
        self.assertEqual((s["replies"], s["prompts"], s["other"], s["empty"]), (2, 2, 0, 3))
        p = os.path.join(self.out, "prompts", "chatgpt_export_synthetic.md")
        r = os.path.join(self.out, "replies", "chatgpt_export_synthetic.md")
        self.assertIn("What is a widget", rt(p))
        self.assertNotIn("What is a widget", rt(r))
        self.assertIn("fabricated device", rt(r))

    def test_plain_json_export(self):
        s = self.summary()["export_plain.json"]
        self.assertEqual((s["format"], s["status"], s["replies"], s["prompts"]), ("chatgpt_json", "ok", 1, 1))

    def test_perplexity_rule_split(self):
        s = self.summary()["perplexity_synthetic.md"]
        self.assertEqual((s["format"], s["status"], s["replies"], s["prompts"]), ("perplexity", "ok", 2, 2))
        log = json.load(open(os.path.join(self.out, "logs", "perplexity_synthetic.json"), encoding="utf-8"))
        self.assertEqual(log["format"], "perplexity")
        self.assertIn("[rule]", rt(os.path.join(self.out, "replies", "perplexity_synthetic.md")))

    def test_unknown_file_is_kept_as_document_byte_for_byte(self):
        s = self.summary()["notes_plain.md"]
        self.assertEqual(s["status"], "document")
        copy = rb(os.path.join(self.out, "documents", "notes_plain.md"))
        self.assertEqual(copy, rb(os.path.join(FIX, "notes_plain.md")))
        self.assertFalse(os.path.exists(os.path.join(self.out, "replies", "notes_plain.md")))
        self.assertFalse(os.path.exists(os.path.join(self.out, "prompts", "notes_plain.md")))

    def test_malformed_chat_is_refused_not_guessed(self):
        s = self.summary()["broken_chat.md"]
        self.assertEqual(s["status"], "refused")
        self.assertTrue(os.path.exists(os.path.join(self.out, "unsure", "broken_chat.md")))
        self.assertFalse(os.path.exists(os.path.join(self.out, "replies", "broken_chat.md")))

    def test_every_input_is_accounted_for(self):
        # only .md/.json/.txt are pipeline inputs; converter-only inputs (.jsonl/.mht/.pdf) are tested in ConverterAdapterTests
        s = self.summary()
        pipeline_inputs = [f for f in os.listdir(FIX) if f.lower().endswith((".md", ".json", ".txt"))]
        self.assertEqual(sorted(s), sorted(pipeline_inputs))

    def test_two_runs_are_byte_identical(self):
        P.cmd_separate(FIX, self.out)
        P.cmd_prepare(self.out)
        other = os.path.join(self.tmp.name, "out2")
        P.cmd_separate(FIX, other)
        P.cmd_prepare(other)
        self.assertEqual(tree_hash(self.out), tree_hash(other))

    def test_prepare_dedup_and_facts(self):
        P.cmd_separate(FIX, self.out)
        res = P.cmd_prepare(self.out)
        self.assertGreaterEqual(res["duplicates_removed"], 1)   # the repeated widget sentence
        facts = rt(os.path.join(self.out, "prepared", "facts.csv"))
        for needle in ("https://example.test/widget", "1.2.3", "$5", "MIT", "2026-01-15", "Apache-2.0"):
            self.assertIn(needle, facts)

    def _sections(self):
        P.cmd_separate(FIX, self.out)
        P.cmd_prepare(self.out)
        return [json.loads(l) for l in open(os.path.join(self.out, "prepared", "sections.jsonl"), encoding="utf-8")]

    def test_llm_stage_uses_cache_and_verify_rejects_bad_rows(self):
        secs = self._sections()
        calls = []

        def fake(model, prompt):
            calls.append(1)
            text = prompt.split("PASSAGE:\n", 1)[1]
            n = len(calls)
            if n == 1:     # real quote
                return json.dumps({"label": "claim", "status": "SOURCE-REPORTED", "quote": text[:20], "note": ""})
            if n == 2:     # fabricated quote
                return json.dumps({"label": "claim", "status": "SOURCE-REPORTED", "quote": "never written anywhere", "note": ""})
            if n == 3:     # label outside the allowed list
                return json.dumps({"label": "bogus", "status": "VERIFIED", "quote": text[:10], "note": ""})
            if n == 4:     # not JSON
                return "not json"
            return json.dumps({"label": "none", "status": "UNKNOWN", "quote": "", "note": ""})

        r1 = P.cmd_llm(self.out, "fake-model", generate=fake)
        self.assertEqual(r1["rows"], len(secs))
        self.assertEqual(r1["new_calls"], len(calls))
        n_calls = len(calls)
        r2 = P.cmd_llm(self.out, "fake-model", generate=fake)
        self.assertEqual(r2["new_calls"], 0)           # cached
        self.assertEqual(len(calls), n_calls)
        v = P.cmd_verify(self.out)
        self.assertEqual(v["accepted"], len(secs) - 3)  # 1 real quote + "none" rows accepted; 3 bad rows rejected
        self.assertEqual(v["rejected"], 3)
        reasons = [json.loads(l)["reason"] for l in open(os.path.join(self.out, "verified", "rejected.jsonl"), encoding="utf-8")]
        self.assertTrue(any("quote not found" in x for x in reasons))
        self.assertTrue(any("not allowed" in x for x in reasons))
        self.assertTrue(any("not valid JSON" in x for x in reasons))

    def test_llm_stage_fails_loudly_when_model_unreachable(self):
        self._sections()

        def down(model, prompt):
            raise OSError("model unreachable")
        with self.assertRaises(OSError):
            P.cmd_llm(self.out, "fake-model", generate=down)

    def test_selftest_passes_on_fixtures(self):
        self.assertEqual(P.selftest(FIX), 0)


import importlib.util  # noqa: E402
import shutil  # noqa: E402
import convert_for_pipeline as A  # noqa: E402

HAS_CONVERTER_DEPS = all(importlib.util.find_spec(m) for m in ("bs4", "markdownify"))


class SpeakerMarkdownTests(unittest.TestCase):
    """Markdown written by the existing converters (convert.py / jsonl_to_md.py / mht_to_md.py)."""

    def test_converter_output_is_split_exactly(self):
        with tempfile.TemporaryDirectory() as src, tempfile.TemporaryDirectory() as out:
            shutil.copy(os.path.join(FIX, "converter_output_chatgpt_style.md"), src)
            P.cmd_separate(src, out)
            s = rj(os.path.join(out, "logs", "_summary.json"))[0]
            self.assertEqual((s["format"], s["status"], s["replies"], s["prompts"]), ("speaker_md", "ok", 2, 2))
            p = rt(os.path.join(out, "prompts", "converter_output_chatgpt_style.md"))
            r = rt(os.path.join(out, "replies", "converter_output_chatgpt_style.md"))
            self.assertIn("What is a fictional gadget", p)
            self.assertNotIn("made-up test object", p)
            self.assertIn("made-up test object", r)
            self.assertNotIn("What is a fictional gadget", r)

    def test_count_mismatch_is_refused(self):
        text = rt(os.path.join(FIX, "converter_output_chatgpt_style.md")).replace("> **Messages:** 4", "> **Messages:** 5")
        with tempfile.TemporaryDirectory() as src, tempfile.TemporaryDirectory() as out:
            wt(os.path.join(src, "bad.md"), text)
            P.cmd_separate(src, out)
            s = rj(os.path.join(out, "logs", "_summary.json"))[0]
            self.assertEqual(s["status"], "refused")
            self.assertIn("declares 5", s["reason"])
            self.assertTrue(os.path.exists(os.path.join(out, "unsure", "bad.md")))
            self.assertFalse(os.path.exists(os.path.join(out, "replies", "bad.md")))


@unittest.skipUnless(HAS_CONVERTER_DEPS, "bs4/markdownify not installed (needed by mht_to_md.py)")
class ConverterAdapterTests(unittest.TestCase):
    """convert_for_pipeline.py: runs the existing converters as subprocesses on synthetic inputs (no network)."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.src = os.path.join(self.tmp.name, "src")
        os.makedirs(self.src)
        for f in ("claude_session_synthetic.jsonl", "google_ai_mode_synthetic.mht", "not_a_conversation.pdf",
                  "chatgpt_export_synthetic.md", "notes_plain.md"):
            shutil.copy(os.path.join(FIX, f), self.src)
        self.before = tree_hash(self.src)

    def tearDown(self):
        self.tmp.cleanup()

    def manifest(self, out):
        return {e["original"]: e for e in rj(os.path.join(out, "logs", "adapter_manifest.json"))["entries"]}

    def test_end_to_end_separation_and_provenance(self):
        out = os.path.join(self.tmp.name, "out")
        self.assertEqual(A.main([self.src, out]), 0)
        m = self.manifest(out)
        self.assertEqual(m["claude_session_synthetic.jsonl"]["action"], "converted")
        self.assertEqual(m["claude_session_synthetic.jsonl"]["result"], "ok")
        self.assertEqual(m["claude_session_synthetic.jsonl"]["counts"], {"replies": 2, "prompts": 2, "other": 0, "empty": 0})
        self.assertEqual(m["google_ai_mode_synthetic.mht"]["result"], "ok")
        self.assertEqual(m["not_a_conversation.pdf"]["result"], "skipped")
        self.assertIn("pdf_to_md", m["not_a_conversation.pdf"]["reason"])
        self.assertEqual(m["notes_plain.md"]["result"], "document")
        self.assertEqual(m["chatgpt_export_synthetic.md"]["result"], "ok")
        self.assertIn("What is a fictional tool", rt(os.path.join(out, "prompts", "claude_session_synthetic.md")))
        self.assertIn("made-up helper", rt(os.path.join(out, "replies", "claude_session_synthetic.md")))
        self.assertIn("What is a fictional gadget", rt(os.path.join(out, "prompts", "google_ai_mode_synthetic.md")))
        self.assertTrue(os.path.exists(os.path.join(out, "documents", "notes_plain.md")))
        self.assertFalse(os.path.exists(os.path.join(out, "replies", "notes_plain.md")))
        # provenance: the original hash and the staged hash are both recorded
        self.assertEqual(m["claude_session_synthetic.jsonl"]["original_sha256"], hashlib.sha256(rb(os.path.join(self.src, "claude_session_synthetic.jsonl"))).hexdigest())
        self.assertTrue(m["claude_session_synthetic.jsonl"]["staged_sha256"])

    def test_sources_unchanged(self):
        out = os.path.join(self.tmp.name, "out")
        A.main([self.src, out])
        self.assertEqual(tree_hash(self.src), self.before)

    def test_repeatable(self):
        o1 = os.path.join(self.tmp.name, "o1")
        o2 = os.path.join(self.tmp.name, "o2")
        A.main([self.src, o1])
        A.main([self.src, o2])
        # discover_extra_sources.json holds absolute paths, so it differs by the output folder only
        h1 = {k: v for k, v in tree_hash(o1).items() if k != os.path.join("discover_extra_sources.json")}
        h2 = {k: v for k, v in tree_hash(o2).items() if k != os.path.join("discover_extra_sources.json")}
        self.assertEqual(h1, h2)
        c1 = rt(os.path.join(o1, "discover_extra_sources.json")).replace(o1.replace(os.sep, "/"), "<OUT>")
        c2 = rt(os.path.join(o2, "discover_extra_sources.json")).replace(o2.replace(os.sep, "/"), "<OUT>")
        self.assertEqual(c1, c2)

    def test_converter_failure_is_reported_not_hidden(self):
        bad = os.path.join(self.src, "no_conversation.mht")
        open(bad, "w", encoding="utf-8").write("MIME-Version: 1.0\n\nnot a conversation at all\n")
        out = os.path.join(self.tmp.name, "out")
        self.assertEqual(A.main([self.src, out]), 1)
        m = self.manifest(out)
        self.assertEqual(m["no_conversation.mht"]["result"], "converter_failed")
        self.assertNotEqual(m["no_conversation.mht"]["converter_exit_code"], 0)
        self.assertFalse(os.path.exists(os.path.join(out, "replies", "no_conversation.md")))

    def test_duplicate_output_names_refused_before_writing(self):
        shutil.copy(os.path.join(self.src, "notes_plain.md"), os.path.join(self.src, "claude_session_synthetic.md"))
        out = os.path.join(self.tmp.name, "out")
        self.assertEqual(A.main([self.src, out]), 2)
        self.assertFalse(os.path.exists(out))

    def test_missing_source_folder(self):
        self.assertEqual(A.main([os.path.join(self.tmp.name, "nope"), os.path.join(self.tmp.name, "o")]), 2)


if __name__ == "__main__":
    unittest.main(verbosity=2)
