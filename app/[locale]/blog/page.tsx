import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { formatBlogDate, getBlogPosts, type BlogLocale } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = t("title");

  return {
    title,
    description: t("indexDescription"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((alternateLocale) => [alternateLocale, `/${alternateLocale}/blog`]),
        ),
        "x-default": `/${routing.defaultLocale}/blog`,
      },
      types: {
        "application/rss+xml": `/${locale}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}/blog`,
      title: `${title} — Skyler`,
      description: t("indexDescription"),
      siteName: siteConfig.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const blogLocale = locale as BlogLocale;
  const includeDrafts = process.env.NODE_ENV !== "production";
  const posts = getBlogPosts(blogLocale, { includeDrafts });
  const publishedCount = posts.filter((post) => !post.draft).length;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const headerT = await getTranslations("Header");

  return (
    <div className="page-shell" id="top">
      <a className="skip-link" href="#main-content">{headerT("skipLink")}</a>
      <SiteHeader current="blog" />
      <main className="pb-24 pt-[clamp(3.5rem,7vw,7rem)] max-[800px]:pb-16 max-[800px]:pt-10" id="main-content">
        <header className="grid min-h-[28rem] grid-cols-[minmax(0,1.45fr)_minmax(18rem,.55fr)] content-start gap-x-20 gap-y-8 border-b border-[var(--border)] pb-20 pt-4 max-[800px]:block max-[800px]:min-h-0 max-[800px]:pb-14">
          <p className="col-span-full m-0 font-mono text-[.76rem] uppercase leading-[1.4] tracking-[.05em] text-[var(--accent)]">{t("eyebrow")}</p>
          <h1 className="m-0 max-w-[52rem] text-[clamp(4rem,7.3vw,7.2rem)] font-[770] leading-[.9] tracking-[-.072em] text-balance max-[800px]:text-[clamp(3.4rem,16vw,5.5rem)]">{t("title")}</h1>
          <p className="mt-2 max-w-[30rem] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.65] text-[var(--muted)] max-[800px]:mt-8">{t("intro")}</p>
          <a className="col-start-2 w-fit self-end font-mono text-xs font-bold uppercase tracking-[.06em] text-[var(--foreground)] no-underline decoration-[var(--accent)] underline-offset-8 hover:text-[var(--accent)] hover:underline max-[800px]:mt-8 max-[800px]:inline-flex" href={`/${locale}/blog/rss.xml`}>
            {t("rss")} <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section className="pt-16 max-[800px]:pt-12" aria-labelledby="blog-archive-title">
          <header className="mb-8 flex items-end justify-between gap-6 border-b border-[var(--border)] pb-5 max-[600px]:items-start max-[600px]:flex-col">
            <h2 className="m-0 text-[clamp(2rem,4vw,3.7rem)] font-[750] leading-none tracking-[-.055em]" id="blog-archive-title">{t("archive")}</h2>
            <p className="m-0 font-mono text-[.7rem] uppercase tracking-[.06em] text-[var(--quiet)]">{t("postCount", { count: publishedCount })}</p>
          </header>

          {posts.length === 0 ? (
            <p className="my-16 max-w-[42rem] text-[clamp(1.2rem,2vw,1.7rem)] leading-relaxed text-[var(--muted)]">{t("empty")}</p>
          ) : (
            <ol className="m-0 list-none p-0">
              {posts.map((post, index) => (
                <li key={`${post.locale}-${post.slug}`}>
                  <article className={`group grid grid-cols-[3.5rem_minmax(0,1fr)_3rem] gap-6 border-b border-white/[.09] transition-colors hover:border-[var(--accent)]/55 max-[640px]:grid-cols-[2.25rem_minmax(0,1fr)] max-[640px]:gap-3 ${index === 0 ? "py-10 max-[640px]:py-8" : "py-6 max-[640px]:py-5"}`}>
                    <div className="pt-2 font-mono text-[.68rem] text-[var(--quiet)]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <div className={`${index === 0 ? "mb-4" : "mb-2"} flex flex-wrap gap-x-5 gap-y-2 font-mono text-[.68rem] uppercase tracking-[.05em] text-[var(--quiet)]`}>
                        {post.draft ? (
                          <span className="text-[#f0c54b]">{t("draft")}</span>
                        ) : (
                          <time dateTime={post.publishedAt}>
                            {formatBlogDate(post.publishedAt!, blogLocale)}
                          </time>
                        )}
                        <span>{t("readingTime", { count: post.readingMinutes })}</span>
                      </div>
                      <h3 className={`m-0 font-[755] leading-[.98] tracking-[-.058em] ${index === 0 ? "text-[clamp(2rem,4.2vw,4.2rem)]" : "text-[clamp(1.35rem,2.3vw,2.15rem)]"}`}><Link className="bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0_2px] bg-[position:0_100%] bg-no-repeat text-inherit no-underline transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]" href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                      <p className={`mb-0 max-w-[48rem] text-[var(--muted)] ${index === 0 ? "mt-5 text-[1.02rem] leading-[1.65]" : "mt-3 line-clamp-2 text-[.92rem] leading-[1.55]"}`}>{post.summary}</p>
                      {post.tags.length > 0 && index === 0 && (
                        <ul className="mt-5 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 font-mono text-[.68rem] text-[var(--quiet)]" aria-label="Tags">
                          {post.tags.map((tag) => <li key={tag}>#{tag}</li>)}
                        </ul>
                      )}
                    </div>
                    <Link className="mt-1 text-right text-3xl text-[var(--accent)] no-underline transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 max-[640px]:col-start-2 max-[640px]:row-start-2 max-[640px]:hidden" href={`/blog/${post.slug}`} aria-label={`${t("readArticle")}: ${post.title}`}>
                      ↗
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
    </div>
  );
}
