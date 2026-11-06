import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Background, FadeUp, Kicker, Outro, ProgressBar, WordReveal } from "../components/Shared";
import { THEMES, Theme, themeSchema } from "../theme";

export const savolSchema = z.object({
  mavzu: themeSchema,
  kicker: z.string(),
  savol: z.string(),
  javob: z.string(),
  izoh: z.string(),
  cta: z.string(),
  handle: z.string(),
});

export type SavolProps = z.infer<typeof savolSchema>;

export const savolDefaults: SavolProps = {
  mavzu: "kun",
  kicker: "SAVOL-JAVOB",
  savol: "Savolingizni shu yerga yozing — tomoshabin javobni oʻylab koʻrsin",
  javob: "Javob",
  izoh: "Bu yerga qisqa izoh yozing: qaysi qonun yoki modda, nima qilish kerak.",
  cta: "Savolingiz bormi? Izohda yozing!",
  handle: "@sizning_sahifangiz",
};

const QUESTION = 90;
const COUNTDOWN = 90;
const ANSWER = 120;
export const SAVOL_OUTRO = 75;
export const SAVOL_TOTAL = QUESTION + COUNTDOWN + ANSWER + SAVOL_OUTRO;

const Countdown: React.FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const n = 3 - Math.floor(frame / 30);
  const local = frame % 30;
  const scale = interpolate(local, [0, 8, 30], [1.6, 1, 0.9], { extrapolateRight: "clamp" });
  const opacity = interpolate(local, [0, 6, 24, 30], [0, 1, 1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 260,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 260,
        fontWeight: 900,
        color: theme.accent,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {Math.max(n, 1)}
    </div>
  );
};

const Answer: React.FC<{ theme: Theme; javob: string; izoh: string }> = ({ theme, javob, izoh }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center", gap: 50, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          alignSelf: "center",
          fontSize: 200,
          fontWeight: 900,
          background: theme.accent,
          color: theme.accentText,
          padding: "20px 80px",
          borderRadius: 48,
          transform: `scale(${s}) rotate(${(1 - s) * -8}deg)`,
        }}
      >
        {javob}
      </div>
      <FadeUp delay={15}>
        <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.3, textAlign: "center" }}>{izoh}</div>
      </FadeUp>
    </AbsoluteFill>
  );
};

export const SavolJavob: React.FC<SavolProps> = (p) => {
  const theme = THEMES[p.mavzu];
  return (
    <Background theme={theme}>
      <Sequence durationInFrames={QUESTION + COUNTDOWN}>
        <AbsoluteFill style={{ padding: "260px 80px 0", gap: 50, display: "flex", flexDirection: "column" }}>
          <Kicker theme={theme} text={p.kicker} />
          <WordReveal text={p.savol} delay={8} style={{ fontSize: 90, fontWeight: 900, lineHeight: 1.15 }} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={QUESTION} durationInFrames={COUNTDOWN}>
        <Countdown theme={theme} />
      </Sequence>
      <Sequence from={QUESTION + COUNTDOWN} durationInFrames={ANSWER}>
        <Answer theme={theme} javob={p.javob} izoh={p.izoh} />
      </Sequence>
      <Sequence from={QUESTION + COUNTDOWN + ANSWER} durationInFrames={SAVOL_OUTRO}>
        <Outro theme={theme} cta={p.cta} handle={p.handle} />
      </Sequence>
      <ProgressBar theme={theme} />
    </Background>
  );
};
