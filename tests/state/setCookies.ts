import { test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import { HomeScreen } from "@screens";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileWithCookies = path.join(__dirname, "../../.auth/cookies.json");

test("set cookies", async ({ page }) => {
  const homePage = new HomeScreen(page);
  await homePage.goToBaseUrl();
  await homePage.cookies.acceptCookies();
  await page.context().storageState({ path: fileWithCookies });
});
