import { useTranslations } from "next-intl";

type EscapedSystem = {
  name: string;
  description: string;
  tags: string[];
};

export function EscapedProjects() {
  const t = useTranslations("Projects");
  const items = t.raw("items") as EscapedSystem[];

  return (
    <section className="projects" id="things" aria-labelledby="systems-title">
      <h2 id="systems-title">{t("title")}</h2>
      <ul className="system-list">
        {items.map((system) => (
          <li key={system.name}>
            <article className="project-item">
              <h3><span>{system.name}</span></h3>
              <div className="project-detail">
                <p>{system.description}</p>
                <ul className="tag-list" aria-label={`${system.name} ${t("techAriaSuffix")}`}>
                  {system.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
