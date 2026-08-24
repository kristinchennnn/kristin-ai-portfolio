import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kristinzhiyingchen.com";
  return [
    { url: base, lastModified: new Date("2026-08-24"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/workflowlens`, lastModified: new Date("2026-08-24"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/workflowlens/demo`, lastModified: new Date("2026-08-24"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/workflowlens/methodology`, lastModified: new Date("2026-08-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date("2026-08-24"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
