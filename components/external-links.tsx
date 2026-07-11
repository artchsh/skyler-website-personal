import { isConfiguredSocialUrl, siteConfig } from "@/data/site";

export function ExternalLinks() {
  const links = [
    { label: "GitHub", href: siteConfig.github, configured: isConfiguredSocialUrl(siteConfig.github) },
    { label: "Email", href: `mailto:${siteConfig.email}`, configured: true },
    { label: "X", href: siteConfig.x, configured: isConfiguredSocialUrl(siteConfig.x) },
  ] as const;

  return (
    <section className="elsewhere" id="elsewhere" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title">Find me elsewhere</h2>
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.label}>
              {link.configured ? (
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                  {link.label !== "Email" && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              ) : (
                <span className="pending-link" aria-label={`${link.label}, coming soon`}>{link.label}</span>
              )}
            </li>
          ))}
          <li>
            <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
              <span>Discord</span>
              <small>· {siteConfig.discord}</small>
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            {siteConfig.cvAvailable ? (
              <a href={siteConfig.cv} download>
                <span>Download Résumé</span>
                <span aria-hidden="true">↘</span>
              </a>
            ) : (
              <span className="pending-link" aria-label="Résumé coming soon">Résumé soon</span>
            )}
          </li>
        </ul>
    </section>
  );
}
