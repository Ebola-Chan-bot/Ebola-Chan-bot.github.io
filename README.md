# Ebola-Chan-bot.github.io

这是一个基于 Eleventy 和 GitHub Pages Actions 的个人博客。文章源文件使用中文文件名，构建后也发布为中文 URL。

## 文章发布

- 首页：`src/index.njk`
- 归档：`src/归档.njk`
- 文章源：`src/文章/2026全球动漫观察.md`、`src/文章/共产主义与人性贪婪的第一性原理.md`
- 发布路径：`/文章/2026全球动漫观察/`、`/文章/共产主义与人性贪婪的第一性原理/`

## 本地开发

```powershell
npm install
npm run build
npm run serve
```

推送到 `main` 后，`.github/workflows/pages.yml` 会用 Eleventy 构建 `_site` 并部署到 GitHub Pages。
