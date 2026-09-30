/* Scatter charts on /benchmarking-ai-adoption/. Every firm is one
   <details class="firm"> under "Firm profiles", carrying its industry and
   scores as data attributes; each <figure class="maturity"> names the two
   it plots (data-x, data-y) and its corner labels (data-corners, TL|TR|BL|BR).
   Without this file the profiles still read in full.

   Tapping a dot shows that firm in a panel under its chart, with the two
   scores the chart plots and a link down to the full profile. */

(() => {
  const firms = [...document.querySelectorAll(".firm-profiles .firm")];
  const figs = document.querySelectorAll(".maturity");
  if (!firms.length) return;

  /* Scores run 0-4 in halves; the other axes are ordered bands. */
  const AXES = {
    adopt:  { label: "Adoption depth" },
    expose: { label: "Exposure" },
    size:   { label: "Firm size (staff)", bands: ["1–10", "11–50", "51–200", "201–1k", "1k+"] },
    invest: { label: "Firm investment", bands: ["None", "Seats", "Trained"] },
  };

  const NS = "http://www.w3.org/2000/svg";
  const el = (name, attrs, text) => {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text) n.textContent = text;
    return n;
  };
  const btn = (text, label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    if (label) b.setAttribute("aria-label", label);
    return b;
  };

  /* Plot area inside the 400x400 viewBox, leaving room for ticks and titles. */
  const L = 44, T = 12, S = 344;

  /* An axis maps a firm's value to 0..1 along the plot, plus its ticks. */
  const scale = (key) => {
    const ax = AXES[key];
    if (ax.bands) {
      const n = ax.bands.length;
      return { ...ax, pos: (v) => (+v + 0.5) / n,
        ticks: ax.bands.map((t, i) => [(i + 0.5) / n, t]) };
    }
    return { ...ax, pos: (v) => v / 4,
      ticks: [0, 1, 2, 3, 4].map((v) => [v / 4, String(v)]), mid: 0.5 };
  };

  /* Hover text: the firm (the profile heading), then the interviewee's role. */
  const hoverText = (f) => {
    const firm = f.querySelector("h3").textContent;
    return f.dataset.role ? `${firm} · ${f.dataset.role}` : firm;
  };

  const openProfile = (id) => {
    const d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  };
  window.addEventListener("hashchange", () => openProfile(location.hash.slice(1)));
  if (location.hash) openProfile(location.hash.slice(1));

  /* One industry key serves every chart: tap an industry to fade the rest. */
  let focusInd = null;
  const setFocus = (ind) => {
    focusInd = ind;
    document.querySelectorAll(".mm-legend button").forEach((x) =>
      x.setAttribute("aria-pressed", String(x.dataset.industry === ind)));
    document.querySelectorAll(".mm-dot, .al-dot").forEach((g) =>
      g.classList.toggle("dim", !!ind && g.dataset.industry !== ind));
  };
  document.querySelectorAll(".mm-legend [data-industry]").forEach((k) => {
    const b = btn("");
    b.dataset.industry = k.dataset.industry;
    b.innerHTML = '<i class="mm-swatch"></i>' + k.innerHTML;
    b.firstChild.dataset.industry = k.dataset.industry;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () =>
      setFocus(focusInd === b.dataset.industry ? null : b.dataset.industry));
    k.replaceWith(b);
  });

  /* Depth ladder: five steps for the 0-4 adoption depth rubric, rising left
     to right, with each firm's dot on its step. Half scores sit on the right
     of the lower step, so a 1.5 reads as "past ad hoc, not yet weekly". */
  const ladderFig = document.querySelector(".adoption-ladder");
  if (ladderFig) {
    const svg = ladderFig.querySelector(".al-chart");
    const plot = ladderFig.querySelector(".al-plot");
    const X0 = 10, X1 = 390, BASE = 150, RISE = 26, FIRST = 14;
    const STEPS = [["No use"], ["Ad hoc"], ["Weekly,", "general"], ["Core", "workflow"], ["Rebuilt"]];
    const W = (X1 - X0) / STEPS.length;
    const tx = (k) => X0 + k * W;                 // left edge of step k
    const ty = (k) => BASE - FIRST - k * RISE;    // top of step k

    let d = `M ${tx(0)} ${BASE}`;
    STEPS.forEach((_, k) => { d += ` L ${tx(k)} ${ty(k)} L ${tx(k + 1)} ${ty(k)}`; });
    d += ` L ${X1} ${BASE} Z`;
    const g = el("g", { class: "al-steps" });
    g.append(el("path", { d, class: "stair" }));
    g.append(el("line", { x1: X0, y1: BASE, x2: X1, y2: BASE, class: "base" }));

    const groups = STEPS.map(() => []);
    firms.filter((f) => f.dataset.adopt != null)
      .forEach((f) => groups[Math.min(4, Math.floor(+f.dataset.adopt))].push(f));
    groups.forEach((grp) => grp.sort((a, b) => a.dataset.adopt - b.dataset.adopt));

    const labels = el("g", { class: "al-labels" });
    const dots = el("g", { class: "al-dots" });
    const tip = document.createElement("div");
    tip.className = "mm-tip";
    plot.append(tip);

    STEPS.forEach((name, k) => {
      const mid = tx(k) + W / 2;
      labels.append(el("text", { x: mid, y: BASE + 16, "text-anchor": "middle", class: "level" }, String(k)));
      name.forEach((line, i) => labels.append(
        el("text", { x: mid, y: BASE + 30 + i * 12, "text-anchor": "middle", class: "step" }, line)));

      /* Spread the step's firms evenly along its tread, in score order. */
      const n = groups[k].length;
      groups[k].forEach((f, j) => {
        const x = tx(k) + ((j + 1) / (n + 1)) * W, y = ty(k) - 7.5;
        const name = f.querySelector("h3").textContent;
        const dot = el("g", { class: "al-dot", "data-industry": f.dataset.industry,
          tabindex: "0", role: "link", "aria-label": name });
        dot.append(el("circle", { cx: x, cy: y, r: 14, class: "hit" }),
                   el("circle", { cx: x, cy: y, r: 5.5, class: "mark" }));
        const show = () => {
          tip.textContent = hoverText(f);
          const w = plot.clientWidth, tw = tip.offsetWidth, px = (x / 400) * w;
          tip.classList.remove("below");
          tip.style.left = Math.max(0, Math.min(w - tw, px - tw / 2)) + "px";
          tip.style.top = (y / 400) * w - 12 + "px";
          tip.classList.add("on");
        };
        const hide = () => tip.classList.remove("on");
        const go = () => { setFocus(null); openProfile(f.id); f.scrollIntoView({ behavior: "smooth", block: "start" }); };
        dot.addEventListener("mouseenter", show);
        dot.addEventListener("mouseleave", hide);
        dot.addEventListener("focus", show);
        dot.addEventListener("blur", hide);
        dot.addEventListener("click", go);
        dot.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
        });
        dots.append(dot);
      });
    });
    svg.append(g, labels, dots);
  }

  figs.forEach((fig) => {
    const svg = fig.querySelector(".mm-chart");
    const plot = fig.querySelector(".mm-plot");
    const xk = fig.dataset.x, yk = fig.dataset.y;
    if (!svg || !AXES[xk] || !AXES[yk]) return;
    const X = scale(xk), Y = scale(yk);
    /* Only firms scored on both of this chart's axes get a dot. */
    const pts = firms.filter((f) => f.dataset[xk] != null && f.dataset[yk] != null);
    const px = (v) => L + X.pos(v) * S;
    const py = (v) => T + S - Y.pos(v) * S;

    const grid = el("g", { class: "mm-grid" });
    X.ticks.forEach(([f, t]) => grid.append(
      el("line", { x1: L + f * S, y1: T, x2: L + f * S, y2: T + S, class: X.mid === f ? "mid" : "" }),
      el("text", { x: L + f * S, y: T + S + 16, class: "tick", "text-anchor": "middle" }, t),
    ));
    Y.ticks.forEach(([f, t]) => grid.append(
      el("line", { x1: L, y1: T + S - f * S, x2: L + S, y2: T + S - f * S, class: Y.mid === f ? "mid" : "" }),
      el("text", { x: L - 10, y: T + S - f * S + 4, class: "tick", "text-anchor": "end" }, t),
    ));
    grid.append(
      el("rect", { x: L, y: T, width: S, height: S, class: "frame" }),
      el("text", { x: L + S / 2, y: T + S + 36, class: "axis", "text-anchor": "middle" }, X.label + " →"),
      el("text", { x: 0, y: 0, class: "axis", "text-anchor": "middle",
        transform: `translate(12 ${T + S / 2}) rotate(-90)` }, Y.label + " →"),
    );

    /* Corner labels sit in the outer corners, where dots are least likely. */
    const quad = el("g", { class: "mm-quad" });
    const [tl, tr, bl, br] = (fig.dataset.corners || "").split("|");
    [[tl, L + 8, T + 18, "start"], [tr, L + S - 8, T + 18, "end"],
     [bl, L + 8, T + S - 10, "start"], [br, L + S - 8, T + S - 10, "end"],
    ].forEach(([t, x, y, a]) => t && quad.append(el("text", { x, y, "text-anchor": a }, t)));

    const dots = el("g", { class: "mm-dots" });
    svg.append(grid, quad, dots);

    /* Group by point; fan any group of n > 1 round a small circle. */
    const byPoint = {};
    pts.forEach((f) => {
      const key = f.dataset[xk] + "," + f.dataset[yk];
      (byPoint[key] ||= []).push(f);
    });

    const marks = new Map();
    Object.values(byPoint).forEach((group) => {
      group.forEach((f, i) => {
        let x = px(f.dataset[xk]), y = py(f.dataset[yk]);
        if (group.length > 1 && (X.bands || Y.bands)) {
          /* On a banded axis, spread along the band so the score stays exact. */
          const d = (i - (group.length - 1) / 2) * 15;
          if (X.bands) x += d; else y += d;
        } else if (group.length > 1) {
          const a = (i / group.length) * 2 * Math.PI - Math.PI / 2;
          const r = group.length > 3 ? 12 : 9;
          x += Math.cos(a) * r;
          y += Math.sin(a) * r;
        }
        const name = f.querySelector("h3").textContent;
        const g = el("g", {
          class: "mm-dot", "data-industry": f.dataset.industry,
          tabindex: "0", role: "button", "aria-label": name,
        });
        g.append(
          el("circle", { cx: x, cy: y, r: 16, class: "hit" }),
          el("circle", { cx: x, cy: y, r: 6.5, class: "mark" }),
        );
        dots.append(g);
        marks.set(f, { g, x, y, name });
      });
    });

    /* Hover label: name and size only. Everything else lives in the panel. */
    const tip = document.createElement("div");
    tip.className = "mm-tip";
    plot.append(tip);
    const showTip = (f) => {
      const m = marks.get(f);
      tip.textContent = hoverText(f);
      /* Sit above the dot, slid sideways as needed to stay inside the plot. */
      const w = plot.clientWidth, tw = tip.offsetWidth;
      const cx = (m.x / 400) * w;
      tip.style.left = Math.max(0, Math.min(w - tw, cx - tw / 2)) + "px";
      /* Near the top edge, drop below the dot instead of covering the legend. */
      const below = m.y < 60;
      tip.classList.toggle("below", below);
      tip.style.top = (m.y / 400) * w + (below ? 14 : -14) + "px";
      tip.classList.add("on");
    };
    const hideTip = () => tip.classList.remove("on");

    /* One panel under the chart shows the selected firm. */
    const panel = document.createElement("div");
    panel.className = "mm-panel";
    panel.setAttribute("aria-live", "polite");
    const nav = document.createElement("div");
    nav.className = "mm-nav";
    const prev = btn("‹", "Previous firm"), next = btn("›", "Next firm");
    const count = document.createElement("span");
    nav.append(prev, count, next);
    const body = document.createElement("div");
    body.className = "mm-body";
    panel.append(nav, body);
    fig.insertBefore(panel, fig.querySelector("figcaption"));

    /* Walk firms in chart order: left to right, then bottom to top. */
    const order = [...pts].sort((a, b) =>
      a.dataset[xk] - b.dataset[xk] || a.dataset[yk] - b.dataset[yk]);

    let current = null;

    const select = (f) => {
      current = f;
      if (f && focusInd && f.dataset.industry !== focusInd) setFocus(null);
      marks.forEach((m, k) => m.g.classList.toggle("sel", k === f));
      if (!f) {
        body.innerHTML = '<p class="mm-empty">Tap a dot to see the firm.</p>';
        count.textContent = `${order.length} firms`;
        return;
      }
      /* The card: name, meta, then only the scores this chart plots. */
      body.innerHTML = "";
      const h = f.querySelector("h3").cloneNode(true);
      const sw = document.createElement("i");
      sw.className = "mm-swatch";
      sw.dataset.industry = f.dataset.industry;
      h.prepend(sw);
      const dl = document.createElement("dl");
      dl.className = "firm-scores";
      f.querySelectorAll(".firm-scores [data-key]").forEach((n) => {
        if (n.dataset.key === xk || n.dataset.key === yk) dl.append(n.cloneNode(true));
      });
      const more = document.createElement("a");
      more.className = "mm-more";
      more.href = "#" + f.id;
      more.textContent = "Full profile ↓";
      more.addEventListener("click", () => openProfile(f.id));
      body.append(h, f.querySelector(".firm-meta").cloneNode(true), dl, more);
      count.textContent = `${order.indexOf(f) + 1} of ${order.length}`;
    };
    const step = (d) => {
      const i = current ? order.indexOf(current) : d > 0 ? -1 : 0;
      select(order[(i + d + order.length) % order.length]);
    };
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));

    marks.forEach((m, f) => {
      m.g.addEventListener("mouseenter", () => showTip(f));
      m.g.addEventListener("mouseleave", hideTip);
      m.g.addEventListener("focus", () => showTip(f));
      m.g.addEventListener("blur", hideTip);
      m.g.addEventListener("click", () => { select(f); showTip(f); });
      m.g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(f); }
      });
    });

    select(null);
  });
})();
