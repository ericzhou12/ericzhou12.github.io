import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView } from "@/features/writing/post-view";
import { posts } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: posts.find((post) => post.id === id)?.title };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = posts.find((entry) => entry.id === id);
  if (!post) notFound();

  return <PostView post={post} />;
}
