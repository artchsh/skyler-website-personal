import { generatedBlogPosts } from "@/data/blog.generated";
import { routing } from "@/i18n/routing";

export type BlogLocale = (typeof routing.locales)[number];

export type BlogHeading = {
  depth: 2 | 3;
  id: string;
  title: string;
};

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  filename: string;
  title: string;
  summary: string;
  bodyHtml: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  coverAlt?: string;
  wordCount: number;
  readingMinutes: number;
  headings: BlogHeading[];
};

// The generator validates and derives every field, so the emitted data is
// already in BlogPost shape; only the readonly/literal `as const` typing needs
// widening.
const parsedPosts: BlogPost[] = generatedBlogPosts as unknown as BlogPost[];

export function getBlogPosts(
  locale?: BlogLocale,
  options: { includeDrafts?: boolean } = {},
) {
  const { includeDrafts = false } = options;

  return parsedPosts
    .filter((post) => (!locale || post.locale === locale) && (includeDrafts || !post.draft))
    .sort((left, right) => {
      if (left.draft !== right.draft) return left.draft ? -1 : 1;
      return (right.publishedAt ?? "9999-12-31").localeCompare(left.publishedAt ?? "9999-12-31");
    });
}

export function getBlogPost(
  slug: string,
  locale: BlogLocale,
  options: { includeDrafts?: boolean } = {},
) {
  return getBlogPosts(locale, options).find((post) => post.slug === slug);
}

export function getBlogTranslationLocales(
  slug: string,
  options: { includeDrafts?: boolean } = {},
) {
  const { includeDrafts = false } = options;
  return routing.locales.filter((locale) =>
    parsedPosts.some(
      (post) => post.slug === slug
        && post.locale === locale
        && (includeDrafts || !post.draft),
    ),
  );
}

export function formatBlogDate(date: string, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
