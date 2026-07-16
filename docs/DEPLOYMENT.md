# Development and deployment

## Prerequisites

- Bun for dependency installation and repository scripts.
- A Node.js runtime supported by Next.js/OpenNext during the production build.
- Wrangler authentication for preview and deployment.
- Playwright browser binaries only when recapturing external work sites.

## Local development

```bash
bun install
bun run dev -- --hostname 127.0.0.1 --port 3000
```

The local site is then available at `http://127.0.0.1:3000`. The root redirects to `/ru`; English is available under `/en`.

## Validation commands

```bash
bun run lint
bun run typecheck
bunx react-doctor@latest --verbose
bun run build
```

React Doctor reads `doctor.config.json`, which excludes `.next/**` and `.open-next/**`. Those directories contain generated framework and deployment bundles rather than authored application source.

`dev`, `build`, `build:cloudflare`, `preview`, and `deploy` run `blog:generate` first. This step must remain in the scripts: the deployed Worker cannot discover repository Markdown files at runtime, so `data/blog.generated.ts` embeds the validated sources during the build.

## Cloudflare production build

```bash
bun run build:cloudflare
```

This performs a Next.js production build and then generates:

- `.open-next/worker.js`
- `.open-next/assets/`

The expected route table contains static localized homepages, blog archives and RSS feeds, the two portfolio indexes, every localized project slug, and every published blog slug. Draft article routes must be absent from production output.

## Worker preview and route verification

```bash
bunx wrangler dev --port 8787
```

At minimum, verify:

```text
GET /en                                  → 200
GET /ru                                  → 200
GET /en/portfolio                        → 200
GET /ru/portfolio                        → 200
GET /en/portfolio/<known-slug>           → 200
GET /ru/portfolio/<known-slug>           → 200
GET /en/portfolio/not-a-project          → 404
GET /en/blog                             → 200
GET /ru/blog                             → 200
GET /en/blog/<published-slug>            → 200
GET /en/blog/not-an-article              → 404
GET /en/blog/rss.xml                     → 200 application/rss+xml
GET /portfolio/personal/homelab/architecture.svg → 200
```

## Deployment

```bash
bun run deploy
```

`wrangler.jsonc` deploys the Worker to the configured custom domain and enables:

- `nodejs_compat`
- static assets bound as `ASSETS`
- Worker observability

`open-next.config.ts` intentionally configures no incremental cache, queue, or external storage. The site is static-content-oriented and has no KV, D1, R2, Durable Object, or database dependency.

## Canonical domain behavior

The application metadata uses the production origin from `data/site.ts`. Cloudflare should enforce HTTPS and redirect the `www` hostname to the canonical apex domain while preserving path and query string. The repository root README contains the exact dashboard rule configuration.

## Static response headers

`public/_headers` is copied into the static asset output. It defines security headers for all routes and immutable caching for `/_next/static/*`.

After deployment, verify the headers at the edge rather than assuming the local Next.js server represents Cloudflare behavior.

## Known gotchas

### OpenNext and strict dynamic params

Do not restore `export const dynamicParams = false` to the portfolio detail route without testing the generated Worker. It previously caused every valid project page to return 404 through OpenNext even though the Next.js build generated those paths.

### Development cache after an OpenNext build

The OpenNext build and Next.js development server share `.next`. Switching directly from `build:cloudflare` back to `next dev` has previously produced stale generated-module errors. The reliable recovery is:

```bash
rm -rf .next
bun run dev -- --hostname 127.0.0.1 --port 3000
```

`.next` is generated output and is safe to remove.

### Workspace root inference

`next.config.ts` pins both `outputFileTracingRoot` and `turbopack.root` to `process.cwd()`. This prevents Next.js from incorrectly treating a parent directory as the workspace root.

### Locale routing

There is no middleware/proxy. All internal links and redirects must respect the always-prefixed locale model.

## Release checklist

1. Confirm the intended Git diff and media assets.
2. Run ESLint, TypeScript, and React Doctor.
3. Run the full Cloudflare build.
4. Preview the Worker and verify known/unknown project and blog routes plus both RSS feeds.
5. Review portfolio screenshots for public information.
6. Confirm portfolio pages still emit `noindex`, published blog posts are indexed, and drafts are absent from the sitemap and RSS.
7. Deploy with Wrangler.
8. Verify canonical redirects, security headers, and primary pages at the Cloudflare edge.
