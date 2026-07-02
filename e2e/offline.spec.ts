import { test, expect } from '@playwright/test';

test.describe('Offline Functionality', () => {
  test('should work offline', async ({ page, context }) => {
    await page.goto('/');
    
    // Go offline
    await context.setOffline(true);
    
    // Navigate to dashboard (should use cached data)
    await page.goto('/app/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Go back online
    await context.setOffline(false);
  });

  test('should show offline indicator', async ({ page, context }) => {
    await page.goto('/app/dashboard');
    
    await context.setOffline(true);
    await expect(page.locator('.offline-indicator')).toBeVisible();
    
    await context.setOffline(false);
    await expect(page.locator('.offline-indicator')).not.toBeVisible();
  });

  test('should queue requests when offline', async ({ page, context }) => {
    await page.goto('/app/dashboard');
    
    await context.setOffline(true);
    
    // Make a request that should be queued
    await page.click('button[type="submit"]');
    
    // Check that request was queued (verify in localStorage)
    const queue = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('harvestai-offline-queue') || '[]');
    });
    
    expect(queue.length).toBeGreaterThan(0);
    
    await context.setOffline(false);
  });
});
