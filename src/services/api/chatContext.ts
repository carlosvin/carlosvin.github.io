import type { ChatRequest } from "@/services/ai/schemas";

/**
 * Builds user and browser context payload to send with chat requests.
 */
export function buildChatClientContext(): Pick<ChatRequest, "browserContext" | "userContext"> {
  if (typeof window === "undefined") {
    return {};
  }

  const darkModeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  const lightModeQuery = window.matchMedia?.("(prefers-color-scheme: light)");
  const colorSchemePreference = darkModeQuery?.matches
    ? "dark"
    : lightModeQuery?.matches
      ? "light"
      : "no-preference";

  return {
    browserContext: {
      currentPathname: window.location.pathname,
      currentSearch: window.location.search,
      currentHref: window.location.href,
      referrer: document.referrer || undefined,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
    userContext: {
      locale: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      currentDateTime: new Date().toISOString(),
      colorSchemePreference,
    },
  };
}
