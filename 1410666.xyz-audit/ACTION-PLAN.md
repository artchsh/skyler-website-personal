# Action Plan — 1410666.xyz

## Critical (fix immediately)
- [ ] **Decide on AI-crawler access.** `robots.txt` currently blocks GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, and Cloudflare's own render crawler (this is Cloudflare's default "Block AI Scrapers and Crawlers" toggle under Security → Bots). If you want to show up in ChatGPT search, Claude, Perplexity, or Google AI Overviews, turn this off or scope it down. If you'd rather keep your content out of AI training/answers, leave it as-is — just make it a deliberate choice, not a default.

## High (fix within 1 week)
- [ ] Add baseline security headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options`/`frame-ancestors`. Easiest path: Cloudflare Transform Rules (Rules → Transform Rules → Modify Response Header) or a Next.js `headers()` block in `next.config`.

## Medium (fix within 1 month)
- [ ] Update `sitemap.xml` to list `https://1410666.xyz/ru` and `https://1410666.xyz/en` directly (not the redirecting root), each with a `<lastmod>` date.
- [ ] Fix `og:url` to match the canonical URL per locale (currently points to the redirecting root instead of `/ru`).
- [ ] Fix `Person` JSON-LD `url` field the same way (points to redirecting root).
- [ ] Remove or finish the "Резюме скоро" placeholder before it's seen as stale.
- [ ] Add `ProfilePage` schema wrapping the existing `Person` schema (Google's recommended pattern for profile-style pages).

## Low (backlog)
- [ ] Add `hreflang="x-default"` alongside the existing `ru`/`en` alternates.
- [ ] Add `llms.txt` once the AI-crawler decision above is finalized.
- [ ] Expand `sameAs` in the `Person` schema with any additional verifiable professional profiles.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on `https://1410666.xyz/ru` for authoritative LCP/INP/CLS field data (not measurable from this audit environment).

## Not applicable / no action needed
- Image optimization: no content images currently exist on the page; favicon/OG image setup is already correct. Re-check once a portfolio/projects section ships.
- Local SEO, e-commerce, backlink profile: out of scope — this is a single-page personal profile site, not a local business or e-commerce store.
