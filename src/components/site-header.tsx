import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { Waves } from "@/features/ocean/ocean";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-bg">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <nav aria-label="Pages">
          <NavLinks />
        </nav>
        <ThemeToggle />
      </div>
      <Waves />
    </header>
  );
}
