import { EscapedProjects } from "@/components/escaped-projects";
import { ExternalLinks } from "@/components/external-links";
import { SiteHeader } from "@/components/site-header";
import { isConfiguredSocialUrl, siteConfig } from "@/data/site";

export default function Home() {
  const sameAs = [siteConfig.github, siteConfig.x].filter(isConfiguredSocialUrl);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Frontend developer",
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
            <p className="identity">Frontend developer living somewhere between interfaces, servers, and systems that were supposed to be simple.</p>
            <h1 id="intro-title">
              I make websites, systems, and occasionally <span>problems for myself.</span>
            </h1>
          </section>

          <section className="about" aria-label="About Skyler">
              <p>
                I build fast, durable websites and the awkward machinery around them: content systems, integrations, deployments, servers, and the occasional tool that exists because nothing else behaved properly.
              </p>
              <p>
                Most of my professional work lives behind NDAs. What escapes usually involves Next.js, MODX, Cloudflare, Docker, Linux, self-hosting, or an unreasonable amount of CSS.
              </p>
              <p className="current-note">
                <span aria-hidden="true">↳</span> Lately I have been drifting further into networking, hardware, cybersecurity, and everything underneath the interface.
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
