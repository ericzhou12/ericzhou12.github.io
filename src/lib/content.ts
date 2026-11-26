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

export type Post = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  /** Plain paragraphs. Omitted for posts written as a component in features/writing. */
  body?: string[];
  /** Estimated reading time, set by hand. */
  minutes: number;
  /** Interactive piece shown after the text; see features/writing/post-view.tsx. */
  graphic?: "box";
};

/** Newest first. */
export const posts: Post[] = [
  {
    id: "scaling-q3-activations",
    title: "Scaling Q3 Activations Controls Chain-of-Thought Length",
    date: "Nov 2026",
    tags: ["research", "interpretability", "CoT"],
    minutes: 15,
  },
  {
    id: "the-box-with-no-walls",
    minutes: 3,
    title: "The Box with (no) Walls",
    date: "Sep 2026",
    tags: ["personal", "ambition", "self-doubt"],
    graphic: "box",
  },
];

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
