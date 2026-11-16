import { defineTheme } from "@hyper-elements/react";

/**
 * The Northlight brand, written once.
 *
 * Every root in the kit (Email, Document, Canvas) takes this theme, so
 * the poster, the ticket and the email cannot drift apart: one palette,
 * one type system, one button.
 */
export const northlight = defineTheme({
  colors: {
    background: "#f4eee0", // warm paper
    foreground: "#141422", // ink
    primary: "#141422",
    primaryForeground: "#f4eee0",
    muted: "#6f6a5c",
    border: "#ddd2b8",
    ink: "#12121f",
    inkSoft: "#1d1d30",
    paper: "#f4eee0",
    amber: "#ffb43a",
    coral: "#ff5a36",
    coralDeep: "#c23a12", // coral darkened for small text on light grounds (4.5:1+)
    lineOnInk: "#2e2e49",
    faintOnInk: "#a5a3ba",
  },
  fonts: {
    body: "Archivo, Arial, sans-serif",
    heading: "Anton, Archivo, Arial, sans-serif",
    mono: "'Space Mono', 'Courier New', monospace",
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.55 },
  components: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 34, lineHeight: 1.05, letterSpacing: 0.5, mobile: { fontSize: 27 } },
          2: { fontSize: 21, lineHeight: 1.2, letterSpacing: 0.4 },
          3: { fontSize: 15, lineHeight: 1.3, letterSpacing: 1.2 },
        },
      },
    },
    Button: {
      borderRadius: 999,
      padding: [13, 26],
      fontWeight: 700,
      hover: { backgroundColor: "#ff5a36" },
    },
    Text: {},
  },
  styles: {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 14,
      padding: 32,
      gap: 18,
    },
    eyebrow: {
      fontFamily: "'Space Mono', 'Courier New', monospace",
      fontSize: 11,
      letterSpacing: 2.5,
      textTransform: "uppercase",
    },
  },
});
