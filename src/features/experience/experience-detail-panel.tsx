"use client";

import { X } from "lucide-react";
import { Bullets, Chips, EntryLinks, Metrics } from "@/features/experience/entry-parts";
import type { GraphEntry } from "@/features/experience/graph";

/** Docked detail for a selected graph node; carries everything the list view shows. */
export function ExperienceDetailPanel({
  entry,
  onClose,
}: {
  entry: GraphEntry;
  onClose: () => void;
}) {
  const { job, project } = entry;
  const bullets = job?.points ?? project?.highlights ?? [];
  const links = job?.links ?? project?.links ?? [];

  return (
    <div
      role="region"
      aria-label={`${entry.title} detail`}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line p-6">
        <div className="min-w-0">
          <span className="label-caps">{entry.band === "work" ? "Experience" : "Project"}</span>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">{entry.title}</h3>
          <p className="mt-1.5 font-mono text-xs text-accent">
            {job?.orgUrl ? (
              <a
                href={job.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {entry.subtitle}
              </a>
            ) : (
              entry.subtitle
            )}
          </p>
          <p className="mt-1.5 font-mono text-xs text-faint">
            {job ? `${job.kind} · ${job.location} · ` : null}
            {entry.period}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail"
          className="shrink-0 rounded-md border border-line p-1.5 text-faint transition-colors hover:border-accent/40 hover:text-fg"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm leading-relaxed text-muted">{entry.summary}</p>
        {job?.metrics ? <Metrics items={job.metrics} className="mt-6 border-y border-line py-5" /> : null}
        <Bullets items={bullets} className="mt-6" />
        <Chips items={entry.chips} className="mt-6" />
        <EntryLinks links={links} className="mt-6 border-t border-line pt-5" />
      </div>
    </div>
  );
}
