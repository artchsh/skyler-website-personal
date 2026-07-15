# Application architecture

## Overview

The repository is a statically generated, bilingual personal website deployed as a Cloudflare Worker through OpenNext. Content is authored in TypeScript and JSON; there is no runtime content API or database.

```text
Browser
  │
  ├─ /                         → static redirect to /ru
  └─ /[locale]                 → locale layout and translated pages
       ├─ /[locale]            → homepage
       ├─ /[locale]/portfolio  → noindex portfolio index
       └─ /[locale]/portfolio/[slug]
                                → noindex statically generated project page

Typed content
  ├─ data/site.ts              → identity, canonical origin, public links
  ├─ data/portfolio.ts         → personal projects and shared types
  ├─ data/work-portfolio.ts    → website case studies
  └─ messages/{en,ru}.json     → interface translations

Build and runtime
  Next.js → OpenNext → .open-next/worker.js → Cloudflare Workers
```

## Route structure

The application uses the Next.js App Router.

- `app/page.tsx` defines metadata for the bare root and immediately redirects `/` to `/ru`.
- `app/[locale]/layout.tsx` is the localized root layout. It validates the locale, supplies translated metadata, sets `<html lang>`, mounts `NextIntlClientProvider`, and injects the deferred self-hosted Umami tracker into the document head.
- `app/[locale]/page.tsx` renders the homepage.
- `app/[locale]/portfolio/page.tsx` renders the two portfolio categories.
- `app/[locale]/portfolio/[slug]/page.tsx` renders every personal project and website case study.

Both supported locales and all project slugs are returned from `generateStaticParams`. Project lookup still performs an explicit `notFound()` check so an unknown slug returns 404.

`dynamicParams = false` is intentionally not used. OpenNext previously converted valid generated project routes into `NoFallbackError` responses at runtime when that flag was enabled. Keeping `generateStaticParams` without the strict segment flag preserves static generation and allows the explicit project lookup to control 404 behavior.

## Localization

`i18n/routing.ts` defines:

- locales: `ru`, `en`
- default locale: `ru`
- locale prefix: always

The application deliberately has no `proxy.ts` or middleware. Next.js 16 Proxy defaults to the Node.js runtime, while this OpenNext deployment requires Edge-compatible middleware. Explicit locale prefixes avoid that incompatibility.

Server Components call `setRequestLocale(locale)` using the route parameter before reading translations. Message loading is configured in `i18n/request.ts`.

The language switcher is a Client Component. It does not subscribe to pathname changes; it reads `window.location.pathname` only when a language button is clicked, removes the existing locale prefix, and asks the locale-aware router to replace the route.

## Server and client component boundaries

Most of the application is server-rendered:

- Homepage content and structured data.
- Portfolio indexes and case-study copy.
- Navigation, project lists, metadata, and optional links.

Client Components are limited to behavior that requires browser state:

- `components/language-switcher.tsx` for locale switching.
- `components/homelab-architecture.tsx` for selectable SVG nodes and the live topology inspector.

The Homelab component supports pointer, focus, Enter, and Space interactions. Animation is CSS/SMIL-based and disabled or reduced under `prefers-reduced-motion`.

## Analytics

The localized root layout loads the self-hosted Umami tracker on every rendered page. It uses Next.js `Script` with `strategy="beforeInteractive"`, which injects the deferred external script into the document head. The public site identifier is attached through `data-website-id`; there is no analytics SDK package or Worker-side analytics binding.

## Content flow

Portfolio content starts as typed bilingual objects. `localizePortfolioProject()` converts a project into the requested language before rendering.

```text
LocalizedText { en, ru }
       │
       ▼
PortfolioProject union
       │
       ├─ PersonalProject → notes + nextSteps
       └─ WebsiteProject  → features + wins + improvements
       │
       ▼
localizePortfolioProject(project, locale)
       │
       ▼
Server-rendered index/detail page
```

Website content is kept in `data/work-portfolio.ts` to keep the larger case-study records separate from personal-project content.

## Media architecture

All portfolio media is repository-local under `public/portfolio/`.

- Work captures are exact 1920×1080 JPEG screenshots.
- Personal-project media includes mobile PNG captures and authored SVG visuals.
- Work screenshots are displayed inside `BrowserFrame`, a presentational macOS/Chrome-style wrapper.
- Personal media is normalized into an 8:5 stage so portrait and landscape sources produce consistent cards.
- The Homelab project uses a static SVG for cards and previews, plus an inline interactive SVG on its detail page.

The `scripts/capture-work-sites.mjs` Playwright script reproduces the work-site screenshots and writes capture metadata to `public/portfolio/work/capture-manifest.json`.

## Metadata, indexing, and structured data

Localized public homepages receive translated title, description, canonical, alternate-language, Open Graph, and Twitter metadata from `app/[locale]/layout.tsx`.

The homepage emits HTML-safe JSON-LD for a `ProfilePage` and `Person`. `<` is escaped after serialization so content cannot terminate the script element.

Portfolio pages are deliberately handled differently:

- `robots.index` is `false` on the portfolio index and every project page.
- Links remain followable.
- Portfolio URLs are not emitted by `app/sitemap.ts`.
- The public robots file allows crawling generally; page-level metadata carries the portfolio-specific indexing policy.

Noindex is not access control. Anyone with a portfolio URL can still open the page and its static assets.

## Styling

Tailwind CSS 4 is installed and processed through PostCSS. The current site, however, is primarily styled by the hand-authored editorial system in `app/globals.css`, with semantic color variables and responsive media queries. The shadcn/Base UI button primitive uses Tailwind utilities.

This is a mixed styling architecture. New work should either follow the existing global editorial system intentionally or be part of a planned Tailwind migration; adding a third styling pattern should be avoided.

## Security and response behavior

`public/_headers` defines:

- HSTS
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- a strict-origin referrer policy
- a restrictive permissions policy
- immutable caching for Next.js static chunks

External links opened in new tabs use `noopener noreferrer`. The site has no auth tokens, cookies, user-submitted HTML, or runtime secrets.
