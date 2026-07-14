"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="language-switcher" role="group" aria-label={t("label")}>
      {routing.locales.map((cur) => (
        <button
          key={cur}
          type="button"
          className={cur === locale ? "is-active" : undefined}
          aria-pressed={cur === locale}
          disabled={cur === locale}
          onClick={() => {
            const localePrefix = new RegExp(`^/(?:${routing.locales.join("|")})(?=/|$)`);
            const pathname = window.location.pathname.replace(localePrefix, "") || "/";
            router.replace(pathname, { locale: cur });
          }}
        >
          {t(cur)}
        </button>
      ))}
    </div>
  );
}
