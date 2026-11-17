import { NavLinks } from "@/components/nav-links";
import { Waves } from "@/features/ocean/ocean";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-bg">
      <nav aria-label="Pages" className="px-6 py-4">
        <NavLinks />
      </nav>
      <Waves />
    </header>
  );
}
