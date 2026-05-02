import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ChatRequest } from "./schemas";

const chatMock = vi.fn();
const streamToTextMock = vi.fn();
const geminiFactoryMock = vi.fn();
const toolDefinitionMock = vi.fn();

vi.mock("@tanstack/ai", () => ({
  chat: chatMock,
  streamToText: streamToTextMock,
  toolDefinition: toolDefinitionMock,
}));

vi.mock("@tanstack/ai-gemini", () => ({
  createGeminiChat: geminiFactoryMock,
}));

function baseRequest(overrides: Partial<ChatRequest> = {}): ChatRequest {
  return {
    message: "List latest posts",
    history: [],
    ...overrides,
  };
}

describe("GeminiAdapterService", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = undefined;
    process.env.GOOGLE_API_KEY = undefined;
    process.env.GEMINI_MODEL = undefined;

    geminiFactoryMock.mockReturnValue("adapter-instance");
    chatMock.mockReturnValue("stream-instance");
    streamToTextMock.mockResolvedValue("Generated answer");
    toolDefinitionMock.mockImplementation((config: { name: string }) => ({
      ...config,
      server: (execute: unknown) => ({
        ...config,
        execute,
      }),
    }));
  });

  it("is configured when GEMINI_API_KEY is set", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const { GeminiAdapterService } = await import("./adapter");

    const service = new GeminiAdapterService();

    expect(service.isConfigured()).toBe(true);
    expect(service.getMissingConfigMessage()).toBeNull();
  });

  it("returns missing config message when no key is set", async () => {
    const { GeminiAdapterService } = await import("./adapter");
    const service = new GeminiAdapterService();

    expect(service.isConfigured()).toBe(false);
    expect(service.getMissingConfigMessage()).toBe(
      "Missing AI configuration: GEMINI_API_KEY (or GOOGLE_API_KEY)",
    );
  });

  it("uses default model and includes browser context in answer", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const { GeminiAdapterService } = await import("./adapter");
    const service = new GeminiAdapterService();

    const response = await service.respond(
      baseRequest({
        history: [{ role: "assistant", content: "Hi" }],
        browserContext: { currentPathname: "/posts/cpp-mutex" },
      }),
    );

    expect(geminiFactoryMock).toHaveBeenCalledWith("gemini-2.5-flash", "test-key");
    expect(chatMock).toHaveBeenCalledTimes(1);
    expect(chatMock.mock.calls[0]?.[0]).toMatchObject({
      adapter: "adapter-instance",
      messages: [
        { role: "assistant", content: "Hi" },
        { role: "user", content: "List latest posts" },
      ],
    });
    expect(chatMock.mock.calls[0]?.[0]).toHaveProperty("systemPrompts");
    expect(chatMock.mock.calls[0]?.[0]).toHaveProperty("tools");
    expect(chatMock.mock.calls[0]?.[0]?.systemPrompts).toEqual(
      expect.arrayContaining([expect.stringContaining("Use the available tools")]),
    );
    expect(chatMock.mock.calls[0]?.[0]?.systemPrompts).toEqual(
      expect.arrayContaining([expect.stringContaining("/posts/cpp-mutex")]),
    );
    expect(chatMock.mock.calls[0]?.[0]?.tools).toHaveLength(4);
    expect(response.answer).toBe("Generated answer");
    expect(response.usedTools).toEqual([]);
  });

  it("returns graceful error response when generation fails", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    streamToTextMock.mockRejectedValueOnce(new Error("quota exceeded"));

    const { GeminiAdapterService } = await import("./adapter");
    const service = new GeminiAdapterService();

    const response = await service.respond(baseRequest());

    expect(response.answer).toContain("I couldn't complete your request right now.");
    expect(response.answer).toContain("quota exceeded");
    expect(response.usedTools).toEqual([]);
  });
});
