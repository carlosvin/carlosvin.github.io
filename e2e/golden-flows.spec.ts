import { test, expect, type Page, type Locator } from "@playwright/test";

function headerNav(page: Page) {
  return page.locator("header nav");
}

function postHeading(page: Page) {
  return page.locator("main > article h1");
}

async function firstPostTitle(links: Locator) {
  const title = (await links.first().innerText()).trim();
  expect(title.length).toBeGreaterThan(0);
  return title;
}

test.describe("golden flows", () => {
  test("home lists posts and opening one shows the article", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Posts" }),
    ).toBeVisible();
    await expect(
      headerNav(page).getByRole("link", {
        name: "My software engineering journey",
      }),
    ).toBeVisible();

    const postLinks = page.locator(
      "section[aria-label='Posts'] article header a",
    );
    await expect(postLinks.first()).toBeVisible();
    expect(await postLinks.count()).toBeGreaterThan(0);
    await expect(
      page.locator("section[aria-label='Posts'] article header a", {
        hasText: /^About$/,
      }),
    ).toHaveCount(0);

    // Cards show the publication date and reading time in their meta line, but not word count.
    const cardMeta = page
      .locator("section[aria-label='Posts'] article .post-meta")
      .first();
    await expect(cardMeta).toBeVisible();
    await expect(cardMeta.locator("time").first()).toHaveAttribute(
      "datetime",
      /^\d{4}-\d{2}-\d{2}$/,
    );
    await expect(cardMeta).toContainText(/\b\d{4}\b/);
    await expect(cardMeta).toContainText(/min read/);
    await expect(cardMeta).not.toContainText(/words/);

    const title = await firstPostTitle(postLinks);
    await postLinks.first().click();

    await expect(page).toHaveURL(/\/.+/);
    await expect(page.locator("main > article")).toBeVisible();
    await expect(postHeading(page)).toHaveText(title);
    await expect(page.locator("main > article > section")).not.toBeEmpty();
    // The post page shows the publication date, reading time, and word count.
    const postMeta = page.locator("main > article .post-meta");
    await expect(postMeta).toBeVisible();
    await expect(postMeta.locator("time").first()).toHaveAttribute(
      "datetime",
      /^\d{4}-\d{2}-\d{2}$/,
    );
    await expect(postMeta).toContainText(/min read/);
    await expect(postMeta).toContainText(/\b\d+\s+words\b/);
  });

  test("search finds a post and opens it", async ({ page }) => {
    await page.goto("/");

    const search = page.getByRole("searchbox", { name: "Search posts" });
    await search.click();
    await search.pressSequentially("python", { delay: 30 });

    const firstResult = page
      .locator("#search-results [role='listbox'] a")
      .first();
    await expect(firstResult).toBeVisible({ timeout: 15_000 });
    const resultTitle = (await firstResult.locator("strong").innerText()).trim();
    expect(resultTitle.length).toBeGreaterThan(0);

    await firstResult.click();
    await expect(page.locator("main > article")).toBeVisible();
    await expect(postHeading(page)).toHaveText(resultTitle);
  });

  test("nav opens the About page", async ({ page }) => {
    await page.goto("/");

    await headerNav(page).getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "About" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "About this blog" }),
    ).toBeVisible();
  });

  test("browse tags, filter, then open a tagged post", async ({ page }) => {
    await page.goto("/");

    await headerNav(page).getByRole("link", { name: "Tags", exact: true }).click();
    await expect(page).toHaveURL(/\/tags\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "All Tags" }),
    ).toBeVisible();

    const tagLink = page.locator("nav[aria-label='Tags'] a").first();
    await expect(tagLink).toBeVisible();
    await tagLink.click();

    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Posts tagged with/ }),
    ).toBeVisible();

    const taggedPosts = page.locator(
      "section[aria-label='Posts'] article header a",
    );
    await expect(taggedPosts.first()).toBeVisible();
    const title = await firstPostTitle(taggedPosts);
    await taggedPosts.first().click();

    await expect(page.locator("main > article")).toBeVisible();
    await expect(postHeading(page)).toHaveText(title);
  });

  test("a tag on the home listing opens that tag's posts", async ({
    page,
  }) => {
    await page.goto("/");

    const tagOnCard = page
      .locator("section[aria-label='Posts'] article nav[aria-label='Tags'] a")
      .first();
    await expect(tagOnCard).toBeVisible();
    const tagLabel = (await tagOnCard.innerText()).trim();
    await tagOnCard.click();

    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Posts tagged with/ }),
    ).toContainText(tagLabel);
    await expect(
      page.locator("section[aria-label='Posts'] article").first(),
    ).toBeVisible();
  });

  test("post table of contents sits beside the article, not over it", async ({
    page,
  }) => {
    await page.goto("/pytest-scenarios-isolated-integration-tests/");

    const toc = page.getByRole("navigation", { name: "Contents" });
    const body = page.locator("main > article > section");
    await expect(toc).toBeVisible();
    await expect(body).toBeVisible();
    await expect(body).toContainText("The Problem");

    const tocBox = await toc.boundingBox();
    const bodyBox = await body.boundingBox();
    expect(tocBox).toBeTruthy();
    expect(bodyBox).toBeTruthy();
    // Desktop: outline is a left column; it must not cover the post text.
    expect(tocBox!.x + tocBox!.width).toBeLessThanOrEqual(bodyBox!.x + 2);
    expect(tocBox!.y).toBeLessThan(bodyBox!.y + bodyBox!.height);
  });

  test("code blocks have working copy button with feedback", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/tanstack-router-opinionated-conventions-production-react-apps/");

    const firstPre = page.locator("main > article pre").first();
    await expect(firstPre).toBeVisible();

    const copyBtn = firstPre.locator(".copy-code-btn");
    await expect(copyBtn).toBeAttached();
    await expect(copyBtn).toHaveText("Copy");

    await firstPre.hover();
    await page.screenshot({ path: "/opt/cursor/artifacts/article_word_count_and_copy_button.png" });

    await copyBtn.click();
    await expect(copyBtn).toHaveText("Copied!");
    await expect(copyBtn).toHaveClass(/is-copied/);
    await page.screenshot({ path: "/opt/cursor/artifacts/code_block_copied_feedback.png" });

    // Toggle dark mode and screenshot dark theme code block
    await page.locator("input[data-toggle-theme]").click();
    await firstPre.hover();
    await page.screenshot({ path: "/opt/cursor/artifacts/dark_mode_code_block.png" });
  });

  test("about page internal post link resolves properly without 404", async ({
    page,
  }) => {
    await page.goto("/about/");

    const postLink = page.getByRole("link", {
      name: "Choosing a Modern C++ stack",
    });
    await expect(postLink).toBeVisible();
    await postLink.click();

    await expect(page).toHaveURL(/\/choosing-modern-cpp-stack\/?$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Choosing a Modern C++ stack",
      }),
    ).toBeVisible();
  });

  test("tag pages list each post only once", async ({ page }) => {
    // Two front-matter tags that slugify to the same term (e.g. "build-systems"
    // and "build systems") used to render the same post twice on its tag page.
    for (const tag of ["build-systems", "web-services", "cpp"]) {
      await page.goto(`/tags/${tag}/`);

      const hrefs = await page
        .locator("section[aria-label='Posts'] article header a")
        .evaluateAll((links) =>
          links.map((a) => (a as HTMLAnchorElement).getAttribute("href")),
        );

      expect(hrefs.length).toBeGreaterThan(0);
      expect(hrefs).toEqual([...new Set(hrefs)]);
    }
  });

  test("the tag index has no duplicate or empty-slug tag entries", async ({
    page,
  }) => {
    await page.goto("/tags/");

    const tagLinks = page.locator("nav[aria-label='Tags'] a");
    const labels = (
      await tagLinks.evaluateAll((links) =>
        links.map((a) => (a.textContent ?? "").trim()),
      )
    ).map((label) => label.replace(/\s*\(\d+\)$/, "").trim());

    expect(labels.length).toBeGreaterThan(0);
    expect(labels).toEqual([...new Set(labels)]);

    // "c++" slugified to the single-letter URL /tags/c/, and its variants to
    // /tags/c-11/ and /tags/c-17/. C++ content belongs under /tags/cpp/.
    const hrefs = await tagLinks.evaluateAll((links) =>
      links.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    for (const dead of ["/tags/c/", "/tags/c-11/", "/tags/c-17/"]) {
      expect(hrefs.some((href) => href.endsWith(dead))).toBe(false);
    }
    expect(hrefs.some((href) => href.endsWith("/tags/cpp/"))).toBe(true);
  });

  test("twitter card type matches whether the post has a preview image", async ({
    page,
  }) => {
    const cardType = async (path: string) => {
      await page.goto(path);
      return page
        .locator('meta[name="twitter:card"]')
        .getAttribute("content");
    };

    // A 192x192 favicon fallback must not be advertised as a large-image card.
    expect(await cardType("/cpp-mutex/")).toBe("summary");
    expect(await cardType("/")).toBe("summary");
    expect(await cardType("/tags/cpp/")).toBe("summary");

    // This post declares extra.preview_image, so the large card is correct.
    expect(await cardType("/cypress-parametrized-dynamic-tests/")).toBe(
      "summary_large_image",
    );
  });

  test("pages never scroll sideways on a phone-sized viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const path of ["/", "/tags/", "/about/", "/pytest-scenarios-isolated-integration-tests/"]) {
      await page.goto(path);
      const { clientWidth, scrollWidth } = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(scrollWidth, `${path} overflows horizontally`).toBeLessThanOrEqual(
        clientWidth,
      );
    }
  });

  test("tag pills meet the WCAG 2.2 minimum target size", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/tags/");

    const heights = await page
      .locator("nav[aria-label='Tags'] a")
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));

    expect(heights.length).toBeGreaterThan(0);
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(24);
  });

  test("article prose stays within a readable measure on wide screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto("/pytest-scenarios-isolated-integration-tests/");

    const ch = await page.evaluate(() => {
      const p = document.querySelector("main > article > section p")!;
      const style = getComputedStyle(p);
      const probe = document.createElement("span");
      probe.textContent = "0".repeat(100);
      probe.style.cssText = `font:${style.font};position:absolute;visibility:hidden;white-space:pre`;
      document.body.appendChild(probe);
      const chWidth = probe.getBoundingClientRect().width / 100;
      probe.remove();
      return p.getBoundingClientRect().width / chWidth;
    });

    expect(ch).toBeLessThanOrEqual(80);
  });

  test("listing cards are headings and the whole card is clickable", async ({
    page,
  }) => {
    await page.goto("/");

    const firstCard = page.locator("section[aria-label='Posts'] article").first();
    const heading = firstCard.locator("h3 a");
    await expect(heading).toBeVisible();
    const title = (await heading.innerText()).trim();

    // Click the card body, away from the title link itself.
    const box = (await firstCard.boundingBox())!;
    await page.mouse.click(box.x + box.width - 12, box.y + box.height / 2);
    await expect(postHeading(page)).toHaveText(title);
  });

  test("listing cards cap the tags they show and count the rest", async ({
    page,
  }) => {
    await page.goto("/");

    // This post carries 13 tags; the card must not render all of them.
    const card = page.locator("section[aria-label='Posts'] article", {
      has: page.getByRole("link", {
        name: "Building AI-Promptable Full-Stack Apps with TanStack Start",
      }),
    });
    await expect(card.locator("nav[aria-label='Tags'] a")).toHaveCount(4);
    await expect(card.locator(".tag-overflow")).toHaveText("+9");

    // The post itself still lists every tag.
    await page.goto("/building-ai-promptable-fullstack-apps/");
    const postTags = page.locator(
      "main > article > header nav[aria-label='Tags'] a",
    );
    expect(await postTags.count()).toBe(13);
    await expect(page.locator("main > article .tag-overflow")).toHaveCount(0);
  });

  test("the nav marks the section the reader is in", async ({ page }) => {
    await page.goto("/tags/python/");
    await expect(
      headerNav(page).getByRole("link", { name: "Tags", exact: true }),
    ).toHaveAttribute("aria-current", "page");

    await page.goto("/about/");
    await expect(
      headerNav(page).getByRole("link", { name: "About", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      headerNav(page).getByRole("link", { name: "Tags", exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
  });

  test("the contents outline follows the heading being read", async ({
    page,
  }) => {
    await page.goto("/pytest-scenarios-isolated-integration-tests/");

    const outline = page.getByRole("navigation", { name: "Contents" });
    await expect(outline).toBeVisible();

    for (const section of ["The Problem", "Installation", "Learn More"]) {
      await page.evaluate((name) => {
        const heading = [
          ...document.querySelectorAll("main > article > section :is(h1,h2,h3,h4)"),
        ].find((el) => (el.textContent ?? "").trim().startsWith(name))!;
        window.scrollTo({
          top: heading.getBoundingClientRect().top + window.scrollY - 120,
          behavior: "instant",
        });
      }, section);

      await expect(outline.getByRole("link", { name: section })).toHaveAttribute(
        "aria-current",
        "true",
      );
      await expect(outline.locator("a[aria-current]")).toHaveCount(1);
    }
  });

  test("keywords meta keeps SEO phrases that were removed from tags", async ({
    page,
  }) => {
    await page.goto("/cpp-mutex/");

    const keywords = await page
      .locator('meta[name="keywords"]')
      .getAttribute("content");
    const terms = (keywords ?? "").split(",");

    // Navigational tag is present...
    expect(terms).toContain("cpp");
    // ...and the phrase moved to extra.keywords is still advertised.
    expect(terms).toContain("c++");

    // The tag pill nav, unlike the meta, must not show the duplicate.
    const tagLabels = await page
      .locator("main > article header nav[aria-label='Tags'] a")
      .evaluateAll((links) =>
        links.map((a) => (a.textContent ?? "").trim()),
      );
    expect(tagLabels).toContain("cpp");
    expect(tagLabels).not.toContain("c++");
  });
});
