import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { Background, FadeUp, Kicker, Outro, ProgressBar, WordReveal } from "../components/Shared";
import { THEMES, themeSchema } from "../theme";

export const yangilikSchema = z.object({
  mavzu: themeSchema,
  kicker: z.string(),
  sarlavha: z.string(),
  bandlar: z.array(z.string()).max(4),
  manba: z.string(),
  cta: z.string(),
  handle: z.string(),
});

export type YangilikProps = z.infer<typeof yangilikSchema>;

export const yangilikDefaults: YangilikProps = {
  mavzu: "qonun",
  kicker: "HUQUQIY YANGILIK",
  sarlavha: "Sarlavha shu yerda: yangilikning asosiy mazmuni bir jumlada",
  bandlar: [
    "Birinchi muhim nuqta",
    "Ikkinchi muhim nuqta",
    "Uchinchi muhim nuqta",
  ],
  manba: "Manba: misol uchun matn",
  cta: "Foydali boʻlsa, saqlab qoʻying!",
  handle: "@sizning_sahifangiz",
};

const OUTRO_FRAMES = 75;

export const YangilikReel: React.FC<YangilikProps> = (p) => {
  const theme = THEMES[p.mavzu];
  const bulletStart = 70;
  const perBullet = 45;
  const mainLength = bulletStart + p.bandlar.length * perBullet + 60;

  return (
    <Background theme={theme}>
      <Sequence durationInFrames={mainLength}>
        <AbsoluteFill style={{ padding: "180px 80px 140px", gap: 50, display: "flex", flexDirection: "column" }}>
          <Kicker theme={theme} text={p.kicker} />
          <WordReveal
            text={p.sarlavha}
            delay={10}
            style={{ fontSize: 86, fontWeight: 900, lineHeight: 1.12 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 20 }}>
            {p.bandlar.map((b, i) => (
              <FadeUp key={i} delay={bulletStart + i * perBullet}>
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    background: theme.card,
                    borderRadius: 28,
                    padding: "28px 34px",
                    fontSize: 46,
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  <div
                    style={{
                      minWidth: 64,
                      height: 64,
                      borderRadius: 18,
                      background: theme.accent,
                      color: theme.accentText,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                    }}
                  >
                    {i + 1}
                  </div>
                  {b}
                </div>
              </FadeUp>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <FadeUp delay={bulletStart}>
            <div style={{ fontSize: 34, color: theme.muted }}>{p.manba}</div>
          </FadeUp>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={mainLength} durationInFrames={OUTRO_FRAMES}>
        <Outro theme={theme} cta={p.cta} handle={p.handle} />
      </Sequence>
      <ProgressBar theme={theme} />
    </Background>
  );
};

export const yangilikDuration = (p: YangilikProps) => 70 + p.bandlar.length * 45 + 60 + OUTRO_FRAMES;
