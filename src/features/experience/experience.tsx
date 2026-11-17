import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Bullets, Chips, EntryLinks, Metrics } from "@/features/experience/entry-parts";
import { experience, type Job } from "@/lib/content";
import { initialsOf } from "@/lib/utils";

function Logo({ job }: { job: Job }) {
  return (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-bg"
    >
      {job.logo ? (
        <Image
          src={job.logo}
          alt=""
          width={44}
          height={44}
          className={job.logoFill ? "size-full object-cover" : "size-7 object-contain"}
        />
      ) : (
        <span className="font-mono text-xs font-semibold text-muted">{initialsOf(job.org)}</span>
      )}
    </span>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      intro="Cloud infrastructure, distributed systems research, and the occasional smart contract audit."
    >
      <ol className="overflow-hidden rounded-xl border border-line bg-surface">
        {experience.map((job, index) => (
          <li key={job.id} className="border-t border-line first:border-t-0">
            <Reveal delay={index * 60}>
              {/* Whole row is the summary; nested links keep their own activation. */}
              <details className="group/row">
                <summary className="flex list-none gap-4 p-5 transition-colors hover:bg-accent-soft/40 sm:gap-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <Logo job={job} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-semibold tracking-tight">{job.role}</h3>
                      <span className="flex shrink-0 items-baseline gap-2 font-mono text-xs text-faint">
                        {job.period}
                        <span aria-hidden className="transition-transform group-open/row:rotate-90">
                          ›
                        </span>
                      </span>
                    </div>

                    <p className="mt-0.5 font-mono text-xs">
                      {job.orgUrl ? (
                        <a
                          href={job.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {job.org}
                        </a>
                      ) : (
                        <span className="text-accent">{job.org}</span>
                      )}
                      <span className="text-faint">
                        {" · "}
                        {job.kind} · {job.location}
                      </span>
                    </p>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{job.summary}</p>
                    <EntryLinks links={job.links ?? []} className="mt-3" />
                  </div>
                </summary>

                {/* Indented to the text column so the expansion lines up. */}
                <div className="px-5 pb-6 pl-20 sm:px-6 sm:pb-7 sm:pl-[5.75rem]">
                  <div className="border-t border-line pt-4">
                    {job.metrics ? <Metrics items={job.metrics} className="mb-5" /> : null}
                    <Bullets items={job.points} />
                    <Chips items={job.stack} className="mt-4" />
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
