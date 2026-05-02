"use client";

import type { ChatMessage } from "@/services/ai/schemas";
import { requestAIChat } from "@/services/api/chatClient";
import { buildChatClientContext } from "@/services/api/chatContext";
import { Button, Card, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";

export function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.error("AIAssistant request failed", error);
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

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="sm">
        <Title order={4}>AI Assistant</Title>
        <Text size="sm" c="dimmed">
          Ask about tags, latest posts, or search for a topic.
        </Text>

        <Stack gap="xs" mah={280} style={{ overflowY: "auto" }}>
          {messages.map((message, index) => (
            <Card
              key={`${message.role}-${index}`}
              withBorder
              radius="md"
              p="xs"
              bg={message.role === "user" ? "var(--mantine-color-blue-light)" : undefined}
            >
              <Text size="xs" c="dimmed" mb={4}>
                {message.role === "user" ? "You" : "Assistant"}
              </Text>
              <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                {message.content}
              </Text>
            </Card>
          ))}
        </Stack>

        <Group align="end" wrap="nowrap">
          <TextInput
            placeholder="Ask something about the content..."
            aria-label="AI prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void onSend();
              }
            }}
            style={{ flex: 1 }}
          />
          <Button onClick={() => void onSend()} loading={isLoading} disabled={isLoading}>
            Send
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
