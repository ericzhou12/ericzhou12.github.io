import Link from "next/link";
import { BoxEssay } from "@/features/writing/box-essay";
import { BoxFigure } from "@/features/writing/box-figure";
import { readTime } from "@/features/writing/read-time";
import { ScalingQ3 } from "@/features/writing/scaling-q3/scaling-q3";
import type { Post } from "@/lib/content";

// Posts with figures, tables, links or asides are written as components instead of plain paragraphs.
const richBodies: Record<string, () => React.ReactNode> = {
  "scaling-q3-activations": ScalingQ3,
  "the-box-with-no-walls": BoxEssay,
};

export function PostView({ post }: { post: Post }) {
  const Rich = richBodies[post.id];

  return (
    <article className="mx-auto w-full max-w-[40rem] px-6 py-12">
      <Link href="/writing" className="font-mono text-sm text-muted no-underline hover:text-fg">
        &larr; Writing
      </Link>

      <h1 className="title mt-8 text-3xl">{post.title}</h1>
      <p className="mt-2 font-mono text-xs text-muted">{[post.date, ...post.tags].join(" · ")}</p>
      <p className="mt-1 font-mono text-xs text-muted">{readTime(post)}</p>

      <div className="post-body mt-8">
        {Rich ? <Rich /> : post.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {post.graphic === "box" ? <BoxFigure /> : null}

      <Link
        href="/writing"
        className="mt-12 inline-block font-mono text-sm text-muted no-underline hover:text-fg"
      >
        &larr; Writing
      </Link>
    </article>
  );
}
