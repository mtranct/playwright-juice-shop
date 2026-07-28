import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly dismissCookieButton: Locator;
  readonly closeWelcomeBannerButton: Locator;
  readonly accountMenuButton: Locator;
  readonly loginMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dismissCookieButton = page.getByRole('button', { name: 'dismiss cookie message' });
    this.closeWelcomeBannerButton = page.getByRole('button', { name: 'Close Welcome Banner' });
    this.accountMenuButton = page.getByRole('button', { name: 'Show/hide account menu' });
    this.loginMenuItem = page.getByRole('menuitem', { name: 'Go to login page' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

async dismissOpeningModals(): Promise<void> {
  await this.closeWelcomeBannerButton.click();
  await this.dismissCookieButton.click();
}

  async openLoginPage(): Promise<void> {
    await this.accountMenuButton.click();
    await this.loginMenuItem.click();
  }
}