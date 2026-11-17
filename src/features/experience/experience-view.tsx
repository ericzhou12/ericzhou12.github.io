"use client";

import { useEffect, useState } from "react";
import { ExperienceGraph } from "@/features/experience/experience-graph";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "experience-view";
const VIEWS = ["graph", "list"] as const;
type View = (typeof VIEWS)[number];

function ViewToggle({
  view,
  onChange,
  className,
}: {
  view: View;
  onChange: (next: View) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Experience view"
      className={cn(
        "no-print inline-flex shrink-0 rounded-lg border border-line bg-surface p-0.5",
        className,
      )}
    >
      {VIEWS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={view === option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-md px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors",
            view === option ? "bg-accent-soft text-accent" : "text-faint hover:text-fg",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/**
 * Swaps between the graph and the list. Both trees stay in the DOM and the
 * default is pure CSS (graph on md+, list below), so print, SEO, and screen
 * readers always get the full list.
 */
export function ExperienceView({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("graph");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "graph" || stored === "list") setView(stored);
  }, []);

  const choose = (next: View) => {
    setView(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <div className="relative">
      <div className={cn("no-print", view === "graph" ? "hidden md:block" : "hidden")}>
        {/* Sized to the viewport so the whole net reads without scrolling. */}
        <section
          id="experience-graph"
          aria-labelledby="experience-graph-title"
          className="flex flex-col pb-5 pt-4 sm:pt-6 md:h-[calc(100dvh-8.5rem)]"
        >
          <header className="flex items-end justify-between gap-4">
            <h2 id="experience-graph-title" className="heading-display text-3xl sm:text-4xl">
              <span className="text-fg">neural net</span>
              <span className="text-muted">work experience</span>
            </h2>
            <ViewToggle view={view} onChange={choose} />
          </header>

          {/* Unmounted in list view so its global arrow-key listener goes away. */}
          <div className="mt-4 min-h-0 flex-1">
            {view === "graph" ? <ExperienceGraph /> : null}
          </div>
        </section>
      </div>

      <div className={view === "graph" ? "md:hidden" : undefined}>
        <ViewToggle
          view={view}
          onChange={choose}
          className="absolute right-0 top-[3.375rem] z-10 sm:top-[4.625rem]"
        />
        {children}
      </div>
    </div>
  );
}
