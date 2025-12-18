import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { IWorld } from '../support/world';
import * as fs from 'fs';
import * as path from 'path';
import { RingsandiPage } from '../pages/RingsandiPage';
import { ExcelDataReader } from '../utils/ExcelDataReader';
import { TestResultLogger } from '../utils/TestResultLogger';

const FALLBACK_PRODUCT_CODE = 'R-0502-F1';

function loadProductMap(): Record<string, string> {
  const candidates = [
    path.join('test-data', 'Product-List.csv'),
    path.join('src', 'test', 'resources', 'data', 'Product-List.csv'),
  ];
  for (const p of candidates) {
    try {
      if (!fs.existsSync(p)) continue;
      const txt = fs.readFileSync(p, 'utf8');
      const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const map: Record<string, string> = {};
      // expect header 'product,folder'
      for (let i = 1; i < lines.length; ++i) {
        const cols = lines[i].split(',');
        if (cols.length >= 2) {
          const product = cols[0].trim();
          const folder = cols[1].trim();
          if (product) map[product] = folder;
        }
      }
      return map;
    } catch (e) {
      // ignore and try next
    }
  }
  return {};
}

const PRODUCT_MAP = loadProductMap();

function productNameToCode(productName: string): string {
  if (!productName) return FALLBACK_PRODUCT_CODE;
  const trimmed = productName.trim();
  return PRODUCT_MAP[trimmed] || PRODUCT_MAP[productName] || FALLBACK_PRODUCT_CODE;
}

Given('I open Ringsandi site {string}', async function (this: IWorld, url: string) {
  // use goto with extended timeout and waitUntil 'load' to avoid persistent network requests blocking
  await this.page.goto(url, { waitUntil: 'load', timeout: 60000 });
});

When('I search for {string}', async function (this: IWorld, productName: string) {
  const page = new RingsandiPage(this.page);
  await page.searchProduct(productName);
});

When('I select product {string}', async function (this: IWorld, productName: string) {
  const page = new RingsandiPage(this.page);
  await page.selectProductByName(productName);
  (this as any).selectedProduct = productName;
});
When('I select size {string}', async function (this: IWorld, size: string) {
  const page = new RingsandiPage(this.page);
  // store selected size on world
  (this as any).selectedSize = size;
  await page.selectSize(size);
});
When('I click on variant option {string} in {string}', async function (this: IWorld, variantName: string, category: string) {
  const page = new RingsandiPage(this.page);
  await page.openVariantTabByCategory(category);
  await page.clickVariantOption(variantName);
  // record selected variant in world for later logging
  (this as any).selectedVariant = variantName;
  (this as any).selectedCategory = category;
});
When('I click on the Break-up text on the {string} variant in {string}', async function (this: IWorld, variantName: string, category: string) {
  const page = new RingsandiPage(this.page);
  await page.openVariantTabByCategory(category);
  await page.clickBreakupTextOnVariant(variantName);
  (this as any).selectedVariant = variantName;
  (this as any).selectedCategory = category;
});

Then('the product page for {string} is displayed with size {string}', async function (this: IWorld, productName: string, size: string) {
  const page = new RingsandiPage(this.page);
  const displayed = await page.isProductPageDisplayed(productName);
  expect(displayed).to.equal(true, `Product page for ${productName} was not displayed`);
  const selected = await page.getSelectedSizeValue();
  if (selected && selected.length > 0) {
    expect(selected.includes(size) || selected === size).to.equal(true, `Expected size ${size} but got ${selected}`);
  }
});

Then('the price breakdown for {string} is displayed with size {string}', async function (this: IWorld, productName: string, size: string) {
  const page = new RingsandiPage(this.page);
  const displayed = await page.isProductPageDisplayed(productName);
  expect(displayed).to.equal(true, `Product page for ${productName} was not displayed`);
  const selected = await page.getSelectedSizeValue();
  if (selected && selected.length > 0) {
    expect(selected.includes(size) || selected === size).to.equal(true, `Expected size ${size} but got ${selected}`);
  }
  // verify price breakdown UI is present: look for common breakup/price box markers
  const content = await this.page.content();
  const hasBreakup = /price break-up|price-breakup|breakup|price breakdown|plus-breakup-text/i.test(content);
  expect(hasBreakup).to.equal(true, `Price breakdown not found on page for ${productName}`);
});

Then('I verify Metal weight for {string} is displayed', async function (this: IWorld, metalType: string) {
  const page = new RingsandiPage(this.page);
  let actual: string | null = '';
  let expected: string | null = '';
  const size = (this as any).selectedSize || '5';
  const productCode = productNameToCode((this as any).selectedProduct || 'Divine Essence Women Ring');
  let errorMsg = '';
  try {
    actual = await page.getMetalWeight(metalType);
    expected = ExcelDataReader.getMetalWeight(productCode, size, metalType);

    expect(actual).to.be.a('string').and.not.empty;
    expect(expected).to.not.equal(null, `Expected weight not found in Excel for size ${(this as any).selectedSize} and metal ${metalType}`);

    const a = parseFloat(actual as string);
    const e = parseFloat(expected as string);
    const diff = Math.abs(a - e);
    expect(diff).to.be.lessThan(0.01, `Metal weight mismatch! Expected: ${expected} gm, Actual: ${actual} gm`);
  } catch (err) {
    errorMsg = err && (err as Error).message ? (err as Error).message : String(err);
    throw err;
  } finally {
    try {
      TestResultLogger.appendRow(productCode, size, {
        timestamp: new Date().toISOString(),
        product: (this as any).selectedProduct || 'Divine Essence Women Ring',
        size: size,
        category: (this as any).selectedCategory || '',
        variant: (this as any).selectedVariant || '',
        scenario: `Metal:${metalType}`,
        step: 'metal-weight',
        key: `${(this as any).selectedVariant || ''}${errorMsg ? ' | ERROR: ' + errorMsg : ''}`,
        actual: actual === null ? '' : String(actual),
        expected: expected === null ? '' : String(expected),
      });
    } catch (e) {
      // ignore logging failures
    }
  }
});

Then('I verify Natural stone weight is displayed', async function (this: IWorld) {
  const page = new RingsandiPage(this.page);
  let actual: string | null = '';
  let expected: string | null = '';
  const size = (this as any).selectedSize || '5';
  const productCode = productNameToCode((this as any).selectedProduct || 'Divine Essence Women Ring');
  let errorMsg = '';
  try {
    actual = await page.getStoneWeight();
    expected = ExcelDataReader.getNaturalStoneWeight(productCode, size);

    expect(actual).to.be.a('string').and.not.empty;
    expect(expected).to.not.equal(null, `Expected stone weight not found in Excel for size ${size}`);

    const a = parseFloat(actual as string);
    const e = parseFloat(expected as string);
    const diff = Math.abs(a - e);
    expect(diff).to.be.lessThan(0.01, `Stone weight mismatch! Expected: ${expected} ct, Actual: ${actual} ct`);
  } catch (err) {
    errorMsg = err && (err as Error).message ? (err as Error).message : String(err);
    throw err;
  } finally {
    try {
      TestResultLogger.appendRow(productCode, size, {
        timestamp: new Date().toISOString(),
        product: (this as any).selectedProduct || 'Divine Essence Women Ring',
        size: size,
        category: (this as any).selectedCategory || '',
        variant: (this as any).selectedVariant || '',
        scenario: 'Stone',
        step: 'stone-weight',
        key: `${(this as any).selectedVariant || ''}${errorMsg ? ' | ERROR: ' + errorMsg : ''}`,
        actual: actual === null ? '' : String(actual),
        expected: expected === null ? '' : String(expected),
      });
    } catch (e) {
      // ignore logging failures
    }
  }
});
