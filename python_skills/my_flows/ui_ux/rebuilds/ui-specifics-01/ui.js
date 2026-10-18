/* ui.js — code viewers that load the real source file, so what you read is what runs. */
(function () {
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  async function load(box) {
    const src = box.dataset.src, pre = box.querySelector("pre");
    try {
      const r = await fetch(src);
      if (!r.ok) throw new Error(r.status);
      const text = await r.text();
      pre.innerHTML = esc(text);
      box.dataset.text = text;
      const n = box.querySelector(".lines");
      if (n) n.textContent = text.split("\n").length + " lines";
    } catch (e) {
      pre.textContent = "Could not load " + src + " here. Open it directly: " + src;
    }
  }
  document.querySelectorAll(".code[data-src]").forEach((box) => {
    load(box);
    const b = box.querySelector("button.copy");
    if (b) b.addEventListener("click", async () => {
      const t = box.dataset.text || box.querySelector("pre").textContent;
      try { await navigator.clipboard.writeText(t); b.textContent = "Copied"; }
      catch (e) {
        const range = document.createRange(); range.selectNodeContents(box.querySelector("pre"));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); b.textContent = "Selected, press copy";
      }
      setTimeout(() => (b.textContent = "Copy"), 1800);
    });
  });
})();
