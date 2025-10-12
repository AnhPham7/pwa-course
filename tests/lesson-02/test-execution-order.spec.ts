import { test, expect } from "./fixture/fixtures-execution";

test.describe("", () => {
  test.beforeAll(async () => {
    console.log("before all");
  });
  test.beforeEach(async () => {
    console.log("before each");
  });
  test.afterEach(async () => {
    console.log("after each");
  });
  test.afterAll(async () => {
    console.log("after all");
  });

  test("first test", async ({ page }) => {
    console.log("first test");
  });

  test("second test", async ({ loggedInPage }) => {
    console.log("second test");
  });
});
