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
    summary:
      "Restaurant discovery for Gen Z built on photos, video and your own " +
      "social network instead of written reviews — the insight being that the " +
      "people you already trust are the ones you actually take recommendations " +
      "from. Co-founded and incorporated it, interviewed 200+ consumers, won " +
      "funding from SDSU's Lavin Seed Fund, and recruited a technical " +
      "co-founder to build it.",
    skills: ["Co-founding", "Customer discovery", "Fundraising", "Recruiting", "Brand"],
  },
  {
    // Dates from the Drive folder (Feb–Apr 2025).
    start: "2025-02",
    end: "2025-04",
    title: "Relay",
    url: "/relay/",
    preview: "assets/previews/relay.webp",
    summary:
      "An AI notepad for drafting. Hand it context — notes, message threads, " +
      "documents — and it writes a first draft, then you edit in place: select " +
      "any passage, say what should change, and it revises, no copy-pasting " +
      "back into a chat window. It learned your voice per channel and applied " +
      "it to each new draft. Never launched publicly.",
    skills: ["TypeScript", "Next.js", "Python", "Anthropic API", "LangChain", "Vector search"],
  },
  {
    start: "2025-04",
    end: "2025-10",
    title: "Aspire",
    url: "",
    preview: "assets/previews/aspire.webp",
    summary:
      "An AI resume tool for job seekers. Paste in a job posting and Aspire " +
      "rewrites your resume against that specific role — split-screen, with " +
      "inline editing on one side and a chat assistant on the other. Ran a " +
      "pilot with a waitlist of early-career job seekers.",
    skills: ["LLM APIs", "Resume parsing", "User research", "Pricing", "Product"],
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
    skills: ["Swift", "SwiftUI", "HealthKit", "FastAPI", "PostgreSQL", "Docker", "OpenAI API"],
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
    skills: ["AI implementation", "Workflow audit", "Training & enablement", "Client delivery"],
  },
];
