"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The default tab icon follows the OS; point it at the variant for the chosen theme instead.
function syncTabIcon() {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((link) => {
    link.type = "image/svg+xml";
    link.removeAttribute("sizes");
    link.href = `${basePath}/icon-${theme}.svg`;
  });
}

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ThemeToggle() {
  // Each page navigation re-renders the head links, so re-apply after every one.
  const pathname = usePathname();
  useEffect(syncTabIcon, [pathname]);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    syncTabIcon();
  }

  return (
    <button type="button" onClick={toggle} aria-label="Switch between light and dark" className="theme-toggle">
      <svg {...icon} aria-hidden className="theme-icon theme-sun">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400" />
      </svg>
      <svg {...icon} aria-hidden className="theme-icon theme-moon">
        <path d="M20.500 13.200A8.500 8.500 0 1 1 10.800 3.500a6.600 6.600 0 0 0 9.700 9.700z" />
      </svg>
    </button>
  );
}
