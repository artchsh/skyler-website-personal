import { EscapedProjects } from "@/components/escaped-projects";
import { ExternalLinks } from "@/components/external-links";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";

export default function Home() {
  const sameAs = [siteConfig.github, siteConfig.x, siteConfig.discordUrl];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="page-shell" id="top">
        <SiteHeader />
        <main className="composition" id="main-content">
          <section className="hero" aria-labelledby="intro-title">
            <p className="identity">Web systems engineer working across interfaces, infrastructure, content systems, and the machinery holding them together.</p>
            <h1 id="intro-title">
              I make websites, systems, and occasionally <span>problems for myself.</span>
            </h1>
          </section>

          <section className="about" aria-label="About Skyler">
              <p>
                I build web systems from the interface down: websites, content architecture, integrations, deployments, servers, and the awkward glue between them.
              </p>
              <p>
                Most of my professional work lives behind NDAs. What escapes usually involves Next.js, MODX, Cloudflare, Docker, Linux, self-hosting, automation, or an unreasonable amount of CSS.
              </p>
              <p className="current-note">
                <span aria-hidden="true">↳</span> Lately I have been moving deeper into networking, hardware, cybersecurity, and the infrastructure underneath the web.
              </p>
          </section>
          <EscapedProjects />
          <ExternalLinks />
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
