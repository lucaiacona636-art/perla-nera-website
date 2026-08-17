import type { MetadataRoute } from "next";

const baseUrl = "https://www.perlanera.it";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/collezione", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/progetta", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/servizi", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/sculture-e-opere", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/progetti-su-misura", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/collaborazioni", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/studio", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/assistenza", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contatti", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/richiedi-un-progetto", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.1, changeFrequency: "yearly" as const },
  { path: "/cookie", priority: 0.1, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
