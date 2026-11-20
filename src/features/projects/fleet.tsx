"use client";

import { useState } from "react";
import { ProjectView } from "@/features/projects/project-view";
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
    <div className={current ? "fleet fleet-open" : "fleet"}>
      <ul className="flex flex-wrap content-start gap-x-16 gap-y-14">
        {projects.map((project, i) => {
          const active = project.id === selected;
          return (
            <li key={project.id}>
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
                    style={
                      active
                        ? undefined
                        : { animationDelay: `${-i * 1.7}s`, animationDuration: `${5 + (i % 3)}s` }
                    }
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

      <div aria-live="polite" className="min-w-0">
        {current ? (
          <ProjectView key={current.id} project={current} onClose={() => setSelected(null)} />
        ) : null}
      </div>
    </div>
  );
}
