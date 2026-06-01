import { useState } from "react";
import { createDefaultStore } from "../data/tokens";
import { useI18n } from "../i18n/index";

const SHADOW_PREVIEWS: Record<string, string> = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
};

export default function SpacingTokens() {
  const { t } = useI18n();
  const [store, setStore] = useState(createDefaultStore);

  const updateSpacing = (key: string, val: string) => {
    setStore((s) => ({ ...s, spacing: { ...s.spacing, [key]: val } }));
  };
  const updateShadow = (key: string, val: string) => {
    setStore((s) => ({ ...s, shadows: { ...s.shadows, [key]: val } }));
  };
  const updateRadius = (key: string, val: string) => {
    setStore((s) => ({ ...s, borderRadius: { ...s.borderRadius, [key]: val } }));
  };

  const section = (label: string, items: Record<string, string>, onUpdate: (k: string, v: string) => void) => (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</h3>
      <div className="space-y-1.5">
        {Object.entries(items).map(([k, v]) => (
          <div key={k} className="flex items-center gap-3">
            <span className="w-8 text-xs font-mono text-zinc-500 dark:text-zinc-400">{k}</span>
            <input value={v}
              onChange={(e) => onUpdate(k, e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{t.spacing.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.spacing.desc}</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          {section(t.spacing.spacing, store.spacing, updateSpacing)}
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          {section(t.spacing.shadows, store.shadows, updateShadow)}
          <div className="mt-4 flex gap-3">
            {Object.entries(SHADOW_PREVIEWS).map(([k, v]) => (
              <div key={k} className="flex-1 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-center" style={{ boxShadow: v }}>
                <span className="text-[10px] font-mono text-zinc-400">{k}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          {section(t.spacing.radius, store.borderRadius, updateRadius)}
          <div className="mt-4 flex gap-3">
            {Object.entries(store.borderRadius).map(([k, v]) => (
              <div key={k} className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center" style={{ borderRadius: v }}>
                <span className="text-[8px] text-white font-mono">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
