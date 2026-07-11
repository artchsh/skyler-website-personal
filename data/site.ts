export const siteConfig = {
  name: "Skyler",
  url: "https://1410666.xyz",
  email: "october.skyler@proton.me",
  github: "https://github.com/artchsh",
  x: "https://x.com/october_skyler",
  discord: "skyshelest",
  discordUrl: "https://discord.com/users/530715643608170514",
  cv: "/skyler-cv.pdf",
  // Set to true after adding public/skyler-cv.pdf.
  cvAvailable: false,
  description:
    "Frontend developer working between interfaces, content systems, and infrastructure, with a preference for fast websites and understandable architecture.",
} as const;

export const escapedSystems = [
  {
    name: "Garnet",
    description:
      "A small self-hosted PostgreSQL backup system built around predictable daily and weekly snapshots.",
    tags: ["PostgreSQL", "Linux", "Automation"],
  },
  {
    name: "The home lab that kept growing",
    description:
      "Monitoring, networking, storage, media, automation, and enough containers to turn a Raspberry Pi into a minor administrative responsibility.",
    tags: ["Docker", "Cloudflare", "Tailscale", "nginx"],
  },
  {
    name: "Tools for things that should have been simple",
    description:
      "Utilities for multilingual CMS projects, deployments, metadata, search, migration, and other jobs that began with a dangerously optimistic estimate.",
    tags: ["MODX", "Next.js", "TypeScript", "CMS"],
  },
] as const;

export const isConfiguredSocialUrl = (url: string) =>
  !url.includes("REPLACE_ME");
