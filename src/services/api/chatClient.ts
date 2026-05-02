import {
  type ChatRequest,
  ChatRequestSchema,
  type ChatResponse,
  ChatResponseSchema,
} from "@/services/ai/schemas";
import { chatServerFn } from "./serverFns";

export async function requestAIChat(input: ChatRequest): Promise<ChatResponse> {
  const payload = ChatRequestSchema.parse(input);
  return ChatResponseSchema.parse(await chatServerFn({ data: payload }));
}
