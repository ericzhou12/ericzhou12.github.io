import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SeaClockRoot } from "@/features/ocean/sea-clock";
import { bootScript } from "@/lib/boot-script";
import { profile } from "@/lib/content";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-display-src",
  display: "swap",
});

const summary =
  "CS & Math at Northwestern. Serverless platforms on AWS, and RL for Byzantine fault-tolerant consensus.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: summary,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  alternates: { canonical: profile.site },
  openGraph: {
    type: "profile",
    title: profile.name,
    url: profile.site,
    siteName: profile.name,
    description: summary,
  },
  twitter: {
    card: "summary",
    title: profile.name,
    description: summary,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  url: profile.site,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Northwestern University" },
    { "@type": "HighSchool", name: "Troy High School" },
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <SeaClockRoot />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
