import { describe, expect, it } from "vitest";

import { resolveChatHref, toInternalChatTarget } from "./chatLinks";

describe("chatLinks", () => {
  const currentHref = "https://carlosvin.github.io/posts/cpp-mutex?tag=cpp";

  it("resolves relative links against the current page", () => {
    expect(resolveChatHref("/about", currentHref)?.href).toBe("https://carlosvin.github.io/about");
  });

  it("returns internal route target for same-origin links", () => {
    expect(toInternalChatTarget("/posts/cpp-mutex#intro", currentHref)).toBe(
      "/posts/cpp-mutex#intro",
    );
  });

  it("returns internal route target for hash-only links", () => {
    expect(toInternalChatTarget("#intro", currentHref)).toBe("/posts/cpp-mutex?tag=cpp#intro");
  });

  it("returns null for external links", () => {
    expect(toInternalChatTarget("https://example.com/docs", currentHref)).toBeNull();
  });
});
