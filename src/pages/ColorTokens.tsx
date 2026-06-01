import { useState } from "react";
import { createDefaultStore } from "../data/tokens";
import { useI18n } from "../i18n/index";

const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function toHex(r: number, g: number, b: number) { return "#" + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join(""); }

function parseHex(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

function generateTonalScale(hex: string): Record<number, string> {
  const { r, g, b } = parseHex(hex);
  const w = { r: 255, g: 255, b: 255 }, bk = { r: 0, g: 0, b: 0 };
  const result: Record<number, string> = {};
  for (const s of STOPS) {
    const [from, to, t] = s < 500
      ? [w, { r, g, b }, 1 - s / 500 * 0.85]
      : [{ r, g, b }, bk, (s - 500) / 500 * 0.9];
    result[s] = toHex(lerp(from.r, to.r, t), lerp(from.g, to.g, t), lerp(from.b, to.b, t));
  }
  return result;
}

export default function ColorTokens() {
  const { t } = useI18n();
  const [store, setStore] = useState(createDefaultStore);
  const [brandHex, setBrandHex] = useState("#6366f1");
  const [scale, setScale] = useState(() => generateTonalScale("#6366f1"));
  const [extracted, setExtracted] = useState<string[]>([]);

  const updateColor = (id: string, field: "lightValue" | "darkValue", val: string) => {
    setStore((s) => ({ ...s, colors: s.colors.map((c) => (c.id === id ? { ...c, [field]: val } : c)) }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 80; canvas.height = 80;
      ctx?.drawImage(img, 0, 0, 80, 80);
      const data = ctx?.getImageData(0, 0, 80, 80).data;
      if (!data) return;
      const map = new Map<string, number>();
      for (let i = 0; i < data.length; i += 16) {
        const h = toHex(data[i], data[i + 1], data[i + 2]);
        map.set(h, (map.get(h) ?? 0) + 1);
      }
      const top5 = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c);
      setExtracted(top5);
      setBrandHex(top5[0]);
      setScale(generateTonalScale(top5[0]));
    };
    img.src = URL.createObjectURL(f);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">{t.colors.title}</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t.colors.desc}</p>
      </div>

      {/* Brand Wizard */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{t.colors.brandWizard}</h2>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-zinc-300" style={{ background: brandHex }} />
            <input value={brandHex} onChange={(e) => setBrandHex(e.target.value)}
              placeholder={t.colors.brandPlaceholder}
              className="w-full pl-10 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400" />
          </div>
          <button onClick={() => setScale(generateTonalScale(brandHex))}
            className="px-4 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors">{t.colors.generate}</button>
        </div>

        {extracted.length > 0 && (
          <div className="flex gap-2 items-center mb-4">
            <span className="text-[10px] text-zinc-400">From image:</span>
            {extracted.map((c) => (
              <button key={c} onClick={() => { setBrandHex(c); setScale(generateTonalScale(c)); }}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-700 shadow-sm hover:scale-125 transition-transform" style={{ background: c }} />
            ))}
          </div>
        )}

        <label className="flex items-center justify-center w-full py-8 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-400 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer transition-colors text-sm">
          {t.colors.dropImage}
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      </div>

      {/* Tonal Scale */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{t.colors.tonalScale}</h2>
        <div className="flex rounded-xl overflow-hidden h-20">
          {STOPS.map((s) => (
            <div key={s} className="flex-1 flex items-end justify-center pb-1" style={{ background: scale[s] }}>
              <span className="text-[8px] text-white mix-blend-difference opacity-60">{s}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-1 mt-3">
          {STOPS.map((s) => (
            <input key={s} value={scale[s]}
              onChange={(e) => setScale((p) => (p ? { ...p, [s]: e.target.value } : null))}
              className="w-full px-1 py-1 text-[9px] font-mono rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-center focus:outline-none focus:border-indigo-400" />
          ))}
        </div>
      </div>

      {/* Semantic tokens */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
        <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{t.colors.semantic}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {store.colors.map((c) => (
            <div key={c.id} className="space-y-1.5">
              <span className="text-[10px] text-zinc-400">{c.role}</span>
              <div className="flex gap-1.5">
                <div className="flex-1">
                  <div className="w-full h-8 rounded-lg border border-zinc-200 dark:border-zinc-800" style={{ background: c.lightValue }} />
                  <input value={c.lightValue} onChange={(e) => updateColor(c.id, "lightValue", e.target.value)}
                    className="w-full mt-1 px-1 py-0.5 text-[9px] font-mono rounded border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-center focus:outline-none focus:border-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="w-full h-8 rounded-lg border border-zinc-800" style={{ background: c.darkValue }} />
                  <input value={c.darkValue} onChange={(e) => updateColor(c.id, "darkValue", e.target.value)}
                    className="w-full mt-1 px-1 py-0.5 text-[9px] font-mono rounded border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-center focus:outline-none focus:border-indigo-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
