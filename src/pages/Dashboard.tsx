import { Link } from "react-router-dom";
import { createDefaultStore } from "../data/tokens";

const CARDS = [
  { path: "/colors", label: "Colors", icon: "◉", color: "#6366f1", desc: "Brand wizard · Tonal scale · Semantic tokens · Dark theme · Image extraction" },
  { path: "/typography", label: "Typography", icon: "T", color: "#10b981", desc: "6-level type scale editor — font family, size, weight, spacing" },
  { path: "/spacing", label: "Spacing & Effects", icon: "↔", color: "#f59e0b", desc: "Spacing scale · Shadow elevations with preview · Border radius" },
  { path: "/accessible", label: "Accessibility", icon: "♿", color: "#ef4444", desc: "WCAG contrast checker · CVD simulation · Palette audit" },
  { path: "/export", label: "Export", icon: "↓", color: "#0ea5e9", desc: "CSS · Tailwind · SCSS · JSON · SwiftUI · Flutter" },
];

export default function Dashboard() {
  const store = createDefaultStore();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 300, color: "#f4f4f5", margin: "0 0 4px", letterSpacing: "-0.01em" }}>Design Token Studio</h1>
      <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 40px" }}>
        {store.colors.length} colors · {store.typography.length} type styles · {Object.keys(store.spacing).length} spacing tokens
      </p>

      {/* Color palette bar */}
      <h3 style={{ fontSize: 10, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Colors</h3>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 40 }}>
        {store.colors.map((c) => (
          <div key={c.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: c.lightValue, boxShadow: `0 2px 8px ${c.lightValue}40`, transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
            <span style={{ fontSize: 9, color: "#71717a" }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {CARDS.map((m) => (
          <Link key={m.path} to={m.path} style={{
            display: "flex", alignItems: "flex-start", gap: 16, padding: 20,
            borderRadius: 16, border: "1px solid #27272a",
            background: "linear-gradient(135deg, #18181b 0%, #1a1a2e 100%)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${m.color}20`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", flexShrink: 0, boxShadow: `0 4px 12px ${m.color}40` }}>
              {m.icon}
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f4f4f5", margin: "0 0 4px" }}>{m.label}</h3>
              <p style={{ fontSize: 12, color: "#71717a", margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
