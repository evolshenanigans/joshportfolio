export const site = {
  name: "Wahnahbe",
  kana: "ワナビー",
  tagline: "Fun, useful AI — built & explained in public.",
  building: "SQL Battle Royale",
  socials: {
    youtube: "https://youtube.com/@wahnahbe",
    instagram: "https://instagram.com/wahnahbe",
    github: "https://github.com/wahnahbe",
    email: "joshgusgutierrez@gmail.com",
  },
  // Socials that aren't live yet — rendered greyed out with a SOON tag instead
  // of linking anywhere. Remove the entry here when the channel launches.
  comingSoon: ["youtube"],
  resume: "/joshgutierrez2026resume.pdf",
} as const

export const about = {
  bio: "I'm Joshua Gutierrez — a data scientist and ML engineer who makes hard things make sense. English major turned ML engineer; I build fun, useful AI and explain it in public as Wahnahbe.",
  arc: [
    { year: "2021", what: "BA English, Cal State LA — every dataset is a text with an audience." },
    { year: "2016–22", what: "Lead Patient Transport Tech, UCLA Health — cut ER ack time 31% with Tableau + Epic." },
    { year: "2023", what: "React / Mobile Dev, Atomic · Co.Lab — 30% load-time cut, predictive sleep model." },
    { year: "2024", what: "Software Engineer, Discovery Partners Institute — ingestion pipeline + Rails API." },
    { year: "2025", what: "Data Science Instructor, Coding Minds — taught K-12 Python, pandas, ML." },
    { year: "2026", what: "MS Data Science, Boston University (Dec 2026)." },
  ],
} as const
