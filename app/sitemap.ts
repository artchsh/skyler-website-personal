import type { MetadataRoute } from "next";
import { getBlogPosts, getBlogTranslationLocales } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homepages = routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
  const blogIndexes = routing.locales.map((locale) => ({
    url: new URL(`/${locale}/blog`, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((alternateLocale) => [
          alternateLocale,
          new URL(`/${alternateLocale}/blog`, siteConfig.url).toString(),
        ]),
      ),
    },
  }));
  const blogPosts = getBlogPosts().map((post) => {
    const translationLocales = getBlogTranslationLocales(post.slug);
    return {
      url: new URL(`/${post.locale}/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(translationLocales.length > 1 ? {
        alternates: {
          languages: Object.fromEntries(
            translationLocales.map((locale) => [
              locale,
              new URL(`/${locale}/blog/${post.slug}`, siteConfig.url).toString(),
            ]),
          ),
        },
      } : {}),
    };
  });

  return [...homepages, ...blogIndexes, ...blogPosts];
}
