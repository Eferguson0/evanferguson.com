/* ---------------------------------------------------------------------------
   PROJECT DATA — the only file you need to edit.

   start     "YYYY-MM"  — when it began. Sorts the timeline (newest first).
   end       "YYYY-MM"  — when it ended, or null if it's still running.
                          The rail shows the start year, plus "–2022" / "–now"
                          on a second line when the end differs.
   title     string
   url       string     — live site, or "" if there isn't one
   preview   string     — screenshot in assets/previews/, or "" for a
                          hatched placeholder card
   role      string     — who did it, and with whom
   outcome   string     — what happened to it. Facts, separated by " · "
   summary   string     — legacy prose line; role/outcome take priority
   value     string     — legacy second prose line
   skills    array      — rendered small and grey under the preview
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
    url: "",
    preview: "assets/previews/flyerz.webp",
    description: "Image & video-based restaurant discovery.",
    team: "4: myself (operations), co-founder (marketing), designer, engineer",
    result:
      "Startup in the Zahn Innovation Center, shipped an iOS MVP after 50 " +
      "discovery interviews \u2014 wound down for lack of a B2B model",
    skills: ["Co-founding", "Management", "Recruiting", "Pitching", "Customer discovery", "Competitive analysis", "Incorporation"],
  },
  {
    // Kickoff 08/08/2023; Phase 1 closeout report 07/18/24, meeting 07/25/24.
    // (Contract itself ran to 12/31/2026 — this entry covers the Phase 1 build.)
    // 23 = 1 PM + 6 eng + 6 TAM + 2 CS + 4 env. science + 4 Deloitte.
    start: "2023-08",
    end: "2024-07",
    title: "State of Nevada (NZero)",
    url: "https://nzero.com/case/net-zero-nevada-2/",
    preview: "assets/previews/nevada.webp",
    description: "Carbon management for state government.",
    team: "23: myself (technical PM), engineering (6), TAM (6), CS (2), environmental science (4), Deloitte (4)",
    result:
      "Delivered energy, water, and emissions data for 453 buildings across " +
      "13 state departments, leading to additional statewide contracts",
    skills: ["Project management", "Partner delivery", "Stakeholder management", "Training delivery"],
  },
  {
    // Dates from the Drive folder (Feb–Apr 2025).
    start: "2025-02",
    end: "2025-04",
    title: "Relay",
    url: "/relay/",
    preview: "assets/previews/relay.webp",
    description: "Quickly relay information with AI.",
    team: "Solo",
    result:
      "Developed for personal use w/ agent memory — used until Claude " +
      "rolled out MCP support & made this tool obsolete",
    skills: ["TypeScript", "Next.js", "Python", "CrewAI", "Anthropic API", "OpenAI API", "Agent memory", "Supabase", "Cursor"],
  },
  {
    start: "2025-07",
    end: "2026-07",
    title: "Supahealth",
    url: "https://supahealth-landing.onrender.com",
    preview: "assets/previews/supahealth.webp",
        description: "Real-time body composition management.",
    team: "2: myself (full-stack), DevOps engineer",
    result: "Shipped an iOS beta to TestFlight on an AWS backend and onboarded 15 users",
    skills: ["Swift", "Python", "FastAPI", "PostgreSQL", "Data modeling", "Context engineering", "Data ingestion", "PostHog", "Claude Code"],
  },
  {
    start: "2026-04",
    end: null,
    // `feature: true` lifts an entry out of the timeline into its own block
    // above it. Remove this line and it drops back in as a normal entry.
    feature: true,
    title: "Ferguson Applied AI",
    url: "https://fergusonappliedai.com",
    preview: "assets/previews/faai.webp",
    description: "Bringing established organizations into the AI era.",
    // The offer, not a portfolio entry — no team, result or skills row.
    team: "",
    result: "",
    skills: [],
  },
];
