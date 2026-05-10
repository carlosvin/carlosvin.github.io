"use client";

import { toInternalChatTarget } from "@/components/chatLinks";
import type { ChatMessage } from "@/services/ai/schemas";
import { requestAIChat } from "@/services/api/chatClient";
import { buildChatClientContext } from "@/services/api/chatContext";
import {
  Box,
  Button,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { startTransition, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * ChatDrawer component for persistent AI chat accessible from any page.
 * Maintains message history across route navigation via persistent rendering outside Outlet.
 * Integrates with the /api/chat route to fetch AI responses with route context.
 *
 * Why: Implements TanStack Fullstack Pattern rule #16 (chat persists across navigation).
 *
 * Props:
 * - isOpen: whether drawer is visible
 * - onClose: callback to close the drawer
 */
export interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Renders a drawer containing a persistent chat interface.
 * Accepts user messages, sends them to AI via /api/chat with current browser context,
 * and displays both user and assistant messages.
 */
export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends user message to AI, appends to history, displays assistant response.
   */
  async function onSend() {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextUserMessage: ChatMessage = { role: "user", content: trimmed };
    const nextHistory = [...messages, nextUserMessage];
    setMessages(nextHistory);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await requestAIChat({
        message: trimmed,
        history: messages,
        ...buildChatClientContext(),
      });

      setMessages((current) => [...current, { role: "assistant", content: response.answer }]);
    } catch (error) {
      console.error("ChatDrawer request failed", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Unexpected AI assistant error.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Clear chat history when starting a new conversation.
   */
  function onClear() {
    setMessages([]);
    setPrompt("");
  }

  function renderMessageContent(message: ChatMessage) {
    if (message.role === "user") {
      return (
        <Text size="sm" c="white" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {message.content}
        </Text>
      );
    }

    const currentHref = typeof window === "undefined" ? "http://localhost/" : window.location.href;

    return (
      <Box className="chat-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a({ href, children, ...props }) {
              if (!href) {
                return <a {...props}>{children}</a>;
              }

              const internalTarget = toInternalChatTarget(href, currentHref);
              if (!internalTarget) {
                return (
                  <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
                    {children}
                  </a>
                );
              }

              return (
                <a
                  href={internalTarget}
                  {...props}
                  onClick={(event) => {
                    event.preventDefault();
                    startTransition(() => {
                      void navigate({ to: internalTarget as never });
                    });
                  }}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </Box>
    );
  }

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="AI Assistant"
      position="left"
      size="50%"
      styles={{
        content: { display: "flex", flexDirection: "column" },
        header: { marginBottom: 0 },
        body: {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minHeight: 0,
          paddingBottom: "calc(var(--mantine-spacing-md) + env(safe-area-inset-bottom, 0px))",
        },
      }}
    >
      <Stack gap="md" h="100%" flex={1} mih={0}>
        {/* Messages Area */}
        <ScrollArea type="always" flex={1} mih={0}>
          <Stack gap="sm" pr="md" pb="md">
            {messages.length === 0 ? (
              <Stack gap="md" align="center" justify="center" mih={200}>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <MessageCircle size={24} />
                </ThemeIcon>
                <Stack gap="xs" align="center">
                  <Text fw={500}>Start a conversation</Text>
                  <Text size="sm" c="dimmed" ta="center">
                    Ask about tags, latest posts, or search for a topic.
                  </Text>
                </Stack>
              </Stack>
            ) : (
              messages.map((message, index) => (
                <Group
                  key={`${message.role}-${index}`}
                  justify={message.role === "user" ? "flex-end" : "flex-start"}
                >
                  <Paper
                    maw="85%"
                    px="sm"
                    py="xs"
                    radius="md"
                    bg={message.role === "user" ? "blue.6" : "var(--mantine-color-default-hover)"}
                    ta="left"
                  >
                    <Text
                      size="xs"
                      c={message.role === "user" ? "white" : "dimmed"}
                      mb={4}
                    >
                      {message.role === "user" ? "You" : "Assistant"}
                    </Text>
                    {renderMessageContent(message)}
                  </Paper>
                </Group>
              ))
            )}
          </Stack>
        </ScrollArea>

        {/* Input Area */}
        <Stack gap="sm" pt="xs" bg="var(--mantine-color-body)">
          {messages.length > 0 && (
            <Button variant="subtle" size="xs" onClick={onClear} color="gray">
              Clear conversation
            </Button>
          )}
          <Group align="end" wrap="nowrap" gap="xs">
            <TextInput
              placeholder="Ask something about the content..."
              aria-label="AI prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void onSend();
                }
              }}
              disabled={isLoading}
              flex={1}
            />
            <Button
              onClick={() => void onSend()}
              loading={isLoading}
              disabled={isLoading || !prompt.trim()}
              size="sm"
            >
              Send
            </Button>
          </Group>
          <Text size="xs" c="dimmed" ta="center">
            Cmd+K or Ctrl+K to toggle
          </Text>
        </Stack>
      </Stack>
    </Drawer>
  );
}
