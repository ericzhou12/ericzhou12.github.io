import type { CSSProperties } from "react";
import {
  experience,
  projects,
  type Job,
  type NodeColor,
  type Project,
  type TimePoint,
} from "@/lib/content";
import { initialsOf } from "@/lib/utils";

/**
 * Derives the neural-net view of the work timeline from content.ts.
 *
 * Layers are years, with everything at or before BUCKET_FLOOR collapsed into a
 * single leading column. Every entry emits a start node and an end node joined
 * by a "span" edge; entries that begin and end in one column collapse to a
 * single node, and entries still running get a dashed tail instead of an end.
 * Each column splits into a work band above and a project band below.
 *
 * Coordinates are percentages of a content box wider than the visible plot, so
 * the whole net can slide horizontally to centre whichever layer is in focus.
 */

const BUCKET_FLOOR = 2024;

/** Distance between layers, as a percentage of the *visible* plot width. */
export const LAYER_GAP = 24;

const BANDS = {
  work: { min: 12, max: 40, gap: 14 },
  project: { min: 58, max: 86, gap: 14 },
} as const;

export const BAND_BOUNDARY = (BANDS.work.max + BANDS.project.min) / 2;

export type Band = keyof typeof BANDS;

export type GraphEntry = {
  id: string;
  band: Band;
  label: string;
  initials: string;
  logo?: string;
  logoFill?: boolean;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  chips: string[];
  start: TimePoint;
  end: TimePoint | "present";
  color: NodeColor;
  job?: Job;
  project?: Project;
};

export type GraphNode = {
  key: string;
  entryId: string;
  band: Band;
  role: "start" | "end";
  layer: number;
  /** Percentages of the container box. */
  x: number;
  y: number;
};

export type Layer = { key: string; label: string; x: number; nodes: GraphNode[] };
export type SpanEdge = { key: string; entryId: string; from: GraphNode; to: GraphNode };
export type LatticeEdge = { key: string; from: GraphNode; to: GraphNode };
export type OngoingTail = { entryId: string; from: GraphNode };

const rank = (t: TimePoint) => t.year * 12 + t.month;
const bucket = (year: number) => Math.max(year, BUCKET_FLOOR);

/** Display-only truncation so labels fit under a node. */
const shortTitle = (title: string) =>
  title.replace(/^(The|Modified) /, "").replace(/ (Project|Model)$/, "");

const entries: GraphEntry[] = [
  ...experience.map<GraphEntry>((job) => ({
    id: job.id,
    band: "work",
    // The logo already carries the org, so the caption names the role.
    label: job.shortRole ?? job.role,
    initials: initialsOf(job.org),
    logo: job.logo,
    logoFill: job.logoFill,
    title: job.role,
    subtitle: job.org,
    period: job.period,
    summary: job.summary,
    chips: job.stack,
    start: job.start,
    end: job.end,
    color: job.color,
    job,
  })),
  ...projects.map<GraphEntry>((project) => ({
    id: project.id,
    band: "project",
    label: shortTitle(project.title),
    initials: initialsOf(shortTitle(project.title)),
    logo: project.logo,
    logoFill: project.logoFill,
    title: project.title,
    subtitle: project.tagline,
    period: project.year,
    summary: project.description,
    chips: project.tags,
    start: project.start,
    end: project.end,
    color: project.color,
    project,
  })),
];

export const entryById = new Map(entries.map((entry) => [entry.id, entry]));

/** Inline custom properties read by `.node-tint`, so the colour swaps with the theme in CSS. */
export const tint = (entryId: string) => {
  const color = entryById.get(entryId)?.color;
  return { "--c": color?.light, "--c-dk": color?.dark } as CSSProperties;
};

const columns = [
  ...new Set(
    entries.flatMap((entry) =>
      entry.end === "present"
        ? [bucket(entry.start.year)]
        : [bucket(entry.start.year), bucket(entry.end.year)],
    ),
  ),
].sort((a, b) => a - b);

type Draft = { node: Omit<GraphNode, "x" | "y">; sort: number; order: number };

const drafts: Draft[] = [];
const spanIds: string[] = [];
const ongoingIds: string[] = [];

entries.forEach((entry, order) => {
  const draft = (role: GraphNode["role"], layer: number, at: TimePoint) =>
    drafts.push({
      node: { key: `${entry.id}:${role}`, entryId: entry.id, band: entry.band, role, layer },
      sort: rank(at),
      order,
    });

  const startLayer = columns.indexOf(bucket(entry.start.year));
  if (entry.end === "present") {
    draft("start", startLayer, entry.start);
    ongoingIds.push(entry.id);
    return;
  }

  const endLayer = columns.indexOf(bucket(entry.end.year));
  // One column holds the whole span: a single node, sorted on when it finished.
  if (endLayer === startLayer) {
    draft("start", startLayer, entry.end);
    return;
  }

  draft("start", startLayer, entry.start);
  draft("end", endLayer, entry.end);
  spanIds.push(entry.id);
});

/** Half a plot of padding either side of the outer layers, so any layer can sit dead centre. */
export const CONTENT_WIDTH = 100 + (columns.length - 1) * LAYER_GAP;

const columnX = (layer: number) => ((50 + layer * LAYER_GAP) / CONTENT_WIDTH) * 100;

/** Most recent layer at or before the current year — the default centre. */
export const DEFAULT_FOCUS = columns.reduce(
  (acc, year, i) => (year <= new Date().getFullYear() ? i : acc),
  0,
);

const place = (band: Band, count: number, row: number) => {
  const { min, max, gap: desired } = BANDS[band];
  const gap = count > 1 ? Math.min(desired, (max - min) / (count - 1)) : 0;
  return (min + max) / 2 + (row - (count - 1) / 2) * gap;
};

export const layers: Layer[] = columns.map((year, layer) => {
  const x = columnX(layer);
  const nodes = (["work", "project"] as const).flatMap((band) => {
    const inBand = drafts
      .filter((draft) => draft.node.layer === layer && draft.node.band === band)
      // Most recent on top; ties keep content.ts order.
      .sort((a, b) => b.sort - a.sort || a.order - b.order);
    return inBand.map((draft, row) => ({
      ...draft.node,
      x,
      y: place(band, inBand.length, row),
    }));
  });

  return {
    key: String(year),
    label: year === BUCKET_FLOOR ? `≤ ${year}` : String(year),
    x,
    nodes,
  };
});

export const nodes: GraphNode[] = layers.flatMap((layer) => layer.nodes);
const nodeByKey = new Map(nodes.map((node) => [node.key, node]));
export const entryOfNode = (key: string) => nodeByKey.get(key)?.entryId;

export const spans: SpanEdge[] = spanIds.flatMap((entryId) => {
  const from = nodeByKey.get(`${entryId}:start`);
  const to = nodeByKey.get(`${entryId}:end`);
  return from && to ? [{ key: entryId, entryId, from, to }] : [];
});

export const ongoing: OngoingTail[] = ongoingIds.flatMap((entryId) => {
  const from = nodeByKey.get(`${entryId}:start`);
  return from ? [{ entryId, from }] : [];
});

/** Fully connected between adjacent layers — the classic MLP backdrop. */
export const lattice: LatticeEdge[] = layers.flatMap((layer, i) =>
  i === layers.length - 1
    ? []
    : layer.nodes.flatMap((from) =>
        layers[i + 1].nodes.map((to) => ({ key: `${from.key}->${to.key}`, from, to })),
      ),
);

type Box = { width: number; height: number };

const at = (node: GraphNode, box: Box) => ({
  x: (node.x / 100) * box.width,
  y: (node.y / 100) * box.height,
});

/** Horizontal-tangent cubic so edges leave and enter nodes flat, like a net diagram. */
export function edgePath(from: GraphNode, to: GraphNode, box: Box) {
  const a = at(from, box);
  const b = at(to, box);
  const dx = (b.x - a.x) * 0.45;
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

/** Straight dashed run off the right edge for anything still in progress. */
export function tailPath(from: GraphNode, box: Box) {
  const a = at(from, box);
  return `M ${a.x} ${a.y} L ${box.width} ${a.y}`;
}
