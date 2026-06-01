<p align="center">
  <img src="docs/preview.svg" alt="Design Token Studio" width="100%" />
</p>

<h1 align="center">Design Token Studio</h1>

<p align="center">
  <strong>Open Source Design Token Management</strong><br/>
  Brand wizard · Semantic colors · Typography scale · Contrast checker · Multi-framework export
</p>

<p align="center">
  <a href="https://lov-alt.github.io/design-token-studio/"><img src="https://img.shields.io/badge/demo-live-6366f1?style=flat-square" /></a>
  <a href="https://github.com/lov-alt/design-token-studio/stargazers"><img src="https://img.shields.io/github/stars/lov-alt/design-token-studio?style=flat-square&color=f59e0b" /></a>
  <a href="https://www.npmjs.com/package/design-token-studio"><img src="https://img.shields.io/npm/v/design-token-studio?style=flat-square&color=22c55e" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lov-alt/design-token-studio?style=flat-square&color=6366f1" /></a>
</p>

---

## Quick Use — Drop-in Token Files

### CSS Variables
```css
@import url('https://raw.githubusercontent.com/lov-alt/design-token-studio/master/tokens/default-colors.css');
```
Or copy [`tokens/default-colors.css`](./tokens/default-colors.css) directly into your project. Includes both light and dark themes.

### W3C Design Token JSON
```bash
curl -O https://raw.githubusercontent.com/lov-alt/design-token-studio/master/tokens/default-theme.json
```
[`tokens/default-theme.json`](./tokens/default-theme.json) — W3C DTCG format, compatible with Figma Tokens Studio, Style Dictionary, and most token parsers.

### Tailwind Config
```ts
// tailwind.config.ts — copy tokens/ into your project
import tokens from './tokens/default-tailwind'
export default tokens
```
[`tokens/default-tailwind.ts`](./tokens/default-tailwind.ts) — drop-in Tailwind config with colors, font sizes, spacing, shadows, and border radii.

---

## Modules

| Module | Description |
|---|---|
| **Color Tokens** | Input a brand hex → auto-generate 11-stop tonal scale (50–950) → edit 13 semantic colors (primary, surface, text, success/warning/error/info) → dark theme pair for every token. Image color extraction: upload a brand image to auto-detect the palette. |
| **Typography** | Tabular editor for 6-level type scale. Inline edit font family, size, weight, line height, and letter spacing. |
| **Spacing & Effects** | Spacing scale (xs–4xl), shadow elevations with live preview boxes, border radius system with visual swatches. |
| **Accessibility** | WCAG 2.x contrast ratio live checker (AA/AAA PASS/FAIL badges). Color vision deficiency simulation (protanopia, deuteranopia, tritanopia, achromatopsia). Full palette contrast audit table. |
| **Export** | 6 formats: CSS Variables, Tailwind Config, SCSS, W3C JSON, SwiftUI Colors, Flutter ThemeData. One-click copy. |

## Project Structure

```text
design-token-studio/
├── tokens/                     # Ready-to-use exported token files
│   ├── default-theme.json      # W3C DTCG format
│   ├── default-colors.css      # CSS custom properties (light + dark)
│   └── default-tailwind.ts     # Tailwind config
├── src/
│   ├── data/tokens.ts          # Token store & defaults
│   ├── pages/
│   │   ├── Dashboard.tsx       # Home — palette preview + nav
│   │   ├── ColorTokens.tsx     # Brand wizard + tonal scale + semantic grid
│   │   ├── TypographyTokens.tsx # Tabular type scale editor
│   │   ├── SpacingTokens.tsx   # Spacing / shadow / radius
│   │   ├── AccessiblePage.tsx  # WCAG + CVD + audit
│   │   └── ExportPage.tsx      # 6-format code export
│   ├── i18n/
│   ├── App.tsx
│   └── main.tsx
├── docs/preview.svg
└── .github/workflows/deploy.yml
```

## Quick Start

```bash
git clone https://github.com/lov-alt/design-token-studio.git
cd design-token-studio
npm install
npm run dev          # http://localhost:5173
```

## Ecosystem

```
Design Token Studio ──→ CSS Visual Toolbox ──→ Typography Lab
   (design source)       (visual CSS editor)     (layout generator)
```

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · W3C DTCG

## License

MIT
