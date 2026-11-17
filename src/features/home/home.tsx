import { Seafloor, Sealife, Waves } from "@/features/ocean/ocean";
import { bio, experience, posts, profile, projects } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const column = "mx-auto w-full max-w-[40rem] px-6";

const links = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: `${basePath}${profile.resume}` },
];

const external = { target: "_blank", rel: "noopener noreferrer" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-sm text-muted">{title}</h2>
      <ul className="mt-5 space-y-7">{children}</ul>
    </section>
  );
}

function Row({
  title,
  href,
  aside,
  children,
}: {
  title: string;
  href?: string;
  aside: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-medium">
          {href ? (
            <a href={href} {...external}>
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <span className="shrink-0 text-sm tabular-nums text-muted">{aside}</span>
      </div>
      {children}
    </li>
  );
}

export function Home() {
  return (
    <>
      <header className={`${column} pb-6 pt-16 sm:pt-24`}>
        <h1 className="text-2xl font-medium tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-muted">{profile.headline}</p>
      </header>

      <div className="relative overflow-hidden">
        <Waves />
        <Sealife />

        <div className={`${column} relative pt-10`}>
      <div className="space-y-4">
        {bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} {...(href.startsWith("mailto:") ? {} : external)}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <Section title="Experience">
        {experience.map((job) => (
          <Row key={job.id} title={job.org} href={job.orgUrl} aside={job.period}>
            <p>{job.role}</p>
            <p className="mt-1 text-sm text-muted">
              {job.summary}
              {job.links?.map((link) => (
                <span key={link.href}>
                  {" "}
                  <a href={link.href} {...external}>
                    {link.tag ?? link.label}
                  </a>
                </span>
              ))}
            </p>
          </Row>
        ))}
      </Section>

      <Section title="Projects">
        {projects.map((project) => (
          <Row
            key={project.id}
            title={project.title}
            href={project.links[0]?.href}
            aside={project.year}
          >
            <p className="mt-1 text-sm text-muted">{project.description}</p>
          </Row>
        ))}
      </Section>

      {posts.length > 0 ? (
        <Section title="Writing">
          {posts.map((post) => (
            <Row key={post.href} title={post.title} href={post.href} aside={post.date}>
              <p className="mt-1 text-sm text-muted">{post.summary}</p>
            </Row>
          ))}
        </Section>
      ) : null}
        </div>

        <Seafloor />
      </div>
    </>
  );
}
