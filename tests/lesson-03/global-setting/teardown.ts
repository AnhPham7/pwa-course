import { test as teardown } from "@playwright/test";
import fs from "fs";
import path from "path";

teardown("cleanup auth file", async () => {
  const authFilePath = path.resolve(".playwright/auth.json");
  if (fs.existsSync(authFilePath)) {
    fs.unlinkSync(authFilePath);
    console.log("Auth file deleted successfully.");
  } else {
    console.log("Auth file does not exist, skipping deletion.");
  }
});
