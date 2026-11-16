import { Canvas, Column, Heading, Layer, Row, Text } from "@hyper-elements/react";
import { Beams, Eq, LineupList, Wordmark, amber, ink, paper } from "./components";
import { event } from "./event";
import { fontFaces } from "./fonts";
import { northlight } from "./theme";

const mono = "'Space Mono', 'Courier New', monospace";
const display = "Anton, Archivo, Arial, sans-serif";

/**
 * The poster — a 1080×1350 Canvas rendered to PNG (and SVG).
 *
 * The same night as the email and the ticket, at poster scale: light
 * beams drawn in Svg behind the type, the lineup at billboard size, and
 * an amber stub along the bottom with the only two facts a passer-by
 * needs — when, and where tickets are.
 */
export default function Poster() {
  return (
    <Canvas
      theme={northlight}
      width={1080}
      height={1350}
      title={`Northlight Sessions ${event.edition} — poster`}
      fonts={fontFaces}
      style={{ backgroundColor: ink }}
    >
      <Layer>
        <Beams width={1080} height={1350} />
        <Column style={{ height: 1350, padding: [64, 72, 0, 72], justifyContent: "space-between" }}>
          <Column style={{ gap: 56 }}>
            <Row stackOnMobile={false} style={{ justifyContent: "space-between", alignItems: "start" }}>
              <Wordmark dark size={34} />
              <Column style={{ alignItems: "end", gap: 4, textAlign: "right" }}>
                <Text style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, letterSpacing: 3, color: amber }}>
                  {event.edition.toUpperCase()}
                </Text>
                <Text style={{ fontFamily: mono, fontSize: 14, letterSpacing: 2, color: paper }}>
                  {event.dateShort}
                </Text>
              </Column>
            </Row>

            <Column style={{ gap: 18 }}>
              <Heading
                level={1}
                style={{ fontFamily: display, fontWeight: 400, fontSize: 138, lineHeight: 0.94, color: paper, letterSpacing: 2 }}
              >
                NORTHLIGHT
              </Heading>
              <Heading
                level={1}
                style={{ fontFamily: display, fontWeight: 400, fontSize: 138, lineHeight: 0.94, color: amber, letterSpacing: 2 }}
              >
                SESSIONS
              </Heading>
              <Text style={{ fontSize: 25, fontWeight: 500, color: paper, maxWidth: 760 }}>
                {event.tagline}
              </Text>
            </Column>

            <Eq
              heights={[26, 48, 74, 40, 64, 30, 58, 80, 36, 62, 24, 52, 70, 34, 56, 44]}
              barWidth={16}
              gap={9}
            />

            <LineupList dark artistSize={31} noteSize={16} timeWidth={92} showNotes={false} rowPadding={16} />
          </Column>

          <Column style={{ backgroundColor: amber, padding: [26, 30], gap: 4 }}>
            <Row stackOnMobile={false} style={{ justifyContent: "space-between", alignItems: "center" }}>
              <Column style={{ gap: 2 }}>
                <Text style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 2, color: ink }}>
                  {event.dateShort} — DOORS {event.doors}
                </Text>
                <Text style={{ fontFamily: mono, fontSize: 13, letterSpacing: 1, color: ink }}>
                  {event.venue.toUpperCase()} · {event.city.toUpperCase()}
                </Text>
              </Column>
              <Column style={{ alignItems: "end", gap: 2, textAlign: "right" }}>
                <Text style={{ fontSize: 21, fontWeight: 900, color: ink }}>TICKETS</Text>
                <Text style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: ink }}>
                  {event.siteUrl.replace("https://", "")}
                </Text>
              </Column>
            </Row>
            <Text style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: ink, fontWeight: 700 }}>
              FIVE SETS · ONE ROOM · NO REPEATS
            </Text>
          </Column>
        </Column>
      </Layer>
    </Canvas>
  );
}
