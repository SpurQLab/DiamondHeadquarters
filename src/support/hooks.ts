import { Before, After, AfterStep, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { TestResultLogger } from '../utils/TestResultLogger';
import { IWorld } from './world';

// Increase default step timeout to 60s for slow UI interactions
setDefaultTimeout(60 * 1000);

Before(async function (this: IWorld) {
  await this.init();
});

// Ensure CSV is fresh for the product/size we test (delete if exists)
BeforeAll(async function () {
  try {
    // Optionally init a fresh CSV if env vars provided. This avoids creating a hardcoded file
    // Set TEST_PRODUCT_CODE and TEST_RING_SIZE to force CSV init for a specific product/size.
    const PRODUCT_CODE = process.env.TEST_PRODUCT_CODE || '';
    const RING_SIZE = process.env.TEST_RING_SIZE || '';
    if (PRODUCT_CODE && RING_SIZE) {
      TestResultLogger.initFresh(PRODUCT_CODE, RING_SIZE);
    }
  } catch (err) {
    // log but don't fail the suite
    // eslint-disable-next-line no-console
    console.error('BeforeAll CSV cleanup failed', err);
  }
});

// Attach a screenshot to each step (useful for cucumber.io reporting)
AfterStep(async function (this: IWorld, step) {
  try {
    if (this.page) {
      // If any element is marked for highlight, apply a red outline before screenshot
      // take a normal full-page screenshot for the step
      try {
        const image = await this.page.screenshot({ fullPage: true });
        await this.attach(image, 'image/png');
      } catch (e) {
        // ignore screenshot attach errors
      }
    }
  } catch (err) {
    console.error('AfterStep screenshot failed', err);
  }
});

After(async function (this: IWorld, scenario) {
  try {
    const status = scenario.result && scenario.result.status ? scenario.result.status : null;
    if (status === 'FAILED') {
      try {
        const dir = 'test-output/screenshots';
        const fs = await import('fs');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const name = `failure-${Date.now()}.png`;
        // simple failure screenshot and HTML save
        try {
          await this.page.screenshot({ path: `${dir}/${name}`, fullPage: true });
        } catch (e) {
          // ignore
        }
        try {
          const html = await this.page.content();
          fs.writeFileSync(`${dir}/failure-${Date.now()}.html`, html, 'utf8');
        } catch (e) {
          // ignore
        }
        const html = await this.page.content();
        fs.writeFileSync(`${dir}/failure-${Date.now()}.html`, html, 'utf8');
        console.log('Saved failure artifacts to', dir);
      } catch (err) {
        console.error('Failed to save failure artifacts', err);
      }
    }
  } finally {
    await this.cleanup();
  }
});
