import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";

// Inter supports Uzbek Latin (oʻ, gʻ) and Cyrillic (ў, қ, ғ, ҳ).
export const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
});

export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;

export type Theme = {
  bgFrom: string;
  bgTo: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  card: string;
};

export const THEMES = {
  tun: {
    bgFrom: "#0B1020",
    bgTo: "#1B2550",
    text: "#FFFFFF",
    muted: "#A9B4D6",
    accent: "#FFC83D",
    accentText: "#111111",
    card: "rgba(255,255,255,0.08)",
  },
  kun: {
    bgFrom: "#FFF8EC",
    bgTo: "#FFE3C2",
    text: "#1A1A1A",
    muted: "#5C5145",
    accent: "#E4572E",
    accentText: "#FFFFFF",
    card: "rgba(0,0,0,0.06)",
  },
  qonun: {
    bgFrom: "#0E2A1F",
    bgTo: "#174D3A",
    text: "#F5F1E6",
    muted: "#B8C9BE",
    accent: "#D4AF37",
    accentText: "#0E2A1F",
    card: "rgba(255,255,255,0.07)",
  },
} satisfies Record<string, Theme>;

export const themeSchema = z.enum(["tun", "kun", "qonun"]);
export type ThemeName = z.infer<typeof themeSchema>;
