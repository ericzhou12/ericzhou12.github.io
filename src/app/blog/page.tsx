import type { Metadata } from "next";
import { Blog } from "@/features/blog/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing and notes.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <Blog />;
}
