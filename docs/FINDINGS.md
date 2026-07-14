# Project findings

Audit date: 15 July 2026.

## React Doctor audit

The requested full scan was run with:

```bash
bunx react-doctor@latest --verbose
```

### Initial result

- Score: 52/100
- Diagnostics: 7 warnings
- Authored-source findings: 3
- Generated-bundle false positives: 4

### Resolution table

| Finding | Classification | Resolution |
| --- | --- | --- |
| Root page missing metadata | True positive, high confidence | Added typed static metadata to `app/page.tsx`, including canonical redirect metadata and a non-indexing directive for the redirect-only root. |
| `usePathname()` read only in click handlers | True positive, high confidence | Removed the subscription. The language switcher now reads and normalizes `window.location.pathname` only when clicked. |
| `buttonVariants` exported beside a component | True positive, high confidence | Removed the unused non-component export; no repository file imported it. |
| Weak cryptography in `.open-next` assets and handler | False positive, high confidence | The flagged MD5 is an OpenNext cache-deduplication key and the flagged random value is a non-auth request ID. They are generated dependency code, not security primitives owned by this application. |
| Unescaped JSON in `.open-next` handler | False positive, high confidence | The sink is generated Next/OpenNext framework code, not the authored JSON-LD path. The authored JSON-LD explicitly escapes `<`. |

Generated output is now excluded with `doctor.config.json`:

```json
{
  "ignore": {
    "files": [".next/**", ".open-next/**"]
  }
}
```

No diagnostic rule was disabled.

### Final result

- Score: 100/100
- Diagnostics: none
- ESLint: pass
- TypeScript: pass

### Additional Next.js development warning

The locale-switch browser smoke test exposed Next.js 16's `missing-data-scroll-behavior` warning because the global stylesheet enables smooth scrolling. The locale layout now includes `data-scroll-behavior="smooth"`, explicitly allowing Next.js to temporarily use instant scrolling during route transitions as described in its bundled version-16 migration guide.

## Strengths

### Static, typed content architecture

The site has a small runtime attack surface and predictable builds. Portfolio data is typed, localized, and generated ahead of time. There are no runtime database or CMS failure modes.

### Clear privacy/indexing intent

Portfolio pages consistently emit `noindex`, stay out of the sitemap, and keep links optional. The behavior is encoded at the route level rather than relying only on `robots.txt`.

### Strong deployment verification

The project has already caught and documented a deployment-only 404 that did not appear in the standard Next.js build. Testing the generated Worker is correctly treated as part of validation.

### Accessible interaction baseline

The site includes skip links, semantic sections, visible focus treatment, safe external-link behavior, localized alt text, reduced-motion handling, and keyboard access for the Homelab topology.

## Risks and recommended follow-up

### 1. Public screenshots contain personal information

Priority: high before broad public promotion.

Some committed personal-project screenshots visibly contain names, avatars, reservation names, and contact information. Portfolio `noindex` metadata does not make these assets private; static files can be opened directly and URLs can be shared.

Recommended action: produce redacted portfolio copies or replace them with sanitized captures before treating the portfolio as publicly shareable.

### 2. Styling architecture is mixed

Priority: medium.

Tailwind CSS 4 is installed, but most of the site is implemented in the 366-line `app/globals.css`; only the component-library primitive uses Tailwind utilities extensively. This is functional, but it makes the project's styling convention unclear.

Recommended action: choose one explicit direction:

- keep the editorial global stylesheet and document it as intentional, or
- migrate layout/component rules to Tailwind in bounded passes while retaining only variables, keyframes, and complex SVG selectors globally.

Avoid a piecemeal migration that leaves duplicate sources of truth.

### 3. No automated interaction or route test suite

Priority: medium.

Validation currently relies on builds, React Doctor, linting, type checking, and ad hoc Playwright scripts. Important behaviors such as locale switching, noindex metadata, project-route generation, link omission, and Homelab keyboard interaction are not protected by committed tests.

Recommended action: add a small Playwright suite covering the two locales, a valid/invalid project route, language switching, metadata, and the interactive map.

### 4. Legacy sample assets remain in `public/portfolio/`

Priority: low.

The old Packet Garden, Midnight Archive, Desk Weather, Northline, and Field Notes SVGs are no longer referenced by current portfolio data. They increase repository noise and can mislead future editors.

Recommended action: confirm they are no longer wanted, then remove them in a dedicated cleanup commit.

### 5. External-site capture script is inherently brittle

Priority: low to medium.

Work screenshots depend on live third-party page structure, consent controls, network timing, and the continued existence of specific article URLs.

Recommended action: keep the capture manifest, record failed captures clearly, and treat screenshots as reviewed artifacts rather than automatically deploying every recapture.

### 6. Portfolio content is manually duplicated across languages

Priority: low at the current scale.

Typed bilingual objects are simple and reliable for ten projects, but translation completeness depends on manual review.

Recommended action: if the catalogue grows substantially, add a validation script that checks every localized field and image path without introducing a full CMS prematurely.

## Documentation findings

The existing documentation was valuable historically but had drifted from the implementation in several places:

- personal projects were described as a three-column sample grid rather than the current two-column real-project grid;
- the site was described as needing no design Client Components, before the interactive Homelab project existed;
- the sitemap was described as containing portfolio routes, although those routes are now intentionally excluded;
- sample artwork was described as the active media source after real captures had replaced it.

The current architecture, portfolio, and deployment documents now supersede those outdated statements.
