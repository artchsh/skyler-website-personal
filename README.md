# Skyler's personal website

A personal website for Skyler, a web systems engineer working across interfaces, infrastructure, content systems, and self-hosted tools.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 with custom semantic CSS variables
- OpenNext for Cloudflare and Wrangler
- Cloudflare Workers Static Assets

## Development

This repository uses Bun.

```bash
bun install
bun run dev
```

Open `http://localhost:3000`. Essential content and links are rendered on the server and remain available without JavaScript.

## Checks and builds

```bash
bun run lint
bun run typecheck
bun run build
bun run build:cloudflare
```

Preview the generated Worker locally with workerd:

```bash
bun run preview
```

Deploy to the configured Cloudflare account:

```bash
bun run deploy
```

Generate Cloudflare binding types after changing `wrangler.jsonc`:

```bash
bun run cf-typegen
```

`wrangler.jsonc` enables `nodejs_compat`, points static assets at `.open-next/assets`, and uses a current compatibility date. `open-next.config.ts` deliberately has no R2 incremental cache because this project uses no external storage. OpenNext builds require a supported Node.js runtime even when Bun is the package manager; the deployed app runs in Cloudflare's Workers runtime.

The social preview is the repository-local `public/og-image.svg`; it avoids runtime image rendering and its native/WASM dependencies in the Worker bundle.

## Site configuration

Identity, site URL, email, GitHub, X, Discord, and résumé settings are configured in `data/site.ts`. The canonical production origin is `https://1410666.xyz`, and `wrangler.jsonc` deploys the Worker to that custom domain.

Place the real résumé at `public/skyler-cv.pdf`, then set `siteConfig.cvAvailable` to `true`. Until then, the public UI shows a disabled `Résumé soon` label; `public/CV-PLACEHOLDER.md` records the expected path.

The site has no database, external storage, analytics, CMS, authentication, or backend service.
