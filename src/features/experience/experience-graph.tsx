"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExperienceDetailPanel } from "@/features/experience/experience-detail-panel";
import {
  BAND_BOUNDARY,
  CONTENT_WIDTH,
  DEFAULT_FOCUS,
  LAYER_GAP,
  edgePath,
  entryById,
  entryOfNode,
  lattice,
  layers,
  nodes,
  ongoing,
  spans,
  tailPath,
  tint,
} from "@/features/experience/graph";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const DRAW = "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

export function ExperienceGraph() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 1000, height: 520 });
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState(DEFAULT_FOCUS);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const active = (hoveredKey ? entryOfNode(hoveredKey) : null) ?? selected;
  const selectedEntry = selected ? entryById.get(selected) : undefined;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // SVG coordinates track the measured content box exactly, so edges stay
    // pinned to the percentage-positioned HTML nodes at any container size.
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox({ width, height });
    });
    resize.observe(el);

    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          reveal.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    reveal.observe(el);

    return () => {
      resize.disconnect();
      reveal.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const dim = (entryId: string, idle: number) =>
    active ? (entryId === active ? 1 : 0.1) : idle;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative min-h-[24rem] flex-1">
        {/* Layers off the focused column fade out rather than hard-clipping. */}
        <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
          <div
            ref={contentRef}
            className="absolute inset-y-0 transition-[left] duration-500 ease-out"
            style={{ left: `${-focus * LAYER_GAP}%`, width: `${CONTENT_WIDTH}%` }}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <svg
              viewBox={`0 0 ${box.width} ${box.height}`}
              className="absolute inset-0 size-full"
              aria-hidden
            >
              <defs>
                {ongoing.map((tail) => (
                  <linearGradient
                    key={tail.entryId}
                    id={`tail-${tail.entryId}`}
                    gradientUnits="userSpaceOnUse"
                    x1={(tail.from.x / 100) * box.width}
                    x2={box.width}
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

              {layers.map((layer) => (
                <line
                  key={layer.key}
                  x1={(layer.x / 100) * box.width}
                  x2={(layer.x / 100) * box.width}
                  y1={box.height * 0.04}
                  y2={box.height * 0.97}
                  stroke="var(--color-line)"
                />
              ))}

              <line
                x1={0}
                x2={box.width}
                y1={(BAND_BOUNDARY / 100) * box.height}
                y2={(BAND_BOUNDARY / 100) * box.height}
                stroke="var(--color-line)"
              />

              <rect
                x={0}
                y={(BAND_BOUNDARY / 100) * box.height}
                width={box.width}
                height={box.height * (1 - BAND_BOUNDARY / 100)}
                fill="var(--color-accent)"
                opacity={0.025}
              />

              {lattice.map((edge) => {
                const touches = edge.from.entryId === active || edge.to.entryId === active;
                return (
                  <path
                    key={edge.key}
                    d={edgePath(edge.from, edge.to, box)}
                    fill="none"
                    stroke="var(--color-faint)"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={entered ? 0 : 1}
                    opacity={active ? (touches ? 0.7 : 0.06) : 0.16}
                    style={{ transition: `${DRAW}, opacity 0.3s ease-out` }}
                  />
                );
              })}

              {spans.map((span) => (
                <g
                  key={span.key}
                  className="node-tint"
                  style={tint(span.entryId)}
                  opacity={dim(span.entryId, 0.85)}
                >
                  <path
                    id={`span-${span.key}`}
                    d={edgePath(span.from, span.to, box)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={entered ? 0 : 1}
                    style={{ transition: DRAW }}
                  />
                  {entered && !reduced ? (
                    <circle r={4} fill="currentColor">
                      <animateMotion dur="2.8s" repeatCount="indefinite">
                        <mpath href={`#span-${span.key}`} />
                      </animateMotion>
                    </circle>
                  ) : null}
                </g>
              ))}

              {ongoing.map((tail) => (
                <path
                  key={tail.entryId}
                  d={tailPath(tail.from, box)}
                  fill="none"
                  stroke={`url(#tail-${tail.entryId})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                  className={cn(!reduced && "tail-march")}
                  opacity={dim(tail.entryId, 0.9)}
                  style={{ transition: "opacity 0.3s ease-out" }}
                />
              ))}
            </svg>

            {layers.map((layer, index) => (
              <button
                key={layer.key}
                type="button"
                aria-pressed={index === focus}
                onClick={() => setFocus(index)}
                className={cn(
                  "absolute top-0 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors",
                  index === focus ? "text-fg" : "text-faint hover:text-muted",
                )}
                style={{ left: `${layer.x}%` }}
              >
                {layer.label}
              </button>
            ))}

            {nodes.map((node) => {
              const entry = entryById.get(node.entryId);
              if (!entry) return null;
              const isActive = active === node.entryId;
              const isSelected = selected === node.entryId;
              const isStart = node.role === "start";
              const isLive = isStart && entry.end === "present";

              return (
                <button
                  key={node.key}
                  type="button"
                  aria-pressed={isSelected}
                  onMouseEnter={() => setHoveredKey(node.key)}
                  onMouseLeave={(event) => {
                    // Keyboard focus keeps the label up; a mouse exit drops it.
                    if (document.activeElement !== event.currentTarget) setHoveredKey(null);
                  }}
                  onFocus={() => setHoveredKey(node.key)}
                  onBlur={() => setHoveredKey(null)}
                  onClick={() => {
                    setFocus(node.layer);
                    setSelected((current) => (current === node.entryId ? null : node.entryId));
                  }}
                  className="node-tint absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-opacity duration-300 ease-out"
                  style={{
                    ...tint(node.entryId),
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    opacity: active && !isActive ? 0.18 : node.layer === focus ? 1 : 0.5,
                  }}
                >
                  <span className="sr-only">
                    {entry.title} · {entry.subtitle} · {entry.period} · {isStart ? "start" : "end"}
                  </span>

                  {isLive ? (
                    <span
                      aria-hidden
                      className="absolute inline-flex size-12 animate-ping rounded-full bg-current opacity-20"
                    />
                  ) : null}

                  <span
                    aria-hidden
                    className={cn(
                      "relative flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-current bg-surface transition-transform duration-300",
                      !isStart && "border-dashed",
                      isActive && "scale-110",
                      isSelected && "ring-2 ring-current/40 ring-offset-2 ring-offset-bg",
                    )}
                  >
                    {entry.logo ? (
                      <Image
                        src={entry.logo}
                        alt=""
                        width={48}
                        height={48}
                        className={cn(
                          entry.logoFill
                            ? "size-full scale-105 object-cover"
                            : "size-[30px] object-contain",
                          !isStart && "opacity-55",
                        )}
                      />
                    ) : (
                      <span
                        className={cn(
                          "font-mono text-xs font-semibold tracking-tight",
                          !isStart && "opacity-55",
                        )}
                      >
                        {entry.initials}
                      </span>
                    )}
                  </span>

                  {isStart || isActive ? (
                    // bg knocks the mesh and band rule out from behind the text.
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full mt-1 flex w-36 -translate-x-1/2 flex-col items-center gap-0.5 font-mono text-[0.625rem] leading-4"
                    >
                      <span
                        className={cn(
                          "max-w-full truncate rounded bg-bg/85 px-1.5 transition-colors",
                          isActive ? "text-fg" : "text-muted",
                        )}
                      >
                        {entry.label}
                      </span>
                      {isActive ? (
                        <span className="whitespace-nowrap rounded bg-bg/85 px-1.5 text-faint">
                          {entry.period}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <span
          aria-hidden
          className="label-caps pointer-events-none absolute left-0 -translate-y-[calc(100%+10px)]"
          style={{ top: `${BAND_BOUNDARY}%` }}
        >
          work
        </span>
        <span
          aria-hidden
          className="label-caps pointer-events-none absolute left-0 translate-y-[10px]"
          style={{ top: `${BAND_BOUNDARY}%` }}
        >
          projects
        </span>

        {selectedEntry ? (
          <div className="absolute inset-y-0 left-[calc(50%+3.5rem)] right-0 z-30 shadow-xl">
            <ExperienceDetailPanel entry={selectedEntry} onClose={() => setSelected(null)} />
          </div>
        ) : null}
      </div>

      <p className="mt-3 font-mono text-[0.6875rem] text-faint">
        Click a node for details · click a year to slide · solid ring starts, dashed ends
      </p>
    </div>
  );
}
