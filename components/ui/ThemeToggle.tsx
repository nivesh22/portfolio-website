"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { buildThemeCss, getTheme, listThemes } from "@/lib/theme";

const DARK_THEME = "default-dark";
const ENV_LIGHT_THEME = process.env.NEXT_PUBLIC_LIGHT_THEME;
const TOGGLE_MODE = (process.env.NEXT_PUBLIC_THEME_TOGGLE_MODE || "").toLowerCase(); // "all" or "limited"
const IS_PROD = process.env.NODE_ENV === "production";

function applyTheme(name: string) {
  if (typeof document === "undefined") return;
  const css = buildThemeCss(getTheme(name));
  const el = document.getElementById("theme-css");
  if (el) el.innerHTML = css;
  window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme: name } }));
}

export default function ThemeToggle() {
  const themes = useMemo(() => listThemes(), []);

  const lightTheme = useMemo(() => {
    if (ENV_LIGHT_THEME && themes.some((t) => t.toLowerCase() === ENV_LIGHT_THEME.toLowerCase())) {
      return ENV_LIGHT_THEME;
    }
    const lightCandidate = themes.find((t) => getTheme(t).colorScheme === "light");
    return lightCandidate ?? themes[0];
  }, [themes]);

  const useLimited = TOGGLE_MODE === "limited" || (!TOGGLE_MODE && (IS_PROD || !!ENV_LIGHT_THEME));
  const allowedThemes = useMemo(
    () => (useLimited ? [DARK_THEME, lightTheme].filter(Boolean) : themes),
    [useLimited, lightTheme, themes],
  );
  const normalized = useMemo(() => allowedThemes.map((t) => t.toLowerCase()), [allowedThemes]);

  const fallbackTheme = allowedThemes[0] ?? DARK_THEME;
  const initialTheme = useMemo(() => {
    if (typeof window === "undefined") return fallbackTheme;
    const stored = window.localStorage.getItem("theme-name");
    if (stored) {
      const idx = normalized.indexOf(stored.toLowerCase());
      if (idx >= 0) return allowedThemes[idx]!;
    }
    return fallbackTheme;
  }, [allowedThemes, normalized, fallbackTheme]);

  const [theme, setTheme] = useState<string>(initialTheme);
  const lastToggleTs = useRef(0);

  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") window.localStorage.setItem("theme-name", theme);
  }, [theme]);

  const handleToggle = () => {
    const now = Date.now();
    if (now - lastToggleTs.current < 250) return; // guard rapid double-fires
    lastToggleTs.current = now;
    if (allowedThemes.length < 2) return;
    setTheme((curr) => {
      const idx = normalized.indexOf(curr.toLowerCase());
      const safeIdx = idx >= 0 ? idx : 0;
      return allowedThemes[(safeIdx + 1) % allowedThemes.length];
    });
  };

  const isLight = useLimited ? theme !== DARK_THEME : false;

  if (useLimited) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className="fixed top-3 right-3 z-[60] rounded-full bg-[color:var(--bg-2)] text-[color:var(--text-0)] border border-[color:var(--card-border)] p-2 shadow-hover hover:-translate-y-0.5 transition"
        title={isLight ? `Switch to ${DARK_THEME}` : `Switch to ${lightTheme}`}
        aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      >
        {isLight ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed top-3 right-3 z-[60] rounded-md bg-[color:var(--bg-2)] text-[color:var(--text-0)] border border-[color:var(--card-border)] px-3 py-1 text-xs shadow-hover hover:-translate-y-0.5 transition"
      title="Switch theme"
    >
      Theme
    </button>
  );
}
