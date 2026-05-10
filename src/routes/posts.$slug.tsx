import { siteConfig } from "@/config";
import { getPostServerFn } from "@/services/api/serverFns";
import { formatPostDate } from "@/utils/date";
import { Anchor, Badge, Box, Card, Group, Stack, Text, Title, Typography } from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params: { slug } }) => {
    return getPostServerFn({ data: { slug } });
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
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const headings = extractTocHeadings(post.htmlContent);

  const formattedDate = formatPostDate(post.date);
  const formattedUpdated = formatPostDate(post.updated);

  return (
    <Group align="flex-start" wrap="nowrap" gap="lg">
      <Stack component="article" gap="md" maw={860} style={{ flex: 1 }}>
        <Anchor component={Link} to="/" size="sm">
          Back to posts
        </Anchor>

        <Title order={1}>{post.title}</Title>

        <Text c="dimmed" size="sm">
          {formattedDate && <time dateTime={post.date}>Published {formattedDate}</time>}
          {formattedUpdated && formattedUpdated !== formattedDate && (
            <span> · Updated {formattedUpdated}</span>
          )}
          {post.lang && post.lang !== "en" && <span> · {post.lang.toUpperCase()}</span>}
        </Text>

        {post.description && (
          <Text c="dimmed" fs="italic">
            {post.description}
          </Text>
        )}

        {post.tags.length > 0 && (
          <Group component="ul" gap="xs" style={{ listStyle: "none", padding: 0 }}>
            {post.tags.map((tag: string) => (
              <li key={tag}>
                <Link
                  to="/"
                  search={(prev) => ({
                    ...prev,
                    tag: prev.tag?.includes(tag) ? prev.tag : [...(prev.tag ?? []), tag],
                  })}
                >
                  <Badge variant="light">{tag}</Badge>
                </Link>
              </li>
            ))}
          </Group>
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
              className="post-content"
              // Content is transformed from markdown and highlighted at render time.
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </Typography>
        </Box>
      </Stack>

      <Box
        w={260}
        visibleFrom="md"
        style={{ alignSelf: "flex-start", position: "sticky", top: 88 }}
      >
        {headings.length > 0 && (
          <Card withBorder radius="md" p="md">
            <Text fw={600} mb="sm">
              On this page
            </Text>
            <Stack gap="xs">
              {headings.map((heading) => (
                <Anchor
                  key={heading.id}
                  href={`#${heading.id}`}
                  size="sm"
                  underline="never"
                  style={{ marginLeft: heading.level === 3 ? 12 : 0 }}
                >
                  {heading.text}
                </Anchor>
              ))}
            </Stack>
          </Card>
        )}
      </Box>
    </Group>
  );
}

type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function extractTocHeadings(html: string): TocHeading[] {
  const headingRegex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/gims;
  const headings: TocHeading[] = [];

  let match = headingRegex.exec(html);
  while (match) {
    const level = Number.parseInt(match[1] ?? "2", 10) as 2 | 3;
    const id = match[2] ?? "";
    const text = stripTags(match[3] ?? "").trim();

    if (id && text) {
      headings.push({ id, text, level });
    }

    match = headingRegex.exec(html);
  }

  return headings;
}

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}
