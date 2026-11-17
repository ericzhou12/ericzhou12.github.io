import { ArrowUpRight } from "lucide-react";
import type { EntryLink } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent/50"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function Metrics({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {items.map((metric) => (
        <div key={metric.label}>
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block text-2xl font-semibold tabular-nums tracking-tight text-accent">
              {metric.value}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-faint">
              {metric.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function EntryLinks({ links, className }: { links: EntryLink[]; className?: string }) {
  if (!links.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1 font-mono text-xs text-accent underline-offset-4 hover:underline",
            link.tag &&
              "rounded-md bg-accent-soft px-2.5 py-1 ring-1 ring-accent/25 hover:no-underline hover:ring-accent/50",
          )}
        >
          {link.tag ? (
            <span className="mr-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-faint">
              {link.tag}
            </span>
          ) : null}
          {link.label}
          <ArrowUpRight className="size-3" aria-hidden />
        </a>
      ))}
    </div>
  );
}
