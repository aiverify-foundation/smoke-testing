import { test, expect, chromium } from '@playwright/test'
import { readFileSync } from 'fs'

let URL = process.env.URL

test.use({
  viewport: {
    width: 1920,
    height: 1080
  }
});

test(`Smoke Test for v2.x`, async () => {

  /* Create New Browser & Browser Context */
  const browser = await chromium.launch()
  const context = await browser.newContext()

  /* Create New Page */
  const page = await context.newPage()

  console.log('[INFO] Navigating to Results Page')
  await page.goto(URL + "/results")

  /* Upload Test Results Zip */
  console.log('[INFO] Upload Test Results Zip File')
  await page.getByRole('button', { name: 'UPLOAD TEST RESULTS' }).click()
  await page.getByText('Add test result zip files(').click()

  console.log('[INFO] Select Test Results Zip File')
  const bufferData = readFileSync('./fixtures/digital_corruptions.zip').toString('base64')
  const dataTransfer = await page.evaluateHandle(async (data) => {
    const transferData = new DataTransfer()
    const blobData = await fetch(data).then(res => res.blob())

    const file = new File([blobData], "digital_corruptions.zip", { type: 'application/zip' })
    transferData.items.add(file)

    return transferData
  }, 'data:application/octet-stream;base64,' + bufferData)

  await page.dispatchEvent('.fileSelect-module__kiy7Rq__dropZone', 'drop', { dataTransfer })
  await page.getByRole('button', { name: 'Upload', exact: true }).click();
  await expect.soft(page.getByText('Uploaded')).toBeVisible({ timeout: 6000 })
  console.log('[INFO] Upload Test Results Zip Successfully')

  /* Upload Test Results */
  console.log('[INFO] Upload Test Results')
  await page.goto(URL + "/results")
  await page.getByRole('button', { name: 'UPLOAD TEST RESULTS' }).click()
  await page.getByRole('button', { name: 'Results Editor' }).click()
  const resultsData = require('../fixtures/results.json')
  await page.locator('.ace_text-input').fill(JSON.stringify(resultsData))
  await page.getByRole('button', { name: 'Upload', exact: true }).click()
  console.log('[INFO] Upload Test Results Successfully')
  await page.getByRole('button', { name: 'OK' }).click()
 
  /* View Test Results */
  console.log('[INFO] View Test Results')
  await page.goto(URL + "/results")
  await page.locator('#filter-dropdown').click()
  await page.getByRole('listitem').filter({ hasText: 'Digital Corruptions' }).click()
  await page.locator('section').getByRole('img').nth(1).click();
  await page.locator('#sort-dropdown').click()
  await page.getByRole('listitem').filter({ hasText: 'Date (newest to oldest)' }).click()
  expect.soft(await page.locator('.text-lg').first().textContent()).toBe('Result for aiverify_digital_corruptions')
  
  /* Close Browser */
  await browser.close()

})