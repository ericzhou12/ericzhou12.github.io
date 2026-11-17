import type { Metadata } from "next";
import { Surface } from "@/features/ocean/ocean";
import { Projects } from "@/features/projects/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Surface>
      <Projects />
    </Surface>
  );
}
