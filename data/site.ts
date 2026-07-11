export const siteConfig = {
  name: "Skyler",
  title: "Web Systems Engineer",
  url: "https://1410666.xyz/",
  email: "october.skyler@proton.me",
  github: "https://github.com/artchsh",
  x: "https://x.com/october_skyler",
  discord: "skyshelest",
  discordUrl: "https://discord.com/users/530715643608170514",
  cv: "/skyler-cv.pdf",
  // Set to true after adding public/skyler-cv.pdf.
  cvAvailable: false,
  description:
    "Skyler is a web systems engineer working across interfaces, content systems, infrastructure, deployments, servers, and self-hosted tools.",
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
      "A self-hosted collection of networking, monitoring, storage, media, automation, and infrastructure services that gradually became its own tiny ecosystem.",
    tags: ["Docker", "Cloudflare", "Tailscale", "nginx"],
  },
  {
    name: "Tools for things that should have been simple",
    description:
      "Utilities and integrations for multilingual CMS projects, deployment pipelines, metadata, search, migrations, and other jobs that started with a dangerously optimistic estimate.",
    tags: ["MODX", "Next.js", "TypeScript", "CMS"],
  },
] as const;
