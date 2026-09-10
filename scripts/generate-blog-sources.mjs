import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = join(projectRoot, "content", "blog");
const outputPath = join(projectRoot, "data", "blog.generated.ts");
const messagesDirectory = join(projectRoot, "messages");
const filenamePattern = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.(en|ru)\.md$/;

const messages = {
  en: JSON.parse(readFileSync(join(messagesDirectory, "en.json"), "utf8")),
  ru: JSON.parse(readFileSync(join(messagesDirectory, "ru.json"), "utf8")),
};
const locales = Object.keys(messages);

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
];

function getNodeText(node) {
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) return node.children.map(getNodeText).join("");
  return "";
}

function isDirective(node) {
  return node.type === "containerDirective"
    || node.type === "leafDirective"
    || node.type === "textDirective";
}

function headingBaseId(title) {
  return title
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") || "section";
}

function extractGalleryImages(node) {
  return node.children
    .flatMap((child) => (child.type === "paragraph" ? child.children : []))
    .flatMap((child) => {
      if (child.type === "image") return [child];
      if (child.type !== "text") return [];
      return child.value
        .split(/\s+/)
        .map((path) => path.trim())
        .filter((path) => path.startsWith("/"))
        .map((path) => ({ type: "image", url: path, alt: "" }));
    });
}

function galleryImage(image) {
  return { type: "paragraph", children: [image] };
}

function summaryNode(title) {
  return {
    type: "paragraph",
    data: { hName: "summary" },
    children: [{ type: "text", value: title }],
  };
}

function remarkBlogDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (!isDirective(node)) return;

      if (node.name === "note" || node.name === "warning") {
        node.data = {
          ...node.data,
          hName: "aside",
          hProperties: {
            className: ["blog-callout", `blog-callout-${node.name}`],
            "data-label": node.name,
          },
        };
        return;
      }

      if (node.name === "details" && node.type === "containerDirective") {
        const title = typeof node.attributes?.title === "string"
          ? node.attributes.title
          : "Details";
        node.data = {
          ...node.data,
          hName: "details",
          hProperties: { className: ["blog-details"] },
        };
        node.children.unshift(summaryNode(title));
        return;
      }

      if (node.name === "gallery" && node.type === "containerDirective") {
        const images = extractGalleryImages(node);
        node.data = {
          ...node.data,
          hName: "div",
          hProperties: { className: ["blog-gallery"] },
        };
        node.children = images.map(galleryImage);
      }
    });
  };
}

function remarkBlogHeadings() {
  return (tree) => {
    const occurrences = new Map();
    let removedTitle = false;

    tree.children = tree.children.filter((node) => {
      if (!removedTitle && node.type === "heading" && node.depth === 1) {
        removedTitle = true;
        return false;
      }
      return true;
    });

    visit(tree, "heading", (node) => {
      if (node.depth !== 2 && node.depth !== 3) return;
      const title = getNodeText(node).trim();
      if (!title) return;
      const base = headingBaseId(title);
      const occurrence = occurrences.get(base) ?? 0;
      occurrences.set(base, occurrence + 1);
      node.data = {
        ...node.data,
        hProperties: { id: occurrence === 0 ? base : `${base}-${occurrence}` },
      };
    });
  };
}

function extractHeadings(tree) {
  const headings = [];
  const occurrences = new Map();

  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const title = getNodeText(node).trim();
    if (!title) return;
    const base = headingBaseId(title);
    const occurrence = occurrences.get(base) ?? 0;
    occurrences.set(base, occurrence + 1);
    headings.push({
      depth: node.depth,
      id: occurrence === 0 ? base : `${base}-${occurrence}`,
      title,
    });
  });

  return headings;
}

const LINK_CLASS = "font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:text-[var(--accent)]";
const CALLOUT_CLASS = "my-10 border-l-4 p-6 before:mb-3 before:block before:font-mono before:text-[.68rem] before:font-bold before:uppercase before:tracking-[.12em]";
const BLOCK_CODE_CLASS = "relative block min-w-max px-5 pb-5 pt-12 font-mono text-[.86rem] leading-[1.75] before:absolute before:right-5 before:top-4 before:font-mono before:text-[.62rem] before:font-bold before:uppercase before:tracking-[.1em] before:text-[var(--quiet)] before:content-[attr(data-language)]";
const INLINE_CODE_CLASS = "rounded-sm bg-white/[.07] px-1.5 py-0.5 font-mono text-[.88em] text-[#d7d2ff]";

function setClassName(node, value) {
  node.properties = {
    ...(node.properties ?? {}),
    class: value.split(/\s+/).filter(Boolean),
  };
  delete node.properties.className;
}

function styleNode(node, { locale, externalLabel }) {
  const tag = node.tagName;
  const properties = node.properties ?? {};
  const classProp = Array.isArray(properties.className)
    ? properties.className.join(" ")
    : typeof properties.className === "string"
      ? properties.className
      : Array.isArray(properties.class)
        ? properties.class.join(" ")
        : typeof properties.class === "string"
          ? properties.class
          : "";
  const currentClass = classProp;

  switch (tag) {
    case "h2":
      setClassName(node, "mb-6 mt-20 scroll-mt-8 text-[clamp(2.2rem,4.5vw,4.3rem)] font-[760] leading-[.98] tracking-[-.06em] text-[var(--foreground)]");
      break;
    case "h3":
      setClassName(node, "mb-4 mt-12 scroll-mt-8 text-[clamp(1.55rem,2.6vw,2.35rem)] font-[730] leading-[1.08] tracking-[-.04em] text-[var(--foreground)]");
      break;
    case "p":
      setClassName(node, "my-6");
      break;
    case "ul":
      setClassName(node, "my-7 grid list-none gap-2 p-0");
      break;
    case "ol":
      setClassName(node, "my-7 grid list-decimal gap-2 pl-6 marker:font-mono marker:text-sm marker:text-[var(--accent)]");
      break;
    case "li":
      setClassName(node, "relative pl-1");
      break;
    case "blockquote":
      setClassName(node, "my-10 border-l-2 border-[var(--accent)] pl-6 text-[1.15em] italic text-[var(--foreground)]");
      break;
    case "hr":
      setClassName(node, "my-16 border-0 border-t border-[var(--border)]");
      break;
    case "pre": {
      const existingStyle = typeof properties.style === "string" ? properties.style : "";
      setClassName(node, `my-9 overflow-x-auto border border-white/10 text-[#dedbe8] shadow-[0_1.5rem_4rem_rgb(0_0_0_/_24%)] ${currentClass}`.trim());
      node.properties.style = existingStyle
        ? `${existingStyle};background:#0b0b0e`
        : "background:#0b0b0e";
      break;
    }
    case "code": {
      const language = currentClass.match(/(?:^|\s)language-([^\s]+)/)?.[1];
      if (language) {
        setClassName(node, `${currentClass} ${BLOCK_CODE_CLASS}`.trim());
        node.properties.dataLanguage = language;
      } else {
        setClassName(node, INLINE_CODE_CLASS);
      }
      break;
    }
    case "table":
      setClassName(node, "w-full min-w-[32rem] border-collapse text-left text-[.95rem]");
      break;
    case "th":
      setClassName(node, "border-b border-[var(--accent)] px-3 py-3 text-sm font-bold text-[var(--foreground)]");
      break;
    case "td":
      setClassName(node, "border-b border-white/10 px-3 py-3 align-top");
      break;
    case "img":
      setClassName(node, "my-8 block h-auto w-full border border-white/10 bg-[#19191d]");
      node.properties.loading = "lazy";
      node.properties.decoding = "async";
      break;
    case "a": {
      const href = properties.href ?? "";
      setClassName(node, LINK_CLASS);
      if (href.startsWith("/")) {
        const alreadyLocalized = href === `/${locale}`
          || href.startsWith(`/${locale}/`)
          || locales.some((candidate) => href.startsWith(`/${candidate}/`));
        if (!alreadyLocalized) {
          node.properties.href = href === "/" ? `/${locale}` : `/${locale}${href}`;
        }
      } else if (!href.startsWith("#")) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
        node.children = [
          ...node.children,
          {
            type: "element",
            tagName: "span",
            properties: { className: ["sr-only"] },
            children: [{ type: "text", value: ` ${externalLabel}` }],
          },
        ];
      }
      break;
    }
    case "aside": {
      const warning = currentClass.includes("blog-callout-warning");
      setClassName(node, warning
        ? `${CALLOUT_CLASS} border-[#f0c54b] bg-[#f0c54b]/8 before:content-['warning'] before:text-[#f0c54b]`
        : `${CALLOUT_CLASS} border-[var(--accent)] bg-[var(--accent)]/8 before:content-['note'] before:text-[var(--accent)]`);
      break;
    }
    case "details":
      setClassName(node, "group my-10 border border-white/12 bg-white/[.025] p-5 open:border-[var(--accent)]/45");
      break;
    case "summary":
      setClassName(node, "cursor-pointer font-bold text-[var(--foreground)] marker:text-[var(--accent)]");
      break;
    case "div":
      if (currentClass.includes("blog-gallery")) {
        setClassName(node, "my-10 grid grid-cols-2 gap-3 max-[640px]:grid-cols-1 [&_p]:m-0");
      }
      break;
  }
}

function rehypeBlog({ locale, externalLabel }) {
  return (tree) => {
    const transform = (node) => {
      if (node.type !== "element") {
        if (Array.isArray(node.children)) {
          node.children = node.children.map((child) => transform(child));
        }
        return node;
      }
      const children = (node.children ?? []).map((child) => transform(child));
      node.children = children;
      styleNode(node, { locale, externalLabel });
      if (node.tagName === "table") {
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["my-9", "overflow-x-auto"] },
          children: [node],
        };
      }
      return node;
    };

    transform(tree);
  };
}

function getOptionalString(value, field, filename) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`Blog field "${field}" must be a string in ${filename}.`);
  }
  return value.trim();
}

function getDate(value, field, filename) {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Blog field "${field}" contains an invalid date in ${filename}.`);
  }
  return parsed.toISOString().slice(0, 10);
}

function getTags(value, filename) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== "string")) {
    throw new Error(`Blog field "tags" must be a list of strings in ${filename}.`);
  }
  return [...new Set(value.map((tag) => tag.trim()).filter(Boolean))];
}

async function renderPost(source) {
  const { filename, slug, locale, frontmatter, content } = source;
  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale "${locale}" in ${filename}.`);
  }

  const tree = unified().use(remarkParse).parse(content);
  const titleHeading = tree.children.find(
    (node) => node.type === "heading" && node.depth === 1,
  );
  const title = titleHeading ? getNodeText(titleHeading).trim() : "";

  if (!title) {
    throw new Error(`${filename} needs a level-one Markdown heading for its title.`);
  }

  const firstParagraph = tree.children.find(
    (node) => node.type === "paragraph" && getNodeText(node).trim().length > 0,
  );
  const summary = getOptionalString(frontmatter.summary, "summary", filename)
    ?? (firstParagraph ? getNodeText(firstParagraph).trim() : "");

  if (!summary) {
    throw new Error(`${filename} needs a summary or a normal paragraph after its title.`);
  }

  const publishedAt = getDate(frontmatter.date, "date", filename);
  const updatedAt = getDate(frontmatter.updated, "updated", filename);
  const explicitDraft = frontmatter.draft;

  if (explicitDraft !== undefined && typeof explicitDraft !== "boolean") {
    throw new Error(`Blog field "draft" must be true or false in ${filename}.`);
  }

  const words = getNodeText(tree).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const externalLabel = messages[locale].Elsewhere.opensNewTab;

  const bodyHtml = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkDirective)
      .use(remarkBlogDirectives)
      .use(remarkBlogHeadings)
      .use(remarkRehype)
      .use(rehypeShiki, {
        theme: "vitesse-dark",
        langs: codeLanguages,
        addLanguageClass: true,
        defaultLanguage: "text",
        fallbackLanguage: "text",
      })
      .use(rehypeBlog, { locale, externalLabel })
      .use(rehypeStringify)
      .process(content),
  );

  return {
    filename,
    slug,
    locale,
    title,
    summary,
    bodyHtml,
    publishedAt,
    updatedAt,
    tags: getTags(frontmatter.tags, filename),
    draft: explicitDraft === true || !publishedAt,
    cover: getOptionalString(frontmatter.cover, "cover", filename),
    coverAlt: getOptionalString(frontmatter.coverAlt, "coverAlt", filename),
    wordCount: words,
    readingMinutes: Math.max(1, Math.ceil(words / (locale === "ru" ? 180 : 200))),
    headings: extractHeadings(tree),
  };
}

if (!existsSync(contentDirectory)) {
  mkdirSync(contentDirectory, { recursive: true });
}

const sources = readdirSync(contentDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => {
    const match = filenamePattern.exec(entry.name);

    if (!match) {
      throw new Error(
        `Invalid blog filename "${entry.name}". Use <slug>.<en|ru>.md with a lowercase kebab-case slug.`,
      );
    }

    const rawSource = readFileSync(join(contentDirectory, entry.name), "utf8");
    const { content, data } = matter(rawSource);

    return {
      filename: entry.name,
      slug: match[1],
      locale: match[2],
      frontmatter: data,
      content: content.trim(),
    };
  })
  .sort((left, right) => left.filename.localeCompare(right.filename));

const duplicate = sources.find((source, index) =>
  sources.some(
    (candidate, candidateIndex) =>
      candidateIndex !== index &&
      candidate.slug === source.slug &&
      candidate.locale === source.locale,
  ),
);

if (duplicate) {
  throw new Error(`Duplicate blog source for ${duplicate.slug}.${duplicate.locale}.md.`);
}

const posts = await Promise.all(sources.map((source) => renderPost(source)));

const output = `// This file is generated by scripts/generate-blog-sources.mjs.
// Edit content/blog/*.md and run bun run blog:generate instead.

export const generatedBlogPosts = ${JSON.stringify(posts, null, 2)} as const;
`;

const previousOutput = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";

if (previousOutput !== output) {
  writeFileSync(outputPath, output);
  console.log(
    `Generated ${relative(projectRoot, outputPath)} from ${posts.length} blog source${posts.length === 1 ? "" : "s"}.`,
  );
}