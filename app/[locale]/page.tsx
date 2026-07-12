import { getTranslations, setRequestLocale } from "next-intl/server";
import { EscapedProjects } from "@/components/escaped-projects";
import { ExternalLinks } from "@/components/external-links";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const sameAs = [siteConfig.github, siteConfig.x, siteConfig.discordUrl];
  const pageUrl = new URL(`/${locale}`, siteConfig.url).toString();
  const personSchema = {
    "@type": "Person",
    name: siteConfig.name,
    url: pageUrl,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl,
    mainEntity: personSchema,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
