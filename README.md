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

The social preview is the repository-local `public/og-image.png`, generated from the editable `public/og-image.svg` source. Static artwork avoids runtime image rendering and its native/WASM dependencies in the Worker bundle.

## Canonical redirects

Cloudflare must normalize every alternate scheme and hostname to `https://1410666.xyz/` while preserving paths and query strings:

1. In the `1410666.xyz` zone, open **SSL/TLS → Edge Certificates** and enable **Always Use HTTPS**. This permanently upgrades `http://1410666.xyz/*` and `http://www.1410666.xyz/*` without changing the path or query string.
2. Open **Rules → Redirect Rules → Single Redirects** and create a rule named `Canonical www redirect`.
3. Match the custom filter expression `(http.host eq "www.1410666.xyz")`.
4. Choose a dynamic redirect with destination expression `concat("https://1410666.xyz", http.request.uri.path)`, status code `301`, and **Preserve query string** enabled.

The redirect rule handles `https://www.1410666.xyz/*`; together with Always Use HTTPS it also normalizes HTTP `www` requests. Ensure `www` is proxied in Cloudflare DNS so the rule can run.

## Site configuration

Identity, site URL, email, GitHub, X, Discord, and résumé settings are configured in `data/site.ts`. The canonical production origin is `https://1410666.xyz`, and `wrangler.jsonc` deploys the Worker to that custom domain.

Place the real résumé at `public/skyler-cv.pdf`, then set `siteConfig.cvAvailable` to `true`. Until then, the public UI shows a disabled `Résumé soon` label; `public/CV-PLACEHOLDER.md` records the expected path.

The site has no database, external storage, CMS, authentication, or backend service. Page-view analytics are provided by a self-hosted Umami instance loaded from the locale root layout.

## Portfolio content

Portfolio entries live in `data/portfolio.ts`. Each entry has bilingual copy, a tech stack, local images, and a `kind` of either `personal` or `website`.

- Personal projects support implementation notes and possible next steps.
- Website projects support multiple images, features, strengths, and improvement notes.
- `github` and `live` links are optional. A links section is rendered only when at least one URL is configured.
- Sample artwork lives in `public/portfolio/` and can be replaced without changing the page components when the file paths stay the same.

The portfolio index is available at `/ru/portfolio` and `/en/portfolio`. Detail pages are statically generated from each project's `slug`.
