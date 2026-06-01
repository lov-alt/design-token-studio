import { useState } from "react";
import { createDefaultStore } from "../data/tokens";
import { useI18n } from "../i18n/index";

const FIELDS = [
  { key: "fontFamily" as const, label: "Font Family", w: "col-span-4" },
  { key: "fontSize" as const, label: "Size", w: "col-span-2" },
  { key: "fontWeight" as const, label: "Weight", w: "col-span-2" },
  { key: "lineHeight" as const, label: "Leading", w: "col-span-2" },
  { key: "letterSpacing" as const, label: "Tracking", w: "col-span-2" },
];

export default function TypographyTokens() {
  const { t } = useI18n();
  const [store, setStore] = useState(createDefaultStore);

  const update = (id: string, field: string, val: string | number) => {
    setStore((s) => ({
      ...s,
      typography: s.typography.map((ty) => (ty.id === id ? { ...ty, [field]: val } : ty)),
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{t.typography.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.typography.desc}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
          <div className="col-span-2">Role</div>
          {FIELDS.map((f) => <div key={f.key} className={f.w}>{f.label}</div>)}
        </div>

        {/* Table body */}
        {store.typography.map((ty) => (
          <div key={ty.id} className="grid grid-cols-12 gap-2 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 items-center hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
            <div className="col-span-2">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{ty.role}</p>
              <p className="text-[10px] text-zinc-400">{ty.name}</p>
            </div>
            <input
              value={ty.fontFamily}
              onChange={(e) => update(ty.id, "fontFamily", e.target.value)}
              className="col-span-4 px-2 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400"
            />
            <input
              value={ty.fontSize}
              onChange={(e) => update(ty.id, "fontSize", e.target.value)}
              className="col-span-2 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400"
            />
            <input
              type="number"
              value={ty.fontWeight}
              onChange={(e) => update(ty.id, "fontWeight", Number(e.target.value))}
              className="col-span-2 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400"
            />
            <input
              type="number"
              step={0.1}
              value={ty.lineHeight}
              onChange={(e) => update(ty.id, "lineHeight", Number(e.target.value))}
              className="col-span-2 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400"
            />
            <input
              value={ty.letterSpacing}
              onChange={(e) => update(ty.id, "letterSpacing", e.target.value)}
              className="col-span-2 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
