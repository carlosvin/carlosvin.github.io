import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";
import { SitemapStream, streamToPromise } from "sitemap";

const CONTENT_DIR = join(process.cwd(), "content");
const PUBLIC_DIR = join(process.cwd(), "public");
const SITEMAP_PATH = join(PUBLIC_DIR, "sitemap.xml");
const SKIPPED_FILES = new Set(["_index.md"]);

const siteUrl = process.env.VITE_SITE_BASE_URL ?? "https://carlosvin.github.io";

function normalizeBaseUrl(baseUrl) {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

async function collectContentEntries() {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const pages = [];
  const posts = [];
  const tags = new Set();

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md") && !SKIPPED_FILES.has(entry.name)) {
      const filePath = join(CONTENT_DIR, entry.name);
      const data = await parseFrontMatter(filePath);
      if (!data) {
        continue;
      }

      const slug = data.slug ?? basename(entry.name, extname(entry.name));

      if (slug === "about") {
        pages.push("/about");
      }

      if (!data.unlisted && slug !== "about") {
        posts.push(`/posts/${slug}`);
        for (const tag of data.taxonomies?.tags ?? []) {
          tags.add(tag);
        }
      }
      continue;
    }

    if (entry.isDirectory()) {
      const filePath = join(CONTENT_DIR, entry.name, "index.md");
      const data = await parseFrontMatter(filePath);
      if (!data || data.unlisted) {
        continue;
      }

      const slug = data.slug ?? entry.name;
      posts.push(`/posts/${slug}`);
      for (const tag of data.taxonomies?.tags ?? []) {
        tags.add(tag);
      }
    }
  }

  return {
    pages,
    posts,
    tags: [...tags].sort(),
  };
}

async function parseFrontMatter(filePath) {
  try {
    const raw = await readFile(filePath, "utf-8");
    const { data } = matter(raw);
    return data;
  } catch {
    return null;
  }
}

async function generateSitemap() {
  const normalizedSiteUrl = normalizeBaseUrl(siteUrl);
  const { pages, posts, tags } = await collectContentEntries();

  const links = [
    { url: "/", changefreq: "daily", priority: 1 },
    ...pages.map((url) => ({ url, changefreq: "monthly", priority: 0.7 })),
    ...posts.map((url) => ({ url, changefreq: "weekly", priority: 0.8 })),
    ...tags.map((tag) => ({
      url: `/?tag=${encodeURIComponent(tag)}`,
      changefreq: "weekly",
      priority: 0.5,
    })),
  ];

  const stream = new SitemapStream({ hostname: normalizedSiteUrl });
  for (const link of links) {
    stream.write(link);
  }
  stream.end();

  const xml = await streamToPromise(stream).then((buffer) => buffer.toString());
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(SITEMAP_PATH, xml, "utf-8");

  console.log(`Generated sitemap with ${links.length} URLs at ${SITEMAP_PATH}`);
}

generateSitemap().catch((error) => {
  console.error("Failed to generate sitemap.xml", error);
  process.exitCode = 1;
});
