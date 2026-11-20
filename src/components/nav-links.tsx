"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/content";

export function NavLinks() {
  // The static export serves /about/, so drop the trailing slash before comparing.
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
      {navigation.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`no-underline transition-colors hover:text-fg ${active ? "text-fg" : "text-muted"}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
