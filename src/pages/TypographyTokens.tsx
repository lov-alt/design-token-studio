import { useState } from "react";
import { createDefaultStore } from "../data/tokens";

const FIELDS = [
  { key: "fontFamily" as const, label: "Font Family", w: "1fr" },
  { key: "fontSize" as const, label: "Size", w: "90px" },
  { key: "fontWeight" as const, label: "Weight", w: "70px" },
  { key: "lineHeight" as const, label: "Leading", w: "70px" },
  { key: "letterSpacing" as const, label: "Tracking", w: "80px" },
];

export default function TypographyTokens() {
  const [store, setStore] = useState(createDefaultStore);

  const update = (id: string, field: string, val: string | number) => {
    setStore((s) => ({ ...s, typography: s.typography.map((ty) => (ty.id === id ? { ...ty, [field]: val } : ty)) }));
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 48 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, color: "#f4f4f5", margin: "0 0 4px" }}>Typography Tokens</h1>
      <p style={{ fontSize: 12, color: "#71717a", margin: "0 0 32px" }}>Font families, type scale, weights, line height, letter spacing</p>

      <div style={{ borderRadius: 16, border: "1px solid #27272a", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: `120px repeat(${FIELDS.length}, 1fr)`, gap: 8, padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid #27272a" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Role</span>
          {FIELDS.map((f) => <span key={f.key} style={{ fontSize: 10, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em" }}>{f.label}</span>)}
        </div>

        {store.typography.map((ty) => (
          <div key={ty.id} style={{ display: "grid", gridTemplateColumns: `120px repeat(${FIELDS.length}, 1fr)`, gap: 8, padding: "14px 20px", borderBottom: "1px solid #27272a22", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: "#e4e4e7", fontWeight: 500 }}>{ty.role}</div>
              <div style={{ fontSize: 10, color: "#52525b", fontFamily: "monospace" }}>{ty.name}</div>
            </div>
            <input value={ty.fontFamily} onChange={(e) => update(ty.id, "fontFamily", e.target.value)}
              style={{ padding: "6px 8px", fontSize: 11, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace" }} />
            <input value={ty.fontSize} onChange={(e) => update(ty.id, "fontSize", e.target.value)}
              style={{ padding: "6px 8px", fontSize: 11, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", textAlign: "center" }} />
            <input type="number" value={ty.fontWeight} onChange={(e) => update(ty.id, "fontWeight", Number(e.target.value))}
              style={{ padding: "6px 8px", fontSize: 11, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", textAlign: "center" }} />
            <input type="number" step={0.1} value={ty.lineHeight} onChange={(e) => update(ty.id, "lineHeight", Number(e.target.value))}
              style={{ padding: "6px 8px", fontSize: 11, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", textAlign: "center" }} />
            <input value={ty.letterSpacing} onChange={(e) => update(ty.id, "letterSpacing", e.target.value)}
              style={{ padding: "6px 8px", fontSize: 11, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", textAlign: "center" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
