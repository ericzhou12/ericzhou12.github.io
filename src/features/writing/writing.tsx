import { Page } from "@/components/page";
import { posts } from "@/lib/content";

export function Writing() {
  return (
    <Page title="Writing">
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.href}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <a href={post.href} className="font-medium">
                  {post.title}
                </a>
                <span className="shrink-0 font-mono text-sm text-muted">{post.date}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{post.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Nothing here yet.</p>
      )}
    </Page>
  );
}
