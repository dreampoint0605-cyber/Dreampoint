# 晴境工作室 Dreamify Studio 官網

> 📘 完整操作說明請看 [使用說明書.md](./使用說明書.md)

用 Vue 3 + Vite 製作的單頁形象網站。

## 開發

```bash
npm install
npm run dev      # 本機預覽 http://localhost:5173
npm run build    # 輸出到 dist/，可直接放到任何靜態主機
```

## 修改文案

所有文字都在 `src/content.js`，改那個檔案就好。

- `【待補：…】` 會在網頁上以黃色虛線框標示，寫好後直接取代即可。
- 聯絡資訊 `[你的電話]` 等欄位填入真實資料後，會自動變成可點擊的電話 / Email / LINE 連結。

## 結構

```
src/
  content.js            網站文案
  App.vue               頁面組合
  components/           各區塊（Header、Hero、功能、故事、承諾、聯絡、Footer）
  composables/useReveal.js  捲動淡入效果
```

## 部署（GitHub Pages）

`.github/workflows/deploy.yml` 會在推送到 `main`（或目前的開發分支）時自動打包並部署。

第一次使用前，到 GitHub repo 的 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
部署完成後網址會是 `https://<帳號>.github.io/<repo 名稱>/`。
