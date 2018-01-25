# Introduction
=====================
## Feature
- 以台幣顯示eshop內遊戲的價格
- 簡易搜尋(支援中文、英文大小寫)

## To do
- 版面調整
- 各區語言資料
- 做爬蟲建立自己的資料
- 圖片

## Method
- 以google sheet當作資料源
原資料
>https://docs.google.com/spreadsheets/d/1dt6FX7yA_g95dX1-5vQg-_GVpfcM3PPNNs645W1YrE4/edit#gid=1666205995

- 幾乎所有資訊都在"eshop_TW"處理完，網頁僅輸出資料
- 遊戲資料會根據"原資料"分頁持續更新
- 中文從"eshop_TW"分頁判斷有無資料，再去"翻譯"填入缺翻譯的名稱