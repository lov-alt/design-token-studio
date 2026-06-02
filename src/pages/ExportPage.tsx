import { useState } from "react";
import { createDefaultStore } from "../data/tokens";

type Format = "css" | "tailwind" | "scss" | "json" | "swiftui" | "flutter";

const LABELS: Record<Format, string> = { css: "CSS", tailwind: "Tailwind", scss: "SCSS", json: "JSON", swiftui: "SwiftUI", flutter: "Flutter" };

export default function ExportPage() {
  const [store] = useState(createDefaultStore);
  const [fmt, setFmt] = useState<Format>("css");
  const [copied, setCopied] = useState(false);

  const gen: Record<Format, string> = {
    css: `:root {\n${store.colors.map((c) => `  --color-${c.name}: ${c.lightValue};`).join("\n")}\n\n${store.typography.map((t) => `  --font-${t.name}: ${t.fontWeight} ${t.fontSize}/${t.lineHeight} ${t.fontFamily};`).join("\n")}\n\n${Object.entries(store.spacing).map(([k, v]) => `  --spacing-${k}: ${v};`).join("\n")}\n}\n\n.dark {\n${store.colors.map((c) => `  --color-${c.name}: ${c.darkValue};`).join("\n")}\n}`,
    tailwind: `export default {\n  theme: {\n    extend: {\n      colors: {\n${store.colors.map((c) => `        '${c.name}': '${c.lightValue}',`).join("\n")}\n      },\n      fontSize: {\n${store.typography.map((t) => `        '${t.name}': ['${t.fontSize}', { lineHeight: '${t.lineHeight}', fontWeight: '${t.fontWeight}' }],`).join("\n")}\n      },\n    },\n  },\n};`,
    scss: store.colors.map((c) => `$${c.name}: ${c.lightValue};`).join("\n"),
    json: JSON.stringify({ color: Object.fromEntries(store.colors.map((c) => [c.name, { light: c.lightValue, dark: c.darkValue }])), typography: store.typography.map((t) => ({ name: t.name, fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, lineHeight: t.lineHeight })), spacing: store.spacing }, null, 2),
    swiftui: `import SwiftUI\n\nextension Color {\n${store.colors.map((c) => `  static let ${c.name} = Color(hex: "${c.lightValue}")`).join("\n")}\n}`,
    flutter: `import 'package:flutter/material.dart';\n\nclass AppColors {\n${store.colors.map((c) => `  static const ${c.name} = Color(${c.lightValue.replace("#", "0xFF")});`).join("\n")}\n}`,
  };

  const code = gen[fmt];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 48 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, color: "#f4f4f5", margin: "0 0 4px" }}>Export</h1>
      <p style={{ fontSize: 12, color: "#71717a", margin: "0 0 24px" }}>Multi-framework format export</p>

      <div style={{ borderRadius: 16, border: "1px solid #27272a", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid #27272a" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {(Object.keys(LABELS) as Format[]).map((f) => (
              <button key={f} onClick={() => setFmt(f)}
                style={{ padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: "pointer", border: "none", background: fmt === f ? "#6366f1" : "transparent", color: fmt === f ? "#fff" : "#71717a" }}>
                {LABELS[f]}
              </button>
            ))}
          </div>
          <button onClick={async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
            style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: "pointer", border: "none", background: "#6366f1", color: "#fff" }}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre style={{ padding: 20, margin: 0, fontSize: 12, fontFamily: "monospace", color: "#e4e4e7", lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre-wrap" }}><code>{code}</code></pre>
      </div>
    </div>
  );
}
