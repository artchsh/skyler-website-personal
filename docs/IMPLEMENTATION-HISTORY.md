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

The site intentionally uses no database, CMS, authentication, analytics, backend service, or external storage. OpenNext deploys the Next.js output to Cloudflare Workers with static assets bound as `ASSETS`.

The Worker uses:

- `nodejs_compat`
- A current compatibility date
- Workers observability
- No R2 incremental cache
- No KV, D1, Durable Objects, or other storage bindings

OpenNext warns that native Windows builds are not fully supported. Builds have been verified locally, but WSL or Linux remains the recommended environment for Cloudflare preview and deployment.
