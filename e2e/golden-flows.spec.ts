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

    // Cards show the publication date and reading time in their meta line.
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

    const title = await firstPostTitle(postLinks);
    await postLinks.first().click();

    await expect(page).toHaveURL(/\/.+/);
    await expect(page.locator("main > article")).toBeVisible();
    await expect(postHeading(page)).toHaveText(title);
    await expect(page.locator("main > article > section")).not.toBeEmpty();
    // The post page shows the publication date in its meta line.
    const postMeta = page.locator("main > article .post-meta");
    await expect(postMeta).toBeVisible();
    await expect(postMeta.locator("time").first()).toHaveAttribute(
      "datetime",
      /^\d{4}-\d{2}-\d{2}$/,
    );
    await expect(postMeta).toContainText(/min read/);
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
});
