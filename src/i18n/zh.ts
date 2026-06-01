const zh = {
  app: { title: "Design Token Studio" },
  dashboard: { subtitle: "{n} colors · {t} type styles · {s} spacing tokens" },
  nav: {
    colors: "Colors", typography: "Typography", spacing: "Spacing",
    accessible: "Accessibility", export: "Export",
  },
  colors: {
    title: "Color Tokens",
    desc: "品牌色 → 色阶 → 语义色 → 暗色主题",
    brandWizard: "品牌色向导",
    brandPlaceholder: "输入品牌色 hex...",
    generate: "生成色阶",
    tonalScale: "色阶 (Tonal Scale)",
    semantic: "语义色 (Semantic)",
    darkTheme: "暗色主题",
    extractImage: "图片取色",
    dropImage: "拖入品牌图片自动提取主色调",
  },
  typography: {
    title: "Typography Tokens",
    desc: "字体族、字号层级、字重、行高、字间距",
    addType: "+ 添加样式",
  },
  spacing: {
    title: "Spacing & Effects",
    desc: "间距体系、阴影层级、圆角尺度",
    spacing: "间距",
    shadows: "阴影",
    radius: "圆角",
  },
  accessible: {
    title: "Accessibility",
    desc: "对比度检查 · 色觉缺陷模拟 · 无障碍审计",
    fgLabel: "前景色",
    bgLabel: "背景色",
    wcagAA: "AA 级",
    wcagAAA: "AAA 级",
    apca: "APCA",
    cvdSim: "色觉缺陷模拟",
  },
  export: {
    title: "Export",
    desc: "多框架格式导出",
    copyAll: "复制全部",
  },
  code: { copy: "复制", copied: "已复制" },
  common: { back: "← 返回", darkMode: "暗色模式" },
};

export type Translations = typeof zh;
export default zh;
