import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.UI_BASE_URL || 'http://127.0.0.1:4191';
let browser, server, folder;
const screenshots = process.env.UI_SCREENSHOT_DIR;
before(async () => {
  if (!process.env.UI_BASE_URL) {
    folder = await mkdtemp(join(tmpdir(), 'components-ui-'));
    server = spawn(process.execPath, ['node_modules/.bin/nuxt', 'dev', '--host', '127.0.0.1', '--port', '4191'], { env: { ...process.env,  }, stdio: 'pipe' });
    let log = '';
    server.stdout.on('data', data => { log += data });
    server.stderr.on('data', data => { log += data });
    let ready = false;
    for (let attempt = 0; attempt < 180; attempt++) {
      if (server.exitCode !== null) throw new Error(log);
      try { if ((await fetch(base)).ok) { ready = true; break } } catch {}
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    assert.ok(ready, `Preview did not start: ${log}`);
  }
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
  if (screenshots) await mkdir(screenshots, { recursive: true });
});
after(async () => {
  await browser?.close();
  if (server) {
    server.kill('SIGTERM');
    await Promise.race([new Promise(resolve => server.once('exit', resolve)), new Promise(resolve => setTimeout(resolve, 2000))]);
    if (server.exitCode === null) server.kill('SIGKILL');
  }
  if (folder) await rm(folder, { recursive: true, force: true });
});
async function pageFor(path, viewport = { width: 1440, height: 960 }) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base + path);
  return { page, errors };
}
async function screenshot(page, name) { if (screenshots) await page.screenshot({ path: join(screenshots, name + '.png'), fullPage: name !== 'mobile-menu' }) }

async function hydrated(page) {
  await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false);
}
test('SSR returns semantic Nova controls before hydration', async () => {
  const html = await (await fetch(base + '/tools/timestamp')).text();
  assert.match(html, /data-slot="button"/); assert.match(html, /data-slot="input"/);
  assert.match(html, /时间戳转换工具/);
});
test('Nova input binds to timestamp conversion with Lucide icons', async () => {
  const { page, errors } = await pageFor('/tools/timestamp');
  await hydrated(page);
  const input = page.getByPlaceholder('例如: 1704067200');
  await input.fill('1704067200');
  const convert = page.getByRole('button', { name: '转换', exact: true }).first();
  await convert.click();
  await page.getByText('2024-01-01T00:00:00.000Z', { exact: true }).waitFor();
  assert.ok(await page.locator('svg.lucide').count() > 0);
  await screenshot(page, 'desktop');
  assert.deepEqual(errors, []); await page.close();
});
test('Nova textarea preserves JSON formatting and search selection', async () => {
  const { page, errors } = await pageFor('/tools/json-formatter');
  await hydrated(page);
  await page.getByPlaceholder('在此粘贴 JSON 数据...').fill('{"hello":"Nova"}');
  await page.getByRole('button', { name: '美化', exact: true }).click();
  const output = page.getByPlaceholder('结果将显示在这里...');
  await page.waitForFunction(() => document.querySelector('textarea[readonly]')?.value.includes('Nova'));
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.getByPlaceholder('输入搜索内容...').fill('Nova');
  await page.waitForFunction(() => { const el = document.querySelector('textarea[readonly]'); return el?.value.slice(el.selectionStart, el.selectionEnd) === 'Nova' });
  assert.equal(await output.evaluate(el => document.activeElement === el), true);
  assert.deepEqual(errors, []); await page.close();
});
test('Motion mobile navigation opens and closes on route selection', async () => {
  const { page, errors } = await pageFor('/', { width: 390, height: 844 });
  await hydrated(page);
  const trigger = page.getByRole('button', { name: '打开导航菜单' });
  await trigger.click();
  const menu = page.getByRole('navigation', { name: '移动端导航' }); await menu.waitFor();
  await page.waitForFunction(() => {
    const menu = document.querySelector('nav[aria-label="移动端导航"]');
    return menu && Number(getComputedStyle(menu).opacity) >= 0.99;
  });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await screenshot(page, 'mobile-menu');
  await menu.getByRole('link', { name: '作品集', exact: true }).click();
  await page.waitForURL('**/portfolio'); await menu.waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(errors, []); await page.close();
});
