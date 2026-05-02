import { readFile, readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { type PostFilter, PostFrontMatterSchema, type RepoPost } from "../schemas/schemas";
import type { ReadPostRepository } from "./types";

const CONTENT_DIR = join(process.cwd(), "content");
const SKIPPED_FILES = new Set(["_index.md"]);

/**
 * Filesystem-backed implementation of ReadPostRepository (Layer 1: storage abstraction).
 * Reads Markdown files from the `content/` directory with gray-matter front matter parsing.
 * Supports two content structures:
 * - Top-level files: `content/my-post.md` → slug `my-post`
 * - Section directories: `content/my-post/index.md` → slug `my-post`
 * Returns sorted results (date descending) and applies filter (tag, search, lang) at query time.
 * Why: Decouples blog from storage details; can be swapped for DB backend without affecting tools/routes.
 */
export class FileSystemPostRepository implements ReadPostRepository {
  private readonly slugger = new GithubSlugger();

  /**
   * Returns all posts matching the optional filter, sorted by date descending.
   * Tag filter uses OR semantics: post included if ANY selected tag matches (case-insensitive).
   */
  async getPosts(filter?: PostFilter): Promise<RepoPost[]> {
    const posts = await this.readAllPosts();
    return this.applyFilter(posts, filter);
  }

  /**
   * Returns a single post by its slug, or null if not found.
   * Respects the includeUnlisted flag: if false, unlisted posts return null.
   */
  async getPost(slug: string, options?: { includeUnlisted?: boolean }): Promise<RepoPost | null> {
    const posts = await this.readAllPosts(options?.includeUnlisted ?? false);
    return posts.find((p) => p.slug === slug) ?? null;
  }

  /**
   * Returns the distinct set of all tags across all published posts, sorted alphabetically.
   */
  async getTags(): Promise<string[]> {
    const posts = await this.readAllPosts();
    const tagSet = new Set<string>();
    for (const post of posts) {
      for (const tag of post.taxonomies?.tags ?? []) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }

  /**
   * Reads all posts from the content directory.
   * Recursively walks top-level Markdown files and directories with index.md.
   * Excludes _index.md and respects unlisted flag.
   * Internal helper: returns sorted results (date descending).
   */
  private async readAllPosts(includeUnlisted = false): Promise<RepoPost[]> {
    const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
    const postPromises: Promise<RepoPost | null>[] = [];

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        if (!SKIPPED_FILES.has(entry.name)) {
          postPromises.push(
            this.readPostFile(join(CONTENT_DIR, entry.name), undefined, includeUnlisted),
          );
        }
      } else if (entry.isDirectory()) {
        const indexPath = join(CONTENT_DIR, entry.name, "index.md");
        postPromises.push(this.readPostFile(indexPath, entry.name, includeUnlisted));
      }
    }

    const results = await Promise.all(postPromises);
    return results
      .filter((p): p is RepoPost => p !== null)
      .sort((a, b) => {
        const dateA = a.date?.getTime() ?? 0;
        const dateB = b.date?.getTime() ?? 0;
        return dateB - dateA;
      });
  }

  private async readPostFile(
    filePath: string,
    directorySlug?: string,
    includeUnlisted = false,
  ): Promise<RepoPost | null> {
    try {
      const raw = await readFile(filePath, "utf-8");
      const { data, content } = matter(raw);

      const frontMatterResult = PostFrontMatterSchema.safeParse(data);
      if (!frontMatterResult.success) {
        console.warn(
          `Skipping ${filePath}: invalid front matter`,
          frontMatterResult.error.flatten(),
        );
        return null;
      }

      const frontMatter = frontMatterResult.data;

      // Skip unlisted posts (honoring the flag) unless explicitly included.
      if (!includeUnlisted && frontMatter.unlisted) return null;

      const slug = frontMatter.slug ?? directorySlug ?? basename(filePath, extname(filePath));

      return {
        ...frontMatter,
        slug,
        rawContent: content.trim(),
      };
    } catch {
      // File does not exist or cannot be read
      return null;
    }
  }

  private applyFilter(posts: RepoPost[], filter?: PostFilter): RepoPost[] {
    if (!filter) return posts;
    let result = posts;

    /**
     * Tag filter: OR semantics (includes post if ANY selected tag matches).
     * Case-insensitive matching to handle variations in tag casing.
     */
    if (filter.tag && filter.tag.length > 0) {
      const selectedTags = new Set(filter.tag.map((tag) => tag.toLowerCase()));
      result = result.filter((p) =>
        (p.taxonomies?.tags ?? []).some((tag) => selectedTags.has(tag.toLowerCase())),
      );
    }

    /**
     * Text search: case-insensitive substring matching in title, description, and raw content.
     */
    if (filter.search) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.rawContent.toLowerCase().includes(query),
      );
    }

    /**
     * Language filter: defaults to 'en' if not specified on post.
     */
    if (filter.lang) {
      result = result.filter((p) => (p.lang ?? "en") === filter.lang);
    }

    return result;
  }
}

/**
 * Singleton repository instance used throughout the application.
 * Provides read-only access to blog posts with filtering (tag, search, lang) and tagging.
 * Can be swapped for a database backend without changing Layer 2 (tools/API) or Layer 3 (routes/UI).
 */
export const postRepository: ReadPostRepository = new FileSystemPostRepository();
