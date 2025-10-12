import { test } from "./fixture/account.fixture";

test("worker scoped fixture 0", async ({ account }) => {
  console.log(account);
});
test("worker scoped fixture 1", async ({ account }) => {
  console.log(account);
});
test("worker scoped fixture 2", async ({ account }) => {
  console.log(account);
});
