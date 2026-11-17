import type { Metadata } from "next";
import { Underwater } from "@/features/ocean/ocean";
import { About } from "@/features/about/about";

export const metadata: Metadata = { title: "About Me" };

export default function AboutPage() {
  return (
    <Underwater>
      <About />
    </Underwater>
  );
}
