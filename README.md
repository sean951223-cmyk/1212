# MoneyTrack｜Vue 3 個人記帳管理系統

## 功能
- 收入與支出新增、編輯、刪除
- 關鍵字、類型及月份篩選
- 總收入、總支出、結餘自動計算
- 本月支出分類圓餅圖
- 每月預算設定及使用進度
- localStorage 本機資料儲存
- RWD 手機與桌面版面

## 環境需求
請先安裝 Node.js LTS 與 Visual Studio Code。

## 安裝與執行
在 VS Code 開啟此資料夾，選擇「終端機 > 新增終端機」，輸入：

```bash
npm install
npm run dev
```

依照終端機顯示的網址開啟網站，通常是 http://localhost:5173/ 。

## 建置正式版本
```bash
npm run build
npm run preview
```

## 資料儲存說明
交易紀錄與每月預算儲存在瀏覽器 localStorage。資料只存在目前瀏覽器與裝置；清除網站資料或更換瀏覽器前，請先自行備份。

## 專案資料夾
- `src/views/`：各個頁面
- `src/components/`：可重複使用的元件
- `src/composables/useFinance.js`：記帳資料、計算及 localStorage
- `src/style.css`：整體樣式
