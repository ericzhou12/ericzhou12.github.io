import Link from "next/link";
import { Page } from "@/components/page";
import { readTime } from "@/features/writing/read-time";
import { posts } from "@/lib/content";

export function Writing() {
  return (
    <Page title="Writing">
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <Link href={`/writing/${post.id}`} className="font-medium">
                  {post.title}
                </Link>
                <span className="shrink-0 font-mono text-sm text-muted">{post.date}</span>
              </div>
              <div className="mt-1 flex flex-col font-mono text-xs text-muted sm:flex-row sm:justify-between sm:gap-6">
                <span>{post.tags.join(" · ")}</span>
                <span className="shrink-0">{readTime(post)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Nothing here yet.</p>
      )}
    </Page>
  );
}
