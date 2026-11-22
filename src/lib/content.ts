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
    body: [
      "You are trapped in a box. The walls are right there and as you walk to face the wall, you look up to see its daunting figure loom over you. Your hand is warm and the wall is cold. It is telling you the limits of where you can go. No matter how you scream and kick and hit at the wall it is unrelenting. But have you ever tried to walk through it?",
      "I can feel an ineffable, innate boundary in my mind; it's there and it's not. And even when I tell myself that I have no limits, I know that they exist like invisible walls in my head that I run into only when I dare to venture far enough from comfort. That has been satisfying enough a conclusion to feed the will to explore, but now I wonder, does this wall truly even exist, do I dare to dream? What is a figment of my imagination and what isn't?",
      "Disappointment is a bitter pill to swallow. So bitter a pill that it kills those dreams and anything beyond those dreams. I've noticed that my brain tells me to stop once I begin to dream of goals greater than those that I've already failed, and embarrassingly most of the time I listen. I believe myself about my own limits, rationalized along the lines of 'if I've failed once I'll fail again and I'd rather save myself the disappointment.' So I try to internalize the advice of all the peers and the gurus more successful than I. \"Just do it,\" they say, \"anything is possible if you put your mind to it.\" Empirically though, this works terribly. I'm trying to just do it, and I can't, and I'm putting my mind to it, and I can't.",
      "So then how do they do it? Well I've stalked their website, blog, and history, they were just at the right place at the right time, I tell myself. And so my brain is satisfied with this half-hearted answer, that there's nothing I could've done and that I just didn't have the wow factor that they had. A protection mechanism from failure that lets me forget. Slowly the ambitious dreams of old turn into bricks to build walls that encircle a zone of safety, I've built the box with no walls.",
      "There is this beautiful thing about being human, even when we know something is true we can make ourselves believe that it's not. But now it has polluted both branches, I know that the wall doesn't exist but at the same time I know that some wall does exist. I can't tell what is true and what is not, both are true and both are not. When is the wall real and when is it fake. If I walk through a wall at this spot and this point in time and I hit my head and embarrass myself (which I've done many times) and I switch spots to hit my head again, when do I stop?",
      "Never stop. Ok.. that's easy to say but hard to do. I am susceptible to giving up. So just keep going then, I look insane until the day I walk through a wall. I'm in a box with walls and no walls, I have to believe that it's no walls. I hope there's no walls.",
    ],
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
