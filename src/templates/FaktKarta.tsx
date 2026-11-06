import React from "react";
import { AbsoluteFill, interpolate, Easing, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { Background, FadeUp, Kicker, Outro, ProgressBar, WordReveal } from "../components/Shared";
import { THEMES, themeSchema } from "../theme";

export const faktSchema = z.object({
  mavzu: themeSchema,
  kicker: z.string(),
  raqam: z.number(),
  qoshimcha: z.string(),
  izoh: z.string(),
  manba: z.string(),
  cta: z.string(),
  handle: z.string(),
});

export type FaktProps = z.infer<typeof faktSchema>;

export const faktDefaults: FaktProps = {
  mavzu: "tun",
  kicker: "BILASIZMI?",
  raqam: 72,
  qoshimcha: " soat",
  izoh: "Raqam nimani anglatishini shu yerda qisqa tushuntiring",
  manba: "Manba: misol uchun matn",
  cta: "Doʻstlaringizga ham yuboring!",
  handle: "@sizning_sahifangiz",
};

const formatNumber = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");

const Counter: React.FC<{ value: number; suffix: string; color: string }> = ({ value, suffix, color }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [15, 75], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ fontSize: 240, fontWeight: 900, color, lineHeight: 1, letterSpacing: -6 }}>
      {formatNumber(v)}
      <span style={{ fontSize: 110, letterSpacing: 0 }}>{suffix}</span>
    </div>
  );
};

export const FAKT_MAIN = 210;
export const FAKT_OUTRO = 75;

export const FaktKarta: React.FC<FaktProps> = (p) => {
  const theme = THEMES[p.mavzu];
  return (
    <Background theme={theme}>
      <Sequence durationInFrames={FAKT_MAIN}>
        <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center", gap: 50, display: "flex", flexDirection: "column" }}>
          <Kicker theme={theme} text={p.kicker} />
          <Counter value={p.raqam} suffix={p.qoshimcha} color={theme.accent} />
          <WordReveal text={p.izoh} delay={80} perWord={2} style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.25 }} />
          <FadeUp delay={120}>
            <div style={{ fontSize: 34, color: theme.muted }}>{p.manba}</div>
          </FadeUp>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={FAKT_MAIN} durationInFrames={FAKT_OUTRO}>
        <Outro theme={theme} cta={p.cta} handle={p.handle} />
      </Sequence>
      <ProgressBar theme={theme} />
    </Background>
  );
};
