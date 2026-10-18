import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const types = { ".wav": "audio/wav", ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".bin": "application/octet-stream" };
const port = Number(process.argv[2] || 5353);
const pages = { "/": "preview/index.html", "/instrument": "preview/instrument.html", "/squall": "preview/squall.html" };
const isTest = (p) => p.startsWith("/_test/");
const built = new Set(["/app.js", "/app.css", "/instrument.js", "/instrument.css", "/squall.js", "/squall.css"]);
createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = isTest(p) ? join(root, "preview", normalize(p)) : pages[p] ? join(root, pages[p]) : built.has(p) ? join(root, "preview", "dist", p) : join(root, "public", normalize(p));
  try { const body = await readFile(file); res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream", "cache-control": "no-store" }); res.end(body); }
  catch { res.writeHead(404); res.end("not found: " + p); }
}).listen(port, () => console.log("preview on http://localhost:" + port));
