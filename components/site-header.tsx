import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader() {
  const t = useTranslations("Header");

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={t("backToTop")}>
        Skyler<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Page navigation">
        <a href="#things">{t("nav.things")}</a>
        <a href="#elsewhere">{t("nav.links")}</a>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
