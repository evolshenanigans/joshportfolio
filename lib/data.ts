// Single source of truth for portfolio content.
// Projects are the 5 curated repos from github.com/evolshenanigans.
// Stats and timeline are pulled directly from 2026resume.pdf.

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  tags: readonly string[]
  repo: string
  status: "Shipped" | "Active" | "In Progress"
}

export interface TimelineEntry {
  id: string
  year: string
  role: string
  org: string
  location: string
  blurb: string
  chapter: "teacher" | "engineer" | "scientist"
  icon: "chalk" | "stethoscope" | "laptop" | "passport" | "cap"
}

export interface Stat {
  value: string
  label: string
  source: string
}

export interface Skill {
  name: string
  category: "core" | "ml" | "data" | "eng" | "cloud"
}

export const headline = {
  h1: "Data scientist by training. Translator by trade.",
  sub: "From English major to ML engineer — I build models that explain themselves, because someone has to.",
} as const

export const projects: readonly Project[] = [
  {
    id: "playerformations",
    number: "01",
    title: "Playerformations",
    subtitle: "Athlete performance modeling",
    description:
      "Data pipelines and models for analyzing player performance across youth and collegiate sports datasets.",
    tags: ["Python", "Pandas", "Scikit-learn", "Sports"],
    repo: "https://github.com/evolshenanigans/playerformations",
    status: "Active",
  },
  {
    id: "logi-flow-japan",
    number: "02",
    title: "Logi-Flow Japan",
    subtitle: "Cross-border logistics analytics",
    description:
      "Operations research and routing analysis for international athletic team logistics in Japan.",
    tags: ["Python", "Optimization", "Geo", "Logistics"],
    repo: "https://github.com/evolshenanigans/logi-flow-japan",
    status: "Active",
  },
  {
    id: "deeplens",
    number: "03",
    title: "DeepLens",
    subtitle: "Computer vision exploration",
    description:
      "Deep learning and computer vision experiments — image classification, detection, and visual reasoning.",
    tags: ["PyTorch", "CV", "Deep Learning"],
    repo: "https://github.com/evolshenanigans/deeplens",
    status: "In Progress",
  },
  {
    id: "chronovault",
    number: "04",
    title: "ChronoVault",
    subtitle: "Time-series forecasting toolkit",
    description:
      "Forecasting pipelines for time-series data with feature engineering and model comparison.",
    tags: ["Python", "Forecasting", "Time-Series"],
    repo: "https://github.com/evolshenanigans/chronovault",
    status: "In Progress",
  },
  {
    id: "sentinel-fraud",
    number: "05",
    title: "Sentinel Fraud",
    subtitle: "Fraud detection with explainability",
    description:
      "Binary classifier for fraud detection with SHAP-based explanations and class-imbalance handling.",
    tags: ["XGBoost", "SHAP", "Imbalanced", "Fraud"],
    repo: "https://github.com/evolshenanigans/sentinel-fraud",
    status: "In Progress",
  },
] as const

export const timeline: readonly TimelineEntry[] = [
  {
    id: "csula",
    year: "2021",
    role: "BA, English",
    org: "Cal State LA",
    location: "Los Angeles, CA",
    blurb:
      "Started as an English major. Learned that every dataset is a text — and every text has an audience.",
    chapter: "teacher",
    icon: "chalk",
  },
  {
    id: "ucla",
    year: "2016–2022",
    role: "Lead Patient Transport Tech",
    org: "UCLA Health",
    location: "Los Angeles, CA",
    blurb:
      "Cut ER call acknowledgment time 31% (9m → 6:10m) using Tableau + Epic. Helped drive a 20% hospital-wide efficiency lift.",
    chapter: "teacher",
    icon: "stethoscope",
  },
  {
    id: "coding-temple",
    year: "2022",
    role: "Software Engineering Cert",
    org: "Coding Temple",
    location: "Chicago, IL",
    blurb: "Bridge into engineering. Ruby, JavaScript, Git.",
    chapter: "engineer",
    icon: "laptop",
  },
  {
    id: "dpi",
    year: "2024",
    role: "Software Engineer",
    org: "Discovery Partners Institute",
    location: "Chicago, IL",
    blurb:
      "Built a BeautifulSoup ingestion pipeline scraping political stock-trading data. Shipped a Rails API with Pundit RBAC.",
    chapter: "engineer",
    icon: "laptop",
  },
  {
    id: "atomic-colab",
    year: "2023",
    role: "React / Mobile Developer",
    org: "Atomic · Co.Lab",
    location: "Los Angeles, CA",
    blurb:
      "30% load-time reduction. 25% bounce-rate drop. Predictive sleep algorithm on Firebase + React Native.",
    chapter: "engineer",
    icon: "laptop",
  },
  {
    id: "ggs",
    year: "2025–",
    role: "Operations & Logistics Analyst",
    org: "Gutierrez Global Sports",
    location: "Los Angeles, CA",
    blurb:
      "International athletic logistics. Financial data workflows. The job that made me want to model everything.",
    chapter: "scientist",
    icon: "passport",
  },
  {
    id: "coding-minds",
    year: "2025",
    role: "Data Science Instructor",
    org: "Coding Minds",
    location: "Arcadia, CA",
    blurb:
      "Taught K-12 students Python, pandas, and ML. Turns out English-teacher muscles still work.",
    chapter: "scientist",
    icon: "chalk",
  },
  {
    id: "bu",
    year: "2026",
    role: "MS, Data Science",
    org: "Boston University",
    location: "Boston, MA",
    blurb:
      "Machine Learning, Data Mining, Statistical Analysis. Graduating Dec 2026.",
    chapter: "scientist",
    icon: "cap",
  },
] as const

export const stats: readonly Stat[] = [
  { value: "31%", label: "ER call acknowledgment reduction", source: "UCLA Health" },
  { value: "20%", label: "Hospital-wide efficiency improvement", source: "UCLA Health" },
  { value: "30%", label: "App load-time reduction", source: "Atomic" },
  { value: "25%", label: "Onboarding bounce-rate drop", source: "Atomic" },
  { value: "15%", label: "User retention lift", source: "Atomic" },
] as const

export const skills: readonly Skill[] = [
  { name: "Python", category: "core" },
  { name: "SQL", category: "core" },
  { name: "R", category: "core" },
  { name: "Pandas", category: "data" },
  { name: "NumPy", category: "data" },
  { name: "Scikit-learn", category: "ml" },
  { name: "XGBoost", category: "ml" },
  { name: "PyTorch", category: "ml" },
  { name: "TensorFlow", category: "ml" },
  { name: "SHAP", category: "ml" },
  { name: "Tableau", category: "data" },
  { name: "A/B Testing", category: "data" },
  { name: "PostgreSQL", category: "eng" },
  { name: "Firebase", category: "eng" },
  { name: "TypeScript", category: "eng" },
  { name: "React / Next.js", category: "eng" },
  { name: "Ruby on Rails", category: "eng" },
  { name: "AWS", category: "cloud" },
  { name: "Git / GitHub", category: "eng" },
] as const

export const contact = {
  email: "joshgusgutierrez@gmail.com",
  github: "https://github.com/evolshenanigans",
  linkedin: "https://www.linkedin.com/in/gjgutierrez/",
  resume: "/2026resume.pdf",
  photo: "/cafepicremoved.png",
  location: "Los Angeles, CA",
} as const
