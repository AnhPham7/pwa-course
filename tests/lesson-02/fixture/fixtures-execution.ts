import { test as base } from "@playwright/test";

type MyFixtures = {
  loggedInPage: void;
  autoLogApi: void;
};

type WorkerFixtures = {
  userCredentials: void;
  autoMockServer: void;
};

export const test = base.extend<MyFixtures, WorkerFixtures>({
  autoMockServer: [
    async ({}, use) => {
      console.log("start mock server");
      await use();
      console.log("stop mock server");
    },
    { scope: "worker", auto: true },
  ],
  userCredentials: [
    async ({}, use) => {
      console.log("create user credentials");
      await use();
      console.log("delete user credentials");
    },
    { scope: "worker" },
  ],
  loggedInPage: [
    async ({ page, userCredentials }, use) => {
      console.log("login as admin");
      await use();
      console.log("logout");
    },
    { scope: "test" },
  ],
  autoLogApi: [
    async ({}, use) => {
      console.log("start loggin api");
      await use();
      console.log("stop logging api");
    },
    { scope: "test", auto: true },
  ],
});

export { expect } from "@playwright/test";
