"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blog";

type BlogTableOfContentsProps = {
  headings: BlogHeading[];
  label: string;
};

export function BlogTableOfContents({ headings, label }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const sections = headings
        .map((heading) => document.getElementById(heading.id))
        .filter((section): section is HTMLElement => section !== null);
      if (sections.length === 0) return;

      const readingLine = window.innerHeight * 0.5;
      let current = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
        else break;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1) ?? current;
      }

      setActiveId((previous) => previous === current.id ? previous : current.id);
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [headings]);

  return (
    <aside className="sticky top-8 h-fit border-t border-[var(--border)] pt-5 max-[800px]:static">
      <p className="m-0 mb-4 font-mono text-[.67rem] uppercase tracking-[.07em] text-[var(--accent)]">{label}</p>
      <ol className="m-0 grid list-none p-0">
        {headings.map((heading) => {
          const active = activeId === heading.id;
          return (
            <li className={heading.depth === 3 ? "pl-3" : undefined} key={heading.id}>
              <a
                aria-current={active ? "location" : undefined}
                className={`relative block border-l py-1.5 pl-3 text-[.78rem] leading-snug no-underline transition-[border-color,color,transform] duration-200 ${active ? "translate-x-1 border-[var(--accent)] text-[var(--foreground)]" : "border-white/10 text-[var(--quiet)] hover:border-white/30 hover:text-[var(--foreground)]"}`}
                href={`#${heading.id}`}
                onClick={() => setActiveId(heading.id)}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
