/* Click an image or diagram in the article body to see it full size. Click
   anywhere or press Esc to close. Uses <dialog>, so focus comes for free. */

(() => {
  /* Interactive figures keep their own clicks; a lightbox copy would lose
     the controls that drive them. */
  const items = document.querySelectorAll(
    ".article-body figure img, .article-body figure:not(.ontology) svg"
  );
  if (!items.length) return;

  const dlg = document.createElement("dialog");
  dlg.className = "zoom";
  document.body.appendChild(dlg);

  dlg.addEventListener("click", () => dlg.close());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dlg.open) dlg.close();
  });

  items.forEach((el) => {
    el.addEventListener("click", () => {
      let big;
      if (el.tagName.toLowerCase() === "img") {
        big = document.createElement("img");
        big.src = el.currentSrc || el.src;
        big.alt = el.alt;
      } else {
        // A copy of the diagram; it keeps the page's classes, so it keeps
        // the theme colours too.
        big = el.cloneNode(true);
      }
      dlg.replaceChildren(big);
      dlg.showModal();
    });
  });
})();
