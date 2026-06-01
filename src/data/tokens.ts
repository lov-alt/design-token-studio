export interface ColorToken {
  id: string;
  role: string;
  name: string;
  lightValue: string;
  darkValue: string;
  description?: string;
}

export interface TypographyToken {
  id: string;
  role: string;
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
}

export interface TokenStore {
  id: string;
  name: string;
  version: string;
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

export function createDefaultStore(): TokenStore {
  return {
    id: "default",
    name: "Untitled Theme",
    version: "1.0.0",
    colors: [
      { id: "primary", role: "Primary", name: "primary", lightValue: "#6366f1", darkValue: "#818cf8" },
      { id: "primary-hover", role: "Primary Hover", name: "primary-hover", lightValue: "#4f46e5", darkValue: "#6366f1" },
      { id: "primary-light", role: "Primary Light", name: "primary-light", lightValue: "#eef2ff", darkValue: "#1e1b4b" },
      { id: "secondary", role: "Secondary", name: "secondary", lightValue: "#ec4899", darkValue: "#f472b6" },
      { id: "surface", role: "Surface", name: "surface", lightValue: "#ffffff", darkValue: "#0f0f1a" },
      { id: "surface-alt", role: "Surface Alt", name: "surface-alt", lightValue: "#f8fafc", darkValue: "#1a1a2e" },
      { id: "text", role: "Text", name: "text", lightValue: "#18181b", darkValue: "#f4f4f5" },
      { id: "text-secondary", role: "Text Secondary", name: "text-secondary", lightValue: "#71717a", darkValue: "#a1a1aa" },
      { id: "border", role: "Border", name: "border", lightValue: "#e4e4e7", darkValue: "#27272a" },
      { id: "success", role: "Success", name: "success", lightValue: "#22c55e", darkValue: "#4ade80" },
      { id: "warning", role: "Warning", name: "warning", lightValue: "#f59e0b", darkValue: "#fbbf24" },
      { id: "error", role: "Error", name: "error", lightValue: "#ef4444", darkValue: "#f87171" },
      { id: "info", role: "Info", name: "info", lightValue: "#3b82f6", darkValue: "#60a5fa" },
    ],
    typography: [
      { id: "h1", role: "Heading 1", name: "h1", fontFamily: "Inter, sans-serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" },
      { id: "h2", role: "Heading 2", name: "h2", fontFamily: "Inter, sans-serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.015em" },
      { id: "h3", role: "Heading 3", name: "h3", fontFamily: "Inter, sans-serif", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
      { id: "body", role: "Body", name: "body", fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 400, lineHeight: 1.6, letterSpacing: "0" },
      { id: "body-small", role: "Body Small", name: "body-small", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, letterSpacing: "0" },
      { id: "caption", role: "Caption", name: "caption", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.01em" },
    ],
    spacing: {
      xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem",
      "2xl": "3rem", "3xl": "4rem", "4xl": "6rem",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    },
    borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
  };
}
