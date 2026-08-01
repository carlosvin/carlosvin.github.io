/**
 * Build-time script to enumerate all blog post routes for prerendering.
 * Mirrors the file-system repository slug derivation logic so routes match at runtime.
 * Exports both individual post routes and computed tag filter combinations.
 */

import { readFileSync } from "node:fs";
import { basename, dirname, extname } from "node:path";
import { globSync } from "glob";
import matter from "gray-matter";

const SKIPPED_FILES = new Set(["_index.md"]);

/**
 * Derive slug from file path, matching the repository logic.
 * - Directory structure: `/content/my-post/index.md` → `my-post`
 * - Top-level file: `/content/my-post.md` → `my-post`
 */
function deriveSlug(filePath, frontMatter) {
  if (frontMatter.slug) {
    return frontMatter.slug;
  }
  const fileName = basename(filePath);
  if (fileName === "index.md") {
    return basename(dirname(filePath));
  }
  return basename(filePath, extname(filePath));
}

/**
 * Read all markdown files and extract metadata for prerendering.
 * Returns array of { slug, tags, unlisted }.
 */
async function extractPostMetadata() {
  const contentGlob = "content/**/*.md";
  const files = globSync(contentGlob);

  const posts = [];
  for (const filePath of files) {
    const fileName = basename(filePath);
    if (SKIPPED_FILES.has(fileName)) continue;

    try {
      const raw = readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      const slug = deriveSlug(filePath, data || {});
      const unlisted = data?.unlisted ?? false;
      const tags = data?.tags ?? [];

      posts.push({ slug, tags, unlisted });
    } catch (err) {
      console.warn(`Failed to read ${filePath}:`, err.message);
    }
  }

  return posts;
}

/**
 * Compute tag frequency histogram and select top combinations.
 * Returns array of tag sets: [["tag1"], ["tag2"], ["tag1", "tag2"], ...].
 */
function selectTopTagCombinations(posts, topCount = 20) {
  const tagFreq = new Map();

  // Count individual tag frequency.
  for (const post of posts) {
    for (const tag of post.tags) {
      tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
    }
  }

  // Sort tags by frequency descending.
  const sortedTags = Array.from(tagFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  // Select top combinations: individual tags + two-tag combos + three-tag combos.
  const combinations = [];

  // Top 5 individual tags.
  for (let i = 0; i < Math.min(5, sortedTags.length); i++) {
    combinations.push([sortedTags[i]]);
  }

  // Top 5 two-tag combinations (most co-occurring pairs).
  const pairFreq = new Map();
  for (const post of posts) {
    const postTags = post.tags.slice().sort();
    for (let i = 0; i < postTags.length; i++) {
      for (let j = i + 1; j < postTags.length; j++) {
        const pair = [postTags[i], postTags[j]].join("|");
        pairFreq.set(pair, (pairFreq.get(pair) ?? 0) + 1);
      }
    }
  }

  const sortedPairs = Array.from(pairFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pair]) => pair.split("|"));

  combinations.push(...sortedPairs);

  // Top 10 three-tag combinations (or remaining space up to topCount).
  const tripleFreq = new Map();
  for (const post of posts) {
    const postTags = post.tags.slice().sort();
    if (postTags.length >= 3) {
      for (let i = 0; i < postTags.length; i++) {
        for (let j = i + 1; j < postTags.length; j++) {
          for (let k = j + 1; k < postTags.length; k++) {
            const triple = [postTags[i], postTags[j], postTags[k]].join("|");
            tripleFreq.set(triple, (tripleFreq.get(triple) ?? 0) + 1);
          }
        }
      }
    }
  }

  const sortedTriples = Array.from(tripleFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, Math.min(10, topCount - combinations.length))
    .map(([triple]) => triple.split("|"));

  combinations.push(...sortedTriples);

  return combinations.slice(0, topCount);
}

/**
 * Generate prerender routes array.
 * Includes home, about, all post pages, and common tag filter combinations.
 * Only the default (light) theme is prerendered; dark theme renders on-demand via SSR.
 */
export async function generatePrerenderRoutes() {
  const posts = await extractPostMetadata();

  // Filter out unlisted posts (they shouldn't be prerendered as top-level routes).
  const listedPosts = posts.filter((p) => !p.unlisted);

  const routes = [
    "/", // Home
    "/about", // About page
  ];

  // Add individual post routes.
  for (const post of listedPosts) {
    routes.push(`/posts/${post.slug}`);
  }

  // Add common tag filter combinations.
  const topCombos = selectTopTagCombinations(listedPosts, 20);
  for (const tags of topCombos) {
    const queryString = tags.map((tag) => `tag=${encodeURIComponent(tag)}`).join("&");
    routes.push(`/?${queryString}`);
  }

  return routes;
}

// Export for use in vite.config.ts
export default generatePrerenderRoutes;
