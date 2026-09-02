# evanferguson.com

Single-page personal site. Static — no build step, no dependencies, no framework.
Open `index.html` in a browser and it works.

## Editing

**Everything lives in `assets/projects.js`.** The chart, the ledger, the skill
strip and the headline stats are all generated from that one array. Add a
project object, reload, done.

The one field to labour over is `delta` — one sentence on what you could do
after that project that you couldn't do before. That field is what turns a list
of work into a visible trajectory. If a project has no honest `delta`, it
probably doesn't belong on the page.

`complexity` (1–10) is the y-axis of the ridge chart. Judge it relative to your
own other projects, not to the industry.

## Files

| File | What it is |
|---|---|
| `index.html` | Page skeleton only — all content is injected |
| `assets/projects.js` | **Your content.** The only file you normally edit |
| `assets/style.css` | Design tokens + layout. Light/dark both defined |
| `assets/site.js` | Renders the page from the data |
| `CNAME` | Custom domain for GitHub Pages |

## Local preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deploying

### GitHub Pages (recommended for a static one-pager — free, no cold starts)

1. Push this folder to a repo.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Settings → Pages → Custom domain: `evanferguson.com`. The `CNAME` file is
   already committed.
4. At Spaceship, set DNS:
   - `A` @ → `185.199.108.153`
   - `A` @ → `185.199.109.153`
   - `A` @ → `185.199.110.153`
   - `A` @ → `185.199.111.153`
   - `CNAME` www → `<github-username>.github.io`
5. Back in GitHub Pages, tick **Enforce HTTPS** once the cert issues (can take
   up to ~24h after DNS propagates).

### Render (use this instead if you later add a backend)

New → Static Site → connect the repo. Publish directory `.`, build command
blank. Then add `evanferguson.com` under Custom Domains and point Spaceship's
DNS at the values Render shows you.

Don't do both at once — pick one, or the domain will flap between them.

## Migration note

Weebly is still authoritative until you move the DNS. Get the new site live on
the `github.io` (or `onrender.com`) URL and eyeball it there **before** you
repoint `evanferguson.com`. The cutover is a DNS change, so allow a few hours
where both could be served depending on the resolver.
