import { describe, expect, it } from "vitest";

import { resolvePreviewImage } from "./mapper";

describe("resolvePreviewImage", () => {
  it("keeps absolute URLs unchanged", () => {
    const resolved = resolvePreviewImage("https://example.com/image.png", "some-slug");

    expect(resolved).toBe("https://example.com/image.png");
  });

  it("keeps root-relative paths unchanged", () => {
    const resolved = resolvePreviewImage("/img/preview.png", "some-slug");

    expect(resolved).toBe("/img/preview.png");
  });

  it("rewrites relative paths under the post content directory", () => {
    const resolved = resolvePreviewImage("./preview.png", "my-post");

    expect(resolved).toBe("/content/my-post/preview.png");
  });

  it("supports parent-directory relative paths", () => {
    const resolved = resolvePreviewImage("../shared/preview.png", "my-post");

    expect(resolved).toBe("/content/shared/preview.png");
  });
});
