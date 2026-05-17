import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import generatePrerenderRoutes from "./scripts/prerender-routes.mjs";

function resolvePort(): number {
  const configuredPort = Number.parseInt(process.env.PORT ?? "3000", 10);

  return Number.isFinite(configuredPort) ? configuredPort : 3000;
}

const devHost = process.env.HOST ?? "127.0.0.1";
const devPort = resolvePort();

export default defineConfig(async () => {
  const rerenderRoutes = await generatePrerenderRoutes();

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      tanstackStart({
        prerender: {
          enabled: true,
          routes: rerenderRoutes,
          crawlLinks: true,
          autoSubfolderIndex: true,
          autoStaticPathsDiscovery: true,
          concurrency: 14,
          retryCount: 2,
          maxRedirects: 5,
          failOnError: false,
        },
        srcDirectory: "src",
        client: {
          entry: "./client.tsx",
        },
        server: {
          entry: "./ssr.tsx",
        },
        router: {
          routesDirectory: "./routes",
          generatedRouteTree: "./routeTree.gen.ts",
        },
      }),
      netlify(),
      viteReact(),
    ],
    server: {
      host: devHost,
      port: devPort,
      strictPort: true,
    },
  };
});
