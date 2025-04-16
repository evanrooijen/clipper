import { expect, test } from "@playwright/test";

test("should be able to login", async ({ page }) => {
  await page.goto("/login");
  const heading = page.getByRole("heading");
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(/Login to your account/);
});
