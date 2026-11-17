// Single source of truth for site content. Edit here, not in components.

export const profile = {
  name: "Eric Zhou",
  headline: "CS + Math @ Northwestern",
  email: "erichyzhou@u.northwestern.edu",
  site: "https://ericzhou12.github.io",
  github: "https://github.com/ericzhou12",
  linkedin: "https://www.linkedin.com/in/erichyzhou/",
  resume: "/eric-zhou-resume.pdf",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
];

export const about: string[] = [
  "I'm a computer science and math student at Northwestern. Most of my work so far has been in distributed systems and machine learning.",
  "Last summer I interned at Tyler Technologies, building a serverless report-writing app on AWS. Before that I was a Simons Research Fellow at Stony Brook, where I used bandit algorithms to tune Byzantine fault-tolerant consensus and coauthored a paper on it, and a blockchain research assistant at Wayne State.",
];

export type Post = { title: string; date: string; summary: string; href: string };

/** Newest first. */
export const posts: Post[] = [];

export type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "aquanet",
    title: "AquaNet",
    year: "2025",
    description:
      "Trained a neural network to predict 3 lake water-quality indicators, averaging 0.34 RMSE across 100 trials.",
    tags: ["PyTorch", "NumPy", "pandas"],
    links: [
      { label: "GitHub", href: "https://github.com/ericzhou12/GreatLakesWaterQualityANN" },
    ],
  },
  {
    id: "black-litterman",
    title: "Modified Black-Litterman Model",
    year: "2025",
    description:
      "A modified Black-Litterman stock allocation model distributing capital by sector, optimizing the Sharpe ratio via SLSQP.",
    tags: ["Python", "SciPy", "pandas"],
    links: [{ label: "GitHub", href: "https://github.com/ericzhou12/WGHSIC" }],
  },
];
