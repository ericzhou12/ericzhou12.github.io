import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Full-bleed page gutter. Content runs the width of the viewport with only a
 * generous margin held back, capped so line lengths stay readable on ultrawide.
 */
export const shell = "mx-auto w-full max-w-[112rem] px-6 sm:px-10 lg:px-16"

/** Logo stand-in: leading capitals of a name, capped at two. */
export const initialsOf = (name: string) =>
  (name.match(/[A-Z]/g) ?? [name.slice(0, 1).toUpperCase()]).slice(0, 2).join("")
