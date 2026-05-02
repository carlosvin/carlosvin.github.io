import type { AIAdapterService } from "./adapter";
import { type ChatResponse, ChatResponseSchema } from "./schemas";

/**
 * Builds a standardized chat response when the AI adapter is not configured.
 * Reused by all chat entry points to keep fallback behavior consistent.
 */
export function getMissingConfigChatResponse(adapter: AIAdapterService): ChatResponse {
  return ChatResponseSchema.parse({
    answer: adapter.getMissingConfigMessage() ?? "AI adapter is not configured.",
    usedTools: [],
  });
}
