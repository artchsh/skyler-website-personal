type BlogMarkdownProps = {
  content: string;
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div
      className="min-w-0 text-[clamp(1.05rem,1.25vw,1.16rem)] leading-[1.78] text-[var(--muted)]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
