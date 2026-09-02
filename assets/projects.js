/* ---------------------------------------------------------------------------
   PROJECT DATA  —  this is the only file you need to edit to update the site.
   Everything on the page (the ridge chart, the ledger, the skill strip, the
   headline stats) is generated from what's below.

   Fields
   ------
   year        number   — the year the project started (drives ordering + chart)
   title       string   — project name
   track       string   — "business" | "code" | "both"
   role        string   — your role, one short line
   summary     string   — 1–3 sentences. What it was, why it existed.
   complexity  1–10     — your honest read of technical/operational difficulty.
                          This is the y-axis of the ridge chart. Be relative,
                          not absolute — it's about showing the climb.
   metrics     array    — up to 3 { value, label }. Real numbers only.
                          Revenue, users, records, uptime, hours saved.
   stack       array    — tools/skills. Feeds the skill accretion strip.
   delta       string   — THE MOST IMPORTANT FIELD. One sentence: what you
                          could do after this that you couldn't do before.
                          This is what turns a project list into a trajectory.
   links       array    — { label, href }. Omit or leave empty if private.
--------------------------------------------------------------------------- */

const SITE = {
  name: "Evan Ferguson",
  tagline: "I build businesses and the software that runs them.",
  intro:
    "Ten years of shipping — starting with spreadsheets and cold calls, ending " +
    "with production systems. Below is every project in order, with what each " +
    "one taught me that the last one couldn't.",
  location: "PLACEHOLDER — City, ST",
  email: "evan.ferguson0@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/PLACEHOLDER" },
    { label: "LinkedIn", href: "https://linkedin.com/in/PLACEHOLDER" },
  ],
};

const PROJECTS = [
  {
    year: 2017,
    title: "PLACEHOLDER — First Venture",
    track: "business",
    role: "Founder / operator",
    summary:
      "Replace this with your earliest real project. Even a small one belongs " +
      "here — the whole point of the page is the distance between this row and " +
      "the last one.",
    complexity: 2,
    metrics: [
      { value: "$18K", label: "first-year revenue" },
      { value: "40+", label: "customers" },
    ],
    stack: ["Excel", "Sales", "Ops"],
    delta: "Learned that distribution, not the product, was the hard part.",
    links: [],
  },
  {
    year: 2019,
    title: "PLACEHOLDER — Ops Automation",
    track: "both",
    role: "Operator / self-taught builder",
    summary:
      "The first time you wrote code to solve your own business problem. " +
      "These crossover projects are the most interesting rows on the page — " +
      "lead with them.",
    complexity: 4,
    metrics: [
      { value: "22 hrs", label: "saved per week" },
      { value: "6", label: "manual steps removed" },
    ],
    stack: ["Python", "Google Sheets API", "Zapier"],
    delta: "First time I automated a process instead of hiring for it.",
    links: [],
  },
  {
    year: 2021,
    title: "PLACEHOLDER — First Real Application",
    track: "code",
    role: "Solo developer",
    summary:
      "A full application with users other than you. Note the jump in the " +
      "ridge chart — that gap is the story.",
    complexity: 6,
    metrics: [
      { value: "1.2K", label: "monthly actives" },
      { value: "99.4%", label: "uptime" },
    ],
    stack: ["JavaScript", "React", "Postgres", "Render"],
    delta: "Shipped and operated something other people depended on.",
    links: [{ label: "Live", href: "#" }],
  },
  {
    year: 2023,
    title: "PLACEHOLDER — Production System",
    track: "both",
    role: "Founding engineer",
    summary:
      "Multi-service, real data volume, real consequences when it breaks. " +
      "Describe the constraint that made it hard, not the feature list.",
    complexity: 8,
    metrics: [
      { value: "4.1M", label: "records processed" },
      { value: "<200ms", label: "p95 latency" },
      { value: "$140K", label: "ARR supported" },
    ],
    stack: ["TypeScript", "Node", "Postgres", "Redis", "AWS", "CI/CD"],
    delta: "Designed for failure instead of designing for the happy path.",
    links: [{ label: "Write-up", href: "#" }],
  },
  {
    year: 2025,
    title: "PLACEHOLDER — Current Work",
    track: "both",
    role: "Founder / engineer",
    summary:
      "What you're building now. Keep this one longer than the others — it's " +
      "the row people actually read before they email you.",
    complexity: 9,
    metrics: [
      { value: "iOS", label: "shipped to App Store" },
      { value: "3", label: "services in production" },
    ],
    stack: ["Swift", "TypeScript", "Postgres", "LLM APIs", "Render"],
    delta: "Owning the whole stack, from the pitch to the pager.",
    links: [{ label: "Live", href: "#" }],
  },
];
