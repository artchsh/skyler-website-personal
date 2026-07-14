import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";

type SiteHeaderProps = {
  current?: "home" | "portfolio";
};

export function SiteHeader({ current = "home" }: SiteHeaderProps) {
  const t = useTranslations("Header");

  return (
    <header className="site-header">
      <Link className="wordmark" href={current === "home" ? "#top" : "/"} aria-label={t("backToTop")}>
        Skyler<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label={t("navLabel")}>
        <Link href="/" aria-current={current === "home" ? "page" : undefined}>{t("nav.home")}</Link>
        <Link href="/portfolio" aria-current={current === "portfolio" ? "page" : undefined}>{t("nav.portfolio")}</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
