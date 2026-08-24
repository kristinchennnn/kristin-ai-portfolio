import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./hero.css";
import "./workflowlens/workflowlens.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kristinzhiyingchen.com"),
  title: "Kristin Chen | AI Builder & Workflow Consultant",
  description: "Kristin Chen designs and builds practical AI workflows at the intersection of people, data, and business decisions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kristin Chen | AI Builder & Workflow Consultant",
    description: "Practical AI workflows grounded in evidence and designed for people.",
    url: "/",
    siteName: "Kristin Chen",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kristin Chen | AI Builder & Workflow Consultant", description: "Practical AI workflows grounded in evidence and designed for people." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
