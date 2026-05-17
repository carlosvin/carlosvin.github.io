import { expect, test } from "@playwright/test";

test("home and post pages load", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  const firstPostLink = page.locator('a[href^="/posts/"]').first();
  await expect(firstPostLink).toBeVisible();

  await firstPostLink.click();
  await expect(page).toHaveURL(/\/posts\//);
  await expect(page.getByText("Back to posts")).toBeVisible();
});

test("prerendered routes load with content", async ({ page }) => {
  // Home page should have prerendered content
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  // About page should be prerendered
  await page.goto("/about");
  await expect(page.locator("h1, h2").first()).toBeVisible();

  // A specific post should be prerendered
  await page.goto("/posts/cpp-mutex");
  await expect(page.locator("h1").first()).toBeVisible();
});

test("tag filter pages load", async ({ page }) => {
  // Common tag combinations should be prerendered
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  // Navigate using a tag filter
  const tagLink = page.locator('[href*="tag="]').first();
  if ((await tagLink.count()) > 0) {
    await tagLink.click();
    await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  }
});
