// 截圖驗證腳本：開啟指定 deck 的 index.html，逐頁截圖到 /tmp
//
// 用法：
//   node scripts/shoot.mjs                       # 預設截 yilan-bids/index.html
//   node scripts/shoot.mjs ctkpro-intro          # 截 ctkpro-intro/index.html
//   node scripts/shoot.mjs yilan-bids/index.html # 指定路徑
//
// 自動偵測頁數（讀 .slide 數量），逐頁按右鍵截圖。
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

let target = process.argv[2] || 'yilan-bids';
if (!target.endsWith('.html')) target = path.join(target, 'index.html');
const file = path.isAbsolute(target) ? target : path.join(PROJECT_ROOT, target);
const url = 'file://' + file;
const tag = target.replace(/[\/]/g, '-').replace(/\.html$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(url);
await page.waitForTimeout(600);

const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
console.log(`${tag}: ${total} 頁`);

for (let i = 1; i <= total; i++) {
  await page.screenshot({ path: `/tmp/${tag}-${String(i).padStart(2, '0')}.png` });
  console.log(`shot ${i}/${total}`);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(450);
}
await browser.close();
console.log('done → /tmp/' + tag + '-*.png');
