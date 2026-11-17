import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { posts } from "@/lib/content";

export function Blog() {
  return (
    <Section id="blog" title="Blog">
      {posts.length === 0 ? (
        <p className="text-sm text-faint">Nothing here yet.</p>
      ) : (
        <ol className="divide-y divide-line">
          {posts.map((post, index) => (
            <li key={post.href}>
              <Reveal delay={index * 60}>
                <a href={post.href} className="group block py-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-base font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                      {post.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-faint">{post.date}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{post.summary}</p>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
