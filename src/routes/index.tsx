import { PostsPage } from "@/components/PostsPage/PostsPage";
import { siteConfig } from "@/config";
import { getPostsServerFn, getTagsServerFn } from "@/services/api/serverFns";
import { PostsFilterInputSchema } from "@/services/tools/schemas";
import { createFileRoute } from "@tanstack/react-router";

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
