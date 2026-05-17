import { siteConfig } from "@/config";
import { postRepository } from "@/services/repository/fileSystem";
import { toPostDetail, toPostSummary } from "@/services/tools/mapper";
import {
  EmptyToolInputSchema,
  PostDetailSchema,
  PostSlugInputSchema,
  PostSummarySchema,
  PostsFilterInputSchema,
} from "@/services/tools/schemas";
import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";
import { type ToolResult, safeToolHandler } from "./safeToolHandler";

const SiteConfigSchema = z.object({
  title: z.string(),
  baseUrl: z.string(),
  description: z.string(),
  author: z.string(),
  previewImage: z.string(),
  navSections: z.array(
    z.object({
      path: z.string(),
      title: z.string(),
    }),
  ),
  feedFilenames: z.array(z.string()),
});

function unwrapToolResult<T>(result: ToolResult<T>, toolName: string): T {
  if (result.ok) {
    return result.data;
  }

  throw new Error(result.error ? `${toolName}: ${result.error}` : `${toolName}: Tool failed`);
}

export async function getPostsTool(input: unknown) {
  const parsed = PostsFilterInputSchema.parse(input);
  return safeToolHandler(async () => {
    const posts = await postRepository.getPosts(parsed);
    return Promise.all(posts.map(toPostSummary));
  });
}

export async function getPostTool(input: unknown) {
  const parsed = PostSlugInputSchema.parse(input);
  return safeToolHandler(async () => {
    const post = await postRepository.getPost(parsed.slug);
    if (!post) {
      throw new Error(`Post not found: ${parsed.slug}`);
    }
    return toPostDetail(post);
  });
}

export async function getPageTool(input: unknown) {
  const parsed = PostSlugInputSchema.parse(input);
  return safeToolHandler(async () => {
    const page = await postRepository.getPost(parsed.slug, { includeUnlisted: true });
    if (!page) {
      throw new Error(`Page not found: ${parsed.slug}`);
    }
    return toPostDetail(page);
  });
}

export async function getTagsTool() {
  return safeToolHandler(async () => {
    return postRepository.getTags();
  });
}

export async function getSiteConfigTool() {
  return safeToolHandler(async () => {
    return siteConfig;
  });
}

export function createAITools(usedToolNames: Set<string>) {
  return [
    toolDefinition({
      name: "getPosts",
      description: "Get blog post summaries filtered by tag, search text, or language.",
      inputSchema: PostsFilterInputSchema,
      outputSchema: z.array(PostSummarySchema),
    }).server(async (args) => {
      usedToolNames.add("getPosts");
      return unwrapToolResult(await getPostsTool(args), "getPosts");
    }),
    toolDefinition({
      name: "getPost",
      description: "Get a single blog post by slug, including rendered HTML content.",
      inputSchema: PostSlugInputSchema,
      outputSchema: PostDetailSchema,
    }).server(async (args) => {
      usedToolNames.add("getPost");
      return unwrapToolResult(await getPostTool(args), "getPost");
    }),
    toolDefinition({
      name: "getPage",
      description: "Get a static site page, such as the about page, by slug.",
      inputSchema: PostSlugInputSchema,
      outputSchema: PostDetailSchema,
    }).server(async (args) => {
      usedToolNames.add("getPage");
      return unwrapToolResult(await getPageTool(args), "getPage");
    }),
    toolDefinition({
      name: "getTags",
      description: "List all available blog tags.",
      inputSchema: EmptyToolInputSchema,
      outputSchema: z.array(z.string()),
    }).server(async () => {
      usedToolNames.add("getTags");
      return unwrapToolResult(await getTagsTool(), "getTags");
    }),
    toolDefinition({
      name: "getSiteConfig",
      description:
        "Get site-wide metadata such as title, author, base URL, and navigation sections.",
      inputSchema: EmptyToolInputSchema,
      outputSchema: SiteConfigSchema,
    }).server(async () => {
      usedToolNames.add("getSiteConfig");
      return unwrapToolResult(await getSiteConfigTool(), "getSiteConfig");
    }),
  ];
}
