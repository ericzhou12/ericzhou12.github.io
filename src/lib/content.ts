// Single source of truth for site content. Edit here, not in components.

export const profile = {
  name: "Eric Zhou",
  headline: "CS + Math @ Northwestern",
  location: "Troy, MI · Evanston, IL",
  email: "erichyzhou@u.northwestern.edu",
  phone: "248-250-0040",
  site: "https://ericzhou12.github.io",
  github: "https://github.com/ericzhou12",
  linkedin: "https://www.linkedin.com/in/erichyzhou/",
  lastfm: "https://www.last.fm/user/erichyzhou",
  resume: "/eric-zhou-resume.pdf",
  status: "Student @ Northwestern",
};

export const bio: string[] = [
  "Placeholder bio. A sentence or two about who you are, what you build, and what you're interested in right now.",
  "A second short paragraph for anything else: what you're looking for, side interests, or what you're listening to.",
];

export type Post = { title: string; date: string; summary: string; href: string };

/** Newest first. */
export const posts: Post[] = [];

/** Light/dark pair so node tints can swap via CSS alone, with no theme read. */
export type NodeColor = { light: string; dark: string };

/** month is 1-12; the pair sorts as year * 12 + month inside a graph layer. */
export type TimePoint = { year: number; month: number };

/** tag marks the headline artifact (e.g. "Paper") and renders it emphasized. */
export type EntryLink = { label: string; href: string; tag?: string };

export type Job = {
  id: string;
  role: string;
  /** Graph-node caption; the full role rarely fits under a 48px node. */
  shortRole?: string;
  org: string;
  orgUrl?: string;
  period: string;
  start: TimePoint;
  end: TimePoint | "present";
  color: NodeColor;
  /** Optional path under /public, e.g. "/logos/tyler.svg". Falls back to initials. */
  logo?: string;
  /** Set for solid-background marks: the logo bleeds to the node edge, cropped. */
  logoFill?: boolean;
  location: string;
  kind: string;
  summary: string;
  points: string[];
  metrics?: { value: string; label: string }[];
  stack: string[];
  links?: EntryLink[];
};

export const experience: Job[] = [
  {
    id: "tyler",
    role: "Software Development Engineer Intern",
    shortRole: "SDE Intern",
    org: "Tyler Technologies",
    orgUrl: "https://www.tylertech.com",
    logo: "/logos/tylertech.png",
    period: "May 2026 — Aug 2026",
    start: { year: 2026, month: 5 },
    end: { year: 2026, month: 8 },
    color: { light: "#415390", dark: "#415390" },
    location: "Troy, MI",
    kind: "Internship",
    summary:
      "Built a report-writing web app on S3, CloudFront, and Lambda REST APIs, secured by Cognito OIDC token checks.",
    points: [
      "Built report-writing web app on S3, CloudFront, and Lambda REST APIs, secured by Cognito OIDC token checks.",
      "Grouped endpoints into feature-level Lambdas to avoid cold starts, cutting latency ~30% in tenant report surges.",
      "Automated CI/CD with GitHub Actions, running CDK audits, security linting, and RBAC unit tests on every PR.",
    ],
    metrics: [{ value: "~30%", label: "latency cut in report surges" }],
    stack: ["AWS CDK", "Lambda", "S3", "CloudFront", "Cognito / OIDC", "GitHub Actions"],
  },
  {
    id: "simons",
    role: "Simons Research Fellow in Computer Science",
    shortRole: "Research Fellow",
    org: "Stony Brook University",
    orgUrl: "https://www.stonybrook.edu",
    logo: "/logos/stonybrook.jpg",
    logoFill: true,
    period: "Jun 2025 — Mar 2026",
    start: { year: 2025, month: 6 },
    end: { year: 2026, month: 3 },
    color: { light: "#990100", dark: "#990100" },
    location: "Stony Brook, NY",
    kind: "Research",
    summary:
      "Cut Autobahn BFT consensus latency 49.8% vs. default and 73.3% vs. random configs across 6 test scenarios.",
    points: [
      "Cut Autobahn BFT consensus latency 49.8% vs. default and 73.3% vs. random configs across 6 test scenarios.",
      "Built a Thompson-sampling CMAB tuner with safety guardrails, benchmarked on geo-distributed GCP machines.",
      "Created and presented poster, coauthored paper to disseminate research.",
      "Selected as one of 53 fellows from 1,380 applicants (3.8% acceptance rate).",
    ],
    metrics: [
      { value: "49.8%", label: "latency cut vs. default" },
      { value: "73.3%", label: "vs. random configs" },
      { value: "3.8%", label: "fellowship acceptance rate" },
    ],
    stack: ["BFT Consensus", "CMAB", "Thompson Sampling", "GCP"],
    links: [
      {
        label: "arXiv:2606.09120",
        href: "https://arxiv.org/abs/2606.09120",
        tag: "Paper",
      },
    ],
  },
  {
    id: "morgan-stanley",
    role: "Finance Academy",
    shortRole: "Finance Academy",
    org: "Morgan Stanley",
    orgUrl: "https://www.morganstanley.com",
    logo: "/logos/morganstanley.png",
    logoFill: true,
    period: "Oct 2025 — Mar 2026",
    start: { year: 2025, month: 10 },
    end: { year: 2026, month: 3 },
    color: { light: "#012c51", dark: "#012c51" },
    location: "Remote",
    kind: "Program",
    summary:
      "Pitched a Southwest Airlines bond issuance as lead-left bookrunner to Morgan Stanley and Southwest delegates.",
    points: [
      "Pitched a Southwest Airlines bond issuance as lead-left bookrunner to Morgan Stanley and Southwest delegates.",
      "Selected as one of 150 participants nationwide; trained by Institutional Securities Group analysts.",
    ],
    metrics: [{ value: "150", label: "participants nationwide" }],
    stack: ["Bond Issuance", "Capital Markets"],
  },
  {
    id: "wayne",
    role: "Blockchain Research Assistant",
    shortRole: "Research Asst.",
    org: "Wayne State University",
    orgUrl: "https://wayne.edu",
    logo: "/logos/waynestate.svg",
    period: "May 2024 — Oct 2025",
    start: { year: 2024, month: 5 },
    end: { year: 2025, month: 10 },
    color: { light: "#35746b", dark: "#35746b" },
    location: "Detroit, MI",
    kind: "Research",
    summary:
      "Wrote and tested Solidity smart contracts deployed to the Sepolia testnet; audited 20,000+ lines of code.",
    points: [
      "Wrote and tested Solidity smart contracts deployed to the Sepolia testnet; audited 20,000+ lines of code.",
      "Liaised between two graduate courses under Prof. Shiyong Lu; helped conceive Longevity AI, a health AI agent.",
    ],
    metrics: [{ value: "20,000+", label: "lines of code audited" }],
    stack: ["Solidity", "Sepolia Testnet", "Smart Contracts", "AI Agents"],
  },
  {
    id: "boardx",
    role: "Software Engineer & QA Intern",
    shortRole: "SWE / QA Intern",
    org: "BoardX",
    logo: "/logos/boardx.jpg",
    logoFill: true,
    period: "Apr 2022 — Aug 2022",
    start: { year: 2022, month: 4 },
    end: { year: 2022, month: 8 },
    color: { light: "#f25579", dark: "#f25579" },
    location: "Troy, MI · Remote",
    kind: "Internship",
    summary:
      "First engineering internship — feature work and QA on a collaborative online whiteboard product.",
    points: [
      "Contributed to feature development and quality assurance for a collaborative online whiteboard platform.",
      "Wrote and executed test plans, reporting and triaging defects alongside the engineering team.",
    ],
    stack: ["JavaScript", "QA", "Manual Testing"],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  start: TimePoint;
  end: TimePoint | "present";
  color: NodeColor;
  logo?: string;
  logoFill?: boolean;
  description: string;
  highlights: string[];
  tags: string[];
  links: EntryLink[];
};

export const projects: Project[] = [
  {
    id: "aquanet",
    title: "AquaNet",
    tagline: "Neural network for water quality assessment",
    year: "2025",
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 12 },
    color: { light: "#0e7490", dark: "#38b6d8" },
    description:
      "Trained a neural network to predict 3 lake water-quality indicators, averaging 0.34 RMSE across 100 trials.",
    highlights: [
      "Trained a neural network to predict 3 lake water-quality indicators, averaging 0.34 RMSE across 100 trials",
      "Built a preprocessing pipeline to clean and normalize 110,000+ environmental data points",
    ],
    tags: ["PyTorch", "NumPy", "pandas", "Matplotlib"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ericzhou12/GreatLakesWaterQualityANN",
      },
    ],
  },
  {
    id: "black-litterman",
    title: "Modified Black-Litterman Model",
    tagline: "Sector-level allocation with SLSQP Sharpe optimization",
    year: "2025",
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 12 },
    color: { light: "#8a6d10", dark: "#c9a52c" },
    description:
      "A modified Black-Litterman stock allocation model distributing capital by sector, optimizing the Sharpe ratio via SLSQP.",
    highlights: [
      "Wharton Global High School Investment Competition semifinalist — top 50 of 5,000+ teams",
      "Sector-level allocation with sequential least-squares constrained optimization",
    ],
    tags: ["Python", "SciPy", "pandas", "Matplotlib", "Jupyter"],
    links: [{ label: "GitHub", href: "https://github.com/ericzhou12/WGHSIC" }],
  },
];
