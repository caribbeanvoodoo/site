import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  workers: 2,
  timeout: 120_000,
  use: {
    baseURL: "http://127.0.0.1:4321",
    launchOptions: process.env.CV_CHROME_PATH
      ? { executablePath: process.env.CV_CHROME_PATH }
      : {},
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
