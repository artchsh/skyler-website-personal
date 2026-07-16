import { getBlogPosts, type BlogLocale } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;
  const blogLocale = locale as BlogLocale;
  const posts = getBlogPosts(blogLocale);
  const blogUrl = new URL(`/${locale}/blog`, siteConfig.url).toString();
  const feedUrl = new URL(`/${locale}/blog/rss.xml`, siteConfig.url).toString();
  const title = locale === "ru" ? "Заметки Skyler" : "Notes by Skyler";
  const description = locale === "ru"
    ? "Заметки о веб-системах, инфраструктуре и self-hosting."
    : "Notes about web systems, infrastructure, and self-hosting.";
  const latestDate = posts[0]?.updatedAt ?? posts[0]?.publishedAt;
  const items = posts.map((post) => {
    const url = new URL(`/${locale}/blog/${post.slug}`, siteConfig.url).toString();
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${latestDate ? `
    <lastBuildDate>${new Date(`${latestDate}T00:00:00Z`).toUTCString()}</lastBuildDate>` : ""}${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
