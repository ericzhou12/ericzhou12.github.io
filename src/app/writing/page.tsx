import type { Metadata } from "next";
import { Underwater } from "@/features/ocean/ocean";
import { Writing } from "@/features/writing/writing";

export const metadata: Metadata = { title: "Writing" };

export default function WritingPage() {
  return (
    <Underwater>
      <Writing />
    </Underwater>
  );
}
