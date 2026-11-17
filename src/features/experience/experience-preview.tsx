"use client";

import Link from "next/link";
import {
  BAND_BOUNDARY,
  edgePath,
  lattice,
  layers,
  nodes,
  ongoing,
  spans,
  tailPath,
  tint,
  type GraphNode,
} from "@/features/experience/graph";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Miniature of the experience graph sized to a card. Purely visual; the card links to the full graph. */

const BOX = { width: 400, height: 240 };

// Every layer is visible here, so x comes from the index, not the slid net.
const columnX = (layer: number) =>
  layers.length > 1 ? 13 + layer * (74 / (layers.length - 1)) : 50;

const spread = (node: GraphNode): GraphNode => ({ ...node, x: columnX(node.layer) });

export function ExperiencePreview({ href }: { href: string }) {
  const reduced = useReducedMotion();

  return (
    <Link href={href} aria-label="Open the experience graph" className="group block w-full">
      <figure className="overflow-hidden rounded-xl border border-line bg-surface p-4 transition-colors group-hover:border-fg/30 sm:p-5">
        <svg
          viewBox={`0 0 ${BOX.width} ${BOX.height}`}
          className="block max-h-[42dvh] w-full lg:max-h-[46dvh]"
          role="img"
          aria-label="Miniature of the experience network: roles and projects by year."
        >
          <defs>
            {ongoing.map((tail) => (
              <linearGradient
                key={tail.entryId}
                id={`pv-tail-${tail.entryId}`}
                gradientUnits="userSpaceOnUse"
                x1={(columnX(tail.from.layer) / 100) * BOX.width}
                x2={BOX.width}
                y1={0}
                y2={0}
                className="node-tint"
                style={tint(tail.entryId)}
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.9} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <line
            x1={0}
            x2={BOX.width}
            y1={(BAND_BOUNDARY / 100) * BOX.height}
            y2={(BAND_BOUNDARY / 100) * BOX.height}
            stroke="var(--color-line)"
          />

          {lattice.map((edge) => (
            <path
              key={edge.key}
              d={edgePath(spread(edge.from), spread(edge.to), BOX)}
              fill="none"
              stroke="var(--color-faint)"
              strokeWidth={0.6}
              opacity={0.25}
            />
          ))}

          {spans.map((span) => (
            <g key={span.key} className="node-tint" style={tint(span.entryId)}>
              <path
                id={`pv-span-${span.key}`}
                d={edgePath(spread(span.from), spread(span.to), BOX)}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                opacity={0.85}
              />
              {reduced ? null : (
                <circle r={2.6} fill="currentColor">
                  <animateMotion dur="2.8s" repeatCount="indefinite">
                    <mpath href={`#pv-span-${span.key}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}

          {ongoing.map((tail) => (
            <path
              key={tail.entryId}
              d={tailPath(spread(tail.from), BOX)}
              fill="none"
              stroke={`url(#pv-tail-${tail.entryId})`}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="1.5 6"
              className={cn(!reduced && "tail-march")}
            />
          ))}

          {nodes.map((node) => {
            const isStart = node.role === "start";
            return (
              <circle
                key={node.key}
                cx={(columnX(node.layer) / 100) * BOX.width}
                cy={(node.y / 100) * BOX.height}
                r={isStart ? 5 : 4}
                className="node-tint"
                style={tint(node.entryId)}
                fill={isStart ? "currentColor" : "var(--color-surface)"}
                stroke="currentColor"
                strokeWidth={isStart ? 0 : 1.6}
              />
            );
          })}
        </svg>
      </figure>
    </Link>
  );
}
