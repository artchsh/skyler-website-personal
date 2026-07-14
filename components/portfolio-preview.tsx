import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  localizePortfolioProject,
  portfolioProjects,
  type PortfolioLocale,
} from "@/data/portfolio";

const featuredSlugs = ["modernization-meks", "nofake", "manual-economy"];

export async function PortfolioPreview() {
  const locale = (await getLocale()) as PortfolioLocale;
  const t = await getTranslations("Portfolio");
  const selected = featuredSlugs
    .map((slug) => portfolioProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof portfolioProjects)[number] => Boolean(project))
    .map((project) => localizePortfolioProject(project, locale));

  return (
    <section className="portfolio-preview" id="things" aria-labelledby="portfolio-preview-title">
      <div className="section-heading">
        <div>
          <h2 id="portfolio-preview-title">{t("previewTitle")}</h2>
          <p>{t("previewIntro")}</p>
        </div>
        <Link className="text-link" href="/portfolio">
          {t("allProjects")} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <ol className="preview-list">
        {selected.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/portfolio/${project.slug}`}>
              <span className="preview-index">0{index + 1}</span>
              <span className="preview-copy">
                <small>
                  {project.kind === "website" ? t("categoryWebsite") : t("categoryPersonal")} · {project.year}
                </small>
                <strong>{project.title}</strong>
              </span>
              <span className="preview-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
