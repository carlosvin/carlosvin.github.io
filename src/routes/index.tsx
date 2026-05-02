"use client";

import { PostCard } from "@/components/PostCard";
import { siteConfig } from "@/config";
import { getPostsServerFn, getTagsServerFn } from "@/services/api/serverFns";
import { PostsFilterInputSchema } from "@/services/tools/schemas";
import type { PostSummary } from "@/types";
import { Button, Group, MultiSelect, Stack, Text, TextInput, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/")({
  validateSearch: (search) => PostsFilterInputSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: filter }) => {
    const [posts, tags] = await Promise.all([
      getPostsServerFn({ data: filter }),
      getTagsServerFn(),
    ]);
    return { posts, tags };
  },
  head: () => ({
    meta: [{ title: `Posts | ${siteConfig.title}` }],
  }),
  component: PostsPage,
});

function PostsPage() {
  const { posts, tags } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const setSearch = useCallback(
    (updates: { tag?: string[]; search?: string }) => {
      navigate({
        search: (prev) => {
          const next = { ...prev };

          if ("tag" in updates) {
            next.tag = updates.tag && updates.tag.length > 0 ? updates.tag : undefined;
          }

          if ("search" in updates) {
            next.search = updates.search || undefined;
          }

          return next;
        },
        replace: true,
      });
    },
    [navigate],
  );

  return (
    <Stack gap="lg">
      <Title order={1}>Posts</Title>

      <Group align="end" wrap="wrap">
        <TextInput
          type="search"
          placeholder="Search posts..."
          value={search.search ?? ""}
          onChange={(e) => setSearch({ search: e.currentTarget.value })}
          aria-label="Search posts"
          style={{ flex: 1, minWidth: 240 }}
        />
        <MultiSelect
          placeholder="All tags"
          value={search.tag ?? []}
          onChange={(value) => setSearch({ tag: value })}
          data={tags.map((tag: string) => ({ value: tag, label: tag }))}
          searchable
          clearable
          aria-label="Filter by tag"
          style={{ minWidth: 220 }}
        />
        {((search.tag?.length ?? 0) > 0 || search.search) && (
          <Button
            variant="light"
            onClick={() => setSearch({ tag: undefined, search: undefined })}
            type="button"
          >
            Clear filters
          </Button>
        )}
      </Group>

      {posts.length === 0 ? (
        <Text c="dimmed">No posts found. Try adjusting your filters.</Text>
      ) : (
        <Stack component="ul" gap="md" style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post: PostSummary) => (
            <PostCard
              key={post.slug}
              post={post}
              onTagClick={(tag) =>
                setSearch({
                  tag: search.tag?.includes(tag) ? search.tag : [...(search.tag ?? []), tag],
                })
              }
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
