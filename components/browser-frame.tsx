import type { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  title: string;
  url?: string;
  compact?: boolean;
};

function getDisplayHost(url?: string) {
  if (!url) return "website preview";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function BrowserFrame({ children, title, url, compact = false }: BrowserFrameProps) {
  return (
    <div className={`browser-frame${compact ? " browser-frame-compact" : ""}`}>
      <div className="browser-tab-strip" aria-hidden="true">
        <div className="browser-traffic-lights">
          <span className="browser-light browser-light-close" />
          <span className="browser-light browser-light-minimize" />
          <span className="browser-light browser-light-expand" />
        </div>
        <div className="browser-tab">
          <span className="browser-favicon">{title.charAt(0)}</span>
          <span className="browser-tab-title">{title}</span>
          <span className="browser-tab-close">×</span>
        </div>
        <span className="browser-new-tab">+</span>
      </div>
      <div className="browser-toolbar" aria-hidden="true">
        <div className="browser-navigation">
          <span>‹</span>
          <span>›</span>
          <span>↻</span>
        </div>
        <div className="browser-address">
          <span className="browser-security-dot" />
          <span>{getDisplayHost(url)}</span>
        </div>
        <span className="browser-menu">⋮</span>
      </div>
      <div className="browser-viewport">{children}</div>
    </div>
  );
}
