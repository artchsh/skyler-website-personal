import { siteConfig } from "@/data/site";

export function ExternalLinks() {
  const links = [
    { label: "GitHub", href: siteConfig.github },
    { label: "Email", href: `mailto:${siteConfig.email}` },
    { label: "X", href: siteConfig.x },
  ] as const;

  return (
    <section className="elsewhere" id="elsewhere" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title">Find me elsewhere</h2>
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
                {link.label !== "Email" && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
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
