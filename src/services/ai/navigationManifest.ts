export type NavigationRoute = {
  path: string;
  title: string;
  description: string;
};

export const navigationManifest: NavigationRoute[] = [
  {
    path: "/",
    title: "Posts List",
    description: "List and filter posts by search query and tag.",
  },
  {
    path: "/posts/{slug}",
    title: "Post Detail",
    description: "Read a single post by slug.",
  },
];
