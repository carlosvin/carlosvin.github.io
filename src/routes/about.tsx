import { siteConfig } from "@/config";
import { getPageServerFn } from "@/services/api/serverFns";
import { Box, Stack, Text, Title, Typography } from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  loader: async () => {
    return getPageServerFn({ data: { slug: "about" } });
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | ${siteConfig.title}` },
          ...(loaderData.description
            ? [{ name: "description", content: loaderData.description }]
            : []),
        ]
      : [],
  }),
  component: AboutPage,
});

function AboutPage() {
  const page = Route.useLoaderData();

  return (
    <Stack component="article" gap="md" maw={860}>
      <Link to="/" style={{ fontSize: "0.9rem" }}>
        Back to posts
      </Link>

      <Title order={1}>{page.title}</Title>

      {page.description && (
        <Text c="dimmed" fs="italic">
          {page.description}
        </Text>
      )}

      <Box
        p="md"
        bg="var(--mantine-color-body)"
        style={{
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <Typography>
          <div
            // Content is transformed from markdown and highlighted at render time.
            dangerouslySetInnerHTML={{ __html: page.htmlContent }}
          />
        </Typography>
      </Box>
    </Stack>
  );
}
