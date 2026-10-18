"""Write a small, fabricated ChatGPT export so the takeout -> knowledge pipeline can be tested by anyone.

Every conversation here is invented. It exercises the cases the real tools handle:
- a regenerated reply (an alternate branch) and an edited prompt
- skipped nodes: system, hidden, thoughts, a tool call and an empty message
- an image part (attachment placeholder)
- a "Branch" conversation that shares its opening messages with an original (a fork family)
- a misspelling of the subject ("Sunbx") that only fuzzy expansion finds
- messages that never name the subject but use its domain terms (RELATED section)
- an unrelated conversation that must not show up

Usage:  python make_takeout.py OUT_DIR [--single]
--single writes one conversations.json (what most exports contain) instead of two shards.
"""
import json
import os
import sys

T0 = 1735725600  # 2025-01-01 10:00 UTC; each message is a minute apart


class Conv:
    def __init__(self, cid, title, t):
        self.cid, self.title, self.t = cid, title, t
        self.mapping = {"root": {"id": "root", "message": None, "parent": None, "children": []}}
        self.current = "root"

    def add(self, nid, role, text, parent=None, ctype="text", parts=None, **extra):
        parent = parent or self.current
        self.t = extra.pop("at", self.t + 60)  # shared branch nodes keep the original's time
        msg = {"id": nid, "author": {"role": role}, "create_time": self.t,
               "content": {"content_type": ctype, "parts": parts if parts is not None else [text]},
               "metadata": extra.pop("metadata", {}), "recipient": extra.pop("recipient", "all")}
        if ctype == "thoughts":
            msg["content"] = {"content_type": "thoughts", "thoughts": [{"summary": "x", "content": text}]}
        self.mapping[nid] = {"id": nid, "message": msg, "parent": parent, "children": []}
        self.mapping[parent]["children"].append(nid)
        return nid

    def main(self, nid, role, text, **kw):
        self.current = self.add(nid, role, text, **kw)
        return self.current

    def dump(self):
        return {"title": self.title, "create_time": T0, "update_time": self.t, "mapping": self.mapping,
                "current_node": self.current, "conversation_id": self.cid, "id": self.cid,
                "default_model_slug": "gpt-test"}


def sizing():
    c = Conv("c0000001-sizing", "SunBox kiosk sizing", T0)
    c.main("s-sys", "system", "", parts=[""])
    c.main("s-u1", "user", "I'm designing SunBox, a solar phone-charging kiosk for a market in Port Harcourt. "
           "How big should the panel and battery be for 40 phones a day?")
    c.add("s-th1", "assistant", "Estimate energy per phone first.", ctype="thoughts")
    c.main("s-a1", "assistant", "For SunBox: 40 phones x about 15 Wh each = 600 Wh a day. With 4.5 peak sun hours "
           "and 75% system efficiency you need roughly a 180 W panel; I'd pick 200 W. For one cloudy day of "
           "autonomy use a 12 V 100 Ah LiFePO4 battery and an MPPT charge controller.")
    # regenerated reply to the same prompt (alternate branch)
    c.add("s-a1b", "assistant", "Short answer: a 200 W panel, a 100 Ah LiFePO4 battery and an MPPT controller "
          "will run SunBox for about 40 phones a day.", parent="s-u1")
    c.main("s-u2", "user", "Decision: we go with the 200 W panel and the 100 Ah battery for SunBox v1.")
    c.main("s-a2", "assistant", "Noted. Next, choose the charging ports: 8 USB-A at 2.4 A plus 2 USB-C PD ports.")
    c.main("s-tool", "assistant", "search('usb charging port module')", recipient="browser")
    c.main("s-hidden", "assistant", "hidden context", metadata={"is_visually_hidden_from_conversation": True})
    c.main("s-u3", "user", "", ctype="multimodal_text",
           parts=[{"content_type": "image_asset_pointer", "asset_pointer": "file-service://file-abc123"},
                  "Here is a photo of the stall where the kiosk will sit."])
    c.main("s-a3", "assistant", "The stall has a south-facing roof edge, which suits a fixed panel tilted at about 10 degrees.")
    return c


def sizing_branch():
    """A 'Branch' conversation: same opening node ids, then its own direction."""
    c = Conv("c0000002-branch", "Branch · SunBox kiosk sizing", T0 + 3600)
    c.main("s-u1", "user", at=T0 + 120, text= "I'm designing SunBox, a solar phone-charging kiosk for a market in Port Harcourt. "
           "How big should the panel and battery be for 40 phones a day?")
    c.main("s-a1", "assistant", at=T0 + 240, text="For SunBox: 40 phones x about 15 Wh each = 600 Wh a day. "
           "With 4.5 peak sun hours and 75% system efficiency you need roughly a 180 W panel; I'd pick 200 W. "
           "For one cloudy day of autonomy use a 12 V 100 Ah LiFePO4 battery and an MPPT charge controller.")
    c.t = T0 + 3600
    c.main("b-u2", "user", "What if we add a small inverter so the kiosk can also charge a laptop?")
    c.main("b-a2", "assistant", "A 300 W pure sine inverter adds about 10% standby loss; size the battery up to 150 Ah.")
    return c


def pricing():
    c = Conv("c0000003-pricing", "Pricing the kiosk", T0 + 86400)
    c.main("p-u1", "user", "How should we price charging at the Sunbx kiosk? Traders pay about 200 naira today.")
    c.main("p-a1", "assistant", "Charge 150 naira per full charge and offer a weekly pass at 800 naira; "
           "that undercuts the generator stalls and builds repeat customers.")
    # edited prompt: a second user message under the same parent
    c.add("p-u1b", "user", "How should we price phone charging at the market kiosk?", parent="root")
    c.main("p-u2", "user", "The MPPT controller reads 13.4 V at noon. Is the LiFePO4 bank full?")
    c.main("p-a2", "assistant", "13.4 V at rest is roughly 90% for LiFePO4; it is not yet full. Check again after an hour of absorption.")
    c.main("p-empty", "assistant", "")
    return c


def unrelated():
    c = Conv("c0000004-jollof", "Party jollof for 20 people", T0 + 2 * 86400)
    c.main("j-u1", "user", "How much rice do I need for party jollof for 20 people?")
    c.main("j-a1", "assistant", "About 2.5 kg of long-grain parboiled rice, 1.5 kg of tomatoes and 4 red bell peppers.")
    return c


def write(out, single=False):
    os.makedirs(out, exist_ok=True)
    convs = [sizing(), sizing_branch(), pricing(), unrelated()]
    shards = {"conversations.json": convs} if single else {
        "conversations-000.json": convs[:2], "conversations-001.json": convs[2:]}
    for name, items in shards.items():
        with open(os.path.join(out, name), "w", encoding="utf-8") as f:
            json.dump([c.dump() for c in items], f, ensure_ascii=False, indent=1)
    with open(os.path.join(out, "conversation_asset_file_names.json"), "w", encoding="utf-8") as f:
        json.dump({"file_abc123-stall.jpg": "stall.jpg"}, f)
    return sorted(shards)


ALIASES = {
    "sunbox": {
        "canonical": "SunBox",
        "variants": ["Sun Box", "Sun-Box"],
        "reject_terms": [],
        "ignore_in_terms": [],
        "domain_terms": {"strong": ["mppt", "lifepo4", "inverter", "charge controller"],
                         "weak": ["solar", "battery", "panel", "watt"]},
        "topics": {"power system": ["panel", "battery", "lifepo4", "mppt", "inverter"],
                   "business": ["price", "naira", "pass", "customers"]},
    }
}


def write_aliases(path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(ALIASES, f, indent=2)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    print("wrote", ", ".join(write(sys.argv[1], "--single" in sys.argv)))
