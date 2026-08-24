import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/workflowlens/analyze", "/workflowlens/report/"] }],
    sitemap: "https://kristinzhiyingchen.com/sitemap.xml",
    host: "https://kristinzhiyingchen.com",
  };
}
