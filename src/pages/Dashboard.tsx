import { Link } from "react-router-dom";
import { createDefaultStore } from "../data/tokens";

const SECTIONS = [
  { path: "/colors", label: "Colors", icon: "◉", color: "bg-indigo-500", desc: "Brand wizard · Tonal scale · Semantic tokens · Dark theme · Image extraction" },
  { path: "/typography", label: "Typography", icon: "T", color: "bg-emerald-500", desc: "6-level type scale editor — font family, size, weight, spacing" },
  { path: "/spacing", label: "Spacing & Effects", icon: "↔", color: "bg-amber-500", desc: "Spacing scale · Shadow elevations with preview · Border radius" },
  { path: "/accessible", label: "Accessibility", icon: "♿", color: "bg-rose-500", desc: "WCAG contrast checker · CVD simulation · Palette audit" },
  { path: "/export", label: "Export", icon: "↓", color: "bg-sky-500", desc: "CSS · Tailwind · SCSS · JSON · SwiftUI · Flutter" },
];

export default function Dashboard() {
  const store = createDefaultStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
        Design Token Studio
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
        {store.colors.length} colors · {store.typography.length} type styles · {Object.keys(store.spacing).length} spacing tokens
      </p>

      {/* Color preview */}
      <h2 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-3">Colors</h2>
      <div className="flex gap-2 flex-wrap mb-10">
        {store.colors.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:scale-110 transition-transform"
              style={{ background: c.lightValue }} />
            <span className="text-[9px] text-zinc-400">{c.name}</span>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTIONS.map((m) => (
          <Link key={m.path} to={m.path}
            className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <div className={`w-10 h-10 shrink-0 rounded-xl ${m.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
              {m.icon}
            </div>
            <div>
              <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{m.label}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
