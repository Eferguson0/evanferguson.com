/* ---------------------------------------------------------------------------
   PROJECT DATA — the only file you need to edit.

   start     "YYYY-MM"  — when it began. Sorts the timeline (oldest first).
   end       "YYYY-MM"  — when it ended, or null if it's still running.
                          The rail shows the start year, plus "–2022" / "–now"
                          on a second line when the end differs.
   title     string
   url       string     — live site, or "" if there isn't one
   preview   string     — screenshot in assets/previews/, or "" for a
                          hatched placeholder card
   summary   string     — 1–3 sentences. What it was and why it existed.
   skills    array      — rendered small and grey under the preview

   Seasons map to months: spring 04, summer 07, fall 10, winter 01.
--------------------------------------------------------------------------- */

const SITE = {
  name: "Evan Ferguson",
  // Optional line under the name. Leave "" and nothing renders.
  intro: "",
  email: "evan.ferguson0@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/PLACEHOLDER" },
    { label: "LinkedIn", href: "https://linkedin.com/in/PLACEHOLDER" },
  ],
};

const PROJECTS = [
  {
    start: "2021-04",
    end: "2022-07",
    title: "Flyerz",
    url: "",
    preview: "",
    summary:
      "A TikTok-meets-Yelp concept: restaurant reviews and recommendations " +
      "built around short-form video instead of written reviews, with a " +
      "social feed at the centre of discovery.",
    // TODO(Evan): confirm — what did you actually build this in?
    skills: ["Product design", "Mobile", "Social"],
  },
  {
    start: "2025-04",
    end: "2025-10",
    title: "Aspire",
    url: "",
    preview: "",
    // TODO(Evan): needs a real description — what did it do, and for whom?
    summary:
      "An AI-assisted job search tool.",
    // TODO(Evan): confirm the stack.
    skills: ["LLM APIs", "Product"],
  },
  {
    start: "2025-07",
    end: "2026-07",
    title: "Supahealth",
    url: "https://supahealth-landing.onrender.com",
    preview: "assets/previews/supahealth.png",
    summary:
      "An iOS fitness app that builds a nutrition and training plan from your " +
      "biometrics, then adjusts daily calorie targets in real time against " +
      "burn pulled from Apple Health. Shipped to the App Store with a " +
      "subscription tier and an AI assistant that can answer questions " +
      "against your own data.",
    // TODO(Evan): confirm — inferred from the repos and the landing page.
    skills: ["Swift", "HealthKit", "Backend API", "Postgres", "Render", "App Store"],
  },
  {
    start: "2026-04",
    end: null,
    title: "Ferguson Applied AI",
    url: "https://fergusonappliedai.com",
    preview: "assets/previews/faai.png",
    summary:
      "AI implementation consulting. A workflow audit to find where AI " +
      "actually pays off, then end-to-end system configuration, then training " +
      "and handoff so the team keeps running it without me.",
    // TODO(Evan): confirm.
    skills: ["AI implementation", "Workflow design", "Consulting", "Web"],
  },
];
