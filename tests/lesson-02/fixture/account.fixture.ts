import { Page, test as base } from "@playwright/test";

export const test = base.extend<{}, { account: string }>({
  account: [
    async ({ browser }, use, workerInfo) => {
      const account = `customer-${workerInfo.workerIndex}`;
      await use(account);
    },
    { scope: "worker" },
  ],
});
export { expect } from "@playwright/test";
