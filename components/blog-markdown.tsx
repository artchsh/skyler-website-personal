import type { ComponentPropsWithoutRef } from "react";
import rehypeShiki from "@shikijs/rehype";
import { MarkdownAsync } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { remarkBlogDirectives, remarkBlogHeadings } from "@/lib/blog-markdown";

type BlogMarkdownProps = {
  content: string;
  externalLabel: string;
};

function MarkdownLink({
  href = "",
  children,
  externalLabel,
  ...props
}: ComponentPropsWithoutRef<"a"> & { externalLabel: string }) {
  if (href.startsWith("/")) {
    return <Link className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:text-[var(--accent)]" href={href} {...props}>{children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:text-[var(--accent)]" href={href} {...props}>{children}</a>;
  }

  return (
    <a className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:text-[var(--accent)]" href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}<span className="sr-only"> {externalLabel}</span>
    </a>
  );
}

function MarkdownImage({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) {
  // Markdown authors do not have to know intrinsic image dimensions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="my-8 block h-auto w-full border border-white/10 bg-[#19191d]" alt={alt} loading="lazy" decoding="async" {...props} />;
}

function MarkdownCode({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  const language = className
    ?.split(" ")
    .find((name) => name.startsWith("language-"))
    ?.slice("language-".length);

  if (language) {
    return (
      <code
        className={`${className} relative block min-w-max px-5 pb-5 pt-12 font-mono text-[.86rem] leading-[1.75] before:absolute before:right-5 before:top-4 before:font-mono before:text-[.62rem] before:font-bold before:uppercase before:tracking-[.1em] before:text-[var(--quiet)] before:content-[attr(data-language)]`}
        data-language={language}
        {...props}
      />
    );
  }

  return <code className="rounded-sm bg-white/[.07] px-1.5 py-0.5 font-mono text-[.88em] text-[#d7d2ff]" {...props} />;
}

const codeLanguages = [
  "bash",
  "c",
  "cpp",
  "css",
  "diff",
  "dockerfile",
  "go",
  "graphql",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "markdown",
  "nginx",
  "php",
  "python",
  "rust",
  "sql",
  "svelte",
  "swift",
  "text",
  "toml",
  "tsx",
  "typescript",
  "vue",
  "yaml",
] as const;

export async function BlogMarkdown({ content, externalLabel }: BlogMarkdownProps) {
  return (
    <div className="min-w-0 text-[clamp(1.05rem,1.25vw,1.16rem)] leading-[1.78] text-[var(--muted)]">
      <MarkdownAsync
        remarkPlugins={[remarkGfm, remarkDirective, remarkBlogDirectives, remarkBlogHeadings]}
        rehypePlugins={[[rehypeShiki, {
          theme: "vitesse-dark",
          langs: codeLanguages,
          addLanguageClass: true,
          defaultLanguage: "text",
          fallbackLanguage: "text",
        }]]}
        components={{
          a: (props) => <MarkdownLink externalLabel={externalLabel} {...props} />,
          img: MarkdownImage,
          h2: (props) => <h2 className="mb-6 mt-20 scroll-mt-8 text-[clamp(2.2rem,4.5vw,4.3rem)] font-[760] leading-[.98] tracking-[-.06em] text-[var(--foreground)]" {...props} />,
          h3: (props) => <h3 className="mb-4 mt-12 scroll-mt-8 text-[clamp(1.55rem,2.6vw,2.35rem)] font-[730] leading-[1.08] tracking-[-.04em] text-[var(--foreground)]" {...props} />,
          p: (props) => <p className="my-6" {...props} />,
          ul: (props) => <ul className="my-7 grid list-none gap-2 p-0" {...props} />,
          ol: (props) => <ol className="my-7 grid list-decimal gap-2 pl-6 marker:font-mono marker:text-sm marker:text-[var(--accent)]" {...props} />,
          li: (props) => <li className="relative pl-1" {...props} />,
          blockquote: (props) => <blockquote className="my-10 border-l-2 border-[var(--accent)] pl-6 text-[1.15em] italic text-[var(--foreground)]" {...props} />,
          hr: (props) => <hr className="my-16 border-0 border-t border-[var(--border)]" {...props} />,
          pre: ({ className, style, ...props }) => <pre className={`my-9 overflow-x-auto border border-white/10 text-[#dedbe8] shadow-[0_1.5rem_4rem_rgb(0_0_0_/_24%)] ${className ?? ""}`} style={{ ...style, background: "#0b0b0e" }} {...props} />,
          code: MarkdownCode,
          table: (props) => <div className="my-9 overflow-x-auto"><table className="w-full min-w-[32rem] border-collapse text-left text-[.95rem]" {...props} /></div>,
          th: (props) => <th className="border-b border-[var(--accent)] px-3 py-3 text-sm font-bold text-[var(--foreground)]" {...props} />,
          td: (props) => <td className="border-b border-white/10 px-3 py-3 align-top" {...props} />,
          aside: ({ className, ...props }) => {
            const warning = className?.includes("warning");
            return <aside className={`my-10 border-l-4 p-6 before:mb-3 before:block before:font-mono before:text-[.68rem] before:font-bold before:uppercase before:tracking-[.12em] ${warning ? "border-[#f0c54b] bg-[#f0c54b]/8 before:content-['warning'] before:text-[#f0c54b]" : "border-[var(--accent)] bg-[var(--accent)]/8 before:content-['note'] before:text-[var(--accent)]"}`} {...props} />;
          },
          details: (props) => <details className="group my-10 border border-white/12 bg-white/[.025] p-5 open:border-[var(--accent)]/45" {...props} />,
          summary: (props) => <summary className="cursor-pointer font-bold text-[var(--foreground)] marker:text-[var(--accent)]" {...props} />,
          div: ({ className, ...props }) => <div className={className?.includes("blog-gallery") ? "my-10 grid grid-cols-2 gap-3 max-[640px]:grid-cols-1 [&_p]:m-0" : className} {...props} />,
        }}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}
