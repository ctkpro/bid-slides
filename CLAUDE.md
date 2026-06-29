# CLAUDE.md — CTK Pro 標案簡報工作庫

> 給未來在這個 repo 工作的 Claude：先讀這份，再動手。

## 這個專案是什麼

`~/bid-slides` 是 **CTK Pro（竑盛科技）參加標案評選用的簡報工作庫**。
產出全部是**單檔自足的純前端 HTML 投影片**，可推上 **GitHub Pages**（repo: `ctkpro/bid-slides`），現場用網址或本機檔案放映。

- **對象**：公家機關評審、採購承辦。播放環境多為**投影機** → **一律淺色（白）底**確保清晰。
- **品牌**：這裡**只放 CTK Pro 的 logo**（不是 BNI；本庫與 `~/bni-ai-news` 無關，僅借用其視覺系統）。
- 風格血緣來自 `~/bni-ai-news/ctkpro-intro`，但**內容與用途是標案建議書**，資訊密度較高。

## 檔案結構

```
bid-slides/
├── index.html            # root 著陸頁：白底卡片列出各標案 + 公司介紹
├── CLAUDE.md             # 本檔
├── README.md             # 操作 / 部署 / 作圖說明
├── package.json          # Node 專案（作圖工具相依）
├── .env                  # GEMINI_API_KEY（不入 git；由 ~/hermes-slides/.env 複製）
├── .env.example
├── scripts/
│   ├── gen-images.mjs    # Gemini 產插圖（白底極簡風）；--out 指定輸出資料夾
│   └── shoot.mjs         # Playwright 逐頁截圖驗證
├── images/
│   └── ctkpro-logo.png   # 共用 CTK Pro logo
├── ctkpro-intro/         # CTK 公司介紹簡報（7 頁）＝風格基準 + 可重用開場
│   └── index.html
└── yilan-bids/           # 一個標案 = 一個資料夾
    ├── index.html        #   投影片本體
    ├── index-wip.html    #   ChatGPT 初稿（素材來源，保留備查）
    └── images/           #   該案 logo / 截圖 / QR / logos/（客戶 logo 牆）
```

## 🎨 投影片風格標準（所有標案 deck 都要對齊）

**白底極簡設計系統**（乾淨、清爽、留白；不是「一頁一重點」的高橋流，標案需要的密度仍用同一套語言承載）。

- **單檔自足**：CSS / JS 全內嵌，無外部相依（除了 Google Fonts）。
- **設計 token（`:root`，務必沿用）**：
  - `--ink:#1a1a1a`（主文字）、`--muted:#6b6b6b`、`--soft:#9a9a9a`、`--line:#e6e6e6`
  - `--blue:#2f4fb0`（**唯一強調色**：kicker、序號、重點、em 都用它）、`--blue-700` / `--blue-300` / `--blue-50` 深淺階
    - **各標案可依主題覆寫主色**（變數名沿用 `--blue*` 以相容元件）。例：`yilan-bids` 為育兒主題，主色改桃紅 `--blue:#D6336C`（700 `#A61E4D`、300 `#F06595`、50 `#FFF0F6`），`--warn` 改琥珀 `#9A6700` 以免與桃紅混淆；改色時記得同步調整少數**寫死的色票**（預算小長條、`#help` 提示列、填色卡內的淺色字）。`ctkpro-intro` 維持品牌藍。
  - `--bg:#ffffff`、`--paper:#f7f8fb`（淺底卡片）、`--warn:#c0524a`（只用在 before/風險，少量）
- **字體**：Noto Sans TC（900/700/500/400），fallback PingFang TC。
- **版型**：`yilan-bids` 採 **1280×720 `#stage` 縮放舞台**（dense 內容版面穩定不溢出）；
  `ctkpro-intro` 採 bni 的 `.deck`+`.slide` 流式版型。新標案**直接複製 `yilan-bids/index.html` 當骨架**最省事。
- **元件庫**（白底版，見 `yilan-bids/index.html`）：`.kicker` / `.page-title`（`.em` 上藍）/ `.card`（含 `.fill`/`.soft`）/
  `.num-chip` / `.compare2`（before/after）/ `ul.flow` / `.stage-row` / `.nodes` / `.gantt`（HTML 甘特圖）/
  `.bud`（預算長條）/ `.logo-wall`（客戶 logo 牆）/ `.thanks`（謝謝頁）/ `#qa`（按 Q 開啟備詢）。
- **導覽（全庫共用）**：右下角 `‹ 目前 / 總頁 ›`，箭頭可滑鼠點擊；鍵盤 ← → / 空白 / Home / End；
  點畫面左右半、觸控滑動；F 全螢幕；Q 備詢；底部進度條。總頁數由 `querySelectorAll('.slide')` 自動算。
- **logo**：頁首右上 `.logo-tr` 用 `images/ctkpro-logo.png`，只在介紹 CTK 的頁面放。

> 新增一頁＝加一個 `<section class="slide" data-page="N">`，頁碼自動算，不必手改總數。

## 製作一個新標案的標準流程

1. **建資料夾**：`<案名>-bids/`（或合適名稱），內含 `images/`。
2. **建骨架**：複製 `yilan-bids/index.html` 過去，改 `<title>`、封面案號/案名、各頁內容。
3. **配圖**：截圖/logo 放 `images/`；要生成的插圖用 `node scripts/gen-images.mjs --out <案名>/images`（白底極簡風）。
4. **客戶 logo 牆**：放 `images/logos/<brand>.png`；deck 內 `<img onerror>` 會自動 fallback 成文字字標。
5. **更新 root**：在 `index.html`「標案簡報」區塊加一張 `a.card` 連到該資料夾。
6. **驗證**：瀏覽器翻一遍；或 `node scripts/shoot.mjs <案名>` 逐頁截圖到 /tmp。

## 慣例 / 注意事項

- **語言**：所有內容與溝通用**繁體中文（台灣）**。
- **淺底**：投影機友善，永遠白／淺底，避免深色大面積。
- **只放 CTK Pro logo**，不放 BNI 或任何未經確認的客戶。
- **客戶實績**：放上 logo 牆前先確認該客戶屬實（標案放不實客戶風險高）。
- **數字 / 事實**：金額、證號、節點日期等，以標案文件為準，勿臆造。
- **不要**把 `node_modules/`、`.env` 進 git（`.gitignore` 已涵蓋）。
- **commit / push 時機**：只在 Alfred 要求時做；可用 `/save-progress`。
