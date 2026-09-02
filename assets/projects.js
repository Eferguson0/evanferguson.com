/* ---------------------------------------------------------------------------
   PROJECT DATA — the only file you need to edit.

   year      number   — drives the timeline order (oldest first)
   title     string   — project name
   url       string   — live site, or "" if there isn't one / it's private
   preview   string   — path to a screenshot in assets/previews/, or "" for a
                        plain placeholder card
   summary   string   — 1–3 sentences. What it was and why it existed.
   skills    array    — rendered small and grey under the preview
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
    year: 2017,
    title: "PLACEHOLDER — First Venture",
    url: "",
    preview: "",
    summary:
      "Replace this with your earliest real project. Even a small one belongs " +
      "here — the distance between this entry and the last one is the whole point.",
    skills: ["Excel", "Sales", "Operations"],
  },
  {
    year: 2019,
    title: "PLACEHOLDER — Ops Automation",
    url: "",
    preview: "",
    summary:
      "The first time you wrote code to solve your own business problem. The " +
      "crossover projects are the most interesting entries on the page.",
    skills: ["Python", "Google Sheets API", "Zapier"],
  },
  {
    year: 2021,
    title: "PLACEHOLDER — First Real Application",
    url: "https://example.com",
    preview: "",
    summary:
      "A full application with users other than you. Say what made it hard, " +
      "not what features it had.",
    skills: ["JavaScript", "React", "Postgres", "Render"],
  },
  {
    year: 2023,
    title: "PLACEHOLDER — Production System",
    url: "https://example.com",
    preview: "",
    summary:
      "Multi-service, real data volume, real consequences when it broke. " +
      "Describe the constraint that shaped the design.",
    skills: ["TypeScript", "Node", "Postgres", "Redis", "AWS"],
  },
  {
    year: 2025,
    title: "PLACEHOLDER — Current Work",
    url: "https://example.com",
    preview: "",
    summary:
      "What you're building now. Give this one a little more room than the " +
      "others — it's the entry people read before they email you.",
    skills: ["Swift", "TypeScript", "Postgres", "LLM APIs"],
  },
];
