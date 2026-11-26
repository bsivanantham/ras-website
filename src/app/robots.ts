import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sign-in", "/sign-up", "/member", "/gallery"],
      },
    ],
    sitemap: "https://ras.sc/sitemap.xml",
  };
}
