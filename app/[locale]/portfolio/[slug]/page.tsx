import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/browser-frame";
import { HomelabArchitecture } from "@/components/homelab-architecture";
import { SiteHeader } from "@/components/site-header";
import {
  getPortfolioProject,
  localizePortfolioProject,
  portfolioProjects,
  type PortfolioLocale,
} from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const rawProject = getPortfolioProject(slug);
  if (!rawProject) notFound();
  const project = localizePortfolioProject(rawProject, locale as PortfolioLocale);

  return {
    title: project.title,
    description: project.summary,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `/${locale}/portfolio/${slug}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((alternateLocale) => [
            alternateLocale,
            `/${alternateLocale}/portfolio/${slug}`,
          ]),
        ),
        "x-default": `/${routing.defaultLocale}/portfolio/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/${locale}/portfolio/${slug}`,
      title: project.title,
      description: project.summary,
      siteName: siteConfig.name,
      images: [{
        url: project.images[0].src,
        width: project.kind === "website" ? 1920 : 1600,
        height: project.kind === "website" ? 1080 : 1000,
        alt: project.images[0].alt,
      }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  const rawProject = getPortfolioProject(slug);
  if (!rawProject) notFound();
  setRequestLocale(locale);
  const project = localizePortfolioProject(rawProject, locale as PortfolioLocale);
  const t = await getTranslations("Portfolio");
  const headerT = await getTranslations("Header");
  const currentIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextRawProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const nextProject = localizePortfolioProject(nextRawProject, locale as PortfolioLocale);
  const externalLinks = project.links ? Object.values(project.links).filter(Boolean) : [];

  return (
    <div className="portfolio-shell project-shell" id="top">
      <a className="skip-link" href="#main-content">{headerT("skipLink")}</a>
      <SiteHeader current="portfolio" />
      <main className="project-page" id="main-content">
        <Link className="back-link" href="/portfolio"><span aria-hidden="true">←</span> {t("back")}</Link>

        <header className="project-hero">
          <div className="project-hero-copy">
            <p className="portfolio-eyebrow">
              {project.kind === "website" ? t("categoryWebsite") : t("categoryPersonal")} / {project.year}
            </p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <div className="project-facts">
            <div><span>{t("role")}</span><p>{project.role}</p></div>
            <div><span>{t("year")}</span><p>{project.year}</p></div>
            <div><span>{t("stack")}</span><p>{t("toolsCount", { count: project.techStack.length })}</p></div>
          </div>
        </header>

        {project.kind === "website" && (
          <aside className="project-design-credit">{t("designCredit")}</aside>
        )}

        <figure className="project-lead-image">
          {project.kind === "website" ? (
            <BrowserFrame title={project.title} url={project.links?.live?.href}>
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 800px) calc(100vw - 40px), 1248px"
              />
            </BrowserFrame>
          ) : project.slug === "homelab-infrastructure" ? (
            <HomelabArchitecture locale={locale as PortfolioLocale} />
          ) : (
            <div className="personal-media-stage">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                priority
                sizes="(max-width: 800px) calc(100vw - 40px), 1248px"
              />
            </div>
          )}
          <figcaption>
            {project.kind === "website" ? t("liveCaptureNotice") : t("personalCaptureNotice")}
          </figcaption>
        </figure>

        <section className="stack-section" aria-labelledby="project-stack-title">
          <h2 id="project-stack-title">{t("stack")}</h2>
          <ul>
            {project.techStack.map((tech, index) => (
              <li key={tech}><span>{String(index + 1).padStart(2, "0")}</span>{tech}</li>
            ))}
          </ul>
        </section>

        {project.kind === "website" ? (
          <div className="case-study-grid">
            <section className="case-section case-features" aria-labelledby="features-title">
              <p>01</p>
              <div>
                <h2 id="features-title">{t("features")}</h2>
                <ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
            <section className="case-section case-wins" aria-labelledby="wins-title">
              <p>02</p>
              <div>
                <h2 id="wins-title">{t("wins")}</h2>
                <ul>{project.wins.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
            <section className="case-section case-improvements" aria-labelledby="improvements-title">
              <p>03</p>
              <div>
                <h2 id="improvements-title">{t("improvements")}</h2>
                <ul>{project.improvements.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
          </div>
        ) : (
          <div className="case-study-grid personal-detail-grid">
            <section className="case-section" aria-labelledby="notes-title">
              <p>01</p>
              <div>
                <h2 id="notes-title">{t("notes")}</h2>
                <ul>{project.notes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
            <section className="case-section case-improvements" aria-labelledby="next-steps-title">
              <p>02</p>
              <div>
                <h2 id="next-steps-title">{t("nextSteps")}</h2>
                <ul>{project.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
          </div>
        )}

        {project.images.length > 1 && (
          <section className="project-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">{t("gallery")}</h2>
            <div>
              {project.images.slice(1).map((image) => (
                project.kind === "website" ? (
                  <BrowserFrame key={image.src} title={project.title} url={project.links?.live?.href}>
                    <Image src={image.src} alt={image.alt} width={1920} height={1080} sizes="(max-width: 800px) calc(100vw - 40px), 1248px" />
                  </BrowserFrame>
                ) : (
                  <div className="personal-media-stage" key={image.src}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) calc(100vw - 40px), 1248px" />
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {externalLinks.length > 0 && (
          <section className="project-links" aria-labelledby="project-links-title">
            <h2 id="project-links-title">{t("optionalLinks")}</h2>
            {externalLinks.map((link) => link && (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </section>
        )}

        <Link className="next-project" href={`/portfolio/${nextProject.slug}`}>
          <span>{t("nextProject")}</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </div>
  );
}
