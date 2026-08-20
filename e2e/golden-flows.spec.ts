import { test, expect, type Page } from "@playwright/test";

async function openNavMenu(page: Page) {
  const menu = page.locator("header details.dropdown").first();
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  return menu;
}

test.describe("golden flows", () => {
  test("home lists posts and opening one shows the article", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "List of blog posts" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "My software engineering journey" }),
    ).toBeVisible();

    const postLinks = page.locator(".blog article header a");
    await expect(postLinks.first()).toBeVisible();
    const postCount = await postLinks.count();
    expect(postCount).toBeGreaterThan(0);
    await expect(postLinks).not.toHaveText(["About"]);

    const title = (await postLinks.first().innerText()).trim();
    await postLinks.first().click();

    await expect(page).toHaveURL(/\/.+/);
    await expect(page.locator("article.post")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator(".post-content")).not.toBeEmpty();
    await expect(page.locator("article.post time").first()).toBeVisible();
  });

  test("search finds a post and opens it", async ({ page }) => {
    await page.goto("/");

    const search = page.getByRole("searchbox", { name: "Search" });
    await search.click();
    await search.pressSequentially("python", { delay: 30 });

    const results = page.locator(".search-results__items a");
    await expect(results.first()).toBeVisible({ timeout: 15_000 });
    const resultTitle = (await results.first().innerText()).trim();
    expect(resultTitle.length).toBeGreaterThan(0);

    await results.first().click();
    await expect(page.locator("article.post")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      resultTitle,
    );
  });

  test("menu opens the About page", async ({ page }) => {
    await page.goto("/");
    const menu = await openNavMenu(page);

    await menu.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "About this blog" }),
    ).toBeVisible();
  });

  test("browse tags, filter, then open a tagged post", async ({ page }) => {
    await page.goto("/");
    const menu = await openNavMenu(page);

    await menu.getByRole("link", { name: "Tags", exact: true }).click();
    await expect(page).toHaveURL(/\/tags\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "All Tags" }),
    ).toBeVisible();

    const tagLink = page.locator(".tags a").first();
    await expect(tagLink).toBeVisible();
    await tagLink.click();

    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Posts tagged with/ }),
    ).toBeVisible();

    const taggedPosts = page.locator(".blog article header a");
    await expect(taggedPosts.first()).toBeVisible();
    const title = (await taggedPosts.first().innerText()).trim();
    await taggedPosts.first().click();

    await expect(page.locator("article.post")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  });

  test("a tag on the home listing opens that tag's posts", async ({
    page,
  }) => {
    await page.goto("/");

    const tagOnCard = page.locator(".blog article .tags a").first();
    await expect(tagOnCard).toBeVisible();
    const tagLabel = (await tagOnCard.innerText()).trim();
    await tagOnCard.click();

    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Posts tagged with/ }),
    ).toContainText(tagLabel);
    await expect(page.locator(".blog article").first()).toBeVisible();
  });
});
