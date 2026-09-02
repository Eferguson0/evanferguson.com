# evanferguson.com

A single-page vertical timeline of projects, oldest first. Static — no build
step, no dependencies, no framework. Open `index.html` and it works.

## Editing

Everything is in **`assets/projects.js`**. Each entry is:

```js
{
  year: 2021,
  title: "Project Name",
  url: "https://example.com",              // "" if private / no site
  preview: "assets/previews/slug.png",     // "" for a plain placeholder card
  summary: "One to three sentences.",
  skills: ["JavaScript", "React", "Postgres"],
}
```

Order is by `year`, ascending. Nothing else needs touching.

## Website previews

```bash
./tools/shoot.sh https://yoursite.com project-slug
```

Captures `assets/previews/project-slug.png` at 1440×900 with headless Chrome,
which matches the 16:10 crop the cards use. Then set
`preview: "assets/previews/project-slug.png"` on that entry.

Entries with no preview render a subtle hatched placeholder, so the page looks
finished even while screenshots are still missing.

## Files

| File | What it is |
|---|---|
| `assets/projects.js` | **Your content.** The only file you normally edit |
| `assets/style.css` | Design tokens and layout. Light and dark both defined |
| `assets/site.js` | Renders the timeline from the data |
| `tools/shoot.sh` | Screenshot helper for the preview cards |
| `CNAME` | Custom domain for GitHub Pages |

## Local preview

```bash
python3 -m http.server 8080
```

## Deploying

### GitHub Pages — recommended for a static one-pager

1. Push this folder to a repo.
2. Settings → Pages → Source: `main`, `/ (root)`.
3. Settings → Pages → Custom domain: `evanferguson.com`. `CNAME` is committed.
4. At Spaceship, set DNS:
   - `A` @ → `185.199.108.153`
   - `A` @ → `185.199.109.153`
   - `A` @ → `185.199.110.153`
   - `A` @ → `185.199.111.153`
   - `CNAME` www → `<github-username>.github.io`
5. Tick **Enforce HTTPS** once the certificate issues.

### Render — use this instead if you later add a backend

New → Static Site → connect the repo. Publish directory `.`, build command
blank. Add the custom domain there and point Spaceship's DNS at Render's values.

Pick one host, not both, or the domain will flap between them.

## Migration note

Weebly stays authoritative until you repoint DNS. Verify the site on the
`github.io` URL first, then cut over — allow a few hours where either could be
served depending on the resolver.
