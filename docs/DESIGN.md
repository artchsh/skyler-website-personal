# Current design

## Direction

The site is a dark, asymmetric personal homepage with the visual character of a small independent web publication or restrained digital poster. It deliberately avoids conventional portfolio cards, dashboards, terminal motifs, fake system metadata, decorative grids, custom cursors, and persistent floating controls.

The design priorities are:

- Personal before professional
- Editorial before product-like
- Confident typography without a full-screen hero
- Useful asymmetry on large screens
- A compact, intentionally reordered reading flow on mobile
- Content that remains complete without JavaScript

## Composition

The page uses a maximum content width of `78rem` (1248px). Responsive outer gutters are produced with `clamp(3rem, 8vw, 12rem)`, allowing the composition to occupy a meaningful area on 1440p and wider displays without becoming full-width.

Above 800px, the main region is a two-column CSS Grid:

- Left column: approximately 58%, containing the identity, hero, and external links
- Right column: approximately 42%, containing the about copy and selected projects
- Column gap: fluid from 48px to 96px

The grid areas are:

```text
hero    about
links   projects
```

This arrangement keeps the page compact and poster-like. Links sit lower in the left column while projects continue down the right, creating asymmetry without detached decoration.

At 800px and below, the grid becomes one column and is explicitly reordered:

```text
hero
about
projects
links
```

The mobile layout is not a scaled desktop layout. It uses reduced section spacing, stacked project details, hidden header navigation, and dedicated gutters of 20px. At 340px and below, gutters reduce to 16px.

## Header

The header contains only:

- The `Skyler.` wordmark
- Desktop anchors to `Things` and `Links`

The lavender period gives the name a small authored detail. Navigation is hidden on mobile to keep the header quiet and prevent crowding. Next.js development indicators are disabled through `devIndicators: false`, so the framework's circular `N` badge cannot overlap the design during local development.

## Hero

The hero positions Skyler as a web systems engineer working across interfaces, infrastructure, content systems, and their connecting machinery. It combines that concise identity sentence with the main heading. The heading uses a fluid system-font scale from 3.5rem to 5.8rem on desktop and from 2.6rem to 4.2rem on mobile. It uses balanced wrapping where supported, tight readable line height, and no manual staircase line breaks.

Only `problems for myself.` uses the lavender accent. Its single interaction slightly changes tracking and shifts the phrase by two pixels on hover. There is no underline, pointer follower, continuous animation, or decorative background effect.

## About copy

The right-column copy uses three distinct thoughts with controlled paragraph spacing and line length. Primary copy uses warm off-white; supporting copy uses a high-contrast warm gray. The current-interest sentence has a very subtle lavender-tinted background and a small leading arrow rather than a blockquote border.

## Projects

`A few things that escaped` is a vertical editorial list. Each entry uses:

- A strong title area
- A readable description area
- Tags grouped directly beneath the description

Desktop entries use two internal columns, while tablet and mobile entries stack. There are no cards, project numbers, outer boxes, or remote links. Hovering shifts an entry slightly and draws a restrained lavender underline under its title. Hairlines appear only between entries.

## Portfolio

The homepage project list is now a compact preview of a larger bilingual portfolio. The portfolio index keeps the editorial direction while giving the two kinds of work different rhythms:

- Personal random projects use a two-column visual grid, with the interactive Homelab project spanning the full width as the featured entry.
- Websites use larger alternating case-study rows with more technical context.

Every entry has a dedicated static detail page. Personal projects focus on the idea, implementation, and possible next steps. Website case studies add a gallery, full stack, features, strengths, and an explicit retrospective about what could be improved. External and GitHub links remain optional and disappear entirely when no URL is configured.

Project media is repository-local. Personal work combines reviewed screenshots with authored SVG previews, while website case studies use consistent 1920×1080 captures. Screenshot presentations share a macOS-style browser frame, and personal-project cards use a consistent 8:5 media stage so mixed source dimensions do not disturb the grid.

## External links

Links form a strong two-column text group rather than a bordered navigation grid. Configured external URLs use safe `noopener noreferrer` behavior and accessible new-tab text. Email uses `mailto:`.

Discord links to Skyler's configured Discord user profile and displays the username `skyshelest` beside the label. The résumé is availability-gated by `siteConfig.cvAvailable`; until the PDF exists, the interface shows the disabled label `Résumé soon` and never creates a broken download.

Disabled items are visually quieter but remain legible. They reveal a small `soon` hint on pointer hover without exposing configuration placeholders.

## Color and typography

Semantic colors are defined in `app/globals.css`:

- Background: `#111113`
- Primary text: `#f2efea`
- Secondary text: `#bab3ad`
- Quiet text: `#938c87`
- Accent: `#8b8cff`
- Borders: warm off-white at low opacity

The site uses one accent only. There are no gradients, glows, grain overlays, lime accents, or remote fonts.

Typography uses the system stack:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Monospace is restricted to project tags. Body copy remains approximately 16–18px depending on viewport.

## Interaction and motion

The main restrained interactions are:

- Accent phrase tracking and two-pixel shift
- Project title underline and row shift
- External link movement and underline
- Locale switching that preserves the current route
- Keyboard- and pointer-accessible Homelab topology exploration

Most content and visual structure remain server rendered. Client Components are reserved for behavior that needs browser state: the language switcher and the interactive Homelab topology. `prefers-reduced-motion` removes transforms and effectively disables transitions. Keyboard focus remains visible through the lavender focus outline, and link hover treatments are mirrored with `:focus-visible`.

## Accessibility

The page retains:

- Semantic header, main, sections, headings, lists, and navigation
- A skip-to-content link
- Logical heading hierarchy
- Visible keyboard focus
- Accessible external-link announcements
- Decorative arrows hidden from assistive technology
- Sufficient contrast for body and essential content
- Touch targets of at least 44–48px for links
- No fixed elements that can overlap content
- Complete core portfolio content without JavaScript; enhanced topology exploration and locale switching require JavaScript

## Responsive targets

The CSS is designed around these target classes:

- 320×568: 16px gutter, compact hero, two-column links
- 375×812 and 390×844: 20px gutter, single-column editorial flow
- 768×1024: single-column tablet flow through the 800px breakpoint
- 1366×768: asymmetric desktop grid with reduced fluid gutters
- 1920×1080 and 2560×1440: capped 1248px composition with up to 96px internal gap

All grid tracks use `minmax(0, ...)`, tags wrap, and the body clips no intentional horizontal content.
