import { useState } from "react";
import { createDefaultStore } from "../data/tokens";

const cardStyle: React.CSSProperties = {
  borderRadius: 16, border: "1px solid #27272a",
  padding: 24, background: "linear-gradient(135deg, #18181b, #1e1e2e)",
  marginBottom: 20,
};

const labelStyle: React.CSSProperties = { fontSize: 10, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 };
const inputStyle: React.CSSProperties = { padding: "8px 10px", fontSize: 12, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", flex: 1 };
const keyStyle: React.CSSProperties = { fontSize: 12, color: "#71717a", fontFamily: "monospace", width: 32 };

export default function SpacingTokens() {
  const [store, setStore] = useState(createDefaultStore);

  const uSpacing = (k: string, v: string) => setStore((s) => ({ ...s, spacing: { ...s.spacing, [k]: v } }));
  const uShadow = (k: string, v: string) => setStore((s) => ({ ...s, shadows: { ...s.shadows, [k]: v } }));
  const uRadius = (k: string, v: string) => setStore((s) => ({ ...s, borderRadius: { ...s.borderRadius, [k]: v } }));

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 48 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, color: "#f4f4f5", margin: "0 0 4px" }}>Spacing & Effects</h1>
      <p style={{ fontSize: 12, color: "#71717a", margin: "0 0 32px" }}>Spacing system, shadow elevations, corner radii</p>

      {/* Spacing */}
      <div style={cardStyle}>
        <div style={labelStyle}>Spacing</div>
        {Object.entries(store.spacing).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={keyStyle}>{k}</span>
            <input value={v} onChange={(e) => uSpacing(k, e.target.value)} style={inputStyle} />
          </div>
        ))}
      </div>

      {/* Shadows */}
      <div style={cardStyle}>
        <div style={labelStyle}>Shadows</div>
        {Object.entries(store.shadows).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={keyStyle}>{k}</span>
            <input value={v} onChange={(e) => uShadow(k, e.target.value)} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          {Object.entries(store.shadows).map(([k, v]) => (
            <div key={k} style={{ flex: 1, padding: 16, borderRadius: 12, background: "#1e1e2e", textAlign: "center", boxShadow: v }}>
              <span style={{ fontSize: 10, color: "#71717a", fontFamily: "monospace" }}>{k}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div style={cardStyle}>
        <div style={labelStyle}>Border Radius</div>
        {Object.entries(store.borderRadius).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={keyStyle}>{k}</span>
            <input value={v} onChange={(e) => uRadius(k, e.target.value)} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          {Object.entries(store.borderRadius).map(([k, v]) => (
            <div key={k} style={{ width: 40, height: 40, background: "#6366f1", borderRadius: v, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 8, color: "#fff", fontFamily: "monospace" }}>{k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
