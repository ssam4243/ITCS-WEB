const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const origin = new URL(process.env.ITCS_TEST_URL || 'http://127.0.0.1:5173/');
const path = value => new URL(value, origin).pathname;
const slugs = ['it-support', 'cyber-security', 'telecoms', 'networks', 'software-websites', 'digital-marketing'];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin.href);
    await page.getByRole('button', { name: 'Essential only' }).click();
    await page.waitForFunction(() => document.querySelector('[data-engine="5"]').getBoundingClientRect().height > 50);
    await page.evaluate(() => { window.itcsEvents = []; window.addEventListener('itcs:interaction', e => window.itcsEvents.push(e.detail)); });

    for (const [goal, index] of [['reliability', 0], ['security', 1], ['connection', 2], ['digital', 4]]) {
      await page.locator(`[data-goal="${goal}"]`).click();
      assert.equal(await page.locator(`[data-goal="${goal}"]`).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator(`[data-engine="${index}"]`).getAttribute('aria-pressed'), 'true');
      assert.match(await page.locator('#engine-description').innerText(), /^Start with/);
      assert.equal(await page.locator('#engine-contact').getAttribute('href'), path('contact') + '?service=' + slugs[index]);
    }
    assert.equal((await page.evaluate(() => window.itcsEvents)).filter(e => e.action === 'choose-goal').length, 4);

    // Hover previews remain usable while crossing to the persistent action panel.
    for (let i = 0; i < slugs.length; i++) {
      await page.locator(`[data-engine="${i}"]`).hover();
      assert.equal(await page.locator('#engine-link').getAttribute('href'), path('services/' + slugs[i]));
      assert.equal(await page.locator('#engine-capabilities li').count(), 3);
    }
    await page.locator('[data-goal="security"]').click();
    await page.locator('#engine-link').hover();
    assert.equal(await page.locator('#engine-title').innerText(), 'Cyber security');
    assert.ok((await page.locator('#engine-readout').boundingBox()).height < 300);

    // The native-scroll narrative actually draws its connections as it progresses.
    const initialDash = await page.locator('.flow-connections path').first().evaluate(el => parseFloat(getComputedStyle(el).strokeDashoffset));
    assert.ok(initialDash > 0);
    await page.locator('[data-chapter="2"]').scrollIntoViewIfNeeded();
    await page.waitForFunction(before => parseFloat(getComputedStyle(document.querySelector('.flow-connections path')).strokeDashoffset) < before, initialDash);
    await page.waitForFunction(() => document.querySelector('.flow-step').textContent === '03 / 03');

    // The lower-page shortcut preserves the visitor's selected service.
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    await page.locator('.conversation-dock').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#dock-link').getAttribute('href'), path('contact') + '?service=cyber-security');
    await page.locator('#dock-link').click();
    await page.waitForURL(u => u.pathname === path('contact'));
    assert.equal(await page.locator('[name="service"]').inputValue(), 'cyber-security');
    assert.match(await page.locator('#enquiry-form h2').innerText(), /cyber security/);

    await page.locator('.logo').first().click();
    await page.locator('[data-goal="security"]').click();
    await page.locator('.motion-control').click();
    assert.match(await page.locator('.motion-control').innerText(), /Play motion/);
    assert.match(await page.locator('#engine-description').innerText(), /^Start with/);
    await page.locator('[data-engine="1"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-engine="2"]').getAttribute('aria-pressed'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#engine-link').evaluate(el => el === document.activeElement), true);
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    await page.locator('.conversation-dock').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Hide conversation shortcut' }).click();
    assert.equal(await page.locator('.conversation-dock').isVisible(), false);
    await page.reload();
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('.conversation-dock').isVisible(), false);

    for (const width of [1440, 1024, 820, 800, 768, 390, 375, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(origin.href);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'Overflow at ' + width);
    }

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const touch = await mobile.newPage();
    touch.on('pageerror', e => errors.push(e.message));
    await touch.goto(origin.href);
    await touch.getByRole('button', { name: 'Essential only' }).click();
    await touch.locator('[data-goal="security"]').tap();
    assert.equal(await touch.locator('#engine-title').innerText(), 'Cyber security');
    assert.match(await touch.locator('.motion-control').innerText(), /Reduced motion on/);
    assert.equal(await touch.locator('.flow-sticky').evaluate(el => getComputedStyle(el).position), 'static');
    assert.equal(await touch.locator('.flow-chapter').count(), 3);
    await touch.locator('#engine-link').tap();
    await touch.waitForURL(u => u.pathname === path('services/cyber-security'));
    assert.deepEqual(errors, []);
    console.log('PASS: 4 goal journeys, 6 hover previews, scroll-linked drawing, compact panel, contextual enquiry shortcut, form preselection, keyboard navigation, motion pause, shortcut dismissal, 8 widths, touch/reduced motion, and no JavaScript errors.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
