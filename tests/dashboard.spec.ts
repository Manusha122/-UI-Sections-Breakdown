// import { test, expect } from '@playwright/test'

// test('borrower selection updates center pane and accordion works', async ({ page }) => {
//   await page.goto('http://localhost:5173')
//   await page.waitForSelector('[data-testid="pipeline"]')

//   // Click the first borrower (Sarah Dunn has id 1 in sample data)
//   await page.click('[data-testid="borrower-item-1"]')
//   await expect(page.locator('[data-testid="borrower-detail"]')).toContainText('Sarah Dunn')

//   // Expand explainability and assert flag text
//   await page.click('[data-testid="ai-explainability"] summary')
//   await expect(page.locator('[data-testid="ai-flag-0"]')).toContainText('Income Inconsistent')

//   // Click request documents button (button logs to console in mock)
//   await page.click('text=Request Documents')
// })
