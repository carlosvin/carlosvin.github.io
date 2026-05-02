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
