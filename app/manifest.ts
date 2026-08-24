import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Kristin Chen — AI Builder", short_name: "Kristin Chen", description: "AI workflow products and consulting portfolio by Kristin Chen.", start_url: "/", display: "standalone", background_color: "#f4f3ed", theme_color: "#16201e" };
}
