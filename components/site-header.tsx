export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Skyler, back to top">
        Skyler<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Page navigation">
        <a href="#things">Things</a>
        <a href="#elsewhere">Links</a>
      </nav>
    </header>
  );
}
