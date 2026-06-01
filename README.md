<p align="center">
  <img src="public/favicon.svg" width="64" alt="Design Token Studio" />
</p>

<h1 align="center">Design Token Studio</h1>

<p align="center">
  <strong>开源 Design Token 管理系统</strong><br/>
  品牌色向导 · 语义色定义 · 对比度检查 · 多框架导出
</p>

<p align="center">
  <a href="https://lov-alt.github.io/design-token-studio/"><img src="https://img.shields.io/badge/demo-live-6366f1?style=flat-square" /></a>
  <a href="https://github.com/lov-alt/design-token-studio/stargazers"><img src="https://img.shields.io/github/stars/lov-alt/design-token-studio?style=flat-square&color=f59e0b" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lov-alt/design-token-studio?style=flat-square&color=6366f1" /></a>
</p>

---

## Overview

Design Token Studio is an open-source design token management tool. Define your design system — colors, typography, spacing, shadows, border radius — in one place, then export to CSS, Tailwind, SCSS, JSON, SwiftUI, or Flutter.

## Modules

| | |
|---|---|
| **Color Tokens** | Brand color wizard → tonal scale (50–950) → semantic tokens (primary, surface, text, success...) → dark theme variants. Image color extraction: upload a brand image to auto-detect the palette. |
| **Typography** | Tabular editor for font family, size, weight, line height, and letter spacing across your type scale (h1–caption). |
| **Spacing & Effects** | Spacing scale, shadow elevations (with live preview), and border radius system. |
| **Accessibility** | WCAG 2.x contrast ratio checker with AA/AAA grades. Color vision deficiency simulation (protanopia, deuteranopia, tritanopia, achromatopsia). Palette-wide contrast audit. |
| **Export** | CSS custom properties, Tailwind config, SCSS variables, JSON/W3C tokens, SwiftUI Color extensions, Flutter ThemeData. |

## Quick Start

```bash
git clone https://github.com/lov-alt/design-token-studio.git
cd design-token-studio
npm install
npm run dev
```

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router

## License

MIT
