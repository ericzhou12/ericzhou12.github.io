import type { Post } from "@/lib/content";

export const readTime = (post: Post) => `~${post.minutes} min read`;
