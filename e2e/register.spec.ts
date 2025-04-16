import { expect, test } from "@playwright/test";

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("should be able to register", async ({ page }) => {
    const heading = page.getByRole("heading");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Register your account/);
  });
});
