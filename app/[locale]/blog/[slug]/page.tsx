import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogMarkdown } from "@/components/blog-markdown";
import { BlogTableOfContents } from "@/components/blog-table-of-contents";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";
import {
  formatBlogDate,
  getBlogPost,
  getBlogPosts,
  getBlogTranslationLocales,
  type BlogLocale,
} from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const includeDrafts = process.env.NODE_ENV !== "production";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams({ params }: { params: { locale: string; slug: string } }) {
  return getBlogPosts(params.locale as BlogLocale, { includeDrafts }).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const blogLocale = locale as BlogLocale;
  const post = getBlogPost(slug, blogLocale, { includeDrafts });
  if (!post) notFound();
  const translationLocales = getBlogTranslationLocales(slug, { includeDrafts });
  const languages = Object.fromEntries(
    translationLocales.map((alternateLocale) => [
      alternateLocale,
      `/${alternateLocale}/blog/${slug}`,
    ]),
  );
  const image = {
    url: post.cover ?? "/og-image.png",
    width: post.cover ? 1600 : 1200,
    height: post.cover ? 900 : 630,
    alt: post.coverAlt ?? post.title,
  };

  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: siteConfig.name, url: `/${locale}` }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: post.tags,
    category: post.tags[0],
    robots: post.draft
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      ...(translationLocales.length > 1 ? {
        languages: {
          ...languages,
          "x-default": languages[routing.defaultLocale] ?? languages[locale],
        },
      } : {}),
      types: {
        "application/rss+xml": `/${locale}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      url: `/${locale}/blog/${slug}`,
      title: post.title,
      description: post.summary,
      siteName: siteConfig.name,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
      section: post.tags[0],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const blogLocale = locale as BlogLocale;
  const post = getBlogPost(slug, blogLocale, { includeDrafts });
  if (!post) notFound();
  const posts = getBlogPosts(blogLocale, { includeDrafts });
  const currentIndex = posts.findIndex((candidate) => candidate.slug === post.slug);
  const nextPost = posts.length > 1 ? posts[(currentIndex + 1) % posts.length] : undefined;
  const translationLocales = getBlogTranslationLocales(slug, { includeDrafts });
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const headerT = await getTranslations("Header");
  const externalT = await getTranslations("Elsewhere");
  const articleUrl = new URL(`/${locale}/blog/${slug}`, siteConfig.url).toString();
  const blogUrl = new URL(`/${locale}/blog`, siteConfig.url).toString();
  const authorUrl = new URL(`/${locale}`, siteConfig.url).toString();
  const imageUrl = new URL(post.cover ?? "/og-image.png", siteConfig.url).toString();
  const articleSchema = !post.draft && post.publishedAt ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        headline: post.title,
        description: post.summary,
        abstract: post.summary,
        datePublished: post.publishedAt,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        inLanguage: locale,
        url: articleUrl,
        image: imageUrl,
        wordCount: post.wordCount,
        timeRequired: `PT${post.readingMinutes}M`,
        keywords: post.tags,
        about: post.tags.map((tag) => ({ "@type": "Thing", name: tag })),
        author: { "@id": `${authorUrl}#person` },
        publisher: { "@id": `${authorUrl}#person` },
        isPartOf: {
          "@type": "Blog",
          "@id": `${blogUrl}#blog`,
          name: t("title"),
          url: blogUrl,
        },
      },
      {
        "@type": "Person",
        "@id": `${authorUrl}#person`,
        name: siteConfig.name,
        url: authorUrl,
        sameAs: [siteConfig.github, siteConfig.x],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: authorUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("title"),
            item: blogUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  } : undefined;

  return (
    <div className="page-shell" id="top">
      <a className="skip-link" href="#main-content">{headerT("skipLink")}</a>
      <SiteHeader current="blog" availableLocales={translationLocales} />
      <main className="pb-24 pt-[clamp(3.5rem,7vw,7rem)] max-[800px]:pb-16 max-[800px]:pt-10" id="main-content">
        <Link className="back-link" href="/blog"><span aria-hidden="true">←</span> {t("back")}</Link>

        <article aria-labelledby="article-title">
        <header className="grid grid-cols-[minmax(0,1.45fr)_minmax(18rem,.55fr)] items-end gap-16 border-b border-[var(--border)] pb-16 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[800px]:pb-12">
          <div>
            <p className="m-0 mb-6 font-mono text-[.76rem] uppercase leading-[1.4] tracking-[.05em] text-[var(--accent)]">{post.draft ? t("draft") : t("eyebrow")}</p>
            <h1 className="m-0 max-w-[60rem] [overflow-wrap:anywhere] text-[clamp(4rem,8vw,8.3rem)] font-[770] leading-[.88] tracking-[-.075em] text-balance max-[800px]:text-[clamp(3.7rem,17vw,6rem)]" id="article-title">{post.title}</h1>
            <p className="mb-0 mt-8 max-w-[48rem] text-[clamp(1.08rem,1.45vw,1.3rem)] leading-[1.65] text-[var(--muted)]">{post.summary}</p>
          </div>
          <dl className="m-0 grid gap-5 border-t border-[var(--border)] pt-6">
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="font-mono text-[.67rem] uppercase leading-relaxed text-[var(--quiet)]">{t("author")}</dt>
              <dd className="m-0 text-[.92rem] leading-relaxed text-[var(--foreground)]"><Link className="underline decoration-[var(--accent)] underline-offset-4" href="/">{siteConfig.name}</Link></dd>
            </div>
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="font-mono text-[.67rem] uppercase leading-relaxed text-[var(--quiet)]">{t("published")}</dt>
              <dd className="m-0 text-[.92rem] leading-relaxed text-[var(--foreground)]">{post.publishedAt ? <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, blogLocale)}</time> : t("draft")}</dd>
            </div>
            {post.updatedAt && (
              <div className="grid grid-cols-[6rem_1fr] gap-4">
                <dt className="font-mono text-[.67rem] uppercase leading-relaxed text-[var(--quiet)]">{t("updated")}</dt>
                <dd className="m-0 text-[.92rem] leading-relaxed text-[var(--foreground)]"><time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt, blogLocale)}</time></dd>
              </div>
            )}
            <div className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="font-mono text-[.67rem] uppercase leading-relaxed text-[var(--quiet)]">{t("readingTime", { count: post.readingMinutes })}</dt>
              <dd className="m-0 text-[.92rem] leading-relaxed text-[var(--foreground)]">{post.tags.join(" · ") || "—"}</dd>
            </div>
          </dl>
        </header>

        {post.cover && (
          <figure className="my-0 mt-16 overflow-hidden border border-white/10 bg-[#19191d]">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 800px) calc(100vw - 40px), 1248px"
            />
          </figure>
        )}

        <div className={`grid ${post.headings.length > 0 ? "grid-cols-[minmax(11rem,.42fr)_minmax(0,1.58fr)]" : "grid-cols-[minmax(0,44rem)] justify-center"} gap-16 pt-16 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[800px]:pt-12`}>
          {post.headings.length > 0 && (
            <BlogTableOfContents headings={post.headings} label={t("contents")} />
          )}
          <div className="min-w-0 max-w-[44rem]">
            <BlogMarkdown content={post.body} externalLabel={externalT("opensNewTab")} />
          </div>
        </div>
        </article>

        {nextPost && (
          <Link className="next-project" href={`/blog/${nextPost.slug}`}>
            <span>{t("next")}</span>
            <strong>{nextPost.title}</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        )}
      </main>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
      )}
    </div>
  );
}
