import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { aiAdapterService } from "../ai/adapter";
import { getMissingConfigChatResponse } from "../ai/responses";
import { ChatRequestSchema, ChatResponseSchema } from "../ai/schemas";
import { postRepository } from "../repository/fileSystem";
import { toPostDetail, toPostSummary } from "../tools/mapper";
import { PostSlugInputSchema, PostsFilterInputSchema } from "../tools/schemas";

/**
 * Fetches a paginated, filtered list of post summaries.
 * Query server function — throws on validation failure.
 */
export const getPostsServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator((input: unknown) => PostsFilterInputSchema.parse(input))
  .handler(async ({ data: filter }) => {
    const posts = await postRepository.getPosts(filter);
    return posts.map(toPostSummary);
  });

/**
 * Fetches a single post by slug, including rendered HTML content.
 * Query server function — throws on validation failure.
 */
export const getPostServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator((input: unknown) => PostSlugInputSchema.parse(input))
  .handler(async ({ data: { slug } }) => {
    const post = await postRepository.getPost(slug);
    if (!post) {
      throw new Error(`Post not found: ${slug}`);
    }
    return toPostDetail(post);
  });

/**
 * Fetches a single page-like markdown entry by slug, including unlisted content.
 * Useful for static sections such as /about that should not appear in post listings.
 */
export const getPageServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator((input: unknown) => PostSlugInputSchema.parse(input))
  .handler(async ({ data: { slug } }) => {
    const post = await postRepository.getPost(slug, { includeUnlisted: true });
    if (!post) {
      throw new Error(`Page not found: ${slug}`);
    }
    return toPostDetail(post);
  });

/**
 * Fetches the list of all distinct tags.
 * Query server function — no input required.
 */
export const getTagsServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return postRepository.getTags();
  });

/**
 * URL-aware AI chat endpoint as a server function.
 */
export const chatServerFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatRequestSchema.parse(input))
  .handler(async ({ data }) => {
    if (!aiAdapterService.isConfigured()) {
      return getMissingConfigChatResponse(aiAdapterService);
    }

    return ChatResponseSchema.parse(await aiAdapterService.respond(data));
  });
