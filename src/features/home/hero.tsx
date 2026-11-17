import { FileText, Github, Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ExperiencePreview } from "@/features/experience/experience-preview";
import { CopyEmail } from "@/features/home/copy-email";
import { StatusLine } from "@/features/music/status-line";
import { bio, profile } from "@/lib/content";

const links = [
  { label: "Résumé", href: profile.resume, icon: FileText },
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
];

export function Hero() {
  return (
    <section id="top" className="relative z-10 flex flex-1 flex-col justify-center py-10 lg:py-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <Reveal>
          <StatusLine />

          <h1 className="heading-display mt-5 text-6xl leading-[0.95] sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">{profile.headline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-fg/30 hover:bg-fg/5"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            ))}
            <CopyEmail className="ml-1" />
          </div>

          <div className="mt-8 max-w-xl space-y-3 border-t border-line pt-6">
            {bio.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ExperiencePreview href="/experience" />
        </Reveal>
      </div>
    </section>
  );
}
