import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";

export function ExternalLinks() {
  const t = useTranslations("Elsewhere");
  const links = [
    { label: t("github"), href: siteConfig.github },
    { label: t("email"), href: `mailto:${siteConfig.email}` },
    { label: t("x"), href: siteConfig.x },
  ] as const;
  const emailLabel = t("email");

  return (
    <section className="elsewhere" id="elsewhere" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title">{t("title")}</h2>
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label === emailLabel ? undefined : "_blank"}
                rel={link.label === emailLabel ? undefined : "noopener noreferrer"}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
                {link.label !== emailLabel && <span className="sr-only"> {t("opensNewTab")}</span>}
              </a>
            </li>
          ))}
          <li>
            <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
              <span>{t("discord")}</span>
              <small>· {siteConfig.discord}</small>
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> {t("opensNewTab")}</span>
            </a>
          </li>
          <li>
            {siteConfig.cvAvailable ? (
              <a href={siteConfig.cv} download>
                <span>{t("resumeDownload")}</span>
                <span aria-hidden="true">↘</span>
              </a>
            ) : (
              <span className="pending-link" aria-label={t("resumeSoonAria")}>{t("resumeSoon")}</span>
            )}
          </li>
        </ul>
    </section>
  );
}
