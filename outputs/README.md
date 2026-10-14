# outputs

Designated output location for toolkit workflows that need one (for example `pipeline.py all <SRC> <OUT>` with `<OUT>` set to a subfolder here, or `chat_reply_extractor.py <SRC> --out outputs\...`).

- Empty by design. Nothing historical is stored here.
- Inputs are supplied on the command line when a workflow is run; no input folder is kept in the toolkit.
- Source files are read, never modified (the pipeline checks their SHA-256 before and after).
