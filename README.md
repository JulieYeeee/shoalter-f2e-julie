# APP Store模擬

快速線上瀏覽：[https://julieyeeee.github.io/shoalter-f2e-julie/](https://julieyeeee.github.io/shoalter-f2e-julie/)

## 專案描述

這是一個仿製 APP Store 的專案，提供簡易的搜尋互動功能。使用者可以體驗類似 APP Store 的界面和功能。

## 11/1 更新內容

針對前測作業缺漏及面試時的提問進行優化：

- 補上評分功能顯示 （註：部分 APP 無法取的資料，如遇此情形目前採 default 1 顆星/0筆 顯示）
- 評分 API 處理機制：
  - 由於每個 APP 評分需獨立打 API 取得，設想一次打 100 筆會讓使用者等待回應較久或其他效能問題因此採分批取得
  - 分批取得機制：透過 scroll 的 lazy loading 觸發，當需載入新的 10 筆紀錄時，才打 API 取得評分
  - 同時打的十隻 API 透過 Promise.allSettled 處理，fulfilled 的回應即正常顯示評分，rejected 的回應則顯示預設資料（實際應用可能以不顯示比較不會誤導使用者）
  - 優化無資料時的 UI 顯示
- 針對面試提到的 bug 問題：無法正常搜尋結果，由於複測無法重現，故這部分會再去 survey 關於搜尋字串實務上更周全的方法
- 面試時發現一直取不到 API 資料，經搜尋可能是 API URL 換了，所以有稍微調整，現在資料顯示正常
- 最後感謝當日撥空參與面試的 Shoalter 團隊！如有任何建議回饋也歡迎告訴我 oopsyeh056@gmail.com

## 主要功能

- 搜尋：用戶可以搜索應用程序
- APP 推薦：提供橫向滑動的應用推薦功能
- 上市 APP 總瀏覽：分頁展示所有上市的應用程序，具有 lazy loading 效果

## 技術棧

- 框架：Next.js
- 語言：TypeScript
- 狀態管理：Redux Toolkit
- API 請求：Axios
- UI 組件：Ant Design
- 樣式：Styled Components
- 單元測試：Jest

## 安裝和運行

確保您的系統已安裝 Node.js（建議版本 14.x 或更高）。

1. 複製 Repository 到本地：
   ```bash
   git clone https://github.com/JulieYeeee/shoalter-f2e-julie.git
   ```
2. 安裝 Dependencies：
   ```bash
   npm install
   ```
3. 本地運行開發服務器：

   ```bash
   npm run dev
   ```

4. 訪問網站：
   Open [http://localhost:3000](http://localhost:3000) in your browser.
