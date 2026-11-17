import { Reveal } from "@/components/reveal";

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Only stacked sections carry a divider.
      className="border-t border-line py-12 first:border-t-0 sm:py-16"
    >
      <Reveal>
        <header className="mb-8 flex flex-col gap-3 sm:mb-10">
          <h2 id={`${id}-title`} className="heading-display text-4xl sm:text-5xl">
            {title}
          </h2>
          {intro ? <p className="max-w-2xl text-base leading-relaxed text-muted">{intro}</p> : null}
        </header>
      </Reveal>
      {children}
    </section>
  );
}
