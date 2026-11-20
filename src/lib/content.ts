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
  "I study computer science and math at Northwestern. I'm interested in solving hard problems, namely making AI safe. I've done work in distributed systems and machine learning.",
  "Feel free to reach out at my email! I'm always open to feedback and new ideas. ",
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
    id: "neuron-quadrants",
    title: "Neuron Quadrant Interventions",
    year: "2026",
    description:
      "Tests whether Q3 neuron firings control reasoning length in small dense models, following up Goodfire's \"Neurons as an Interpretable Basis\". On Qwen3-1.7B, scaling the Q3 leaks moves thinking length from about 2.1x to 0.4x of normal. Work in progress; results are preliminary.",
    tags: ["Python", "Interpretability", "Qwen3"],
    links: [
      { label: "GitHub", href: "https://github.com/ericzhou12/neuron-quadrant-interventions" },
    ],
  },
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
