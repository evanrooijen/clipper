import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should be able to login", async ({ page }) => {
    const heading = page.getByRole("heading");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Login to your account/);
  });
});
