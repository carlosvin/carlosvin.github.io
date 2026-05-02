import { describe, expect, it } from "vitest";

import { parseRouterSearch, stringifyRouterSearch } from "./routerSearch";

describe("routerSearch", () => {
  it("serializes repeated tag filters as repeated query params", () => {
    expect(
      stringifyRouterSearch({
        search: "mutex",
        tag: ["cpp", "concurrency"],
      }),
    ).toBe("?search=mutex&tag=cpp&tag=concurrency");
  });

  it("parses repeated query params back into arrays", () => {
    expect(parseRouterSearch("?search=mutex&tag=cpp&tag=concurrency")).toEqual({
      search: "mutex",
      tag: ["cpp", "concurrency"],
    });
  });
});
