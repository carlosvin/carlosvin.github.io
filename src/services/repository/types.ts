import type { PostFilter, RepoPost } from "../schemas/schemas";

/**
 * Read-only contract for the blog post repository.
 * Implementations must read posts from an underlying data source (e.g., filesystem).
 */
export interface ReadPostRepository {
  /** Returns all posts matching the optional filter, sorted by date descending. */
  getPosts(filter?: PostFilter): Promise<RepoPost[]>;

  /** Returns a single post by its slug, or null if not found. */
  getPost(slug: string, options?: { includeUnlisted?: boolean }): Promise<RepoPost | null>;

  /** Returns the distinct set of all tags across all published posts. */
  getTags(): Promise<string[]>;
}
