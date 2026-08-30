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
});
