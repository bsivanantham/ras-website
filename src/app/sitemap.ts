import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ras.sc";
  const now = new Date();
  return [
    { url: base,                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/members`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/join`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`,  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/media`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,    lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/directory`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
