import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "tests/**/*.ts",
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "https://cs2.easyrpa.eu/",
  },
  env: {
    username: "testautomation",
    password: "Password1234",
  },
  watchForFileChanges: true,
});