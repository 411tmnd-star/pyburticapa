"""Paths, SQLite schema and small helpers shared by the knowledge_recovery scripts. Standard library only."""
import hashlib
import os
import re
import sqlite3
from pathlib import Path

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))  # the toolkit root (python_skills/confirmed/knowledge_recovery -> python_skills -> root)
DEFAULT_DB = os.path.join(ROOT, "output", "knowledge_recovery", "knowledge.db")
DEFAULT_OUT = os.path.join(ROOT, "output", "knowledge_recovery", "dossiers")
ALIASES_FILE = os.path.join(HERE, "aliases.json")
EXCLUDE_FILE = os.path.join(HERE, "exclude.json")

# One canonical row per unique node_id (messages); every file a node appears in is a row of
# occurrences (so branches stay visible). messages_fts is an external-content index over messages.
SCHEMA = """
CREATE TABLE conversations (
    conv_id     TEXT PRIMARY KEY,
    title       TEXT,
    created     TEXT,
    updated     TEXT,
    model       TEXT,
    source_file TEXT,
    family_id   TEXT,
    excluded    INTEGER NOT NULL DEFAULT 0,
    exclude_reason TEXT
);
CREATE TABLE messages (
    id          INTEGER PRIMARY KEY,
    node_id     TEXT NOT NULL UNIQUE,
    role        TEXT NOT NULL,
    text        TEXT NOT NULL,
    text_hash   TEXT NOT NULL,
    time        TEXT,
    parent_node TEXT
);
CREATE TABLE occurrences (
    node_id   TEXT NOT NULL,
    conv_id   TEXT NOT NULL,
    view      TEXT NOT NULL,
    seq       INTEGER,
    branch    TEXT NOT NULL,
    file_path TEXT NOT NULL,
    PRIMARY KEY (node_id, file_path)
);
CREATE INDEX occurrences_conv ON occurrences (conv_id, branch, seq);
CREATE TABLE conflicts (node_id TEXT, conv_id TEXT, file_path TEXT, text_hash TEXT, kind TEXT, text TEXT);
CREATE TABLE problems (file_path TEXT, note TEXT);
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT);
CREATE VIRTUAL TABLE messages_fts USING fts5(
    text, content='messages', content_rowid='id', tokenize='unicode61 remove_diacritics 2'
);
CREATE VIRTUAL TABLE messages_vocab USING fts5vocab(messages_fts, 'row');
"""


def sha1(text):
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def tokens(text):
    """Lower-case alphanumeric tokens, close to what the FTS tokenizer indexes for ASCII text."""
    return re.findall(r"[0-9a-z]+", text.lower())


def fts5_available():
    con = sqlite3.connect(":memory:")
    try:
        con.execute("CREATE VIRTUAL TABLE probe USING fts5(x)")
        con.execute("CREATE VIRTUAL TABLE probe_vocab USING fts5vocab(probe, 'row')")
        return True
    except sqlite3.Error:
        return False
    finally:
        con.close()


def require_fts5():
    if not fts5_available():
        raise SystemExit("This Python's SQLite has no FTS5 / fts5vocab support (sqlite3 version "
                         f"{sqlite3.sqlite_version}). Install a Python build that includes FTS5.")


def connect(path, write=False):
    if write:
        os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
        con = sqlite3.connect(path)
    else:
        if not os.path.isfile(path):
            raise SystemExit(f"database not found: {path}\nBuild it first:  recover.py ingest")
        con = sqlite3.connect(Path(path).resolve().as_uri() + "?mode=ro", uri=True)
    con.row_factory = sqlite3.Row
    return con


def chunks(seq, n=500):
    seq = list(seq)
    for i in range(0, len(seq), n):
        yield seq[i:i + n]
