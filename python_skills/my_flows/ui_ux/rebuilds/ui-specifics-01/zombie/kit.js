/* kit.js — tiny chart helpers shared by the nine "zombie UI" rebuilds.
   Every AI-generated SaaS hero in the grid uses the same three charts:
   a smoothed area line, a donut, and a pie. These draw them as inline SVG. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  // Catmull-Rom -> cubic Bezier: the "soft wave" every generated chart has.
  function smoothPath(pts) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }

  // areaChart(svg, values, {stroke, fill1, fill0, grid, labels, labelColor, width, height})
  function areaChart(svg, values, o) {
    const W = o.width || 520, H = o.height || 180, pad = { l: 28, r: 8, t: 10, b: 22 };
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("preserveAspectRatio", "none");
    const max = Math.max(...values) * 1.08, min = Math.min(0, Math.min(...values));
    const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (values.length - 1);
    const y = (v) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
    const id = "g" + Math.random().toString(36).slice(2, 8);
    const defs = el("defs", {});
    const lg = el("linearGradient", { id, x1: 0, y1: 0, x2: 0, y2: 1 });
    lg.append(el("stop", { offset: "0%", "stop-color": o.fill1 || o.stroke, "stop-opacity": o.fillOpacity ?? 0.45 }));
    lg.append(el("stop", { offset: "100%", "stop-color": o.fill0 || o.stroke, "stop-opacity": 0 }));
    defs.append(lg); svg.append(defs);
    for (let g = 0; g <= 4; g++) {
      const gy = pad.t + (g * (H - pad.t - pad.b)) / 4;
      svg.append(el("line", { x1: pad.l, x2: W - pad.r, y1: gy, y2: gy, stroke: o.grid || "rgba(0,0,0,.06)", "stroke-width": 1 }));
    }
    const pts = values.map((v, i) => [x(i), y(v)]);
    const line = smoothPath(pts);
    svg.append(el("path", { d: `${line} L${x(values.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`, fill: `url(#${id})` }));
    svg.append(el("path", { d: line, fill: "none", stroke: o.stroke, "stroke-width": o.strokeWidth || 2, "stroke-linecap": "round" }));
    if (o.labels) {
      o.labels.forEach((t, i) => {
        const lx = pad.l + (i * (W - pad.l - pad.r)) / (o.labels.length - 1);
        const txt = el("text", { x: lx, y: H - 6, "font-size": 9, "text-anchor": "middle", fill: o.labelColor || "#9a9a9a", "font-family": "inherit" });
        txt.textContent = t; svg.append(txt);
      });
    }
  }

  // donut(svg, [{v, c}], {r, w, track})
  function donut(svg, parts, o) {
    const r = o.r || 40, w = o.w || 12, C = 2 * Math.PI * r, S = (r + w) * 2;
    svg.setAttribute("viewBox", `0 0 ${S} ${S}`);
    const total = parts.reduce((a, p) => a + p.v, 0);
    let acc = 0;
    if (o.track) svg.append(el("circle", { cx: S / 2, cy: S / 2, r, fill: "none", stroke: o.track, "stroke-width": w }));
    parts.forEach((p) => {
      const len = (p.v / total) * C;
      svg.append(el("circle", {
        cx: S / 2, cy: S / 2, r, fill: "none", stroke: p.c, "stroke-width": w,
        "stroke-dasharray": `${Math.max(0, len - (o.gap || 0))} ${C}`, "stroke-dashoffset": -acc,
        transform: `rotate(-90 ${S / 2} ${S / 2})`,
      }));
      acc += len;
    });
  }

  // pie(svg, [{v, c}])
  function pie(svg, parts) {
    svg.setAttribute("viewBox", "-1 -1 2 2");
    const total = parts.reduce((a, p) => a + p.v, 0);
    let a0 = -Math.PI / 2;
    parts.forEach((p) => {
      const a1 = a0 + (p.v / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      svg.append(el("path", {
        d: `M0,0 L${Math.cos(a0)},${Math.sin(a0)} A1,1 0 ${large} 1 ${Math.cos(a1)},${Math.sin(a1)} Z`,
        fill: p.c, stroke: "rgba(255,255,255,.6)", "stroke-width": 0.012,
      }));
      a0 = a1;
    });
  }

  window.Kit = { areaChart, donut, pie, smoothPath };
})();
