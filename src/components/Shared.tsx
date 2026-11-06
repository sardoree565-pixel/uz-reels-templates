import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily, Theme } from "../theme";

/** Gradient background with two slowly drifting soft circles. */
export const Background: React.FC<{ theme: Theme; children?: React.ReactNode }> = ({
  theme,
  children,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 40;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)`,
        fontFamily,
        color: theme.text,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: theme.accent,
          opacity: 0.12,
          filter: "blur(80px)",
          top: -200 + drift,
          right: -250,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: theme.accent,
          opacity: 0.08,
          filter: "blur(90px)",
          bottom: -150 - drift,
          left: -220,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Thin progress bar across the top — shows viewers how long is left. */
export const ProgressBar: React.FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = (frame / (durationInFrames - 1)) * 100;
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: theme.card }}>
      <div style={{ width: `${pct}%`, height: "100%", background: theme.accent }} />
    </div>
  );
};

/** Small pill label, e.g. "HUQUQIY YANGILIK". */
export const Kicker: React.FC<{ theme: Theme; text: string; delay?: number }> = ({
  theme,
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        alignSelf: "flex-start",
        background: theme.accent,
        color: theme.accentText,
        fontWeight: 900,
        fontSize: 38,
        letterSpacing: 3,
        padding: "14px 30px",
        borderRadius: 999,
        transform: `scale(${s})`,
        transformOrigin: "left center",
      }}
    >
      {text}
    </div>
  );
};

/** Text that appears word by word. */
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  perWord?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, perWord = 3, style }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.28em", ...style }}>
      {words.map((w, i) => {
        const start = delay + i * perWord;
        const opacity = interpolate(frame, [start, start + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + 8], [30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span key={i} style={{ opacity, transform: `translateY(${y}px)`, display: "inline-block" }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Fade + slide-up wrapper. */
export const FadeUp: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 50}px)`, ...style }}>{children}</div>
  );
};

/** Closing call-to-action card. */
export const Outro: React.FC<{ theme: Theme; cta: string; handle: string }> = ({ theme, cta, handle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
      <div style={{ fontSize: 84, fontWeight: 900, transform: `scale(${s})`, textAlign: "center", padding: "0 80px" }}>
        {cta}
      </div>
      <FadeUp delay={10}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            background: theme.accent,
            color: theme.accentText,
            padding: "18px 44px",
            borderRadius: 24,
          }}
        >
          {handle}
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};
