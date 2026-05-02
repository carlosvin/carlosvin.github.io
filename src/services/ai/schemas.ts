import { z } from "zod";

export const BrowserContextSchema = z.object({
  currentPathname: z.string().optional(),
  currentSearch: z.string().optional(),
  currentHref: z.string().optional(),
  referrer: z.string().optional(),
  viewport: z
    .object({
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
});

export const UserContextSchema = z.object({
  locale: z.string().optional(),
  timezone: z.string().optional(),
  platform: z.string().optional(),
  userAgent: z.string().optional(),
  currentDateTime: z.string().optional(),
  colorSchemePreference: z.enum(["light", "dark", "no-preference"]).optional(),
});

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

export const ChatRequestSchema = z.object({
  message: z.string().min(1),
  browserContext: BrowserContextSchema.optional(),
  userContext: UserContextSchema.optional(),
  history: z.array(ChatMessageSchema).default([]),
});

export const ChatResponseSchema = z.object({
  answer: z.string(),
  usedTools: z.array(z.string()).default([]),
});

export type BrowserContext = z.infer<typeof BrowserContextSchema>;
export type UserContext = z.infer<typeof UserContextSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
