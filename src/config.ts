export type NavSection = {
  path: string;
  title: string;
};

export type SiteConfig = {
  title: string;
  baseUrl: string;
  description: string;
  author: string;
  previewImage: string;
  navSections: NavSection[];
  feedFilenames: string[];
};

const defaultConfig: SiteConfig = {
  title: "My software engineering journey",
  baseUrl: "https://carlosvin.github.io",
  description:
    "Documenting a personal journey through software engineering, AI, and programming. This blog features deep dives, practical guides, and recent learnings for both seasoned and aspiring developers.",
  author: "Carlos Martin Sanchez",
  previewImage: "/img/android-chrome-192x192.png",
  navSections: [{ path: "about", title: "About" }],
  feedFilenames: ["atom.xml", "rss.xml"],
};

export const siteConfig: SiteConfig = {
  ...defaultConfig,
  title: import.meta.env.VITE_SITE_TITLE ?? defaultConfig.title,
  baseUrl: import.meta.env.VITE_SITE_BASE_URL ?? defaultConfig.baseUrl,
  description: import.meta.env.VITE_SITE_DESCRIPTION ?? defaultConfig.description,
  author: import.meta.env.VITE_SITE_AUTHOR ?? defaultConfig.author,
  previewImage: import.meta.env.VITE_SITE_PREVIEW_IMAGE ?? defaultConfig.previewImage,
};
