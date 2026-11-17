import { profile } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: `${basePath}${profile.resume}` },
];

export function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="title text-5xl sm:text-6xl">{profile.name}</h1>
      <p className="mt-4 text-muted">{profile.headline}</p>
      <p className="mt-6 font-mono text-sm">
        <a href={`mailto:${profile.email}`} className="no-underline">
          {profile.email}
        </a>
      </p>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono text-sm">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
