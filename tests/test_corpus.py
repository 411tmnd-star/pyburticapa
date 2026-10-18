"""The learning corpus covers every lesson and project of the course, keeps hand-edited columns, and is up to date."""
import importlib.util
import os
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = importlib.util.spec_from_file_location("build_corpus", os.path.join(ROOT, "python_skills", "corpus", "build_corpus.py"))
B = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(B)


class Corpus(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.entries = B.build_entries()

    def test_files_on_disk_are_up_to_date(self):
        self.assertEqual(B.main(["--check"]), 0, "run python_skills/corpus/build_corpus.py and commit the result")

    def test_every_lesson_and_project_has_one_entry(self):
        sources = {e["source"] for e in self.entries}
        phases = os.path.join(B.COURSE, "phases")
        for phase in os.listdir(phases):
            for lesson in os.listdir(os.path.join(phases, phase)):
                if os.path.isdir(os.path.join(phases, phase, lesson)) and lesson[:2].isdigit():
                    self.assertIn(f"phases/{phase}/{lesson}", sources)
        for name in os.listdir(os.path.join(B.COURSE, "projects")):
            if os.path.isdir(os.path.join(B.COURSE, "projects", name)):
                self.assertIn(f"projects/{name}", sources)

    def test_every_course_python_file_is_linked_once(self):
        linked = [os.path.join(e["source"], f) if f and not e["source"].endswith(".py") else e["source"]
                  for e in self.entries for f in e["python_files"].split("; ") if f]
        on_disk = []
        for d, dirs, files in os.walk(B.COURSE):
            dirs[:] = [x for x in dirs if x not in B.SKIP_DIRS]
            on_disk += [os.path.relpath(os.path.join(d, f), B.COURSE).replace(os.sep, "/") for f in files if f.endswith(".py")]
        self.assertEqual(sorted(x.replace(os.sep, "/") for x in linked), sorted(on_disk))

    def test_every_unit_has_its_pages_and_exact_copies(self):
        files = B.outputs(B.merge(B.build_entries(), B.load_hand_columns()))
        units = {os.path.dirname(p) for p in files if p.endswith("HOW_IT_WORKS.md")}
        self.assertGreater(len(units), 600)
        for u in units:
            for page in ("README.md", "LINKS.md"):
                self.assertIn(os.path.join(u, page), files, u)
        copies = [p for p, c in files.items() if isinstance(c, bytes) and c]
        self.assertGreater(len(copies), 1000)

    def test_hand_columns_survive_a_rebuild(self):
        src = self.entries[0]["source"]
        merged = B.merge(B.build_entries(), {src: {"status": "tested", "evidence": "ran it", "notes": "n"}})
        e = next(x for x in merged if x["source"] == src)
        self.assertEqual((e["status"], e["evidence"], e["notes"]), ("tested", "ran it", "n"))

    def test_unknown_status_is_refused(self):
        src = self.entries[0]["source"]
        with self.assertRaises(SystemExit):
            B.merge(B.build_entries(), {src: {"status": "done", "evidence": "", "notes": ""}})


if __name__ == "__main__":
    unittest.main()
