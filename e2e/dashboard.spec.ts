import { test, expect } from '@playwright/test';

test.describe('Dashboard Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/app/dashboard');
  });

  test('should display dashboard', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should display stat cards', async ({ page }) => {
    await expect(page.locator('.stat-card')).toHaveCount(4);
  });

  test('should navigate to farm page', async ({ page }) => {
    await page.click('text=My Farm');
    await expect(page).toHaveURL('/app/farm');
  });

  test('should navigate to weather page', async ({ page }) => {
    await page.click('text=Weather');
    await expect(page).toHaveURL('/app/weather');
  });

  test('should navigate to market prices page', async ({ page }) => {
    await page.click('text=Market Prices');
    await expect(page).toHaveURL('/app/market-prices');
  });

  test('should open AI assistant', async ({ page }) => {
    await page.click('text=AI Assistant');
    await expect(page.locator('.ai-assistant')).toBeVisible();
  });

  test('should display AI recommendations', async ({ page }) => {
    await expect(page.locator('.ai-recommendation')).toBeVisible();
  });

  test('should display timeline', async ({ page }) => {
    await expect(page.locator('.timeline')).toBeVisible();
  });

  test('should display tasks', async ({ page }) => {
    await expect(page.locator('.task-list')).toBeVisible();
  });
});
