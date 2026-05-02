import { z } from "zod";

/**
 * Repository-layer schema for post front matter (Layer 1: DB-shaped).
 * Defines the YAML/TOML front matter structure parsed from Markdown files.
 * Internal to repository; dates are Date objects (not strings). No `.describe()` on this layer.
 */
export const PostFrontMatterSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  preview_image: z.string().optional(),
  lang: z.string().optional(),
  toc: z.boolean().optional(),
  unlisted: z.boolean().optional(),
  taxonomies: z
    .object({
      tags: z.array(z.string()).optional(),
    })
    .optional(),
  slug: z.string().optional(),
});

export type PostFrontMatter = z.infer<typeof PostFrontMatterSchema>;

/**
 * Repository-layer schema for a complete post record (Layer 1: DB-shaped).
 * Combines parsed front matter with raw Markdown body.
 * Internal to repository implementation; never leaked to tools or UI layers.
 */
export const RepoPostSchema = PostFrontMatterSchema.extend({
  /** URL slug derived from filename or explicit front matter slug. Internal to repository. */
  slug: z.string(),
  /** Raw Markdown body text (without front matter). Used by mapper to render HTML. */
  rawContent: z.string(),
});

export type RepoPost = z.infer<typeof RepoPostSchema>;

/**
 * Repository-layer schema for post filter criteria (Layer 1: DB-shaped).
 * Defines the shape passed from server functions to repository.getPosts(filter).
 * All fields are optional for flexible querying. Repository interprets tag array with OR semantics.
 */
export const PostFilterSchema = z.object({
  tag: z.array(z.string()).optional(),
  search: z.string().optional(),
  includeUnlisted: z.boolean().optional(),
  lang: z.string().optional(),
});

export type PostFilter = z.infer<typeof PostFilterSchema>;
