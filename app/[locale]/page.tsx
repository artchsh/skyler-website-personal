import { useTranslations } from "next-intl";
import { EscapedProjects } from "@/components/escaped-projects";
import { ExternalLinks } from "@/components/external-links";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";

export default function Home() {
  const t = useTranslations();
  const sameAs = [siteConfig.github, siteConfig.x, siteConfig.discordUrl];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{t("Header.skipLink")}</a>
      <div className="page-shell" id="top">
        <SiteHeader />
        <main className="composition" id="main-content">
          <section className="hero" aria-labelledby="intro-title">
            <p className="identity">{t("Hero.identity")}</p>
            <h1 id="intro-title">
              {t("Hero.titleLead")} <span>{t("Hero.titleHighlight")}</span>
            </h1>
          </section>

          <section className="about" aria-label={t("About.ariaLabel")}>
              <p>{t("About.p1")}</p>
              <p>{t("About.p2")}</p>
              <p className="current-note">
                <span aria-hidden="true">↳</span> {t("About.note")}
              </p>
          </section>
          <EscapedProjects />
          <ExternalLinks />
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
