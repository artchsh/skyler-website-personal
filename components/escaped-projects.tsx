import { escapedSystems } from "@/data/site";

export function EscapedProjects() {
  return (
    <section className="projects" id="things" aria-labelledby="systems-title">
      <h2 id="systems-title">A few things that escaped</h2>
      <ul className="system-list">
        {escapedSystems.map((system) => (
          <li key={system.name}>
            <article className="project-item">
              <h3><span>{system.name}</span></h3>
              <div className="project-detail">
                <p>{system.description}</p>
                <ul className="tag-list" aria-label={`${system.name} technologies`}>
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
