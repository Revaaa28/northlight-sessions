import { Circle, Column, Heading, Polygon, Rect, Row, Svg, Text } from "@hyper-elements/react";
import QRCode from "qrcode";
import { lineup } from "./event";

/**
 * Shared building blocks for the Northlight kit.
 *
 * Everything visual that more than one surface needs lives here, so the
 * poster, the ticket and the email are built from the same parts — not
 * three lookalikes that drift apart.
 *
 * Note the split: `Eq` and `Wordmark` are plain layout and type, so they
 * work in every root including Email. `QrCode` and `Beams` are Svg, and
 * Svg does not exist in an Email — they belong to the Document and the
 * Canvas.
 */

export const ink = "#12121f";
export const inkSoft = "#1d1d30";
export const paper = "#f4eee0";
export const amber = "#ffb43a";
export const coral = "#ff5a36";
export const coralDeep = "#c23a12";
export const lineOnInk = "#2e2e49";
export const faintOnInk = "#a5a3ba";
export const mutedOnPaper = "#6f6a5c";
export const lineOnPaper = "#ddd2b8";

const mono = "'Space Mono', 'Courier New', monospace";
const display = "Anton, Archivo, Arial, sans-serif";

/**
 * The equalizer: a row of bars at different heights, like the meters on
 * the hangar's mixing desk. Pure layout — Columns in a Row — so it
 * survives every email client, where Svg would not.
 */
export function Eq({
  heights = [14, 26, 38, 22, 34, 18, 30, 24, 36, 16, 28, 20],
  colors = [amber, coral, paper, amber, paper, coral, amber, paper, coral, amber, paper, coral],
  barWidth = 9,
  gap = 5,
}: {
  heights?: number[];
  colors?: string[];
  barWidth?: number;
  gap?: number;
}) {
  return (
    <Row stackOnMobile={false} style={{ gap, alignItems: "end" }}>
      {heights.map((h, i) => (
        <Column
          key={i}
          style={{ width: barWidth, height: h, backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </Row>
  );
}

/** The brand lockup: NORTHLIGHT in the display face, SESSIONS tracked out under it. */
export function Wordmark({ dark = true, size = 30 }: { dark?: boolean; size?: number }) {
  const main = dark ? paper : ink;
  return (
    <Column style={{ gap: 2 }}>
      <Heading
        level={2}
        style={{ fontFamily: display, fontSize: size, lineHeight: 1, color: main, letterSpacing: 1, fontWeight: 400 }}
      >
        NORTHLIGHT
      </Heading>
      <Text
        style={{
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: 6,
          color: dark ? amber : coralDeep,
        }}
      >
        SESSIONS
      </Text>
    </Column>
  );
}

/**
 * The five sets, as running-order rows: mono time, artist, and what the
 * set is. Used by the email, page two of the ticket, and (larger) the
 * poster — same data, three sizes.
 */
export function LineupList({
  dark = false,
  artistSize = 17,
  noteSize = 13,
  timeWidth = 58,
  showNotes = true,
  rowPadding = 11,
}: {
  dark?: boolean;
  artistSize?: number;
  noteSize?: number;
  timeWidth?: number;
  showNotes?: boolean;
  rowPadding?: number;
}) {
  const main = dark ? paper : ink;
  const faint = dark ? faintOnInk : mutedOnPaper;
  const line = dark ? lineOnInk : lineOnPaper;
  return (
    <Column style={{ gap: 0 }}>
      {lineup.map((set, i) => (
        <Row
          key={set.time}
          stackOnMobile={false}
          style={{
            gap: 14,
            padding: [rowPadding, 0],
            alignItems: "start",
            border: { bottom: { width: i === lineup.length - 1 ? 0 : 1, style: "solid", color: line } },
          }}
        >
          <Column style={{ width: timeWidth }}>
            <Text style={{ fontFamily: mono, fontSize: noteSize + 1, fontWeight: 700, color: dark ? amber : coralDeep }}>
              {set.time}
            </Text>
          </Column>
          <Column style={{ gap: 2 }}>
            <Text style={{ fontSize: artistSize, fontWeight: 700, color: main }}>{set.artist}</Text>
            {showNotes ? <Text style={{ fontSize: noteSize, color: faint }}>{set.note}</Text> : null}
          </Column>
        </Row>
      ))}
    </Column>
  );
}

/**
 * A real, scannable QR code, drawn by Hyper Elements' own Svg shapes:
 * the `qrcode` library supplies the module matrix, and every dark module
 * becomes a Rect. No image file, no external service — the code is part
 * of the template, so it renders identically in the PDF and the image.
 */
export function QrCode({
  value,
  size = 168,
  fg = ink,
  bg = paper,
}: {
  value: string;
  size?: number;
  fg?: string;
  bg?: string;
}) {
  const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const data = qr.modules.data;
  const quiet = 2;
  const total = n + quiet * 2;
  const rects = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (data[y * n + x]) {
        rects.push(
          <Rect
            key={`${x}-${y}`}
            x={x + quiet}
            y={y + quiet}
            width={1.05}
            height={1.05}
            style={{ fill: fg }}
          />,
        );
      }
    }
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${total} ${total}`} style={{ backgroundColor: bg }}>
      {rects}
    </Svg>
  );
}

/**
 * Stage-light beams for the wide surfaces (poster, ticket header): three
 * fans of light from the top of the frame and the hangar's moon-disc.
 * Svg only — the email gets the equalizer instead.
 */
export function Beams({ width = 1080, height = 1350 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Polygon points={`120,-40 300,-40 620,${height * 0.72} -60,${height * 0.62}`} style={{ fill: amber, opacity: 0.13 }} />
      <Polygon points={`520,-40 700,-40 1010,${height * 0.66} 330,${height * 0.8}`} style={{ fill: coral, opacity: 0.1 }} />
      <Polygon points={`880,-40 1060,-40 1240,${height * 0.6} 700,${height * 0.72}`} style={{ fill: amber, opacity: 0.08 }} />
      <Circle cx={width * 0.82} cy={height * 0.16} r={120} style={{ fill: amber, opacity: 0.3 }} />
      <Circle cx={width * 0.82} cy={height * 0.16} r={92} style={{ fill: paper, opacity: 0.92 }} />
    </Svg>
  );
}
