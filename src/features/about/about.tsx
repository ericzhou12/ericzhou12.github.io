import Image from "next/image";
import { Page } from "@/components/page";
import { about, profile } from "@/lib/content";
import portrait from "./portrait.png";

export function About() {
  return (
    <Page title="About Me">
      <div className="flex flex-col gap-6 sm:flex-row-reverse sm:items-center sm:gap-10">
        <Image
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          className="size-36 shrink-0 rounded-full object-cover object-top sm:size-40"
        />
        <div className="space-y-4">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Page>
  );
}
