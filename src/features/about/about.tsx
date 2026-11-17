import { Page } from "@/components/page";
import { about } from "@/lib/content";

export function About() {
  return (
    <Page title="About Me">
      <div className="space-y-4">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Page>
  );
}
