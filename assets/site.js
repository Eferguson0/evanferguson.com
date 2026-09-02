/* Renders the whole page from assets/projects.js. Vanilla, no build step. */

(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const items = [...PROJECTS].sort((a, b) => a.year - b.year);
  const YEAR_MIN = items[0].year;
  const YEAR_MAX = Math.max(items[items.length - 1].year, new Date().getFullYear());
  const TRACK_COLOR = {
    business: "var(--track-business)",
    code: "var(--track-code)",
    both: "var(--track-both)",
  };

  /* ------------------------------------------------------------ masthead */
  $("mastLabel").textContent = SITE.name;
  $("tagline").textContent = SITE.tagline;
  $("intro").textContent = SITE.intro;
  $("colophonName").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;

  $("contactRow").innerHTML = [
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`,
    ...SITE.links.map((l) => `<a href="${esc(l.href)}" rel="me noopener">${esc(l.label)}</a>`),
    `<span class="label" style="align-self:center">${esc(SITE.location)}</span>`,
  ].join("");

  /* -------------------------------------------------------------- stats */
  const allStack = [...new Set(items.flatMap((p) => p.stack))];
  const stats = [
    { v: `${YEAR_MAX - YEAR_MIN}`, l: "years shipping" },
    { v: `${items.length}`, l: "projects on the record" },
    { v: `${allStack.length}`, l: "tools picked up" },
    {
      v: `${items[0].complexity}→${items[items.length - 1].complexity}`,
      l: "complexity, first to last",
    },
  ];
  $("stats").innerHTML = stats
    .map((s) => `<div class="stat"><div class="v">${esc(s.v)}</div><div class="label">${esc(s.l)}</div></div>`)
    .join("");

  /* -------------------------------------------------------- ridge chart */
  const W = 1000, H = 300;
  const PAD = { t: 42, r: 24, b: 34, l: 24 };
  const span = Math.max(YEAR_MAX - YEAR_MIN, 1);

  // Spread same-year projects so they never sit on top of each other.
  const byYear = {};
  items.forEach((p) => (byYear[p.year] = (byYear[p.year] || 0) + 1));
  const seen = {};
  const pts = items.map((p) => {
    const n = byYear[p.year];
    const k = (seen[p.year] = (seen[p.year] || 0) + 1) - 1;
    const jitter = n > 1 ? (k - (n - 1) / 2) * 0.28 : 0;
    const x = PAD.l + ((p.year + jitter - YEAR_MIN) / span) * (W - PAD.l - PAD.r);
    const y = PAD.t + (1 - (p.complexity - 1) / 9) * (H - PAD.t - PAD.b);
    return { ...p, x, y };
  });

  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const baseY = H - PAD.b;
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${baseY} L${pts[0].x.toFixed(1)},${baseY} Z`;

  const gridYears = [];
  for (let y = YEAR_MIN; y <= YEAR_MAX; y++) if ((y - YEAR_MIN) % Math.max(1, Math.round(span / 6)) === 0) gridYears.push(y);
  if (gridYears[gridYears.length - 1] !== YEAR_MAX) gridYears.push(YEAR_MAX);

  const xOf = (yr) => PAD.l + ((yr - YEAR_MIN) / span) * (W - PAD.l - PAD.r);
  const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

  const svg = $("ridge");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = `
    <line class="grid-line" x1="${PAD.l}" y1="${baseY}" x2="${W - PAD.r}" y2="${baseY}"/>
    ${gridYears.map((y) => `
      <line class="grid-line" x1="${xOf(y).toFixed(1)}" y1="${PAD.t - 14}" x2="${xOf(y).toFixed(1)}" y2="${baseY}" opacity="0.55"/>
      <text class="axis-text" x="${xOf(y).toFixed(1)}" y="${baseY + 18}" text-anchor="middle">${y}</text>`).join("")}
    <path class="ridge-area" d="${area}"/>
    <path class="ridge-path" id="ridgeLine" d="${line}"/>
    ${pts.map((p, i) => `
      <g class="node" data-i="${i}" tabindex="0" role="link" aria-label="${esc(p.title)}, ${p.year}">
        <line class="node-stem" x1="${p.x.toFixed(1)}" y1="${(p.y + 8).toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${baseY}"/>
        <text class="node-label" x="${p.x.toFixed(1)}" y="${(p.y - 14 - (i % 2 ? 13 : 0)).toFixed(1)}" text-anchor="middle">${esc(clip(p.title, 20))}</text>
        <circle class="node-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5"/>
        <circle class="node-hit" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="18"/>
      </g>`).join("")}
  `;

  // Draw the line in on first view.
  const ridgeLine = $("ridgeLine");
  const len = ridgeLine.getTotalLength();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    ridgeLine.style.strokeDasharray = len;
    ridgeLine.style.strokeDashoffset = len;
    new IntersectionObserver((es, o) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      ridgeLine.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1)";
      ridgeLine.style.strokeDashoffset = 0;
      o.disconnect();
    }), { threshold: 0.3 }).observe(svg);
  }

  /* ------------------------------------------------------------- ledger */
  $("ledger").innerHTML = items.map((p, i) => `
    <article class="record reveal" id="p-${i}">
      <div class="record-rail">
        <div class="record-year">${p.year}</div>
        <span class="track-tag" style="--tag-color:${TRACK_COLOR[p.track] || "var(--ink-4)"}">${esc(p.track)}</span>
        <div class="cx-meter" title="Complexity ${p.complexity} of 10">
          ${Array.from({ length: 10 }, (_, k) => `<i class="${k < p.complexity ? "on" : ""}"></i>`).join("")}
        </div>
        <div class="label cx-caption">difficulty ${p.complexity}/10</div>
      </div>
      <div class="record-body">
        <h3>${esc(p.title)}</h3>
        <div class="record-role">${esc(p.role)}</div>
        <p class="record-summary">${esc(p.summary)}</p>
        ${p.metrics && p.metrics.length ? `<div class="metrics">${p.metrics.map((m) =>
          `<div class="metric"><div class="mv">${esc(m.value)}</div><div class="label">${esc(m.label)}</div></div>`).join("")}</div>` : ""}
        ${p.delta ? `<div class="delta"><span class="label">New this time</span><p>${esc(p.delta)}</p></div>` : ""}
        <div class="chips">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        ${p.links && p.links.length ? `<div class="record-links">${p.links.map((l) =>
          `<a href="${esc(l.href)}" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
      </div>
    </article>`).join("");

  /* --------------------------------------------- chart ↔ ledger linkage */
  const nodes = [...svg.querySelectorAll(".node")];
  const recs = items.map((_, i) => $(`p-${i}`));

  const light = (i, on) => {
    nodes[i].classList.toggle("is-active", on);
    recs[i].classList.toggle("is-lit", on);
  };
  nodes.forEach((n, i) => {
    n.addEventListener("mouseenter", () => light(i, true));
    n.addEventListener("mouseleave", () => light(i, false));
    n.addEventListener("focus", () => light(i, true));
    n.addEventListener("blur", () => light(i, false));
    const go = () => recs[i].scrollIntoView({ behavior: "smooth", block: "center" });
    n.addEventListener("click", go);
    n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  recs.forEach((r, i) => {
    r.addEventListener("mouseenter", () => nodes[i].classList.add("is-active"));
    r.addEventListener("mouseleave", () => nodes[i].classList.remove("is-active"));
  });

  /* -------------------------------------------------- skill accretion --- */
  const firstSeen = new Map();
  items.forEach((p) => p.stack.forEach((s) => {
    if (!firstSeen.has(s) || p.year < firstSeen.get(s)) firstSeen.set(s, p.year);
  }));
  const skills = [...firstSeen.entries()].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
  const pct = (yr) => ((yr - YEAR_MIN) / span) * 100;

  $("skills").innerHTML = skills.map(([name, yr]) => `
    <div class="skill-row reveal">
      <div class="skill-name">${esc(name)}</div>
      <div class="skill-track">
        <div class="skill-bar" style="left:${pct(yr).toFixed(2)}%;right:0" title="since ${yr}"></div>
      </div>
    </div>`).join("");

  const axisYears = gridYears;
  $("skillAxis").style.gridTemplateColumns = `repeat(${axisYears.length}, 1fr)`;
  $("skillAxis").innerHTML = axisYears.map((y, i) =>
    `<span style="text-align:${i === 0 ? "left" : i === axisYears.length - 1 ? "right" : "center"}">${y}</span>`).join("");

  /* ------------------------------------------------------------ reveal - */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ------------------------------------------------------------- theme - */
  const btn = $("themeBtn");
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch (_) {}
  if (stored) document.documentElement.setAttribute("data-theme", stored);
  btn.addEventListener("click", () => {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    const cur = document.documentElement.getAttribute("data-theme") || (dark ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (_) {}
  });
})();
