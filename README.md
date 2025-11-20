# yzdy-blog

一个简介美观的个人博客fork from litos

## Features

- Built on Astro.js for lightning-fast builds
- Responsive design, perfectly adaptable to all devices
- Dark Mode support
- Multiple post layouts (compact, image display, timeline)
- Photo gallery display
- Full-text search
- Skill display component
- Highly customizable

## Quick Start

```bash
# Installing dependencies
pnpm install

# Development mode
pnpm dev

# Building
pnpm build
```

## Technology Stack

- **Framework**: Astro.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Component**: React or Astro.js
- **Icons**: Iconify
- **Search**: Pagefind

## Configuration

The main configuration is located in `src/config.ts`, which includes site information, post configuration, project display, etc.

## License

MIT License


src/layouts/Footer.astro: Footer component
src/layouts/Header.astro: Header component
src/layouts/Layout.astro: Main layout component

src/components/ —— 复用组件
src/content/ —— 内容（你的博客文章、项目等数据）
src/pages/ —— 页面（最终会生成 URL 的页面）