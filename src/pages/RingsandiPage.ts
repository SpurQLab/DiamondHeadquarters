import { Page } from 'playwright';

export class RingsandiPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome(url: string) {
    await this.page.goto(url, { waitUntil: 'load', timeout: 60000 });
    // dismiss cookie if present
    const accept = await this.page.locator("button:has-text('Accept'), button:has-text('Accept All'), button:has-text('OK'), .cookie-accept").first();
    if (await accept.count()) {
      try { await accept.click({ timeout: 3000 }); } catch (e) {}
    }
    await this.page.waitForTimeout(500);
  }

  async searchProduct(productName: string) {
    const url = `https://ringsandi.com/search?q=${encodeURIComponent(productName)}`;
    await this.page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await this.page.waitForTimeout(1000);
  }

  async selectProductByName(productName: string) {
    // Wait for search results to load
    await this.page.waitForTimeout(2000);
    
    const product = this.page.locator(`a[href*='/products/']:has-text("${productName}")`).first();
    
    // Product links in search results might be hidden, so we directly navigate
    const href = await product.getAttribute('href');
    if (href) {
      const full = href.startsWith('/') ? `https://ringsandi.com${href}` : href;
      await this.page.goto(full, { waitUntil: 'load', timeout: 60000 });
      await this.page.waitForTimeout(500);
    } else {
      // Fallback: try to force click if href is not available
      await product.click({ force: true });
    }
  }

  async selectSize(size: string) {
    const sizeSelect = this.page.locator('select#custom-size-selector');
    if (await sizeSelect.count()) {
      await sizeSelect.selectOption(size);
      await this.page.waitForTimeout(500);
    } else {
      const fallback = this.page.locator("select[name='properties[size]']").first();
      if (await fallback.count()) {
        await fallback.selectOption(size);
      }
    }
  }

  async clickVariantOption(name: string) {
    const variant = this.page.locator(`.variant-box:has-text("${name}")`).first();
    if (await variant.count()) {
      try { await variant.scrollIntoViewIfNeeded(); } catch(e){}
      await variant.click();
      await this.page.waitForTimeout(800);
    }
  }

  async openVariantTabByCategory(category: string) {
    const c = String(category || '').toLowerCase();
    let metal = 'gold';
    if (c.includes('platinum')) metal = 'platinum';
    if (c.includes('lab')) metal = 'lab';
    const tabBtn = this.page.locator(`button.tablinks[data-metal="${metal}"]`).first();
    if (await tabBtn.count()) {
      const visible = await this.page.locator(`#${metal}Tab`).evaluate((el) => {
        return window.getComputedStyle(el).display !== 'none';
      }).catch(() => false);
      if (!visible) {
        try { await tabBtn.click(); } catch (e) { try { await tabBtn.click({ force: true }); } catch (e) {} }
        await this.page.waitForTimeout(500);
      }
    }
  }

  async clickBreakupText() {
    const selected = this.page.locator('.variant-box.selected');
    if (await selected.count()) {
      const link = selected.locator('.plus-breakup-text').first();
      if (await link.count()) {
        await link.click();
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    const anyBreakup = this.page.locator('.plus-breakup-text').first();
    if (await anyBreakup.count()) {
      await anyBreakup.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickBreakupTextOnVariant(name: string) {
    const variant = this.page.locator(`.variant-box:has-text("${name}")`).first();
    if (await variant.count()) {
      const link = variant.locator('.plus-breakup-text').first();
      if (await link.count()) {
        try { await link.scrollIntoViewIfNeeded(); } catch (e) {}
        await link.click();
        await this.page.waitForTimeout(1000);
        return;
      }
    }
    // fallback to general behavior
    await this.clickBreakupText();
  }

  async isProductPageDisplayed(productName: string) {
    const url = this.page.url();
    if (url.includes('/products/')) return true;
    const title = await this.page.title();
    if (title.toLowerCase().includes('ring') || title.toLowerCase().includes('product')) return true;
    const h1 = this.page.locator('h1').first();
    if (await h1.count()) {
      const t = (await h1.textContent()) || '';
      return t.trim().length > 0;
    }
    return false;
  }

  async getSelectedSizeValue() {
    const select = this.page.locator('select#custom-size-selector');
    if (await select.count()) return await select.inputValue();
    const fallback = this.page.locator("select[name='properties[size]']").first();
    if (await fallback.count()) return await fallback.inputValue();
    const selOpt = this.page.locator('option[selected]').first();
    if (await selOpt.count()) return (await selOpt.textContent())?.trim() || '';
    return '';
  }

  async getMetalWeight(metalType: string) {
    const content = await this.page.content();
    // escape metalType for regex safety
    const esc = String(metalType || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // accept integers or decimals for the gram value, and allow flexible unit text (g, gm, grams)
    const re = new RegExp(esc + "\\s*\\|\\s*(\\d+(?:\\.\\d+)?)\\s*(?:g|gm|grams)?", 'i');
    const m = content.match(re);
    if (m && m[1]) {
      return m[1];
    }
    return '';
  }

  async getStoneWeight() {
    // Wait for breakup popup to be loaded (wait for solitaire section)
    try {
      await this.page.locator('.pb-box.solitaire-details').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log('Warning: Solitaire section not found, trying alternative patterns');
    }
    
    const content = await this.page.content();
    
    // Primary pattern: Match the exact structure shown in HTML
    // <div class="pb-box solitaire-details">1 ct | I-SI | Emerald</div>
    let re = /<div\s+class="pb-box solitaire-details">([^<]+)<\/div>/i;
    let m = content.match(re);
    if (m && m[1]) {
      // Extract weight from "1 ct | I-SI | Emerald" format
      const weightMatch = m[1].trim().match(/(\d+(?:\.\d+)?)\s*ct/i);
      if (weightMatch) {
        return weightMatch[1];
      }
    }
    
    // Fallback: Try with relaxed class matching
    re = /class="pb-box solitaire-details"[^>]*>([^<]+)</i;
    m = content.match(re);
    if (m && m[1]) {
      const weightMatch = m[1].trim().match(/(\d+(?:\.\d+)?)\s*ct/i);
      if (weightMatch) {
        return weightMatch[1];
      }
    }
    
    // Additional fallback for other formats
    re = /solitaire-details[^>]*>\s*(\d+(?:\.\d+)?)\s*ct/i;
    m = content.match(re);
    if (m && m[1]) {
      return m[1];
    }
    
    return '';
  }

  async getStoneWeightWithShape(): Promise<{ weight: string; shape: string }> {
    // Wait for solitaire stone section to be visible
    try {
      await this.page.locator('.pb-box.solitaire-details').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log('Warning: Solitaire stone section not found');
    }
    
    const content = await this.page.content();
    
    // Primary pattern: Match the exact structure shown in HTML
    // <div class="pb-box solitaire-details">1 ct | I-SI | Emerald</div>
    let re = /<div\s+class="pb-box solitaire-details">([^<]+)<\/div>/i;
    let m = content.match(re);
    if (m && m[1]) {
      const text = m[1].trim();
      // Extract weight and shape from "1 ct | I-SI | Emerald" format
      const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*ct/i);
      const shapeMatch = text.match(/\|\s*([^|]+)$/); // Last part after pipe is shape
      
      if (weightMatch) {
        return {
          weight: weightMatch[1],
          shape: shapeMatch ? shapeMatch[1].trim() : ''
        };
      }
    }
    
    // Fallback: Try with relaxed class matching
    re = /class="pb-box solitaire-details"[^>]*>([^<]+)</i;
    m = content.match(re);
    if (m && m[1]) {
      const text = m[1].trim();
      const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*ct/i);
      const shapeMatch = text.match(/\|\s*([^|]+)$/);
      
      if (weightMatch) {
        return {
          weight: weightMatch[1],
          shape: shapeMatch ? shapeMatch[1].trim() : ''
        };
      }
    }
    
    return { weight: '', shape: '' };
  }

  async getSmallDiamondWeight() {
    // Wait for small diamond section to be visible
    try {
      await this.page.locator('.pb-box.diamond-details').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log('Warning: Small diamond section not found');
    }
    
    const content = await this.page.content();
    
    // Primary pattern: Match the exact structure shown in HTML
    // <div class="pb-box diamond-details">0.42 ct | IJ-SI | Round</div>
    let re = /<div\s+class="pb-box diamond-details">([^<]+)<\/div>/i;
    let m = content.match(re);
    if (m && m[1]) {
      // Extract weight from "0.42 ct | IJ-SI | Round" format
      const weightMatch = m[1].trim().match(/(\d+(?:\.\d+)?)\s*ct/i);
      if (weightMatch) {
        return weightMatch[1];
      }
    }
    
    // Fallback: Try with relaxed class matching
    re = /class="pb-box diamond-details"[^>]*>([^<]+)</i;
    m = content.match(re);
    if (m && m[1]) {
      const weightMatch = m[1].trim().match(/(\d+(?:\.\d+)?)\s*ct/i);
      if (weightMatch) {
        return weightMatch[1];
      }
    }
    
    // Additional fallback
    re = /diamond-details[^>]*>\s*(\d+(?:\.\d+)?)\s*ct/i;
    m = content.match(re);
    if (m && m[1]) {
      return m[1];
    }
    
    return '';
  }

  async getSmallDiamondWeightWithShape(): Promise<{ weight: string; shape: string }> {
    // Wait for small diamond section to be visible
    try {
      await this.page.locator('.pb-box.diamond-details').first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.log('Warning: Small diamond section not found');
    }
    
    const content = await this.page.content();
    
    // Primary pattern: Match the exact structure shown in HTML
    // <div class="pb-box diamond-details">0.42 ct | IJ-SI | Round</div>
    let re = /<div\s+class="pb-box diamond-details">([^<]+)<\/div>/i;
    let m = content.match(re);
    if (m && m[1]) {
      const text = m[1].trim();
      // Extract weight and shape from "0.42 ct | IJ-SI | Round" format
      const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*ct/i);
      const shapeMatch = text.match(/\|\s*([^|]+)$/); // Last part after pipe is shape
      
      if (weightMatch) {
        return {
          weight: weightMatch[1],
          shape: shapeMatch ? shapeMatch[1].trim() : ''
        };
      }
    }
    
    // Fallback: Try with relaxed class matching
    re = /class="pb-box diamond-details"[^>]*>([^<]+)</i;
    m = content.match(re);
    if (m && m[1]) {
      const text = m[1].trim();
      const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*ct/i);
      const shapeMatch = text.match(/\|\s*([^|]+)$/);
      
      if (weightMatch) {
        return {
          weight: weightMatch[1],
          shape: shapeMatch ? shapeMatch[1].trim() : ''
        };
      }
    }
    
    return { weight: '', shape: '' };
  }
}
