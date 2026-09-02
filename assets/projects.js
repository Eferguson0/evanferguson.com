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
    description: "Restaurant discovery based on photos from friends, not reviews.",
    team: "4: myself, co-founder, designer, engineer",
    result: "50+ user interviews, $10k funding, built team to 4",
    skills: ["Co-founding", "Incorporation", "Customer discovery", "Pitching", "Recruiting", "Management"],
  },
  {
    // Dates from the Drive folder (Feb–Apr 2025).
    start: "2025-02",
    end: "2025-04",
    title: "Relay",
    url: "/relay/",
    preview: "assets/previews/relay.webp",
    description: "An AI notepad for drafting, with in-place editing.",
    team: "Solo",
    result:
      "Developed prototype, implemented memory system — used until Claude " +
      "rolled out MCP support & made this tool obsolete",
    skills: ["TypeScript", "Next.js", "Python", "Supabase", "Anthropic API", "OpenAI API", "CrewAI", "Agent memory"],
  },
  {
    start: "2025-04",
    end: "2025-10",
    title: "Aspire",
    url: "",
    preview: "assets/previews/aspire.webp",
    description: "AI resume tailoring for early-career job seekers.",
    team: "",
    result: "",
    skills: ["Meta Ads", "Market research", "User interviews", "Pricing", "Product", "Cursor"],
  },
  {
    start: "2025-07",
    end: "2026-07",
    title: "Supahealth",
    url: "https://supahealth-landing.onrender.com",
    preview: "assets/previews/supahealth.webp",
        description: "An iOS fitness app that adjusts calorie targets daily.",
    team: "2: myself, security engineer",
    result: "15 users, frontend on TestFlight, backend on AWS",
    skills: ["Swift", "SwiftUI", "HealthKit", "FastAPI", "PostgreSQL", "OpenAI API", "AWS", "PostHog", "Beta testing", "Claude Code"],
  },
  {
    start: "2026-04",
    end: null,
    // `feature: true` lifts an entry out of the timeline into its own block
    // above it. Remove this line and it drops back in as a normal entry.
    feature: true,
    title: "Ferguson Applied AI",
    url: "https://fergusonappliedai.com",
    preview: "assets/previews/faai.png",
    description: "AI implementation consulting.",
    // The offer, not a portfolio entry — no team, result or skills row.
    team: "",
    result: "",
    skills: [],
  },
];
