import type { Metadata } from "next";
import "./globals.css";
import "./hero.css";

export const metadata: Metadata = {
  title: "Kristin Chen — AI Solutions & Enablement",
  description: "Kristin Chen builds practical AI workflows at the intersection of people, data, and business decisions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
