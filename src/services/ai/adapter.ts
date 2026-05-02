import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chat, streamToText } from "@tanstack/ai";
import { type GeminiTextModel, createGeminiChat } from "@tanstack/ai-gemini";
import { navigationManifest } from "./navigationManifest";
import { getMissingConfigChatResponse } from "./responses";
import type { ChatRequest, ChatResponse } from "./schemas";
import { createAITools } from "./tools";

export interface AIAdapterService {
  isConfigured(): boolean;
  getMissingConfigMessage(): string | null;
  respond(input: ChatRequest): Promise<ChatResponse>;
}

type AdapterMessage = {
  role: "user" | "assistant";
  content: string;
};

const SERVER_ENV_FILES = [".env.local", ".env"];

function readEnvFromFiles(name: string): string | null {
  for (const relativePath of SERVER_ENV_FILES) {
    const filePath = join(process.cwd(), relativePath);
    if (!existsSync(filePath)) {
      continue;
    }

    const content = readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const equalIndex = trimmed.indexOf("=");
      if (equalIndex < 1) {
        continue;
      }

      const key = trimmed.slice(0, equalIndex).trim();
      if (key !== name) {
        continue;
      }

      const rawValue = trimmed.slice(equalIndex + 1).trim();
      const unquoted = rawValue.replace(/^['"]|['"]$/g, "");

      if (!unquoted || unquoted === "undefined") {
        return null;
      }

      return unquoted;
    }
  }

  return null;
}

/**
 * Gemini adapter service using TanStack AI's Google provider.
 */
export class GeminiAdapterService implements AIAdapterService {
  private resolveApiKey(): string | null {
    const rawApiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      readEnvFromFiles("GEMINI_API_KEY") ||
      readEnvFromFiles("GOOGLE_API_KEY");

    return rawApiKey && rawApiKey !== "undefined" ? rawApiKey.trim() : null;
  }

  private resolveModel(): GeminiTextModel {
    const configuredModel = process.env.GEMINI_MODEL || readEnvFromFiles("GEMINI_MODEL");
    const model =
      configuredModel && configuredModel !== "undefined" ? configuredModel : "gemini-2.5-flash";

    return model as GeminiTextModel;
  }

  isConfigured(): boolean {
    return Boolean(this.resolveApiKey());
  }

  getMissingConfigMessage(): string | null {
    if (this.isConfigured()) {
      return null;
    }

    return "Missing AI configuration: GEMINI_API_KEY (or GOOGLE_API_KEY)";
  }

  private toMessages(input: ChatRequest): AdapterMessage[] {
    const history: AdapterMessage[] = input.history.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    return [
      ...history,
      {
        role: "user",
        content: input.message,
      },
    ];
  }

  private buildSystemPrompts(input: ChatRequest): string[] {
    const routeHints = navigationManifest
      .map((route) => `- ${route.path}: ${route.title}. ${route.description}`)
      .join("\n");
    const browserContext = input.browserContext
      ? JSON.stringify(input.browserContext, null, 2)
      : "No browser context was provided by the client.";
    const userContext = input.userContext
      ? JSON.stringify(input.userContext, null, 2)
      : "No user context was provided by the client.";

    return [
      "You are the AI assistant for Carlos Martin Sanchez's software engineering blog.",
      "Use the available tools whenever the answer depends on site content, post slugs, tags, routes, metadata, or navigation. Do not invent facts when a tool can verify them.",
      "Ground your answer in the current client context when it is provided. Use browser and user context (location, timezone, locale, platform, and date/time) to disambiguate navigation advice and format responses.",
      "Prefer concise markdown answers. Use site-relative markdown links for internal pages such as /about or /posts/some-slug. Use tables only when they improve readability.",
      `Known routes:\n${routeHints}`,
      `Browser context:\n${browserContext}`,
      `User context:\n${userContext}`,
    ];
  }

  async respond(input: ChatRequest): Promise<ChatResponse> {
    const apiKey = this.resolveApiKey();

    if (!apiKey) {
      return getMissingConfigChatResponse(this);
    }

    const model = this.resolveModel();
    const geminiAdapter = createGeminiChat(model, apiKey);
    const usedToolNames = new Set<string>();

    try {
      const stream = chat({
        adapter: geminiAdapter,
        messages: this.toMessages(input),
        systemPrompts: this.buildSystemPrompts(input),
        tools: createAITools(usedToolNames),
      });
      const answer = await streamToText(stream);

      return {
        answer,
        usedTools: [...usedToolNames],
      };
    } catch (error) {
      const details = error instanceof Error ? ` ${error.message}` : "";

      return {
        answer: `I couldn't complete your request right now.${details}`,
        usedTools: [...usedToolNames],
      };
    }
  }
}

let instance: AIAdapterService | null = null;

export function getAIAdapterService(): AIAdapterService {
  if (!instance) {
    instance = new GeminiAdapterService();
  }

  return instance;
}

export const aiAdapterService: AIAdapterService = getAIAdapterService();
