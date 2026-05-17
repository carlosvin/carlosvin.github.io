"use client";

import { PostCard } from "@/components/PostCard";
import type { PostSummary } from "@/types";
import { Button, Group, MultiSelect, Stack, Text, TextInput, Title } from "@mantine/core";
import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";

type SearchUpdates = {
  tag?: string[];
  search?: string;
};

/**
 * Renders the posts index filters and results using route-managed search state.
 * Keeps filtering shareable via the URL while delegating data loading to the route loader.
 */
export function PostsPage() {
  const { posts, tags } = useLoaderData({ from: "/" });
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  function setSearch(updates: SearchUpdates) {
    navigate({
      search: (previous) => {
        const next = { ...previous };

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
  }

  return (
    <Stack gap="lg">
      <Title order={1}>Posts</Title>

      <Group align="end" wrap="wrap">
        <TextInput
          type="search"
          placeholder="Search posts..."
          value={search.search ?? ""}
          onChange={(event) => setSearch({ search: event.currentTarget.value })}
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
