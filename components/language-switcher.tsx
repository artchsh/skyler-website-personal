"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageSwitcherProps = {
  availableLocales?: readonly (typeof routing.locales)[number][];
};

export function LanguageSwitcher({ availableLocales = routing.locales }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const availableLocaleSet = new Set(availableLocales);

  return (
    <div className="language-switcher" role="group" aria-label={t("label")}>
      {routing.locales.map((cur) => {
        const isActive = cur === locale;
        const isAvailable = availableLocaleSet.has(cur);

        return (
        <button
          key={cur}
          type="button"
          className={isActive ? "is-active" : !isAvailable ? "is-unavailable" : undefined}
          aria-pressed={isActive}
          disabled={isActive || !isAvailable}
          title={!isAvailable ? t("unavailable") : undefined}
          onClick={() => {
            const localePrefix = new RegExp(`^/(?:${routing.locales.join("|")})(?=/|$)`);
            const pathname = window.location.pathname.replace(localePrefix, "") || "/";
            router.replace(pathname, { locale: cur });
          }}
        >
          {t(cur)}
        </button>
        );
      })}
    </div>
  );
}
