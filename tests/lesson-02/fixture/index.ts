import { test as t1 } from "./product.fixture";
import { test as t2 } from "./login.fixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(t1, t2);
