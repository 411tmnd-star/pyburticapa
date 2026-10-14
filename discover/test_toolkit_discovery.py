"""Toolkit capabilities through discover.py (--class toolkit). Empty root: the Harness is never read.

The records come from the toolkit's own INVENTORY.csv. These tests check that representative capabilities are
found, that the description and status match the record, that unverified tools are not labelled VERIFIED, and
that default queries do not change.
Run: python -B -X utf8 test_toolkit_discovery.py
"""
import csv
import json
import os
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
TOOLKIT = os.path.dirname(HERE)
DISCOVER = os.path.join(HERE, "discover.py")
INVENTORY = os.path.join(TOOLKIT, "INVENTORY.csv")


def run(args, root):
    cmd = [sys.executable, "-B", "-I", "-X", "utf8", DISCOVER, "--root", root, "--json", "--top", "50"] + args
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        raise AssertionError("discover failed: " + r.stderr[-300:])
    return json.loads(r.stdout)


def toolkit_hits(d):
    return [i for i in d.get("direct", []) + d.get("tentative", []) if i.get("class") == "toolkit-tool"]


def find(hits, filename):
    return [h for h in hits if h["ref"]["file"].replace(os.sep, "/").endswith("/" + filename)]


class ToolkitDiscovery(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.empty = tempfile.mkdtemp(prefix="empty_root_")

    def tk(self, query):
        return toolkit_hits(run(["--class", "toolkit"] + query.split(), self.empty))

    def test_jsonl_converter_is_found_with_its_docstring(self):
        hits = find(self.tk("jsonl transcript markdown converter"), "jsonl_to_md.py")
        self.assertTrue(hits, "jsonl_to_md.py not found")
        h = hits[0]
        self.assertTrue(h["name"].startswith("Convert a .jsonl chat/session transcript"), h["name"])
        self.assertTrue(os.path.exists(h["ref"]["file"]))
        self.assertIn("knowledge_extraction/v2", h["ref"]["file"].replace(os.sep, "/"))

    def test_help_only_tool_is_not_labelled_verified(self):
        h = find(self.tk("jsonl transcript markdown converter"), "jsonl_to_md.py")[0]
        self.assertIn("HELP ONLY", h["status"])
        self.assertNotIn("VERIFIED:", h["status"])

    def test_pipeline_adapter_is_found(self):
        hits = find(self.tk("adapter converts conversation exports then separates prompts and replies"), "convert_for_pipeline.py")
        self.assertTrue(hits, "convert_for_pipeline.py not found")

    def test_unverified_tool_is_shown_as_not_verified(self):
        h = find(self.tk("repository inspection read only report"), "repo_inspect.py")
        self.assertTrue(h, "repo_inspect.py not found")
        self.assertIn("NOT VERIFIED", h[0]["status"])

    def test_fixture_generator_is_found_with_test_link_status(self):
        h = find(self.tk("fabricated test inputs for discovery"), "make_discovery_fixture.py")
        self.assertTrue(h, "make_discovery_fixture.py not found")
        self.assertIn("TEST LINK", h[0]["status"])

    def test_status_matches_inventory_for_every_result(self):
        with open(INVENTORY, encoding="utf-8-sig", newline="") as f:
            rows = {r["toolkit_path"]: r for r in csv.DictReader(f) if r["toolkit_path"]}
        for h in self.tk("pipeline discovery converter markdown verify test"):
            row = rows.get(h["id"]) or rows.get(h["id"].replace("/", os.sep))
            self.assertIsNotNone(row, "result not in INVENTORY: " + h["id"])
            self.assertIn("toolkit record (" + row["disposition"] + ")", h["status"])

    def test_results_stay_inside_the_toolkit(self):
        for h in self.tk("markdown converter"):
            self.assertIn("Python_Toolkit", h["ref"]["file"])
            self.assertNotIn("tool harness", h["ref"]["file"].lower())

    def test_default_query_has_no_toolkit_items(self):
        d = run(["jsonl", "transcript", "markdown", "converter"], self.empty)
        self.assertEqual(toolkit_hits(d), [])

    def test_repeatable(self):
        a = sorted(json.dumps(h, sort_keys=True) for h in self.tk("jsonl transcript markdown converter"))
        b = sorted(json.dumps(h, sort_keys=True) for h in self.tk("jsonl transcript markdown converter"))
        self.assertEqual(a, b)
        self.assertTrue(a)


if __name__ == "__main__":
    unittest.main(verbosity=2)
