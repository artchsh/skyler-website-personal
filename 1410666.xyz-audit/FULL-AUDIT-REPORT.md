# SEO Audit Report — 1410666.xyz

**Date:** 2026-07-12
**Business type:** Personal portfolio / engineer profile site (single page, RU/EN)
**Overall SEO Health Score: 67 / 100**

> **Methodology note:** The full automated crawl-and-subagent pipeline (500-page crawler, Lighthouse, Playwright screenshots) was unavailable in this environment — this audit was produced via direct HTTP inspection (headers, robots.txt, sitemap.xml, rendered HTML/JSON-LD) and live browser rendering of the two locale pages. The site itself is a single route (`/ru`, `/en`, with `/` redirecting to `/ru`), so a 500-page crawl would not have surfaced additional pages regardless.

## Executive Summary

Skyler's site is a clean, fast, well-coded single-page profile (Next.js on Cloudflare) with correct localization (`hreflang`, per-locale `<title>`/description, `lang` attribute) and valid `Person` JSON-LD. The two biggest issues are **not** classic on-page mistakes — they're a **robots.txt policy that blocks AI/LLM crawlers** (working against any AI-search / GEO visibility goal) and **missing HTTP security headers**. Content is intentionally minimal (it's a personal bio page), which caps the Content and AI-readiness scores but is a reasonable product choice, not a "bug."

### Top 5 Issues
1. **Critical (Technical/GEO):** `robots.txt` disallows GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, and Cloudflare's own rendering crawler — this blocks citation in ChatGPT search, Claude, Google AI Overviews, and Perplexity, even though the page's `Content-Signal: ai-train=no,use=reference` header suggests reference use should be allowed.
2. **High (Technical):** No security headers observed (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy` all absent from the response).
3. **Medium (Technical):** `sitemap.xml` lists only `https://1410666.xyz/` — a URL that itself 307-redirects to `/ru`. Neither `/ru` nor `/en` (the actual canonical, indexable URLs) appear in the sitemap.
4. **Medium (Schema/Technical):** `og:url` and the `Person` schema's `url` field both point to the redirecting root (`https://1410666.xyz/` / `https://1410666.xyz`) instead of the canonical `https://1410666.xyz/ru`, creating a mismatch with `<link rel="canonical">`.
5. **Medium (Content):** The site ships a visible "Резюме скоро" ("Resume coming soon") placeholder — fine as a to-do, but it's shipped content that reads as unfinished.

### Top 5 Quick Wins
1. Add `/ru` and `/en` (with `<lastmod>`) to `sitemap.xml` instead of the redirecting root URL.
2. Fix `og:url` and JSON-LD `url` to point at `https://1410666.xyz/ru` (and locale-specific for `/en`) to match the canonical tag.
3. Add baseline security headers via Cloudflare (HSTS, X-Content-Type-Options, Referrer-Policy) — a few-line change in Cloudflare Transform Rules / `_headers`.
4. Decide intentionally on AI-crawler access: if AI-search visibility matters, remove/adjust the `Disallow` rules for GPTBot/ClaudeBot/Google-Extended (Cloudflare's default "Block AI Scrapers" toggle) rather than leaving it on by default.
5. Add an `x-default` hreflang entry alongside `ru`/`en`.

---

## Technical SEO (Score: 65/100, weight 22%)

**What works:**
- Site is reachable, serves HTTP/1.1 200 with `alt-svc: h3` (HTTP/3 available), fronted by Cloudflare.
- Clean, low-latency TTFB (~160ms measured from this environment).
- `robots.txt` and `sitemap.xml` both exist and are reachable (200 OK).
- Locale routing is clean: `/` → 307 → `/ru`; `/en` serves EN content directly; both return 200.
- `<link rel="canonical">` present and correct on `/ru`.
- `hreflang` alternates for `ru`/`en` present.
- Valid HTML5 doctype, correct `lang="ru"` / `lang="en"` attribute per locale, UTF-8 charset declared.

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Critical | `robots.txt` (Cloudflare-managed block) disallows GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, and CloudflareBrowserRenderingCrawler | If AI-search citation matters, disable Cloudflare's "Block AI Scrapers and Crawlers" feature (Security → Bots) or scope it down; otherwise leave as-is intentionally |
| High | No `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Content-Security-Policy`, `Referrer-Policy`, or `Permissions-Policy` headers observed on `/ru` response | Add via Cloudflare Transform Rules or Next.js `headers()` config |
| Medium | `sitemap.xml` contains only `https://1410666.xyz/`, a redirecting URL, with no `<lastmod>` | List `/ru` and `/en` explicitly with `<lastmod>` |
| Medium | `og:url` = `https://1410666.xyz` (redirects) vs. canonical = `https://1410666.xyz/ru` | Align `og:url` to the canonical URL per locale |
| Low | No `x-default` hreflang | Add `<link rel="alternate" hreflang="x-default" href="https://1410666.xyz/ru">` (or `/en`, per preference) |
| Low | `llms.txt` returns 404 | Optional: add a minimal `llms.txt` for AI-agent context, consistent with whatever crawler-access decision is made above |

---

## Content Quality (Score: 55/100, weight 23%)

**What works:**
- First-person, specific, credible content (concrete stack: Next.js, MODX, Cloudflare, Docker, Linux, Tailscale, nginx, PostgreSQL) — reads as genuine experience, not generic filler.
- Entity verification via `sameAs` links to GitHub, X, and Discord in the `Person` schema.
- Content is fully parallel between RU and EN (not a stub translation).

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | Homepage is the entire site — roughly 150-200 words of visible text, no supporting pages (writing, case studies, project detail pages) | If organic discovery is a goal at all, consider 1-2 project deep-dive pages; if the site is purely a business-card/bio page, this is an acceptable, intentional constraint — not a defect |
| Medium | "Резюме скоро" placeholder text is live in production | Either finish the resume section or remove the teaser until ready |
| Low | No dates/timestamps or verifiable achievement markers (certifications, publication dates) to further strengthen E-E-A-T | Optional, low priority for a personal profile page |

---

## On-Page SEO (Score: 85/100, weight 20%)

**What works:**
- Unique, descriptive `<title>` per locale ("Skyler — Инженер веб-систем" / "Skyler — Web Systems Engineer").
- Meta description present, appropriately sized (~140 characters), locale-specific.
- Single, clear `<h1>` per page.
- Semantic in-page anchors (`#main-content`, `#things`, `#elsewhere`) aid navigation and accessibility (skip-to-content pattern present).
- `viewport` meta tag correct for mobile.

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Low | H1/copy is brand-voice, not keyword-targeted (e.g., no explicit "web systems engineer" phrase match variants) | Acceptable for a personal brand page; only relevant if targeting specific search queries |

---

## Schema & Structured Data (Score: 70/100, weight 10%)

**What works:**
- Valid `Person` JSON-LD with `name`, `url`, `email`, `jobTitle`, `description`, and `sameAs` array — parses cleanly, no syntax errors.

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | No `WebSite`/`ProfilePage` schema alongside `Person` | Google recommends `ProfilePage` wrapping `Person` for profile-style pages; consider adding |
| Low | `Person.url` points to the redirecting root, not the canonical locale URL | Update to `https://1410666.xyz/ru` (or split per-locale) |
| Low | `sameAs` array is limited to 3 profiles | Add any other verifiable professional profiles if they exist (e.g., LinkedIn) to strengthen entity signals |

---

## Performance (Score: 80/100 — estimated, weight 10%)

**What works:**
- Fast TTFB (~160ms) from Cloudflare edge.
- HTTP/3 advertised via `alt-svc`.
- Next.js/Turbopack code-splitting into small chunks (9 JS chunks + 1 CSS observed, none unusually large).
- No raster `<img>` tags in the rendered DOM — minimal image payload.

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Info | Full Core Web Vitals (LCP/INP/CLS) could not be lab-measured in this environment (no Lighthouse/CDP available) | Run [PageSpeed Insights](https://pagespeed.web.dev/) directly against `https://1410666.xyz/ru` for authoritative lab + field data |
| Low | Cloudflare bot-challenge script (`/cdn-cgi/challenge-platform/...`) loads and executes on every page view | Expected Cloudflare behavior; verify it isn't set to a more aggressive challenge level than needed, since it adds a render-blocking-adjacent script |

---

## AI Search Readiness / GEO (Score: 40/100, weight 10%)

**What works:**
- Clean, extractable prose (no JS-only rendering barriers for the core bio text — confirmed via rendered DOM extraction).
- Structured `Person` entity data with cross-platform `sameAs` linking.

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Critical | AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.) are disallowed in `robots.txt` | This is the single biggest lever for AI-search visibility. Decide deliberately: keep blocked if privacy/content-protection is the priority, or open access if being cited by ChatGPT/Claude/AI Overviews matters |
| Medium | No `llms.txt` | Low-effort addition once the crawler-access decision above is made |
| Low | No FAQ/Q&A-style passages | Optional — short Q&A snippets tend to improve passage-level citability, but may not fit this page's tone |

---

## Images (Score: 90/100, weight 5%)

**What works:**
- Full favicon set implemented correctly: `favicon.ico`, `favicon.svg`, `favicon-96x96.png`, `apple-touch-icon.png`, plus `manifest.webmanifest`.
- `og:image` correctly sized at 1200×630 with `og:image:alt` set — good social-preview hygiene.
- No unoptimized raster content images to flag (page currently has none).

**Findings:** None significant. Re-audit image handling once project/portfolio images are added, since none exist today to evaluate alt text or compression on.

---

## Artifacts
- Findings directory: `findings/` (not itemized separately — single-page site, findings consolidated above)
- Screenshots: not captured (Browser rendering tool timed out in this session; content was verified via DOM text extraction and headers instead)
