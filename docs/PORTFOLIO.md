# Portfolio system

## Categories

The portfolio contains two project kinds.

### Personal projects

Personal projects document experiments, utilities, infrastructure, and applications. They contain:

- role
- full technology stack
- one or more images
- implementation notes
- possible next steps
- optional live and source links

The current personal projects are Homelab Infrastructure, Virtual Gamepad, Financial Tracker, Wedding Wishlist, and Smoke Alarm Telegram Bot.

The Homelab project has `highlighted: true`. The index renders it as a full-width featured card, and its detail page replaces the normal lead image with the interactive topology component.

### Website case studies

Website projects document professional engineering work. They contain:

- role and year
- full stack
- multiple 1920×1080 captures
- product features
- strengths and successful engineering decisions
- explicit improvement notes
- an optional live link

The UI/UX attribution banner is mandatory for these projects: the visual design belongs to a designer colleague, while the case studies describe engineering and implementation work.

## Data model

The shared source lives in `data/portfolio.ts`.

```ts
type LocalizedText = {
  en: string;
  ru: string;
};

type ProjectBase = {
  slug: string;
  year: string;
  highlighted?: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  techStack: string[];
  images: PortfolioImage[];
  links?: {
    github?: ProjectLink;
    secondaryGithub?: ProjectLink;
    live?: ProjectLink;
  };
};
```

`PersonalProject` and `WebsiteProject` extend the base and form the discriminated `PortfolioProject` union through their `kind` field.

Website records are stored in `data/work-portfolio.ts` and merged after personal projects in the exported `portfolioProjects` collection.

## Adding a personal project

1. Add local images under `public/portfolio/personal/<slug>/`.
2. Add a `PersonalProject` record to `personalPortfolioProjects` in `data/portfolio.ts`.
3. Provide English and Russian text for every localized field.
4. Add only links that are intentionally public. Omit `links` entirely when the project should not expose a live site or repository.
5. Keep the first image suitable for the 8:5 index stage and Open Graph preview.
6. Run the standard validation commands and test both locale routes.

No route file needs to be created. `generateStaticParams` derives detail routes from the data collection.

## Adding a website case study

1. Capture the homepage and relevant secondary pages at 1920×1080.
2. Save captures under `public/portfolio/work/<slug>/`.
3. Add the bilingual `WebsiteProject` record to `data/work-portfolio.ts`.
4. Document the actual role and confirmed stack; do not infer an unverified framework.
5. Include features, wins, and improvements.
6. Add a live link only when it is appropriate to expose.
7. Verify the designer-attribution banner appears on the index and detail page.

The capture script can be restricted with environment variables:

```bash
CAPTURE_SITE=nofake bun run capture:work
CAPTURE_SITE=nofake CAPTURE_PAGE=article bun run capture:work
```

## Link behavior

Links are optional and rendered only when configured.

- GitHub and secondary GitHub links are useful for public personal projects.
- Live links are appropriate only when intentional.
- Website case studies do not require repository links.
- Wedding Wishlist deliberately exposes neither a live link nor source link in portfolio data.

## Privacy and indexing

Portfolio pages are public URLs with `noindex`, not private pages.

Current controls:

- Page metadata instructs search engines not to index portfolio routes.
- Portfolio pages remain followable.
- The sitemap contains only localized homepages.
- There is no navigation secrecy or authentication barrier.

Before publishing a screenshot, review it for names, avatars, phone numbers, private hostnames, internal interfaces, and any other identifying detail. Removing a link from portfolio data does not hide information already visible inside an image.

## Media presentation

- Personal project cards and detail media use a consistent 8:5 stage with `object-fit: contain`.
- Work screenshots keep their 16:9 ratio and use the reusable Chrome-style frame.
- The frame address bar derives its display value from the configured live URL.
- SVG sources should include a title and description when they represent meaningful content.
- Interactive visuals must retain keyboard access and a reduced-motion fallback.

## Localization checklist

For every new project verify:

- `/en/portfolio/<slug>`
- `/ru/portfolio/<slug>`
- translated title, summary, description, role, notes, and links
- meaningful localized alt text
- correct next-project navigation
- correct metadata title and description
