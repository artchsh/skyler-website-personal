import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrowserFrame } from "@/components/browser-frame";
import { SiteHeader } from "@/components/site-header";
import {
  localizePortfolioProject,
  portfolioProjects,
  type PortfolioLocale,
} from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  const title = `${t("previewTitle")} — Skyler`;

  return {
    title,
    description: t("intro"),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        ...Object.fromEntries(routing.locales.map((alternateLocale) => [alternateLocale, `/${alternateLocale}/portfolio`])),
        "x-default": `/${routing.defaultLocale}/portfolio`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}/portfolio`,
      title,
      description: t("intro"),
      siteName: siteConfig.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Portfolio");
  const headerT = await getTranslations("Header");
  const projects = portfolioProjects.map((project) =>
    localizePortfolioProject(project, locale as PortfolioLocale),
  );
  const personalProjects = projects.filter((project) => project.kind === "personal");
  const websites = projects.filter((project) => project.kind === "website");

  return (
    <div className="portfolio-shell" id="top">
      <a className="skip-link" href="#main-content">{headerT("skipLink")}</a>
      <SiteHeader current="portfolio" />
      <main className="portfolio-page" id="main-content">
        <header className="portfolio-intro">
          <p className="portfolio-eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="portfolio-deck">{t("intro")}</p>
          <div className="portfolio-tally" aria-label={t("projectCount", { count: projects.length })}>
            <span aria-hidden="true">{String(projects.length).padStart(2, "0")}</span>
            <small>{t("projectCount", { count: projects.length })}</small>
          </div>
        </header>

        <section className="portfolio-category" aria-labelledby="personal-projects-title">
          <header className="category-heading">
            <p>01</p>
            <div>
              <h2 id="personal-projects-title">{t("personalTitle")}</h2>
              <p>{t("personalIntro")}</p>
            </div>
          </header>
          <div className="personal-grid">
            {personalProjects.map((project) => (
              <article className={`personal-card${project.highlighted ? " personal-card-featured" : ""}`} key={project.slug}>
                <Link className="project-image-link" href={`/portfolio/${project.slug}`} tabIndex={-1} aria-hidden="true">
                  <Image
                    src={project.images[0].src}
                    alt=""
                    fill
                    sizes="(max-width: 800px) calc(100vw - 40px), 31vw"
                  />
                </Link>
                <div className="personal-card-body">
                  {project.highlighted && <p className="featured-project-label">{t("highlightedProject")}</p>}
                  <div className="card-meta">
                    <span>{project.year}</span>
                    <span>{project.techStack.slice(0, 2).join(" + ")}</span>
                  </div>
                  <h3><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
                  <p>{project.summary}</p>
                  <Link className="text-link" href={`/portfolio/${project.slug}`}>
                    {t("viewProject")} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-category website-category" aria-labelledby="websites-title">
          <header className="category-heading">
            <p>02</p>
            <div>
              <h2 id="websites-title">{t("websitesTitle")}</h2>
              <p>{t("websitesIntro")}</p>
              <p className="design-credit-note">{t("designCredit")}</p>
            </div>
          </header>
          <div className="website-list">
            {websites.map((project, index) => (
              <article className="website-card" key={project.slug}>
                <Link className="website-image" href={`/portfolio/${project.slug}`} tabIndex={-1} aria-hidden="true">
                  <BrowserFrame title={project.title} url={project.links?.live?.href} compact>
                    <Image
                      src={project.images[0].src}
                      alt=""
                      width={1920}
                      height={1080}
                      sizes="(max-width: 800px) calc(100vw - 40px), 58vw"
                    />
                  </BrowserFrame>
                </Link>
                <div className="website-copy">
                  <div className="card-meta">
                    <span>0{index + 1} / {project.year}</span>
                    <span>{t("toolsCount", { count: project.techStack.length })}</span>
                  </div>
                  <h3><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
                  <p>{project.summary}</p>
                  <ul className="compact-stack" aria-label={t("stack")}>
                    {project.techStack.slice(0, 5).map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  <Link className="text-link" href={`/portfolio/${project.slug}`}>
                    {t("viewCaseStudy")} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
