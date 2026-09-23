/* Theme toggle, shared by the front page and the project pages. Kept apart
   from site.js because that file renders the timeline and assumes the front
   page's DOM; this runs anywhere the toggle button exists. */

(() => {
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch (_) {}
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  const btn = document.getElementById("themeBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const cur = document.documentElement.getAttribute("data-theme") || (sysDark ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (_) {}
  });
})();
