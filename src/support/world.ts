import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async init() {
    try {
      console.log('Playwright: launching browser');
      // prefer headless for CI stability; include common flags
      this.browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      console.log('Playwright: browser launched');
      this.context = await this.browser.newContext();
      console.log('Playwright: context created');
      this.page = await this.context.newPage();
      console.log('Playwright: page created');
    } catch (err) {
      console.error('Playwright launch failed', err);
      throw err;
    }

    // attach diagnostics listeners
    this.page.on('console', msg => {
      try { console.log(`[pw:console] ${msg.type()} ${msg.text()}`); } catch (e) {}
    });
    this.page.on('pageerror', err => {
      try { console.error('[pw:pageerror]', err); } catch (e) {}
    });
    this.page.on('requestfailed', req => {
      try { console.warn('[pw:requestfailed]', req.url(), req.failure()?.errorText); } catch (e) {}
    });
  }

  async cleanup() {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (e) {
      // ignore
    }
  }
}

setWorldConstructor(CustomWorld);

export type IWorld = InstanceType<typeof CustomWorld>;
