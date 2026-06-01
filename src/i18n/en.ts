import type { Translations } from "./zh";

const en: Translations = {
  app: { title: "Design Token Studio" },
  dashboard: { subtitle: "{n} colors · {t} type styles · {s} spacing tokens" },
  nav: {
    colors: "Colors", typography: "Typography", spacing: "Spacing",
    accessible: "Accessibility", export: "Export",
  },
  colors: {
    title: "Color Tokens",
    desc: "Brand color → tonal scale → semantic tokens → dark theme",
    brandWizard: "Brand Wizard",
    brandPlaceholder: "Enter brand color hex...",
    generate: "Generate Scale",
    tonalScale: "Tonal Scale",
    semantic: "Semantic Colors",
    darkTheme: "Dark Theme",
    extractImage: "Extract from Image",
    dropImage: "Drop a brand image to extract dominant colors",
  },
  typography: {
    title: "Typography Tokens",
    desc: "Font families, type scale, weights, line height, letter spacing",
    addType: "+ Add Style",
  },
  spacing: {
    title: "Spacing & Effects",
    desc: "Spacing system, shadow elevations, corner radii",
    spacing: "Spacing",
    shadows: "Shadows",
    radius: "Border Radius",
  },
  accessible: {
    title: "Accessibility",
    desc: "Contrast check · color-blind simulation · palette audit",
    fgLabel: "Foreground",
    bgLabel: "Background",
    wcagAA: "AA",
    wcagAAA: "AAA",
    apca: "APCA",
    cvdSim: "Color Vision Deficiency",
  },
  export: {
    title: "Export",
    desc: "Multi-framework format export",
    copyAll: "Copy All",
  },
  code: { copy: "Copy", copied: "Copied" },
  common: { back: "← Back", darkMode: "Dark Mode" },
};

export default en;
