import type { Heading, Node, Paragraph, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { generatedBlogSources } from "@/data/blog.generated";
import { routing } from "@/i18n/routing";

export type BlogLocale = (typeof routing.locales)[number];

export type BlogHeading = {
  depth: 2 | 3;
  id: string;
  title: string;
};

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  filename: string;
  title: string;
  summary: string;
  body: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  coverAlt?: string;
  wordCount: number;
  readingMinutes: number;
  headings: BlogHeading[];
};

type BlogSourceInput = {
  filename: string;
  slug: string;
  locale: string;
  frontmatter: Readonly<Record<string, unknown>>;
  source: string;
};

function isParent(node: Node): node is Node & Parent {
  return "children" in node && Array.isArray(node.children);
}

function isLiteral(node: Node): node is Node & { value: string } {
  return "value" in node && typeof node.value === "string";
}

function getNodeText(node: Node): string {
  if (isLiteral(node)) return node.value;
  if (!isParent(node)) return "";
  return node.children.map((child) => getNodeText(child)).join("");
}

function createHeadingId(value: string, occurrences: Map<string, number>) {
  const base = value
    .toLocaleLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") || "section";
  const occurrence = occurrences.get(base) ?? 0;
  occurrences.set(base, occurrence + 1);
  return occurrence === 0 ? base : `${base}-${occurrence}`;
}

function extractHeadings(tree: Root): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const occurrences = new Map<string, number>();

  visit(tree, "heading", (node: Heading) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const title = getNodeText(node).trim();
    if (!title) return;
    headings.push({ depth: node.depth, id: createHeadingId(title, occurrences), title });
  });

  return headings;
}

function getOptionalString(value: unknown, field: string, filename: string) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`Blog field "${field}" must be a string in ${filename}.`);
  }
  return value.trim();
}

function getDate(value: unknown, field: string, filename: string) {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Blog field "${field}" contains an invalid date in ${filename}.`);
  }
  return parsed.toISOString().slice(0, 10);
}

function getTags(value: unknown, filename: string) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== "string")) {
    throw new Error(`Blog field "tags" must be a list of strings in ${filename}.`);
  }
  return [...new Set(value.map((tag) => tag.trim()).filter(Boolean))];
}

function parseBlogSource(source: BlogSourceInput): BlogPost {
  if (!routing.locales.includes(source.locale as BlogLocale)) {
    throw new Error(`Unsupported locale "${source.locale}" in ${source.filename}.`);
  }

  const content = source.source;
  const data = source.frontmatter;
  const tree = unified().use(remarkParse).parse(content) as Root;
  const titleHeading = tree.children.find(
    (node): node is Heading => node.type === "heading" && node.depth === 1,
  );
  const title = titleHeading ? getNodeText(titleHeading).trim() : "";

  if (!title) {
    throw new Error(`${source.filename} needs a level-one Markdown heading for its title.`);
  }

  const firstParagraph = tree.children.find(
    (node): node is Paragraph => node.type === "paragraph" && getNodeText(node).trim().length > 0,
  );
  const summary = getOptionalString(data.summary, "summary", source.filename)
    ?? (firstParagraph ? getNodeText(firstParagraph).trim() : "");

  if (!summary) {
    throw new Error(`${source.filename} needs a summary or a normal paragraph after its title.`);
  }

  const publishedAt = getDate(data.date, "date", source.filename);
  const updatedAt = getDate(data.updated, "updated", source.filename);
  const explicitDraft = data.draft;

  if (explicitDraft !== undefined && typeof explicitDraft !== "boolean") {
    throw new Error(`Blog field "draft" must be true or false in ${source.filename}.`);
  }

  const words = getNodeText(tree).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return {
    slug: source.slug,
    locale: source.locale as BlogLocale,
    filename: source.filename,
    title,
    summary,
    body: content.trim(),
    publishedAt,
    updatedAt,
    tags: getTags(data.tags, source.filename),
    draft: explicitDraft === true || !publishedAt,
    cover: getOptionalString(data.cover, "cover", source.filename),
    coverAlt: getOptionalString(data.coverAlt, "coverAlt", source.filename),
    wordCount: words,
    readingMinutes: Math.max(1, Math.ceil(words / (source.locale === "ru" ? 180 : 200))),
    headings: extractHeadings(tree),
  };
}

const parsedPosts = generatedBlogSources.map((source) => parseBlogSource(source));

export function getBlogPosts(
  locale?: BlogLocale,
  options: { includeDrafts?: boolean } = {},
) {
  const { includeDrafts = false } = options;

  return parsedPosts
    .filter((post) => (!locale || post.locale === locale) && (includeDrafts || !post.draft))
    .sort((left, right) => {
      if (left.draft !== right.draft) return left.draft ? -1 : 1;
      return (right.publishedAt ?? "9999-12-31").localeCompare(left.publishedAt ?? "9999-12-31");
    });
}

export function getBlogPost(
  slug: string,
  locale: BlogLocale,
  options: { includeDrafts?: boolean } = {},
) {
  return getBlogPosts(locale, options).find((post) => post.slug === slug);
}

export function getBlogTranslationLocales(
  slug: string,
  options: { includeDrafts?: boolean } = {},
) {
  const { includeDrafts = false } = options;
  return routing.locales.filter((locale) =>
    parsedPosts.some(
      (post) => post.slug === slug
        && post.locale === locale
        && (includeDrafts || !post.draft),
    ),
  );
}

export function formatBlogDate(date: string, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
