import { test, expect, chromium } from "@playwright/test";

test("Create API Model Configuration (payload with No Auth)", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/assets/newModelApiConfig");
  await expect(page.getByText("Create API Configuration")).toBeVisible();

  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("My Test API");
  await page
    .locator('textarea[name="description"]')
    .fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();

  await page
    .locator('input[name="modelAPI.url"]')
    .fill("https://localhost:5000/predict/tc001");

  await page.locator('input[name="paramName"]').fill("age");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("gender");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("race");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("income");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment_length");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("total_donated");
  await page.click("#addRequestPropertyBtn");

  await page.click('button[type="submit"]');

  await expect(page.getByText("New API Configuration created")).toBeVisible();
});

test("Create API Model Configuration (payload with Bearer Token)", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/assets/newModelApiConfig");
  await expect(page.getByText("Create API Configuration")).toBeVisible();

  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("My Test API");
  await page
    .locator('textarea[name="description"]')
    .fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();

  await page
    .locator('input[name="modelAPI.url"]')
    .fill("https://localhost:5000/predict/tc001");

  await page.locator('input[name="paramName"]').fill("age");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("gender");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("race");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("income");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment_length");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("total_donated");
  await page.click("#addRequestPropertyBtn");

  await page.getByText("Authentication Settings").click();
  await page.click('label[for="modelAPI.authType"] .aiv__dropdown-indicator');
  await page.getByText("Bearer Token").click();

  await page
    .locator('input[name="modelAPI.authTypeConfig.token"]')
    .fill(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmY4MTJiNmJlM2IzMjEyMTQzMjBjZiIsImlhdCI6MTY2MDE5Nzg3MCwiZXhwIjoxNjYyNzg5ODcwfQ.cebsoHVMzV4GGwX-QjHFc5CcTkEy7jLQQLaaHlvN2JU"
    );

  await page.click('button[type="submit"]');

  await expect(page.getByText("New API Configuration created")).toBeVisible();
});

test("Create API Model Configuration (payload with Basic Auth)", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3000/assets/newModelApiConfig");
  await expect(page.getByText("Create API Configuration")).toBeVisible();

  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("My Test API");
  await page
    .locator('textarea[name="description"]')
    .fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();

  await page
    .locator('input[name="modelAPI.url"]')
    .fill("https://localhost:5000/predict/tc001");

  await page.locator('input[name="paramName"]').fill("age");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("gender");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("race");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("income");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("employment_length");
  await page.click("#addRequestPropertyBtn");

  await page.locator('input[name="paramName"]').fill("total_donated");
  await page.click("#addRequestPropertyBtn");

  await page.getByText("Authentication Settings").click();
  await page.click('label[for="modelAPI.authType"] .aiv__dropdown-indicator');
  await page.getByText("Basic Auth").click();

  await page
    .locator('input[name="modelAPI.authTypeConfig.username"]')
    .fill("test");
  await page
    .locator('input[name="modelAPI.authTypeConfig.password"]')
    .fill("p@ssword");

  await page.click('button[type="submit"]');

  await expect(page.getByText("New API Configuration created")).toBeVisible();
});
