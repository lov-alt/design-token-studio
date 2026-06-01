import { useState } from "react";
import { Link } from "react-router-dom";
import { createDefaultStore } from "../data/tokens";

const modules = [
  { path: "/colors", label: "Colors", icon: "◉", desc: "Brand colors, semantic tokens, tonal scales", color: "from-indigo-500 to-violet-500" },
  { path: "/typography", label: "Typography", icon: "T", desc: "Font families, type scale, responsive sizes", color: "from-emerald-500 to-teal-500" },
  { path: "/spacing", label: "Spacing", icon: "↔", desc: "Spacing scale, shadows, border radius", color: "from-amber-500 to-orange-500" },
  { path: "/accessible", label: "Accessibility", icon: "♿", desc: "Contrast check, color-blind simulation, audit", color: "from-rose-500 to-pink-500" },
  { path: "/export", label: "Export", icon: "↓", desc: "CSS, Tailwind, SCSS, JSON, SwiftUI, Flutter", color: "from-sky-500 to-cyan-500" },
];

export default function Dashboard() {
  const [store] = useState(() => createDefaultStore());

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          {store.name}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {store.colors.length} colors · {store.typography.length} type styles · {Object.keys(store.spacing).length} spacing tokens
        </p>
      </div>

      {/* Quick color preview */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Color Palette</h2>
        <div className="flex gap-2 flex-wrap">
          {store.colors.slice(0, 13).map((c) => (
            <div key={c.id} className="group relative">
              <div className="w-10 h-10 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 transition-transform hover:scale-110"
                style={{ background: c.lightValue }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {modules.map((m) => (
          <Link key={m.path} to={m.path}
            className="group flex gap-4 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
              {m.icon}
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {m.label}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
