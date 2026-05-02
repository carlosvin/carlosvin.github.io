"use client";

import type { PostSummary } from "@/types";
import { formatPostDate } from "@/utils/date";
import { Badge, Card, Divider, Group, Image, Stack, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

type PostCardProps = {
  post: PostSummary;
  onTagClick: (tag: string) => void;
};

export function PostCard({ post, onTagClick }: PostCardProps) {
  const formattedDate = formatPostDate(post.date);

  return (
    <li>
      <Card withBorder radius="lg" p="lg" shadow="sm">
        {post.previewImage && (
          <Card.Section>
            <Image
              src={post.previewImage}
              alt={`${post.title} preview image`}
              h={190}
              w="100%"
              fit="cover"
              style={{ aspectRatio: "16 / 9" }}
            />
          </Card.Section>
        )}

        <Group
          justify="space-between"
          align="flex-start"
          wrap="wrap"
          mt={post.previewImage ? "md" : 0}
        >
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {post.title}
          </Link>
          {post.lang && post.lang !== "en" && (
            <Badge variant="filled" color="blue" radius="sm">
              {post.lang.toUpperCase()}
            </Badge>
          )}
        </Group>

        <Stack mt="md" gap="sm">
          {formattedDate && (
            <Text c="dimmed" size="sm">
              <time dateTime={post.date}>{formattedDate}</time>
            </Text>
          )}
          {post.description && <Text c="dimmed">{post.description}</Text>}
          <Divider />
          {post.tags.length > 0 && (
            <Group component="ul" gap="xs" style={{ listStyle: "none", padding: 0 }}>
              {post.tags.slice(0, 6).map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    component="button"
                    onClick={() => onTagClick(tag)}
                    aria-label={`Filter by tag: ${tag}`}
                    style={{ cursor: "pointer" }}
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </Group>
          )}
        </Stack>
      </Card>
    </li>
  );
}
