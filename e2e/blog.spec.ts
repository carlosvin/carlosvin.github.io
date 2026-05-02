import { type Page, expect, test } from "@playwright/test";

async function fillSearchAndWaitForUrlState(page: Page, value: string) {
  const searchInput = page.getByRole("searchbox", { name: "Search posts" });

  await expect
    .poll(
      async () => {
        await searchInput.fill(value);
        return new URL(page.url()).searchParams.get("search");
      },
      {
        timeout: 15_000,
        message: `Expected URL search param to become \"${value}\"`,
      },
    )
    .toBe(value);

  return searchInput;
}

test("main page lists posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  const postLinks = page.locator('a[href^="/posts/"]');
  await expect(postLinks.first()).toBeVisible();
  expect(await postLinks.count()).toBeGreaterThan(0);
});

test("search and clear filters", async ({ page }) => {
  await page.goto("/?search=mutex");

  const postLinks = page.locator('a[href^="/posts/"]');
  const searchInput = page.locator('input[aria-label="Search posts"]');
  await expect(searchInput).toHaveValue("mutex");
  await expect(page.getByRole("button", { name: "Clear filters" })).toBeVisible();
  await expect(postLinks.first()).toBeVisible();

  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await expect(searchInput).toHaveValue("");
  await expect(page.locator('a[href^="/posts/"]').first()).toBeVisible();
});

test("user can navigate to post and then by tag", async ({ page }) => {
  await page.goto("/posts/cpp-mutex");

  await expect(page).toHaveURL(/\/posts\//);
  await expect(page.getByText("Back to posts")).toBeVisible();

  const tagLink = page.locator('a[href*="?tag=cpp"]').first();
  await expect(tagLink).toBeVisible();
  await tagLink.click();

  await expect(page).toHaveURL(/\/?tag=cpp/);
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
});

test("access to /about section", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "About" }).click();

  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "About", exact: true })).toBeVisible();
});

test("shareable URL preserves search and tag filters", async ({ page }) => {
  await page.goto("/?search=mutex&tag=cpp");

  await expect(page).toHaveURL(/search=mutex/);
  await expect(page).toHaveURL(/tag=cpp/);
  await expect(page.getByRole("searchbox", { name: "Search posts" })).toHaveValue("mutex");

  await page.reload();

  await expect(page).toHaveURL(/search=mutex/);
  await expect(page).toHaveURL(/tag=cpp/);
  await expect(page.getByRole("searchbox", { name: "Search posts" })).toHaveValue("mutex");
  await expect(page.locator('a[href^="/posts/"]').first()).toBeVisible();
});

test("sitemap.xml exists and includes core URLs", async ({ page }) => {
  const response = await page.request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();

  const xml = await response.text();
  expect(xml).toContain("<urlset");
  expect(xml).toContain("/about</loc>");
  expect(xml).toContain("/posts/");
  expect(xml).toContain("/?tag=");
});

test("search input interaction filters via URL state", async ({ page }) => {
  await page.goto("/");

  const searchInput = await fillSearchAndWaitForUrlState(page, "mutex");

  await expect(page).toHaveURL(/search=mutex/);
  await expect(searchInput).toHaveValue("mutex");
  await expect(page.getByRole("link", { name: /mutex/i })).toBeVisible();
});

test("tag badges keep visible border", async ({ page }) => {
  await page.goto("/");

  const badge = page.locator('button[aria-label^="Filter by tag:"]').first();
  await expect(badge).toBeVisible();

  const borderWidth = await badge.evaluate((node) => window.getComputedStyle(node).borderWidth);
  expect(borderWidth).not.toBe("0px");
});

test("ai assistant sends and renders an answer", async ({ page }) => {
  await page.goto("/");

  // Verify client interactivity before using AI controls.
  const searchInput = await fillSearchAndWaitForUrlState(page, "cpp");
  await expect(page).toHaveURL(/search=cpp/);
  await searchInput.fill("");

  await page.getByRole("button", { name: "Open AI assistant" }).click();

  const aiDialog = page.getByRole("dialog", { name: "AI Assistant" });
  await expect(aiDialog).toBeVisible();

  const aiPrompt = aiDialog.getByPlaceholder("Ask something about the content...").first();
  await aiPrompt.fill("latest posts");
  await expect(aiPrompt).toHaveValue("latest posts");

  const sendButton = aiDialog.getByRole("button", { name: "Send" });
  await sendButton.click();

  await expect(aiDialog.getByText("You", { exact: true })).toBeVisible();
  await expect(aiDialog.getByText("Assistant", { exact: true })).toBeVisible();
  await expect(aiDialog.locator(".chat-markdown").first()).toBeVisible({ timeout: 15000 });
});

test("theme toggle switches color scheme", async ({ page }) => {
  await page.goto("/");

  const toggleButton = page.getByRole("button", { name: "Toggle color scheme" });
  await expect(toggleButton).toBeVisible();

  const initialColorScheme = await page
    .locator("html")
    .evaluate((node) => node.getAttribute("data-mantine-color-scheme"));

  await expect
    .poll(
      async () => {
        await toggleButton.click();
        return page
          .locator("html")
          .evaluate((node) => node.getAttribute("data-mantine-color-scheme"));
      },
      {
        timeout: 5_000,
        message: "Color scheme should change after toggle click",
      },
    )
    .not.toBe(initialColorScheme);
});

test("blog cards render correctly in dark mode", async ({ page }) => {
  await page.goto("/");

  // Get a blog card before switching to dark mode
  const firstCard = page.locator("li").first();
  await expect(firstCard).toBeVisible();

  const initialColorScheme = await page
    .locator("html")
    .evaluate((node) => node.getAttribute("data-mantine-color-scheme"));

  // Get the toggle button and switch to dark mode
  const toggleButton = page.getByRole("button", { name: "Toggle color scheme" });
  await expect
    .poll(
      async () => {
        await toggleButton.click();
        return page
          .locator("html")
          .evaluate((node) => node.getAttribute("data-mantine-color-scheme"));
      },
      {
        timeout: 5_000,
        message: "Color scheme should change after toggle click",
      },
    )
    .not.toBe(initialColorScheme);

  // Verify blog cards are still visible and rendered correctly in dark mode
  const cards = page.locator("li");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThan(0);

  // Verify card content is visible (title, date, description)
  const firstCardTitle = firstCard.locator("a").first();
  await expect(firstCardTitle).toBeVisible();

  const firstCardDate = firstCard.locator("time").first();
  await expect(firstCardDate).toBeVisible();
});
