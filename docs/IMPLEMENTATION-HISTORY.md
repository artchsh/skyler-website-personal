# Implementation history

## Foundation

The repository began as a minimal Next.js App Router project using TypeScript, Tailwind CSS, shadcn/ui initialization, ESLint, and Bun. The implementation added a complete personal homepage while preserving React Server Components as the default rendering model.

The technical foundation now includes:

- Next.js Metadata API configuration
- Canonical URL and social metadata from `data/site.ts`
- JSON-LD `Person` schema
- `robots.ts` and `sitemap.ts`
- A repository-local SVG social image
- OpenNext Cloudflare adapter
- Wrangler Worker configuration and generated environment types
- Static asset caching headers
- Cloudflare preview, deploy, build, and type-generation scripts
- README setup and deployment documentation

## First visual direction

The first design explored a highly structured cyberpunk/editorial system with an oversized headline, index markers, terminal-like annotations, violet and lime accents, hairline grids, grain, and a custom pointer follower. Projects were represented as system records and links as large bordered cells.

That direction established the dark palette, typography-led identity, semantic content, and interaction baseline, but it felt too much like a corporate technology annual report. It was also excessively tall and overused tiny metadata, borders, coordinates, and decorative instrumentation.

## Compact centered redesign

The next pass removed the terminal language, lime accent, cursor follower, chapter markers, strong grain, and table-like project records. It introduced a centered 48rem reading column, warmer text colors, one lavender accent, a smaller hero, plain project notes, and subtle section reveals.

This version improved simplicity and mobile readability, but the narrow centered column wasted space on 2560×1440 displays and still resembled a generic developer portfolio. On mobile, the heading and vertical content flow remained too dominant.

## Asymmetric editorial redesign

The current design replaced the centered column with a maximum 78rem asymmetric composition. Desktop uses a 58/42 two-column grid, while mobile and tablet use an explicit single-column order. Copy, project titles, and descriptions were rewritten to feel more personal and specific.

The identity was subsequently broadened from interface-focused positioning to `Web Systems Engineer`, reflecting work across web interfaces, CMS and content architecture, integrations, deployments, servers, self-hosted infrastructure, automation, and the glue connecting those layers.

The following were removed during this pass:

- The design Client Component and reveal observer
- Pointer-following behavior
- Decorative hero underline
- Fixed arrows and floating elements
- Public placeholder warnings
- Broken CV download behavior
- Next.js circular development indicator
- Footer and online/location status

Project presentation was changed from generic stacked documentation into editorial title/detail pairs. External links became a prominent two-column group. The résumé is now controlled by an explicit availability flag.

## Current content configuration

Editable identity and profile values live in `data/site.ts`:

- Email: `october.skyler@proton.me`
- GitHub: `https://github.com/artchsh`
- X: `https://x.com/october_skyler`
- Discord: `skyshelest`
- Discord URL: `https://discord.com/users/530715643608170514`
- Résumé path: `/skyler-cv.pdf`
- Résumé availability: `cvAvailable`
- Canonical production URL: `https://1410666.xyz`

The production domain is configured as `1410666.xyz` in both the site metadata source and Wrangler custom-domain route. To enable the résumé download, add `public/skyler-cv.pdf` and set `cvAvailable` to `true`.

## Deployment decisions

The site intentionally uses no database, CMS, authentication, backend service, or external storage. OpenNext deploys the Next.js output to Cloudflare Workers with static assets bound as `ASSETS`. Page-view analytics are collected by a self-hosted Umami script injected from the locale root layout; no analytics package or Worker binding is required.

The Worker uses:

- `nodejs_compat`
- A current compatibility date
- Workers observability
- No R2 incremental cache
- No KV, D1, Durable Objects, or other storage bindings

OpenNext warns that native Windows builds are not fully supported. Builds have been verified locally, but WSL or Linux remains the recommended environment for Cloudflare preview and deployment.

## Internationalization (next-intl)

The site was localized with `next-intl`, routed through an `app/[locale]/` segment with `ru` as the default locale and `en` as the alternate. Routing config lives in `i18n/routing.ts`, request-scoped message loading in `i18n/request.ts`, and locale-aware navigation helpers in `i18n/navigation.ts`. Translated copy lives in `messages/ru.json` and `messages/en.json`.

### Gotcha: Next.js 16 Proxy defaults to the Node.js runtime, which OpenNext/Cloudflare cannot run

The first i18n pass used a `proxy.ts` (Next 16's rename of `middleware.ts`) built with `next-intl/middleware` to detect locale and rewrite paths. This built fine locally but failed the Cloudflare build with:

```
ERROR Node.js middleware is not currently supported. Consider switching to Edge Middleware.
```

Per `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`: as of v16.0.0, **Proxy defaults to the Node.js runtime**, and the `runtime` config option is not available in Proxy files — setting it throws an error. There is no way to force a v16 Proxy file back to Edge, and OpenNext's Cloudflare adapter only supports Edge middleware. This is a hard incompatibility, not a config oversight.

**Fix:** removed `proxy.ts` entirely. Switched `i18n/routing.ts`'s `localePrefix` from `"as-needed"` to `"always"`, so both `/ru` and `/en` are always explicit in the URL and no proxy-based locale detection/rewrite is needed. Added a static `app/page.tsx` that `redirect()`s `/` to `/ru` for the bare-domain case.

### Gotcha: removing the proxy silently breaks locale detection server-side

After removing `proxy.ts`, the language switcher UI worked (it navigates via `next-intl`'s `router.replace(pathname, { locale })`), but every page — regardless of `/ru` vs `/en` in the URL — rendered Russian content.

Root cause: `next-intl`'s `getRequestConfig` (in `i18n/request.ts`) resolves `requestLocale` by reading a header (`HEADER_LOCALE_NAME`) that middleware/proxy normally sets after matching the URL. With no proxy, that header is never set, so `requestLocale` resolves to `undefined` and always falls back to `routing.defaultLocale` ("ru") — see `node_modules/next-intl/dist/esm/*/server/react-server/RequestLocale.js`.

**Fix:** call `setRequestLocale(locale)` (from `next-intl/server`) using the `[locale]` route param, in both `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`, before any translation calls. This is `next-intl`'s documented pattern for static rendering without middleware — it populates a per-request locale cache that `getRequestConfig` reads instead of the (now-absent) header. Because `page.tsx` needed to read `params` to do this, it became an `async` component, which in turn required switching its translation calls from the synchronous `useTranslations` hook to the async `getTranslations` (the sync hook throws if called inside an `async` Server Component).

Verified by inspecting the prerendered output: `/ru` and `/en` build as two distinct static pages (`● /[locale]` with `generateStaticParams`, not a single dynamic `ƒ` route), with `<html lang="ru">` vs `<html lang="en">` and different byte sizes for the Cyrillic vs Latin copy.

### Takeaway

Any Server Component in the `[locale]` tree that reads translations must either be non-`async` (so the sync `useTranslations` works and inherits the request-cached locale) or call `getTranslations`/`setRequestLocale` explicitly. Don't rely on middleware/proxy for locale propagation on this deployment target — Cloudflare via OpenNext cannot run one.

## Portfolio system

The site now includes `/[locale]/portfolio` and `/[locale]/portfolio/[slug]`. Project content is stored in a typed bilingual collection in `data/portfolio.ts`; `generateStaticParams` produces every project page for both supported locales during the build.

The data model separates personal projects from website case studies while keeping links optional. Website entries support galleries, feature lists, strengths, and improvement notes. Project media is repository-local. Portfolio routes deliberately emit `noindex` metadata and are excluded from the sitemap; they remain publicly reachable and should not be treated as access-controlled.

The current personal-project collection contains Homelab Infrastructure, Virtual Gamepad, Financial Tracker, Wedding Wishlist, and Smoke Alarm Telegram Bot. The Homelab entry is highlighted on the index and has an interactive inline-SVG architecture view backed by a static SVG preview. Website galleries use consistent 1920×1080 captures, and screenshot media shares a macOS-style browser frame.

## React Doctor audit

On 15 July 2026, the repository was scanned with `bunx react-doctor@latest --verbose`. Three authored-source warnings were fixed: root-page metadata was added, the language switcher stopped subscribing to a pathname used only inside its click handler, and an unused non-component export was removed from the button primitive.

Four remaining warnings were traced to generated `.open-next` output rather than application source. `doctor.config.json` now ignores `.next/**` and `.open-next/**` without disabling any diagnostic rules. The final scan scored 100/100. See `FINDINGS.md` for the classifications and follow-up risks.

## Markdown blog

The blog uses ordinary Markdown rather than MDX so authors never need a separate metadata registry or JSX knowledge. Files follow `<slug>.<locale>.md`; the filename provides routing and translation pairing, the first H1 provides the title, and the first paragraph provides the default summary.

A small generation step embeds Markdown sources into `data/blog.generated.ts` before development and production builds. Runtime parsing validates frontmatter, derives reading time and heading links, and exposes typed data to the archive, article metadata, sitemap, and localized RSS routes. Controlled remark directives provide notes, warnings, details, and galleries without allowing arbitrary executable components in content.
