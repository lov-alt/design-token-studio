import { createContext, useContext, useState, type ReactNode } from "react";
import zh from "./zh";
import en from "./en";
import type { Translations } from "./zh";

const LOCALES = { zh, en } as const;
type Locale = keyof typeof LOCALES;

interface Ctx { locale: Locale; t: Translations; setLocale: (l: Locale) => void; available: { key: Locale; label: string }[] }
const Ctx = createContext<Ctx>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    navigator.language.startsWith("zh") ? "zh" : "en"
  );
  const available = [
    { key: "zh" as const, label: "中文" },
    { key: "en" as const, label: "English" },
  ];
  return <Ctx value={{ locale, t: LOCALES[locale], setLocale, available }}>{children}</Ctx>;
}

export function useI18n() { return useContext(Ctx); }
