"use client";

import { useLayoutEffect } from "react";

// Fish positions are a function of the wall clock, not of when the page loaded:
// --now holds the time of day at which the fish were mounted, and the swim
// animation subtracts it from its delay, so every load lands on the same phase.
let hydrated = false;

/** Rendered once in the root layout. Its effect runs after any child's on the first commit. */
export function SeaClockRoot() {
  useLayoutEffect(() => {
    hydrated = true;
  }, []);
  return null;
}

/** Rendered beside the fish. On first load the boot script already set --now, so skip. */
export function SeaClock() {
  useLayoutEffect(() => {
    if (!hydrated) return;
    document.documentElement.style.setProperty("--now", `${(Date.now() / 1000) % 86400}s`);
  }, []);
  return null;
}
