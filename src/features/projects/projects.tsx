import { Page } from "@/components/page";
import { Fleet } from "@/features/projects/fleet";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <Page title="Projects" wide>
      <Fleet projects={projects} />
    </Page>
  );
}
