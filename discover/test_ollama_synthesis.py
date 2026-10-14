import io
import json
import unittest
from unittest.mock import patch

import discover


class OllamaSynthesisTests(unittest.TestCase):
    def result(self):
        return {
            "query": "How can an agent learn from past runs?",
            "terms": ["agent", "learn", "runs"],
            "searched": {"notes": 1},
            "warnings": [],
            "gaps": ["improve"],
            "direct": [{
                "class": "note",
                "id": "3_NOTES/example.md#L12-14",
                "name": "Agent memory notes",
                "status": "research note passage (text only; not a verified fact)",
                "ref": {"file": "3_NOTES/example.md", "locator": "lines 12-14"},
                "matched_func": ["agent", "learn"],
                "matched_other": ["runs"],
                "snippet": {"line": 12, "text": "short snippet"},
                "source_text": "SOURCE PASSAGE BODY: the agent records past runs.",
                "source_text_truncated": False,
            }],
            "tentative": [],
        }

    @patch("discover.urllib.request.urlopen")
    def test_sends_local_request_and_preserves_source_evidence(self, mocked_urlopen):
        mocked_urlopen.return_value = io.BytesIO(json.dumps({
            "message": {"content": "Supported evidence: notes discuss memory [3_NOTES/example.md#L12-14]."}
        }).encode("utf-8"))

        answer = discover.ollama_synthesize(self.result())

        self.assertIn("[3_NOTES/example.md#L12-14]", answer)
        mocked_urlopen.assert_called_once()
        request = mocked_urlopen.call_args.args[0]
        self.assertEqual(request.full_url, discover.OLLAMA_CHAT_URL)
        payload = json.loads(request.data.decode("utf-8"))
        self.assertEqual(payload["model"], discover.DEFAULT_OLLAMA_MODEL)
        self.assertFalse(payload["stream"])
        context = json.loads(payload["messages"][1]["content"])
        self.assertEqual(context["evidence"][0]["id"], "3_NOTES/example.md#L12-14")
        self.assertIn("SOURCE PASSAGE BODY", context["evidence"][0]["source_text"])

    @patch("discover.urllib.request.urlopen")
    def test_ollama_error_is_reported(self, mocked_urlopen):
        mocked_urlopen.return_value = io.BytesIO(
            json.dumps({"error": "model not found"}).encode("utf-8")
        )
        with self.assertRaisesRegex(RuntimeError, "model not found"):
            discover.ollama_synthesize(self.result())


if __name__ == "__main__":
    unittest.main()
