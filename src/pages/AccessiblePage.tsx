import { useState, useMemo } from "react";
import { createDefaultStore } from "../data/tokens";
import { useI18n } from "../i18n/index";

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagGrade(ratio: number): { aa: boolean; aaa: boolean } {
  return { aa: ratio >= 4.5, aaa: ratio >= 7 };
}

const CVD_FILTERS: Record<string, string> = {
  protanopia: "grayscale(0) sepia(0) hue-rotate(0deg)",
  deuteranopia: "grayscale(0) sepia(0) hue-rotate(180deg)",
  tritanopia: "grayscale(0) sepia(0) hue-rotate(90deg)",
  achromatopsia: "grayscale(1)",
};

export default function AccessiblePage() {
  const { t } = useI18n();
  const [store] = useState(createDefaultStore);
  const [fg, setFg] = useState(store.colors[6].lightValue); // text
  const [bg, setBg] = useState(store.colors[4].lightValue); // surface
  const [cvd, setCvd] = useState("none");

  const ratio = contrastRatio(fg, bg);
  const grade = wcagGrade(ratio);
  const filter = CVD_FILTERS[cvd] ?? "none";

  const pairs = useMemo(() =>
    [store.colors[6], store.colors[9], store.colors[10], store.colors[11]].map((c) => ({
      name: c.name,
      fg: c.lightValue,
      ratio: contrastRatio(c.lightValue, bg),
    }))
  , [bg, store.colors]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{t.accessible.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.accessible.desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contrast checker */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] text-zinc-400 block mb-1">{t.accessible.fgLabel}</label>
              <input value={fg} onChange={(e) => setFg(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-zinc-400 block mb-1">{t.accessible.bgLabel}</label>
              <input value={bg} onChange={(e) => setBg(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400" />
            </div>
          </div>

          {/* Preview */}
          <div className="p-8 rounded-xl text-center transition-all" style={{ background: bg, filter }}>
            <p className="text-lg font-semibold" style={{ color: fg }}>The quick brown fox</p>
            <p className="text-sm mt-1" style={{ color: fg }}>Design is not decoration. It is communication.</p>
          </div>

          {/* Scores */}
          <div className="flex gap-3">
            <Badge label={t.accessible.wcagAA} pass={grade.aa} value={ratio.toFixed(1)} threshold="≥ 4.5" />
            <Badge label={t.accessible.wcagAAA} pass={grade.aaa} value={ratio.toFixed(1)} threshold="≥ 7" />
          </div>

          {/* CVD sim */}
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">{t.accessible.cvdSim}</label>
            <select value={cvd} onChange={(e) => setCvd(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400">
              <option value="none">Normal vision</option>
              {Object.keys(CVD_FILTERS).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        {/* Palette audit */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Palette Contrast Audit</h3>
          <div className="space-y-1.5">
            {pairs.map((p) => {
              const g = wcagGrade(p.ratio);
              return (
                <div key={p.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{p.name}</span>
                  <div className="flex gap-2">
                    <span className="text-xs font-mono tabular-nums text-zinc-500">{p.ratio.toFixed(1)}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${g.aa ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>AA</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${g.aaa ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>AAA</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, pass, value, threshold }: { label: string; pass: boolean; value: string; threshold: string }) {
  return (
    <div className={`flex-1 p-3 rounded-xl text-center ${pass ? "bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-800" : "bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-800"}`}>
      <div className={`text-lg font-bold font-mono ${pass ? "text-emerald-600" : "text-rose-600"}`}>{value}</div>
      <div className="text-[10px] text-zinc-500 mt-0.5">{label} <span className="text-zinc-400">{threshold}</span></div>
      <div className={`text-[11px] font-medium mt-1 ${pass ? "text-emerald-600" : "text-rose-600"}`}>{pass ? "PASS" : "FAIL"}</div>
    </div>
  );
}
