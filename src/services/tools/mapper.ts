import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { RepoPost } from "../schemas/schemas";
import type { PostDetail, PostSummary } from "./schemas";

/** Regex to detect absolute URLs (https://) or protocol-relative URLs (//). */
const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i;

/**
 * Resolves preview image paths from repository frontmatter into publicly-served URLs.
 * Transforms three cases:
 * - Absolute URLs (https://...) or root-relative paths (/) → returned as-is
 * - Relative paths (./file.png, ../shared.png) → rewritten to /content/{slug}/ namespace
 * Used by toPostSummary to normalize Layer 1 (repository) preview_image field into Layer 2 (tools) previewImage.
 * Why: Content Markdown files use relative paths; this resolver makes them work in production URLs.
 */
export function resolvePreviewImage(
  previewImage: string | undefined,
  slug: string,
): string | undefined {
  if (!previewImage) {
    return undefined;
  }

  if (previewImage.startsWith("/") || ABSOLUTE_URL_REGEX.test(previewImage)) {
    return previewImage;
  }

  return new URL(previewImage, `https://local/content/${slug}/`).pathname;
}

/**
 * Maps repository-layer post (Layer 1: DB-shaped) to tool-layer summary (Layer 2: API-shaped).
 * Serializes Date objects to ISO strings for JSON transport, normalizes preview image path, extracts tag array.
 * No HTML rendering here; see toPostDetail for full post with rendered content.
 * Used by getPostsServerFn and AI tools for list views and search results.
 * Why: Decouples Layer 1 (internal storage) from Layer 2 (API/server boundaries).
 */
export function toPostSummary(post: RepoPost): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date?.toISOString(),
    updated: post.updated?.toISOString(),
    description: post.description,
    previewImage: resolvePreviewImage(post.preview_image, post.slug),
    tags: post.taxonomies?.tags ?? [],
    lang: post.lang,
  };
}

/**
 * Maps repository-layer post (Layer 1: DB-shaped) to tool-layer detail (Layer 2: API-shaped).
 * Extends toPostSummary transformation with Markdown-to-HTML rendering via unified processor.
 * Applies syntax highlighting (Shiki) and auto-generated heading slugs (rehype-slug).
 * Used by getPostServerFn and AI tools for detail views and full-text search.
 * Why: Defers HTML rendering to request-time (not file-load); enables light/dark theme variants.
 */
export async function toPostDetail(post: RepoPost): Promise<PostDetail> {
  const htmlContent = await renderMarkdown(post.rawContent);
  return {
    ...toPostSummary(post),
    htmlContent,
    toc: post.toc ?? false,
  };
}

/**
 * Internal helper: renders Markdown to HTML with GitHub Flavored Markdown, syntax highlighting, and heading slugs.
 * Unified processor pipeline: parse → GFM → rehype → slugs → highlight (theme variants) → stringify.
 * Output used in PostDetail.htmlContent; safe to render directly in `dangerouslySetInnerHTML`.
 * Why: Centralizes rendering logic; theme-aware highlighting (light/dark) deferred to request-time.
 */
async function renderMarkdown(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}
