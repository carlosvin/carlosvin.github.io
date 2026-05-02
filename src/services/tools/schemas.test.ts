import { describe, expect, it } from "vitest";

import { PostDetailSchema, PostSummarySchema, PostsFilterInputSchema } from "./schemas";

describe("tools schemas", () => {
  it("parses a valid post summary", () => {
    const parsed = PostSummarySchema.parse({
      slug: "example-post",
      title: "Example",
      tags: ["tanstack"],
      date: "2026-04-11T00:00:00.000Z",
      previewImage: "https://example.com/preview.png",
    });

    expect(parsed.slug).toBe("example-post");
    expect(parsed.tags).toEqual(["tanstack"]);
    expect(parsed.previewImage).toBe("https://example.com/preview.png");
  });

  it("parses a valid post detail", () => {
    const parsed = PostDetailSchema.parse({
      slug: "example-post",
      title: "Example",
      tags: ["tanstack"],
      htmlContent: '<h2 id="intro">Intro</h2>',
      toc: true,
    });

    expect(parsed.toc).toBe(true);
    expect(parsed.htmlContent).toContain("<h2");
  });

  it("normalizes single tag search params to array", () => {
    const parsed = PostsFilterInputSchema.parse({ tag: "react", search: "router" });

    expect(parsed.tag).toEqual(["react"]);
    expect(parsed.search).toBe("router");
  });

  it("supports multi-tag URL-state filters", () => {
    const parsed = PostsFilterInputSchema.parse({ tag: ["react", "tanstack"] });

    expect(parsed.tag).toEqual(["react", "tanstack"]);
  });
});
