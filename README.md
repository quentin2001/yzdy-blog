# YZDY Blog

一个基于 Astro.js 的现代化个人博客主题，支持 MDX、React 组件、Tailwind CSS、全文搜索、RSS/Atom 等。你可以将其作为个人知识库与作品集，具备优雅的阅读体验与强大的可定制能力。

## 项目概览

- 架构：Astro 5 + React 19（按需） + Tailwind CSS 4
- 内容：MD/MDX 驱动，前置 Frontmatter 完整定义
- 搜索：Pagefind 静态索引，支持 Ctrl+K 呼出与“精确匹配”模式
- 评论：`Gitalk`（可选）
- 订阅：RSS 2.0 与 Atom 1.0 动态生成
- 部署：纯静态产物，可托管在 Vercel、Netlify、GitHub Pages 等

## 快速上手

```bash
# 环境要求：Node.js >= 18，建议使用 pnpm
pnpm install
pnpm dev        # 本地开发 http://localhost:4321
pnpm build      # 生产构建，自动运行 astro check 与 pagefind 建索引
pnpm preview    # 本地预览生产构建
```

## 目录结构

- `src/` 源码目录
  - `content/` 内容集合（Content Collections）
    - `posts/` 文章目录，支持 `md`/`mdx`，每篇一个文件夹，资源放在 `assets/`
    - `projects/` 项目展示数据（MD/MDX）
  - `pages/` 路由页面
    - `index.astro` 首页；`posts/[...page].astro` 列表分页；`posts/[...id].astro` 文章详情
    - `tags/` 标签页；`photos/` 摄影页；`rss.xml.js` 与 `atom.xml.js` 订阅源
  - `layouts/` 页面布局封装
  - `components/` 组件库
    - `base/` 通用组件（导航、分页、技能展示、搜索开关等）
    - `posts/` 文章卡片与布局、目录、导航、评论、版权
    - `photos/` 摄影相关组件（时间线、拍立得等）
    - `theme/` 主题切换、渐变等
  - `lib/` 工具与数据
    - `data.ts` 内容获取与排序；`feed.ts` RSS/Atom 生成；`utils.ts` 工具
  - `stores/` 应用状态（主题等）
  - `styles/` 全局与 Markdown 样式
  - `config.ts` 站点与各页面的业务配置
  - `content.config.ts` 内容集合与 Frontmatter 校验
  - `types.ts` 类型定义
- `plugins/` Markdown Remark/Rehype 插件组合（数学公式、图片、阅读时长、外链等）
- `public/` 静态资源（字体、图标、RSS 样式、站点图标等）
- `astro.config.ts` Astro 配置（Tailwind、React、MDX、Sitemap、Robots、Markdown 插件）
- `ec.config.mjs` 代码高亮与样式配置（Expressive Code）

## 内容写作（MDX 示例）

```mdx
---
title: 文章标题
description: 简短描述
pubDate: 2025-12-01
updatedDate: 2025-12-10
tags: [AI, Notes]
author: 你的名字
cover: ./assets/cover.png
ogImage: ./assets/cover.png
recommend: false
postType: coverTop        # 可选：metaOnly | coverSplit | coverTop
coverLayout: left         # 可选：left | right
pinned: false
draft: false
license: CC BY-NC-SA 4.0
---

正文内容支持标准 Markdown 与 MDX 语法。
图片建议放到同目录的 `assets/` 下，引用相对路径即可。
```

Frontmatter 字段在 `src/content.config.ts` 中定义与校验，发布时会根据 `draft/pinned`、`updatedDate/pubDate` 自动排序与过滤。

## 站点配置

- `SITE` 站点信息：标题、描述、作者、`website`、`lang`、`base`、OG 图
- `HEADER_LINKS`/`FOOTER_LINKS` 导航与页脚链接
- `SOCIAL_LINKS` 社交链接，图标使用 Iconify 类名
- `SKILLSSHOWCASE_CONFIG` 技能展示模块开关与数据
- `POSTS_CONFIG` 文章列表/详情的展示样式与分页、文案
- `COMMENT_CONFIG` 评论系统（默认关闭）。若启用 `Gitalk`，需在环境变量中配置：
  - `PUBLIC_GITHUB_CLIENT_ID`、`PUBLIC_GITHUB_CLIENT_SECRET`
- `TAGS_CONFIG`、`PROJECTS_CONFIG`、`PHOTOS_CONFIG` 各页面文案与介绍
- `ANALYTICS_CONFIG` 统计（`busuanzi`、`umami` 可选）

配置入口：`src/config.ts`

## 功能详解

- 搜索：生产环境通过 Pagefind 建索引，界面支持 Ctrl+K 呼出与“Exact 精确匹配”切换（`components/base/SearchSwitch.astro`）
- 评论：`Gitalk`（`components/posts/base/Gitalk.astro`/`Comment.astro`），需 GitHub OAuth App
- 订阅：`/rss.xml` 与 `/atom.xml` 由 `src/lib/feed.ts` 动态生成，包含封面、图片清理与相对路径修正
- 数学公式：Remark Math + KaTeX（`plugins/index.ts`）
- 图片体验：LQIP、自动外链、标题锚点等 Remark/Rehype 组合
- 代码高亮：Expressive Code（`ec.config.mjs`），支持折叠、行号、主题自定义

## 开发与构建

- `pnpm dev` 启动开发服务器
- `pnpm build` 构建产物到 `dist/`，并执行 `pagefind --site dist` 生成搜索索引
- `pnpm preview` 本地预览生产构建
- `pnpm format`/`pnpm format:write` 代码风格检查与修复

## 部署建议

- Vercel：导入仓库 → 设置构建命令 `pnpm build` → 输出目录 `dist` →（可选）保留 `postbuild` 自动生成搜索索引
- GitHub Pages：本地 `pnpm build` → 推送 `dist` 到 `gh-pages` 分支或使用 Actions 自动化

## 常见问题

- 开发模式不显示搜索结果：索引只在生产构建后可用，`pnpm build` 后 `pnpm preview` 体验
- 环境变量前缀：需要使用 `PUBLIC_` 前缀才能在前端读取（例如 `PUBLIC_GITHUB_CLIENT_ID`）
- 图片引用：文章内图片使用相对路径（`./assets/...`）；RSS 构建会转换为绝对地址
- 暗色模式图片：`POSTS_CONFIG.imageDarkenInDark` 可控制暗色模式下图片暗化

## 许可证

MIT License


