# Sehuri Knowledge Wiki

Personal Knowledge Wiki 的公开可视化界面。GitHub 版本只包含经过筛选的摘要、
主题、人物、概念和条目关联，不包含本地来源摘录、个人想法、提取日志或凭据。

## Prerequisites

- Node.js `>=22.13.0`

## 本地预览

```bash
npm ci
npm run prepare:pages
npx vite preview --outDir pages-dist
npm run build
```

This starter does not use `wrangler.jsonc`.

## 内容同步

本地 Wiki 更新后运行：

```bash
npm run sync:public
npm run build:pages
```

提交 `pages/wiki-public-data.ts` 并推送到 `main` 后，GitHub Actions 会自动构建
并部署 GitHub Pages。
