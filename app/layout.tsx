import type { Metadata } from "next";
import "./globals.css";
import "./hero.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kristinzhiyingchen.com"),
  title: "Kristin Chen — AI Solutions & Enablement",
  description: "Kristin Chen builds practical AI workflows at the intersection of people, data, and business decisions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kristin Chen — AI Solutions & Enablement",
    description: "Practical AI workflows grounded in data and designed for people.",
    url: "/",
    siteName: "Kristin Chen",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
