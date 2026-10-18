# v2: convert chats to Markdown

Both tools write `converted\<name>.md` in the same layout (title, message count, `## You` / `## <AI>` turns).
Inputs are only read, never modified.

## Google AI Mode `.mht` -> `.md`   (mht_to_md.py)

Needs: `pip install beautifulsoup4 markdownify`

```
python mht_to_md.py "C:\path\to\file.mht"                 # one file
python mht_to_md.py "C:\path\to\folder"                   # every .mht / .mhtml in the folder
python mht_to_md.py "C:\path\to\folder" --out "C:\out"    # choose the output folder
```

Only the conversation is kept (your prompts + AI replies). Other pages saved as `.mht` fail with a message.

## ChatGPT `.json` -> `.md`   (convert.py)

No arguments: it converts every `*.json` in the folder you run it from.

```
cd C:\path\to\folder_with_json_files
python C:\Users\USER\Desktop\KNOWLEDGE_EXTRACTION\v2\convert.py
```

Output goes to `converted\` inside that folder.
