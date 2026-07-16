import type {
  ContainerDirective,
  LeafDirective,
  TextDirective,
} from "mdast-util-directive";
import type { Image, Paragraph, Root, Text } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

type Directive = ContainerDirective | LeafDirective | TextDirective;

function isDirective(node: Node): node is Directive {
  return node.type === "containerDirective"
    || node.type === "leafDirective"
    || node.type === "textDirective";
}

function getNodeText(node: Node): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child)).join("");
  }
  return "";
}

function extractGalleryImages(node: ContainerDirective) {
  return node.children
    .flatMap((child) => child.type === "paragraph" ? child.children : [])
    .flatMap((child) => {
      if (child.type === "image") return [child];
      if (child.type !== "text") return [];
      return child.value
        .split(/\s+/)
        .map((path) => path.trim())
        .filter((path) => path.startsWith("/"))
        .map((path): Image => ({ type: "image", url: path, alt: "" }));
    });
}

function galleryImage(image: Image): Paragraph {
  return { type: "paragraph", children: [image] };
}

function summaryNode(title: string): Paragraph {
  const text: Text = { type: "text", value: title };
  return {
    type: "paragraph",
    data: { hName: "summary" },
    children: [text],
  };
}

export const remarkBlogDirectives: Plugin<[], Root> = () => (tree) => {
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

export const remarkBlogHeadings: Plugin<[], Root> = () => (tree) => {
  const occurrences = new Map<string, number>();
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
    const base = title
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section";
    const occurrence = occurrences.get(base) ?? 0;
    occurrences.set(base, occurrence + 1);
    node.data = {
      ...node.data,
      hProperties: { id: occurrence === 0 ? base : `${base}-${occurrence}` },
    };
  });
};
