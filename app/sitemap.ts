import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}
