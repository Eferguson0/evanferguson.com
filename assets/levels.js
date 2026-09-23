/* Subdividing-box figure on /nevada/: one dataset, cut into 13 departments,
   then 453 sites, then the meters on those sites, then hourly readings.
   Without this file the figure is the list of levels underneath, which
   carries the same numbers; here we draw the subdivision and let a reader
   step through it.

   The split is even because the real per-department numbers aren't public. */

(() => {
  const fig = document.querySelector(".ontology");
  if (!fig) return;
  const svg = fig.querySelector(".nest");
  const rows = [...fig.querySelectorAll(".lv")];
  if (!svg || !rows.length) return;

  const NS = "http://www.w3.org/2000/svg";
  const el = (name, attrs) => {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  const W = 560, H = 360;
  const DEPTS = 13, SITES = 453, PER_SITE = 3;

  const gBox = el("g", { class: "n-box" });
  const gDept = el("g", { class: "n-dept" });
  const gSite = el("g", { class: "n-site" });
  const gMeter = el("g", { class: "n-meter" });
  const gHour = el("g", { class: "n-hour" });
  svg.append(gBox, gDept, gSite, gMeter, gHour);

  gBox.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, class: "box" }));

  /* Lay n cells over a rectangle: a column count that keeps cells close to
     square, with the final row widened so the block always fills, rather
     than trailing off into empty slots. */
  const grid = (n, x, y, w, h) => {
    const cols = Math.max(1, Math.round(Math.sqrt((n * w) / h)));
    const rows = Math.ceil(n / cols);
    const lastRow = n - cols * (rows - 1);
    const ch = h / rows;
    const out = [];
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols);
      const inRow = r === rows - 1 ? lastRow : cols;
      const cw = w / inRow;
      out.push([x + (i - r * cols) * cw, y + r * ch, cw, ch]);
    }
    return out;
  };

  /* 453 sites over 13 departments: as even as it divides. */
  const base = Math.floor(SITES / DEPTS);
  const extra = SITES % DEPTS;

  /* Departments are equal vertical strips: 13 divides a width evenly, where
     a grid of 13 always leaves a short row. */
  const dw = W / DEPTS;
  for (let d = 0; d < DEPTS; d++) {
    const dx = d * dw;
    gDept.appendChild(el("rect", {
      x: dx + 0.75, y: 0.75, width: dw - 1.5, height: H - 1.5, class: "dept",
    }));

    const n = base + (d < extra ? 1 : 0);
    grid(n, dx + 3, 3, dw - 6, H - 6).forEach(([sx, sy, sw, sh]) => {
      gSite.appendChild(el("rect", {
        x: sx + 0.6, y: sy + 0.6, width: sw - 1.2, height: sh - 1.2, class: "site",
      }));
      for (let m = 1; m < PER_SITE; m++) {
        const my = sy + 0.6 + ((sh - 1.2) / PER_SITE) * m;
        gMeter.appendChild(el("line", {
          x1: sx + 0.6, y1: my, x2: sx + sw - 0.6, y2: my, class: "meter",
        }));
      }
    });
  }

  /* Hourly readings can't be drawn one by one; the box fills in instead. */
  gHour.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, class: "hour" }));

  const layers = [gBox, gDept, gSite, gMeter, gHour];
  const show = (i) => {
    layers.forEach((g, k) => g.classList.toggle("on", k <= i));
    rows.forEach((r, k) => r.classList.toggle("dim", k > i));
    btns.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
  };

  const bar = document.createElement("div");
  bar.className = "lv-controls";
  const btns = rows.map((row, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = row.dataset.label;
    b.addEventListener("click", () => show(i));
    bar.appendChild(b);
    return b;
  });
  fig.insertBefore(bar, svg);
  show(rows.length - 1);
})();
