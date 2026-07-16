import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type SiteHeaderProps = {
  current?: "home" | "portfolio" | "blog";
  availableLocales?: readonly (typeof routing.locales)[number][];
};

export function SiteHeader({ current = "home", availableLocales }: SiteHeaderProps) {
  const t = useTranslations("Header");

  return (
    <header className="site-header">
      <Link className="wordmark" href={current === "home" ? "#top" : "/"} aria-label={t("backToTop")}>
        Skyler<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label={t("navLabel")}>
        <Link className="nav-home" href="/" aria-current={current === "home" ? "page" : undefined}>{t("nav.home")}</Link>
        <Link href="/portfolio" aria-current={current === "portfolio" ? "page" : undefined}>{t("nav.portfolio")}</Link>
        <Link href="/blog" aria-current={current === "blog" ? "page" : undefined}>{t("nav.blog")}</Link>
      </nav>
      <LanguageSwitcher availableLocales={availableLocales} />
    </header>
  );
}
