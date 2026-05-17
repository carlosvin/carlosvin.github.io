import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { siteConfig } from "@/config";
import "@/styles/markdown.css";
import "@mantine/core/styles.css";

import {
  ActionIcon,
  AppShell,
  Box,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Stack,
  Text,
  Title,
  createTheme,
  localStorageColorSchemeManager,
  mantineHtmlProps,
} from "@mantine/core";
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
import type { ReactNode } from "react";

const LazyChatDrawer = lazy(async () => {
  const module = await import("@/components/ChatDrawer");
  return { default: module.ChatDrawer };
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.title },
      {
        name: "description",
        content: siteConfig.description,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

const theme = createTheme({
  fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  headings: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  },
  primaryColor: "blue",
  radius: {
    md: "10px",
  },
});

const colorSchemeManager = localStorageColorSchemeManager({ key: "carlosvin-color-scheme" });

function RootComponent() {
  return (
    <RootDocument>
      <RootLayout />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [chatDrawerLoaded, setChatDrawerLoaded] = useState(false);

  function openChatDrawer() {
    setChatDrawerLoaded(true);
    setChatDrawerOpen(true);
  }

  /**
   * Keyboard shortcut: Cmd+K (macOS) or Ctrl+K (Windows/Linux) toggles chat drawer.
   * Prevents default browser behavior (e.g., Cmd+K opens browser search).
   */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      if (isCmdOrCtrl && event.key === "k") {
        event.preventDefault();
        setChatDrawerOpen((prev) => {
          const nextOpen = !prev;
          if (nextOpen) {
            setChatDrawerLoaded(true);
          }
          return nextOpen;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
    >
      <AppShell
        header={{ height: 72 }}
        padding="md"
        styles={() => ({
          main: {
            backgroundColor: "var(--mantine-color-body)",
          },
        })}
      >
        <AppShell.Header>
          <Container h="100%" size="lg">
            <Group justify="space-between" h="100%">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Title order={4}>{siteConfig.title}</Title>
              </Link>
              <Group gap="sm">
                <Link to="/" style={{ color: "inherit" }}>
                  Posts
                </Link>
                {siteConfig.navSections.map((section) => (
                  <Link
                    key={section.path}
                    // biome-ignore lint/suspicious/noExplicitAny: nav paths are config-defined and validated at runtime
                    to={`/${section.path}` as any}
                    style={{ color: "inherit" }}
                  >
                    {section.title}
                  </Link>
                ))}
                <ColorSchemeToggle />
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="lg">
            <Stack gap="xl">
              <Outlet />
              <Box py="md">
                <Text size="sm" c="dimmed" ta="center">
                  © {new Date().getFullYear()} {siteConfig.author}
                </Text>
              </Box>
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>

      <ActionIcon
        aria-label="Open AI assistant"
        variant="filled"
        color="blue"
        radius="xl"
        size="xl"
        onClick={openChatDrawer}
        style={{
          position: "fixed",
          left: 16,
          bottom: 16,
          zIndex: chatDrawerOpen ? 100 : 400,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <MessageCircle size={20} />
      </ActionIcon>

      {chatDrawerLoaded ? (
        <Suspense fallback={null}>
          {/* Persistent ChatDrawer - rendered outside Outlet so it survives navigation */}
          <LazyChatDrawer isOpen={chatDrawerOpen} onClose={() => setChatDrawerOpen(false)} />
        </Suspense>
      ) : null}
    </MantineProvider>
  );
}

function NotFoundPage() {
  return (
    <Stack component="section" gap="sm" py="xl" align="flex-start">
      <Title order={1}>Page not found</Title>
      <Text c="dimmed">The page you requested does not exist or has moved.</Text>
      <Link to="/">Return to posts</Link>
    </Stack>
  );
}
