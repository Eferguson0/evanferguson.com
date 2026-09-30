/* ---------------------------------------------------------------------------
   PROJECT DATA — feeds the front page only.

   Each project's own page is hand-edited HTML at /<slug>/index.html; its
   headline, facts band and body copy live there, not here.

   start     "YYYY-MM"  — when it began. Sorts the timeline (newest first).
   end       "YYYY-MM"  — when it ended, or null if it's still running.
                          The rail shows the start year, plus "–2022" / "–now"
                          on a second line when the end differs.
   title     string
   slug      string     — links the front-page title and preview to the
                          project's page at /<slug>/ instead of out.
                          Omit it and the title links straight to `url`.
   url       string     — live site, or "" if there isn't one.
   preview   string     — screenshot in assets/previews/, or "" for a
                          hatched placeholder card
   description string   — one line under the title: what the project is.
   summary   string     — legacy prose line, shown only without a description
   value     string     — legacy second prose line, likewise
   skills    array      — legacy; shown under the preview only without a
                          description
   feature   boolean    — optional. Lifts the entry out of the timeline into
                          its own block above it, for current work.

   Seasons map to months: spring 04, summer 07, fall 10, winter 01.
--------------------------------------------------------------------------- */

const SITE = {
  name: "Evan Ferguson",
  // Optional line under the name. Leave "" and nothing renders.
  intro: "",
  email: "evan.ferguson0@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Eferguson0" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/evandferguson/" },
  ],
};

const PROJECTS = [
  {
    start: "2021-04",
    end: "2022-07",
    title: "Flyerz",
    slug: "flyerz",
    url: "",
    preview: "assets/previews/flyerz.webp",
    description: "Image & video-based restaurant discovery.",
  },
  {
    // Kickoff 08/08/2023; Phase 1 closeout report 07/18/24, meeting 07/25/24.
    // (Contract itself ran to 12/31/2026 — this entry covers the Phase 1 build.)
    start: "2023-08",
    end: "2024-07",
    title: "Delivering Nevada (NZero)",
    slug: "nevada",
    url: "https://nzero.com/case/net-zero-nevada-2/",
    preview: "assets/previews/nevada.webp",
    description: "Data management for state government.",
  },
  {
    // Dates from the Drive folder (Feb–Apr 2025).
    start: "2025-02",
    end: "2025-04",
    title: "Relay",
    // Not "relay" — /relay/ is already the product landing page.
    slug: "relay-project",
    url: "/relay/",
    preview: "assets/previews/relay.webp",
    description: "Quickly relay information with AI.",
  },
  {
    start: "2025-07",
    end: "2026-07",
    title: "Supahealth",
    slug: "supahealth",
    url: "https://supahealth-landing.onrender.com",
    preview: "assets/previews/supahealth.webp",
    description: "Real-time body composition management.",
  },
  {
    start: "2026-04",
    end: null,
    // `feature: true` lifts an entry out of the timeline into its own block
    // above it. Remove this line and it drops back in as a normal entry.
    feature: true,
    title: "Benchmarking AI Adoption",
    slug: "benchmarking-ai-adoption",
    url: "https://fergusonappliedai.com",
    preview: "assets/previews/faai.webp",
    description: "Charting maturity across industries & segments.",
  },
];
