import { z } from "zod";

/**
 * Tool-layer schema for a post summary (Layer 2: API-shaped, used in list views).
 * Represents a post as passed between server functions and UI components.
 * Dates are ISO strings for JSON transport; full HTML content only in PostDetailSchema.
 * All fields support optional values for graceful degradation in UI rendering.
 */
export const PostSummarySchema = z.object({
  slug: z.string().describe("URL-friendly post identifier"),
  title: z.string().describe("Post title for display"),
  date: z.string().optional().describe("ISO publication date"),
  updated: z.string().optional().describe("ISO last-updated date"),
  description: z.string().optional().describe("Short excerpt or summary"),
  previewImage: z.string().optional().describe("Preview image URL (relative or absolute)"),
  tags: z.array(z.string()).describe("Array of tag labels for categorization and filtering"),
  lang: z.string().optional().describe("Language code (e.g. en, es)"),
});

/** Inferred type from PostSummarySchema. Used in list views and passed to UI components. */
export type PostSummary = z.infer<typeof PostSummarySchema>;

/**
 * Tool-layer schema for a full post (Layer 2: API-shaped, used in detail views).
 * Extends PostSummarySchema with rendered HTML and table-of-contents metadata.
 * Only sent on single-post detail routes; list views use PostSummarySchema for efficiency.
 */
export const PostDetailSchema = PostSummarySchema.extend({
  htmlContent: z.string().describe("Rendered HTML content compiled from Markdown"),
  toc: z.boolean().describe("Whether this post has a table of contents"),
});

/** Inferred type from PostDetailSchema. Used in detail views with rendered HTML content. */
export type PostDetail = z.infer<typeof PostDetailSchema>;

/**
 * URL search param schema for post tag filtering (Layer 3: URL-shaped).
 * Normalizes incoming tag values from URLs (which may arrive as single strings or arrays)
 * into a consistent string[] | undefined shape for consistent downstream processing.
 * Filters out empty strings and coerces single strings to arrays.
 * Used by router validateSearch to ensure tag filter is always in array form before reaching loaders.
 */
const TagSearchParamSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.length > 0);
  }

  if (typeof value === "string") {
    return [value];
  }

  return value;
}, z.array(z.string()).optional());

/**
 * Tool-layer schema for filtering posts (Layer 2: API-shaped).
 * Represents the normalized filter shape passed from router through server functions to repository.
 * Tag field normalizes URL params to consistent string[] shape.
 * Used by loaders deps and server function validators.
 */
export const PostsFilterInputSchema = z.object({
  tag: TagSearchParamSchema.describe(
    "Array of tag filters (OR semantics: includes post if any tag matches)",
  ),
  search: z
    .string()
    .optional()
    .describe("Full-text search query matched against title, description, content"),
  lang: z
    .string()
    .optional()
    .describe("Language code filter (defaults to en if unspecified on post)"),
});

/** Tool-layer schema for operations that target a single post by slug. */
export const PostSlugInputSchema = z.object({
  slug: z.string().min(1).describe("Post slug identifier"),
});

/** Tool-layer schema for tools that require no input parameters. */
export const EmptyToolInputSchema = z.object({});

/** Inferred type from PostsFilterInputSchema. The normalized filter shape for all post queries. */
export type PostsFilterInput = z.infer<typeof PostsFilterInputSchema>;

/** Inferred type from PostSlugInputSchema. */
export type PostSlugInput = z.infer<typeof PostSlugInputSchema>;
