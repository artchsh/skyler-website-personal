# Blog authoring

The blog is designed around one rule: an author edits one Markdown file and nothing else.

## Create a post

Add a file to `content/blog/` using a lowercase kebab-case slug and locale suffix:

```text
building-my-homelab.en.md
building-my-homelab.ru.md
```

The part before `.en.md` or `.ru.md` becomes the URL slug. Matching slugs are treated as translations of the same article. Each language can also exist independently; the language switcher is disabled when the current article has no translation.

Minimal published post:

```md
---
date: 2026-07-16
tags:
  - homelab
  - infrastructure
---

# How I built my homelab

This first normal paragraph becomes the summary shown in the archive and metadata.

## The first real section

Everything after this point is ordinary Markdown.
```

The first level-one heading becomes the article title. It is removed from the rendered body because the article hero already displays it. Level-two and level-three headings receive stable IDs and build the table of contents.

## Code blocks

Use ordinary fenced Markdown and put the language after the opening fence. Code is highlighted at render time and does not ship a syntax-highlighting runtime to the browser.

````md
```ts
const project = "one Markdown file";
```
````

Common web, systems, shell, data, and application languages are supported. An unknown or omitted language safely falls back to plain text.

## Frontmatter

All fields are optional except `date` for a published post.

| Field | Purpose |
| --- | --- |
| `date` | Publication date. Without it, the post is a draft. |
| `updated` | Optional last-updated date. |
| `tags` | List of archive, metadata, and RSS topics. |
| `summary` | Overrides the automatically selected first paragraph. |
| `draft` | `true` always prevents production publication. |
| `cover` | Optional root-relative image path. |
| `coverAlt` | Alternative text for the cover image. |

Dates should use `YYYY-MM-DD`. A post with no date or with `draft: true` appears locally with a draft label, but is excluded from production article routes, the sitemap, and RSS.

## Custom blocks

### Note

```md
:::note
Useful context that deserves visual emphasis.
:::
```

### Warning

```md
:::warning
Something readers should verify before continuing.
:::
```

### Expandable details

```md
:::details{title="Technical explanation"}
The hidden content can contain normal Markdown.
:::
```

### Gallery

Use normal Markdown images to retain useful alternative text:

```md
:::gallery
![Server rack](/blog/homelab/server-rack.jpg)
![Network diagram](/blog/homelab/network.svg)
:::
```

Bare root-relative paths are also accepted, but produce decorative images with empty alt text:

```md
:::gallery
/blog/homelab/server-rack.jpg
/blog/homelab/network.svg
:::
```

Unknown directives are not executable. New interactive block types must be deliberately added to `lib/blog-markdown.ts` and the Markdown renderer.

## Links and media

- Root-relative links such as `/portfolio/homelab-infrastructure` preserve the current locale.
- External links open in a new tab with an accessible announcement.
- Raw HTML is not rendered.
- Standard Markdown images are lazy-loaded. A `cover` is rendered eagerly with Next.js Image.
- Keep article media in a descriptive folder under `public/blog/`.

## Generated source bundle

Run the generator directly when needed:

```bash
bun run blog:generate
```

Normal development and deployment commands run it automatically. The generator validates filenames and writes `data/blog.generated.ts`; never edit that file by hand. It exists so the Cloudflare Worker receives Markdown content as bundled data instead of trying to read a filesystem at runtime.

Adding a new file while `next dev` is already running requires restarting the dev command so the source list is regenerated. Editing an existing post also requires regeneration; run `bun run blog:generate` for an immediate refresh.

## Publishing checklist

1. Write and preview the post locally.
2. Add a valid `date` and remove `draft: true`.
3. Add the matching locale file only when a real translation exists.
4. Run `bun run build:cloudflare`.
5. Verify the article, `/[locale]/blog/rss.xml`, and `/sitemap.xml` in the Worker preview.

Published articles are indexable. Portfolio pages remain `noindex`; the two systems intentionally have different search behavior.
