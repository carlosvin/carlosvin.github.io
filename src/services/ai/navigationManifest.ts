export type NavigationRoute = {
  path: string;
  title: string;
  description: string;
  searchParams?: string[];
};

export const navigationManifest: NavigationRoute[] = [
  {
    path: "/",
    title: "Posts List",
    description: "List and filter posts by search query and tag.",
    searchParams: ["search", "tag"],
  },
  {
    path: "/about",
    title: "About",
    description: "Read the about page for site and author background.",
  },
  {
    path: "/posts/$slug",
    title: "Post Detail",
    description: "Read a single post by slug.",
  },
];
