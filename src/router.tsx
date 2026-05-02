import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { parseRouterSearch, stringifyRouterSearch } from "./utils/routerSearch";

/**
 * Creates and returns the application router instance.
 * TanStack Start expects this symbol in the router entry module.
 */
export function getRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultStaleTime: 1000 * 60 * 5, // 5 minutes
    parseSearch: parseRouterSearch,
    scrollRestoration: true,
    stringifySearch: stringifyRouterSearch,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
