import { useState, useMemo } from "react";
import { createDefaultStore } from "../data/tokens";

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1), l2 = luminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const CVD: Record<string, string> = {
  protanopia: "url(#none)", deuteranopia: "saturate(0) hue-rotate(180deg)",
  tritanopia: "saturate(0) hue-rotate(90deg)", achromatopsia: "grayscale(1)",
};

export default function AccessiblePage() {
  const [store] = useState(createDefaultStore);
  const [fg, setFg] = useState(store.colors[6].lightValue);
  const [bg, setBg] = useState(store.colors[4].lightValue);
  const [cvd, setCvd] = useState("none");
  const r = ratio(fg, bg);
  const aa = r >= 4.5, aaa = r >= 7;

  const pairs = useMemo(() =>
    [store.colors[6], store.colors[9], store.colors[10], store.colors[11]].map((c) => ({
      name: c.name, fg: c.lightValue, r: ratio(c.lightValue, bg),
    })), [bg, store.colors]);

  const card: React.CSSProperties = { borderRadius: 16, border: "1px solid #27272a", padding: 24, background: "linear-gradient(135deg, #18181b, #1e1e2e)" };
  const inp: React.CSSProperties = { width: "100%", padding: "8px 10px", fontSize: 12, borderRadius: 8, border: "1px solid #27272a", background: "transparent", color: "#e4e4e7", outline: "none", fontFamily: "monospace", boxSizing: "border-box" };
  const badge = (pass: boolean) => ({ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: pass ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: pass ? "#4ade80" : "#f87171" });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 48 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, color: "#f4f4f5", margin: "0 0 4px" }}>Accessibility</h1>
      <p style={{ fontSize: 12, color: "#71717a", margin: "0 0 32px" }}>Contrast check · Color vision deficiency · Palette audit</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Contrast checker */}
        <div style={card}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#52525b", marginBottom: 4 }}>Foreground</div>
              <input value={fg} onChange={(e) => setFg(e.target.value)} style={inp} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#52525b", marginBottom: 4 }}>Background</div>
              <input value={bg} onChange={(e) => setBg(e.target.value)} style={inp} />
            </div>
          </div>
          {/* Preview */}
          <div style={{ padding: 32, borderRadius: 12, textAlign: "center", background: bg, filter: CVD[cvd] || "none", marginBottom: 16 }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: fg, margin: 0 }}>The quick brown fox</p>
            <p style={{ fontSize: 13, color: fg, margin: "4px 0 0", opacity: 0.7 }}>Design is not decoration. It is communication.</p>
          </div>
          {/* Scores */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 12, textAlign: "center", background: aa ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${aa ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: aa ? "#4ade80" : "#f87171", fontFamily: "monospace" }}>{r.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>AA <span style={{ color: "#52525b" }}>≥ 4.5</span></div>
              <div style={badge(aa)}>{aa ? "PASS" : "FAIL"}</div>
            </div>
            <div style={{ flex: 1, padding: 12, borderRadius: 12, textAlign: "center", background: aaa ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${aaa ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: aaa ? "#4ade80" : "#f87171", fontFamily: "monospace" }}>{r.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>AAA <span style={{ color: "#52525b" }}>≥ 7</span></div>
              <div style={badge(aaa)}>{aaa ? "PASS" : "FAIL"}</div>
            </div>
          </div>
          {/* CVD */}
          <div style={{ marginTop: 12 }}>
            <select value={cvd} onChange={(e) => setCvd(e.target.value)} style={{ ...inp, width: "auto" }}>
              <option value="none">Normal vision</option>
              {Object.keys(CVD).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        {/* Palette audit */}
        <div style={card}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Palette Audit vs Background</div>
          {pairs.map((p) => {
            const pa = p.r >= 4.5, paaa = p.r >= 7;
            return (
              <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#e4e4e7", fontFamily: "monospace" }}>{p.name}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#71717a", fontFamily: "monospace" }}>{p.r.toFixed(1)}</span>
                  <span style={badge(pa)}>AA</span>
                  <span style={badge(paaa)}>AAA</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
