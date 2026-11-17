import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Bullets, Chips, EntryLinks } from "@/features/experience/entry-parts";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Built end to end — shipped, measured, and in front of real users or judges."
    >
      <ol className="overflow-hidden rounded-xl border border-line bg-surface">
        {projects.map((project, index) => (
          <li key={project.id} className="border-t border-line first:border-t-0">
            <Reveal delay={index * 60}>
              <details className="group/row">
                <summary className="flex list-none flex-col p-5 transition-colors hover:bg-accent-soft/40 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-semibold tracking-tight">{project.title}</h3>
                    <span className="flex shrink-0 items-baseline gap-2 font-mono text-xs text-faint">
                      {project.year}
                      <span aria-hidden className="transition-transform group-open/row:rotate-90">
                        ›
                      </span>
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-accent">{project.tagline}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.description}</p>
                  <EntryLinks links={project.links} className="mt-3" />
                </summary>

                <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                  <div className="border-t border-line pt-4">
                    <Bullets items={project.highlights} />
                    <Chips items={project.tags} className="mt-4" />
                  </div>
                </div>
              </details>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
