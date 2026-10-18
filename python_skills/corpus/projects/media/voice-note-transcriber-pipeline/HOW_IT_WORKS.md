# How it works: Voice Note Transcriber Pipeline

## `activity.py`

```text
Segment speech candidates with RMS energy.

Lesson: projects/voice-note-transcriber-pipeline/stages/02-activity/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def activity(samples, rate, frame_ms, threshold, min_ms, gap_ms)`](activity.py#L11)

## `captions.py`

```text
Export validated WebVTT captions.

Lesson: projects/voice-note-transcriber-pipeline/stages/04-captions/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def stamp(seconds)`](captions.py#L12)
- [`def captions(rows)`](captions.py#L26)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `pcm.py`

```text
Decode and validate PCM WAV samples.

Lesson: projects/voice-note-transcriber-pipeline/stages/01-pcm/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def decode_wav(data)`](pcm.py#L13)
- [`def encode_wav(samples, rate)`](pcm.py#L32)

## `pipeline.py`

Functions and classes, in file order (click to jump to the line):

- [`def export_transcript(wav, rows, out, method)`](pipeline.py#L15)
- [`def main()`](pipeline.py#L57)

## `provider.py`

Functions and classes, in file order (click to jump to the line):

- [`def _validate_endpoint(endpoint)`](provider.py#L10)
- [`class _NoRedirect`](provider.py#L58)
  - [`def redirect_request(self, request, fp, code, message, headers, new_url)`](provider.py#L59)
- [`def http_recognizer(endpoint, model, api_key, timeout)`](provider.py#L63)

## `transcribe.py`

```text
Call an injected transcriber with bounded retries.

Lesson: projects/voice-note-transcriber-pipeline/stages/03-transcribe/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def transcribe(samples, rate, spans, provider, retries)`](transcribe.py#L12)

## Run and test

From this folder:

```
python pipeline.py --input fixtures/repair-note.wav --transcript-file fixtures/reference.json --out voice-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
