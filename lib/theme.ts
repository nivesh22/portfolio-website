import themesJson from "@/data/themes.json";

type ColorScheme = "light" | "dark";

export type ThemeConfig = {
  name: string;
  colorScheme?: ColorScheme;
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    primary: string;
    accent: string;
    textMain: string;
    textMuted: string;
    borderSubtle: string;
    success: string;
    warning: string;
    error: string;
  };
  svgPalette?: string[];
  animations?: {
    spinSlow?: string;
    spinSlower?: string;
    dash?: string;
  };
  shadows?: {
    card?: string;
    cardHover?: string;
    primary?: string;
    primaryHover?: string;
  };
  surfaces?: {
    cardBg?: string;
    cardBorder?: string;
    badgeBg?: string;
    badgeBorder?: string;
  };
  controls?: {
    buttonBg?: string;
    buttonText?: string;
    buttonBorder?: string;
    buttonBgHover?: string;
    buttonBorderHover?: string;
    outlineText?: string;
    ghostHoverBg?: string;
  };
  charts?: {
    grid?: string;
    bar?: string;
    barHover?: string;
  };
  ambient?: {
    base?: string;
    blobs?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
      center?: string;
    };
  };
};

const themes = themesJson as ThemeConfig[];
const FALLBACK_THEME = themes[0]!;

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const expanded = normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized;
  const value = parseInt(expanded, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getTheme(themeName?: string | null): ThemeConfig {
  const name = themeName?.trim().toLowerCase();
  const match = themes.find((t) => t.name.toLowerCase() === name);
  if (match) return match;
  return FALLBACK_THEME;
}

export function buildThemeCss(theme: ThemeConfig) {
  const { colors, animations, colorScheme, shadows } = theme;
  const glassBg = hexToRgba(colors.surfaceAlt ?? colors.surface ?? colors.background, 0.9);
  const glassBorder = hexToRgba(colors.borderSubtle, 0.6);
  const linkHoverBg = hexToRgba(colors.primary, 0.12);
  const linkHoverBorder = hexToRgba(colors.primary, 0.3);
  const layer05 = hexToRgba(colors.textMain, 0.05);
  const layer10 = hexToRgba(colors.textMain, 0.1);
  const shadow = shadows?.card ?? "none";
  const shadowHover = shadows?.cardHover ?? shadow;
  const cardBg = theme.surfaces?.cardBg ?? glassBg;
  const cardBorder = theme.surfaces?.cardBorder ?? colors.borderSubtle;
  const badgeBg = theme.surfaces?.badgeBg ?? glassBg;
  const badgeBorder = theme.surfaces?.badgeBorder ?? glassBorder;
  const buttonBg = theme.controls?.buttonBg ?? colors.primary;
  const buttonText = theme.controls?.buttonText ?? "#ffffff";
  const buttonBorder = theme.controls?.buttonBorder ?? hexToRgba(colors.primary, 0.35);
  const buttonBgHover = theme.controls?.buttonBgHover ?? hexToRgba(colors.primary, 0.9);
  const buttonBorderHover = theme.controls?.buttonBorderHover ?? hexToRgba(colors.primary, 0.45);
  const outlineText = theme.controls?.outlineText ?? colors.primary;
  const ghostHoverBg = theme.controls?.ghostHoverBg ?? layer05;
  const chartGrid = theme.charts?.grid ?? colors.borderSubtle;
  const chartBar = theme.charts?.bar ?? colors.primary;
  const chartBarHover = theme.charts?.barHover ?? hexToRgba(colors.primary, 0.8);
  const primaryShadow = shadows?.primary ?? `0 8px 20px ${hexToRgba(colors.primary, 0.35)}`;
  const primaryShadowHover = shadows?.primaryHover ?? `0 12px 28px ${hexToRgba(colors.primary, 0.45)}`;
  const defaultAmbient = colorScheme === "light"
    ? {
        base: "#f6f4ef",
        blobs: {
          topLeft: "rgba(126, 173, 255, 0.09)",
          topRight: "rgba(102, 205, 215, 0.08)",
          bottomLeft: "rgba(138, 188, 145, 0.08)",
          bottomRight: "rgba(162, 174, 192, 0.07)",
          center: "rgba(255, 255, 255, 0.04)",
        },
      }
    : {
        base: "#05070f",
        blobs: {
          topLeft: "rgba(74, 232, 255, 0.08)",
          topRight: "rgba(168, 140, 255, 0.08)",
          bottomLeft: "rgba(120, 220, 170, 0.08)",
          bottomRight: "rgba(148, 163, 184, 0.07)",
          center: "rgba(255, 255, 255, 0.03)",
        },
      };
  const ambientBase = theme.ambient?.base ?? defaultAmbient.base;
  const ambientBlobs = {
    ...defaultAmbient.blobs,
    ...(theme.ambient?.blobs ?? {}),
  };
  const svgPalette = theme.svgPalette && theme.svgPalette.length > 0 ? theme.svgPalette : [
    colors.primary,
    colors.accent,
    colors.success,
    colors.warning,
    colors.textMuted,
  ];
  const css = `
:root {
  --bg-0: ${colors.background};
  --bg-1: ${colors.surface};
  --bg-2: ${colors.surfaceAlt};
  --text-0: ${colors.textMain};
  --text-1: ${colors.textMuted};
  --primary: ${colors.primary};
  --accent: ${colors.accent};
  --success: ${colors.success};
  --warning: ${colors.warning};
  --error: ${colors.error};
  --border-subtle: ${colors.borderSubtle};
  --anim-spin-slow: ${animations?.spinSlow ?? "6s"};
  --anim-spin-slower: ${animations?.spinSlower ?? "12s"};
  --anim-dash: ${animations?.dash ?? "2.5s"};
  --theme-color-scheme: ${colorScheme ?? "dark"};
  ${colorScheme ? `color-scheme: ${colorScheme};` : ""}
  --glass-bg: ${glassBg};
  --glass-border: ${glassBorder};
  --card-bg: ${cardBg};
  --link-hover-bg: ${linkHoverBg};
  --link-hover-border: ${linkHoverBorder};
  --shadow-card: ${shadow};
  --shadow-hover: ${shadowHover};
  --layer-05: ${layer05};
  --layer-10: ${layer10};
  --card-border: ${cardBorder};
  --badge-bg: ${badgeBg};
  --badge-border: ${badgeBorder};
  --btn-bg: ${buttonBg};
  --btn-text: ${buttonText};
  --btn-border: ${buttonBorder};
  --btn-bg-hover: ${buttonBgHover};
  --btn-border-hover: ${buttonBorderHover};
  --btn-outline-text: ${outlineText};
  --btn-ghost-hover-bg: ${ghostHoverBg};
  --chart-grid: ${chartGrid};
  --chart-bar: ${chartBar};
  --chart-bar-hover: ${chartBarHover};
  --shadow-primary: ${primaryShadow};
  --shadow-primary-hover: ${primaryShadowHover};
  --svg-1: ${svgPalette[0] ?? colors.primary};
  --svg-2: ${svgPalette[1] ?? colors.accent};
  --svg-3: ${svgPalette[2] ?? colors.success};
  --svg-4: ${svgPalette[3] ?? colors.warning};
  --svg-5: ${svgPalette[4] ?? colors.textMuted};
  --ambient-base: ${ambientBase};
  --ambient-blob-1: ${ambientBlobs.topLeft};
  --ambient-blob-2: ${ambientBlobs.topRight};
  --ambient-blob-3: ${ambientBlobs.bottomLeft};
  --ambient-blob-4: ${ambientBlobs.bottomRight};
  --ambient-blob-5: ${ambientBlobs.center};
}
`;
  return css.trim();
}

export function getActiveThemeCss() {
  const theme = getTheme(process.env.NEXT_PUBLIC_THEME ?? process.env.THEME_NAME ?? null);
  return buildThemeCss(theme);
}

export function listThemes() {
  return themes.map((t) => t.name);
}
