import { expect, test } from "@playwright/test";

test("should be able to register", async ({ page }) => {
  await page.goto("/register");
  const heading = page.getByRole("heading");
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(/Register your account/);
});
