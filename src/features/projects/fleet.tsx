"use client";

import { useState } from "react";
import type { Project } from "@/lib/content";

// Top-down hull: bow on the left, flat stern on the right.
const BOAT = [" .:#########:.", "<#############]", " ':#########:'"].join("\n");

export function Fleet({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  // Bumped on every click so the keyed elements remount and the animation replays.
  const [splash, setSplash] = useState(0);
  const current = projects.find((project) => project.id === selected);

  if (projects.length === 0) {
    return <p className="text-muted">Nothing afloat yet.</p>;
  }

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <ul className="flex flex-col gap-12">
        {projects.map((project, i) => {
          const active = project.id === selected;
          return (
            <li key={project.id} className="even:ml-16">
              <button
                type="button"
                aria-expanded={active}
                onClick={() => {
                  setSelected(project.id);
                  setSplash((n) => n + 1);
                }}
                className="group cursor-pointer text-left"
              >
                <span className="relative inline-block">
                  {active ? <span key={splash} aria-hidden className="ripple" /> : null}
                  <pre
                    key={active ? splash : 0}
                    aria-hidden
                    className={`boat ${active ? "boat-bob" : "boat-drift"}`}
                    style={active ? undefined : { animationDelay: `${-i * 1.7}s`, animationDuration: `${5 + (i % 3)}s` }}
                  >
                    {BOAT}
                  </pre>
                </span>
                <span className="mt-3 block font-medium">{project.title}</span>
              </button>
              <p className="mt-1 font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="min-h-24 md:pt-2">
        {current ? (
          <>
            <p>{current.description}</p>
            <p className="mt-2 font-mono text-sm text-muted">
              {current.year}
              {current.links.map((link) => (
                <span key={link.href}>
                  {" · "}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
