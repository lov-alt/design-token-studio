import { useState } from "react";
import { createDefaultStore } from "../data/tokens";
import { useI18n } from "../i18n/index";

type Format = "css" | "tailwind" | "scss" | "json" | "swiftui" | "flutter";

const FORMAT_LABELS: Record<Format, string> = {
  css: "CSS Variables",
  tailwind: "Tailwind Config",
  scss: "SCSS",
  json: "JSON / W3C",
  swiftui: "SwiftUI",
  flutter: "Flutter",
};

function generateExport(store: ReturnType<typeof createDefaultStore>, fmt: Format): string {
  const { colors, typography, spacing, shadows, borderRadius } = store;
  const exporters: Record<Format, () => string> = {
    css: () => [
      ":root {",
      ...colors.map((c) => `  --color-${c.name}: ${c.lightValue};`),
      ...typography.map((t) => `  --font-${t.name}: ${t.fontSize}/${t.lineHeight} ${t.fontFamily};`),
      ...Object.entries(spacing).map(([k, v]) => `  --spacing-${k}: ${v};`),
      ...Object.entries(shadows).map(([k, v]) => `  --shadow-${k}: ${v};`),
      ...Object.entries(borderRadius).map(([k, v]) => `  --radius-${k}: ${v};`),
      "}",
      "",
      ".dark {",
      ...colors.map((c) => `  --color-${c.name}: ${c.darkValue};`),
      "}",
    ].join("\n"),

    tailwind: () => [
      "// tailwind.config.ts",
      "export default {",
      "  theme: {",
      "    extend: {",
      "      colors: {",
      ...colors.map((c) => `        '${c.name}': '${c.lightValue}',`),
      "      },",
      "      fontSize: {",
      ...typography.map((t) => `        '${t.name}': ['${t.fontSize}', { lineHeight: '${t.lineHeight}', letterSpacing: '${t.letterSpacing}' }],`),
      "      },",
      "    },",
      "  },",
      "};",
    ].join("\n"),

    scss: () => [
      ...colors.map((c) => `$${c.name}: ${c.lightValue};`),
      ...Object.entries(spacing).map(([k, v]) => `$spacing-${k}: ${v};`),
    ].join("\n"),

    json: () => JSON.stringify({
      color: Object.fromEntries(colors.map((c) => [c.name, { light: c.lightValue, dark: c.darkValue }])),
      typography: typography.map((t) => ({ name: t.name, fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, lineHeight: t.lineHeight, letterSpacing: t.letterSpacing })),
      spacing,
      shadow: shadows,
      borderRadius,
    }, null, 2),

    swiftui: () => [
      "import SwiftUI",
      "",
      "extension Color {",
      ...colors.map((c) => `  static let ${c.name} = Color(hex: "${c.lightValue}")`),
      "}",
    ].join("\n"),

    flutter: () => [
      "import 'package:flutter/material.dart';",
      "",
      "class AppTheme {",
      "  static const colors = {",
      ...colors.map((c) => `    '${c.name}': Color(${c.lightValue.replace("#", "0xFF")}),`),
      "  };",
      "}",
    ].join("\n"),
  };

  return exporters[fmt]();
}

export default function ExportPage() {
  const { t } = useI18n();
  const [store] = useState(createDefaultStore);
  const [fmt, setFmt] = useState<Format>("css");
  const [copied, setCopied] = useState(false);

  const code = generateExport(store, fmt);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{t.export.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.export.desc}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-0.5 flex-wrap">
            {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
              <button key={f} type="button" onClick={() => setFmt(f)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                  fmt === f ? "bg-indigo-600 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}>{FORMAT_LABELS[f]}</button>
            ))}
          </div>
          <button type="button" onClick={copy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all ml-2">
            {copied ? t.code.copied : t.code.copy}
          </button>
        </div>
        <pre className="p-5 text-sm text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
