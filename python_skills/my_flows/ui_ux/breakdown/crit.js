/* crit.js — lettered pin feedback over an image (format from the talk at ~7:54). */
(() => {
  const KEY = "crit-sheet-v1";
  const SAMPLE = {
    overall: "Still reads as a render, not a photo of a real tee. Soften the fabric, fix the light direction so it matches the backdrop, and make the print sit in the cotton instead of on top of it.",
    pins: [
      [0.27, 0.40, "Edges are razor straight; add a slight curl and a soft fold line so it reads as cotton."],
      [0.50, 0.42, "Neckline is a flat stroke. Give the rib some thickness and a shadow underneath."],
      [0.50, 0.58, "Print floats above the fabric. Knock back contrast 10% and add faint texture through it."],
      [0.71, 0.58, "Same note as C on the right side of the box."],
      [0.50, 0.78, "Hem shadow is a hard band; feather it."],
      [0.78, 0.40, "Tag string is missing; the tag looks pasted on."],
      [0.79, 0.43, "Price text is too small to read at thumbnail size."],
      [0.30, 0.70, "Left side is too dark next to the light backdrop. Lift the shadows a little."],
      [0.12, 0.20, "Backdrop gradient bands slightly; add grain."],
      [0.88, 0.85, "Floor shadow points the wrong way for a key light at top left."],
      [0.50, 0.35, "Top fold catches no light. Add a soft highlight along the crease."],
      [0.36, 0.52, "Fabric is perfectly flat; add two or three gentle wrinkles."],
      [0.64, 0.52, "Same note as L, mirrored but not identical."],
      [0.50, 0.66, "Wordmark letter-spacing is wider than our logo file; match the master."],
      [0.92, 0.30, "Tag card corners are sharp; round them slightly like the printed stock."],
      [0.08, 0.90, "Crop leaves too much empty floor; tighten for the product grid."],
      [0.50, 0.90, "Colour of the tee should match the dyed sample photo under daylight."],
    ],
  };
  const list = document.getElementById("list"), box = document.getElementById("box"), overall = document.getElementById("overall");
  let state, imgURL = null;
  const letter = (i) => String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : "");
  function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.pins) return s; } catch (e) {} return JSON.parse(JSON.stringify(SAMPLE)); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function render() {
    overall.value = state.overall;
    list.innerHTML = ""; box.querySelectorAll(".pin").forEach((p) => p.remove());
    state.pins.forEach((p, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${letter(i)}.</b><textarea rows="2" aria-label="Note ${letter(i)}"></textarea><button type="button" aria-label="Remove ${letter(i)}">×</button>`;
      const ta = li.querySelector("textarea"); ta.value = p[2];
      ta.addEventListener("input", () => { p[2] = ta.value; save(); });
      ta.addEventListener("focus", () => pin.classList.add("on")); ta.addEventListener("blur", () => pin.classList.remove("on"));
      li.querySelector("button").addEventListener("click", () => { state.pins.splice(i, 1); save(); render(); });
      list.append(li);
      const pin = document.createElement("div");
      pin.className = "pin"; pin.textContent = letter(i); pin.style.left = p[0] * 100 + "%"; pin.style.top = p[1] * 100 + "%";
      pin.addEventListener("pointerdown", (e) => {
        e.stopPropagation(); pin.setPointerCapture(e.pointerId); pin.style.cursor = "grabbing";
        const move = (ev) => { const r = box.getBoundingClientRect(); p[0] = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)); p[1] = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)); pin.style.left = p[0] * 100 + "%"; pin.style.top = p[1] * 100 + "%"; };
        const up = () => { pin.removeEventListener("pointermove", move); pin.style.cursor = "grab"; save(); };
        pin.addEventListener("pointermove", move); pin.addEventListener("pointerup", up, { once: true });
      });
      pin.addEventListener("click", (e) => { e.stopPropagation(); ta.focus(); });
      box.append(pin);
    });
  }
  box.addEventListener("pointerdown", (e) => {
    if (e.target.classList.contains("pin")) return;
    const r = box.getBoundingClientRect();
    state.pins.push([(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, ""]);
    save(); render();
    const tas = list.querySelectorAll("textarea"); tas[tas.length - 1].focus();
  });
  overall.addEventListener("input", () => { state.overall = overall.value; save(); });
  document.getElementById("file").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (imgURL) URL.revokeObjectURL(imgURL);
    imgURL = URL.createObjectURL(f);
    const svg = document.getElementById("sampleImg"); if (svg) svg.remove();
    let img = box.querySelector("img"); if (!img) { img = document.createElement("img"); img.alt = "Your image under review"; box.prepend(img); }
    img.src = imgURL; state.pins = []; state.overall = ""; save(); render();
  });
  document.getElementById("sample").addEventListener("click", () => { state = JSON.parse(JSON.stringify(SAMPLE)); save(); location.reload(); });
  document.getElementById("clear").addEventListener("click", () => { state.pins = []; save(); render(); });
  document.getElementById("copy").addEventListener("click", async (e) => {
    const md = `**OVERALL:** ${state.overall}\n\n**Feedback**\n` + state.pins.map((p, i) => `- ${letter(i)}. ${p[2]}`).join("\n");
    try { await navigator.clipboard.writeText(md); e.target.textContent = "Copied"; } catch (err) { e.target.textContent = "Copy blocked here"; }
    setTimeout(() => (e.target.textContent = "Copy as Markdown"), 1600);
  });
  state = load(); render();
})();
