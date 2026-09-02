/* Renders the page from assets/projects.js. Vanilla, no build step. */

(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

  /* ------------------------------------------------------------ masthead */
  $("mastName").textContent = SITE.name;
  if (SITE.intro) {
    $("intro").textContent = SITE.intro;
    $("intro").hidden = false;
  }
  $("colophonName").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;

  $("contactRow").innerHTML = [
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`,
    ...SITE.links.map((l) => `<a href="${esc(l.href)}" rel="me noopener">${esc(l.label)}</a>`),
  ].join("");

  /* ------------------------------------------------------------ timeline */
  // Rail shows the start year, with the end year (or "now") beneath it when
  // the project didn't begin and end in the same year.
  const railLines = (p) => {
    const a = p.start.slice(0, 4);
    if (!p.end) return [a, "\u2013now"];
    const b = p.end.slice(0, 4);
    return b === a ? [a] : [a, "\u2013" + b];
  };

  const preview = (p) => {
    const inner = p.preview
      ? `<img src="${esc(p.preview)}" alt="${esc(p.title)}" loading="lazy" decoding="async">`
      : `<span>${esc(host(p.url) || "no preview yet")}</span>`;
    const cls = `preview${p.preview ? "" : " empty"}`;
    return p.url
      ? `<a class="${cls}" href="${esc(p.url)}" rel="noopener" aria-label="${esc(p.title)}">${inner}</a>`
      : `<div class="${cls}">${inner}</div>`;
  };

  const ordered = [...PROJECTS].sort((a, b) => b.start.localeCompare(a.start));

  // Current work is lifted out of the timeline so it reads as a business
  // rather than as one more row. Everything else stays chronological.
  const featured = ordered.find((p) => p.feature);
  const rest = ordered.filter((p) => p !== featured);

  if (featured) {
    // The stacked rail format doesn't suit a single inline line here.
    const startYear = featured.start.slice(0, 4);
    const dates = featured.end
      ? `${startYear}\u2013${featured.end.slice(0, 4)}`
      : `Since ${startYear}`;
    $("current").innerHTML = `
      <div class="current-meta">
        <span class="label">Currently</span>
        <span class="current-dates">${dates}</span>
      </div>
      <h2>${featured.url
        ? `<a href="${esc(featured.url)}" rel="noopener">${esc(featured.title)}</a>`
        : esc(featured.title)}</h2>
      <p class="summary">${esc(featured.summary)}</p>
      ${featured.value ? `<p class="value">${esc(featured.value)}</p>` : ""}
      ${preview(featured)}
      <div class="skills">${featured.skills
        .map((k) => `<span>${esc(k)}</span>`).join("")}</div>`;
    $("current").hidden = false;
    $("timelineHead").hidden = false;
  }

  $("timeline").innerHTML = rest
    .map((p) => `
      <article class="entry reveal">
        <div class="entry-year">${railLines(p)
          .map((l, i) => `<span${i ? ' class="to"' : ""}>${l}</span>`).join("")}</div>
        <div>
          <h2>${p.url
            ? `<a href="${esc(p.url)}" rel="noopener">${esc(p.title)}</a>`
            : esc(p.title)}</h2>
          <p class="summary">${esc(p.summary)}</p>
          ${p.value ? `<p class="value">${esc(p.value)}</p>` : ""}
          ${preview(p)}
          <div class="skills">${p.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
        </div>
      </article>`).join("");

  /* -------------------------------------------------------------- reveal */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* --------------------------------------------------------------- theme */
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch (_) {}
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  $("themeBtn").addEventListener("click", () => {
    const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const cur = document.documentElement.getAttribute("data-theme") || (sysDark ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (_) {}
  });
})();
