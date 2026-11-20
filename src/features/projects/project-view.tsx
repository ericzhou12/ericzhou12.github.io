import type { Project } from "@/lib/content";

export function ProjectView({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="viewer-in">
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer font-mono text-sm text-muted transition-colors hover:text-fg"
      >
        &larr; All projects
      </button>

      <article className="mt-4">
        <h2 className="title text-3xl">{project.title}</h2>
        <p className="mt-2 font-mono text-xs text-muted">
          {[project.year, ...project.tags].join(" · ")}
        </p>
        <p className="mt-6">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
