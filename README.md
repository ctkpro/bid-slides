# CTK Pro 標案簡報庫（bid-slides）

CTK Pro（竑盛科技）參加標案評選用的簡報集合。白底極簡、投影機友善、單檔自足 HTML，可推上 GitHub Pages。

## 直接播放

用瀏覽器開對應的 `index.html` 即可：

- 著陸頁（目錄）：`index.html`
- 宜蘭縣育兒資源網 2.0 服務建議書：`yilan-bids/index.html`
- CTK Pro 公司介紹：`ctkpro-intro/index.html`

### 操作方式

| 動作 | 按鍵 / 手勢 |
|------|------------|
| 下一頁 | `→`、`↓`、空白、`PageDown`、點畫面右半、右下 `›`、向左滑 |
| 上一頁 | `←`、`↑`、`PageUp`、點畫面左半、右下 `‹`、向右滑 |
| 首頁 / 末頁 | `Home` / `End` |
| 全螢幕 | `F` |
| 備詢 QA（評審問答） | `Q` 開啟、`Q` / `Esc` 關閉 |

右下角顯示頁碼（`目前 / 總頁`），底部有進度條。

## 部署到 GitHub Pages

1. 把整個專案推上 `ctkpro/bid-slides`（各 `index.html` 已是相對路徑）。
2. repo → **Settings** → **Pages** → Source 選 **Deploy from a branch**，分支 `main`、資料夾 `/ (root)`，Save。
3. 用顯示的網址播放（例：`https://ctkpro.github.io/bid-slides/yilan-bids/`）。

## 作圖工具（選用）

產生白底極簡風插圖，重用 Gemini。**API key 放在本庫 `.env` 的 `GEMINI_API_KEY`**（由 `~/hermes-slides/.env` 複製，已被 `.gitignore` 排除）。

```bash
npm install                                   # 安裝 @google/generative-ai、sharp、dotenv、playwright
node scripts/gen-images.mjs                    # 產 images/ 內尚未存在的圖
node scripts/gen-images.mjs --out yilan-bids/images   # 指定輸出資料夾
node scripts/gen-images.mjs --force sys-arch          # 強制重產指定圖
node scripts/shoot.mjs yilan-bids              # Playwright 逐頁截圖到 /tmp 驗證外觀
```

- 風格：白底、淡藍墨（`#2f4fb0`）線稿插畫、留白、無文字；輸出 16:9 PNG。
- 模型：Google Gemini（預設 `gemini-3-pro-image-preview`，可用 `GEMINI_IMAGE_MODEL` 覆寫）。

## 檔案結構

見 [CLAUDE.md](CLAUDE.md)。新標案：複製 `yilan-bids/index.html` 當骨架，改內容並在 root `index.html` 加卡片。
