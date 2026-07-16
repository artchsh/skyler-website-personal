# Project documentation

This folder documents the current implementation of Skyler's personal website. It complements the repository root `README.md`, which remains the short setup and deployment entry point.

## Current documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) — application structure, rendering boundaries, routing, localization, content flow, metadata, and assets.
- [PORTFOLIO.md](./PORTFOLIO.md) — typed portfolio model, project categories, media conventions, privacy behavior, and the process for adding a project.
- [BLOG.md](./BLOG.md) — one-file Markdown authoring, derived fields, drafts, translations, custom blocks, RSS, and publishing behavior.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Bun development, Next.js and OpenNext builds, Cloudflare configuration, release checks, and known deployment gotchas.
- [FINDINGS.md](./FINDINGS.md) — React Doctor results, resolved findings, remaining risks, and recommended follow-up work.
- [DESIGN.md](./DESIGN.md) — the current editorial visual direction and responsive behavior.
- [IMPLEMENTATION-HISTORY.md](./IMPLEMENTATION-HISTORY.md) — major design and technical decisions over time.
- [WORK-PORTFOLIO-DRAFTS.md](./WORK-PORTFOLIO-DRAFTS.md) — research notes behind the five work case studies.

## Source-of-truth order

When documentation and code disagree, use this order:

1. Runtime code and content under `app/`, `components/`, `content/`, `data/`, and `lib/`.
2. Deployment files: `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc`, and `public/_headers`.
3. Current documents in this folder.
4. Historical notes and draft research.

## Current project snapshot

- Next.js 16.2 with React 19 and TypeScript.
- Russian and English locale-prefixed routes using `next-intl`.
- Five personal projects, five website case studies, and a repository-local Markdown blog.
- Portfolio routes are public but deliberately `noindex` and absent from the sitemap.
- OpenNext deployment to a Cloudflare Worker with repository-local static assets.
- No database, authentication, CMS, or runtime storage bindings; page views use self-hosted Umami analytics.
- React Doctor score: 100/100 after the 15 July 2026 full-project audit.

## Standard validation

```bash
bun run lint
bun run typecheck
bunx react-doctor@latest --verbose
bun run build:cloudflare
```

The full Cloudflare build is the authoritative release build because it validates both Next.js static generation and OpenNext Worker bundling.
