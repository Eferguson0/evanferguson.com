/* ---------------------------------------------------------------------------
   PROJECT DATA — the only file you need to edit.

   start     "YYYY-MM"  — when it began. Sorts the timeline (newest first).
   end       "YYYY-MM"  — when it ended, or null if it's still running.
                          The rail shows the start year, plus "–2022" / "–now"
                          on a second line when the end differs.
   title     string
   slug      string     — gives the project its own page at /<slug>/, and the
                          title on the front page links there instead of out.
                          Omit it and the title links straight to `url`.
                          Run tools/build-pages.mjs after changing this.
   url       string     — live site, or "" if there isn't one. With a slug set,
                          this becomes the "visit" link on the project's page.
   layout    string     — how the project's own page is built. "a16z" is a
                          wide left-aligned header; "claude" is a centred one
                          over a three-column facts band. Omit for the plain
                          page (title, description, preview, record).
   headline  string     — the result said as a sentence. Becomes the <h1> on
                          layout pages, with the title stepping down beneath
                          it. The browser title and share cards keep `title`.
   role      string     — what I did, one or two words. "claude" layout only.
   results   array      — [{ headline, note }] for the facts band. One or two.
                          "claude" layout only.
   visitLabel string    — overrides the outbound link's "Visit <title>" label,
                          for when `url` points at something other than the
                          project itself.
   preview   string     — screenshot in assets/previews/, or "" for a
                          hatched placeholder card
   role      string     — who did it, and with whom
   outcome   string     — what happened to it. Facts, separated by " · "
   summary   string     — legacy prose line; role/outcome take priority
   value     string     — legacy second prose line
   skills    array      — rendered small and grey under the preview
   skillsLabel string   — what to call that row. "Stack" where the list is
                          technologies, "Competencies" where it is disciplines.
                          Defaults to "Skills".
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
    layout: "claude",
    headline: "Making Yelp cool",
    role: "Operations",
    skillsLabel: "Competencies",
    // Two revenue models are on record in the pitches: advertising (Oct 2021)
    // and a restaurant subscription (Mar 2022). Neither held.
    results: [
      {
        headline: "50+ interviews",
        note: "with Gen Z diners, shaping what the app became",
      },
      {
        headline: "2 business models",
        note: "tested advertising, then restaurant subscriptions",
      },
    ],
    url: "",
    preview: "assets/previews/flyerz.webp",
    description: "Making Yelp cool",
    team: "4: myself, co-founder (marketing), designer, engineer",
    result:
      "Startup in the Zahn Innovation Center, shipped an iOS MVP after 50 " +
      "discovery interviews \u2014 wound down for lack of a B2B model",
    skills: ["Co-founding", "Management", "Recruiting", "Pitching", "Customer discovery", "Competitive analysis"],
  },
  {
    // Kickoff 08/08/2023; Phase 1 closeout report 07/18/24, meeting 07/25/24.
    // (Contract itself ran to 12/31/2026 — this entry covers the Phase 1 build.)
    // 23 = 1 PM + 6 eng + 6 TAM + 2 CS + 4 env. science + 4 Deloitte.
    start: "2023-08",
    end: "2024-07",
    title: "Delivering Nevada (NZero)",
    slug: "nevada",
    layout: "claude",
    visitLabel: "Article",
    headline: "Centralizing energy, water & emissions data for Nevada",
    role: "Technical PM",
    skillsLabel: "Competencies",
    results: [
      {
        headline: "453 sites",
        note: "reporting energy, water and emissions across 13 state departments",
      },
      {
        headline: "$1M+ in new business",
        note: "won with this project as the reference",
      },
    ],
    url: "https://nzero.com/case/net-zero-nevada-2/",
    preview: "assets/previews/nevada.webp",
    description: "Data management for state government.",
    team: "23: myself, engineering (6), TAM (6), CS (2), environmental science (4), Deloitte (4)",
    result:
      "Delivered energy, water, and emissions data for 453 sites across " +
      "13 state departments, leading to additional statewide contracts",
    skills: ["Project management", "Partner delivery", "Stakeholder management", "Training delivery"],
  },
  {
    // Dates from the Drive folder (Feb–Apr 2025).
    start: "2025-02",
    end: "2025-04",
    title: "Relay",
    // Not "relay" — /relay/ is already the product landing page.
    slug: "relay-project",
    layout: "claude",
    headline: "Accelerating communication through harness design & agent memory",
    skillsLabel: "Stack",
    // Both drawn from relay-legacy/app.py: six Agent()/Crew() pairs, and the
    // ten style fields append_style_entry() writes to Supabase, of which
    // get_latest_style_summary() reads back the most recent three.
    results: [
      {
        headline: "6 agents",
        note: "channel suggestion, recipient lookup, subject lines, drafting and refinement",
      },
      {
        headline: "10 style dimensions",
        note: "extracted from every draft; the last three condition the next",
      },
    ],
    url: "/relay/",
    preview: "assets/previews/relay.webp",
    description: "Quickly relay information with AI.",
    team: "Solo",
    result:
      "Developed for personal use w/ agent memory — used until Claude " +
      "rolled out MCP support & made this tool obsolete",
    skills: ["Python", "Flask", "CrewAI", "Anthropic API", "OpenAI API", "Agent memory", "Supabase", "Cursor"],
  },
  {
    start: "2025-07",
    end: "2026-07",
    title: "Supahealth",
    slug: "supahealth",
    layout: "claude",
    headline: "Cutting body fat quickly with real-time data",
    role: "Full-stack engineer",
    skillsLabel: "Stack",
    results: [
      {
        headline: "15 users",
        note: "on TestFlight",
      },
      {
        headline: "Shipped on AWS",
        note: "FastAPI + Postgres",
      },
    ],
    url: "https://supahealth-landing.onrender.com",
    preview: "assets/previews/supahealth.webp",
        description: "Real-time body composition management.",
    team: "2: myself, DevOps engineer",
    result: "Shipped an iOS beta to TestFlight on an AWS backend and onboarded 15 users",
    skills: ["Swift", "Python", "FastAPI", "PostgreSQL", "Data modeling", "Context engineering", "Data ingestion", "PostHog", "Claude Code"],
  },
  {
    start: "2026-04",
    end: null,
    // `feature: true` lifts an entry out of the timeline into its own block
    // above it. Remove this line and it drops back in as a normal entry.
    feature: true,
    title: "Mapping AI Adoption",
    slug: "ai-maturity-mapping",
    layout: "claude",
    // From the Aug 2026 resume: primary research with owners and executives
    // across industries and firm sizes, mapping adoption, buying barriers,
    // and where hands-on implementation creates the most value.
    headline: "Charting AI adoption across industries",
    // The link still goes to the practice's site, so name that, not the project.
    visitLabel: "Visit Project Website",
    role: "Researcher",
    results: [
      {
        headline: "17 interviews",
        note: "on experience with AI to-date & workflow opportunities",
      },
      {
        headline: "6 industries",
        note: "evaluated",
      },
    ],
    url: "https://fergusonappliedai.com",
    preview: "assets/previews/faai.webp",
    description: "Charting AI maturity across industries & segments.",
    team: "",
    result: "",
    skills: [],
  },
];
