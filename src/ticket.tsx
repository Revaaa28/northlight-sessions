import {
  Column,
  Divider,
  Document,
  Heading,
  PageBreak,
  PageFooter,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import {
  Eq,
  LineupList,
  QrCode,
  Wordmark,
  amber,
  coralDeep,
  faintOnInk,
  ink,
  lineOnInk,
  paper,
} from "./components";
import { event, houseRules, order } from "./event";
import { fontFaces } from "./fonts";
import { northlight } from "./theme";

const mono = "'Space Mono', 'Courier New', monospace";
const display = "Anton, Archivo, Arial, sans-serif";

/** A list drawn as rows (marker column + text column) instead of the
 *  List component: identical in the print HTML and the PDF. */
function MarkerList({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <Column style={{ gap: 8 }}>
      {items.map((item, i) => (
        <Row key={i} stackOnMobile={false} style={{ gap: 10, alignItems: "start" }}>
          <Column style={{ width: 22 }}>
            <Text style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: coralDeep }}>
              {numbered ? `${i + 1}.` : "•"}
            </Text>
          </Column>
          <Column style={{ flex: 1 }}>
            <Text>{item}</Text>
          </Column>
        </Row>
      ))}
    </Column>
  );
}

function Detail({ label, value, light = true }: { label: string; value: string; light?: boolean }) {
  return (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontFamily: mono, fontSize: 9, letterSpacing: 2, color: amber }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: 700, color: light ? paper : ink }}>{value}</Text>
    </Column>
  );
}

/**
 * The e-ticket — a two-page A4 Document rendered to PDF.
 *
 * Page one is the ticket itself: an ink card with the night's details
 * and a QR code drawn from Svg Rects (see QrCode in components.tsx), so
 * the code is real and scannable in the PDF, not a pasted image. Page
 * two is the running order, how to get to the hangar, and the house
 * rules — the things people actually re-open a ticket for.
 */
export default function Ticket() {
  return (
    <Document theme={northlight} size="A4" margin={46} title={`Northlight Sessions e-ticket ${order.ref}`} fonts={fontFaces}>
      <PageFooter>
        <Row stackOnMobile={false} style={{ justifyContent: "space-between", padding: [10, 0, 0, 0] }}>
          <Text style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.5, color: "#8a8574" }}>
            NORTHLIGHT SESSIONS — {event.edition.toUpperCase()} · ORDER {order.ref}
          </Text>
          <Text style={{ fontFamily: mono, fontSize: 9, color: "#8a8574", textAlign: "right" }}>
            PAGE <PageNumber /> OF <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      {/* ── Page 1: the ticket ─────────────────────────────── */}
      <Row stackOnMobile={false} style={{ justifyContent: "space-between", alignItems: "start", padding: [0, 0, 18, 0] }}>
        <Wordmark dark={false} size={26} />
        <Column style={{ alignItems: "end", gap: 2, textAlign: "right" }}>
          <Text style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: coralDeep }}>
            E-TICKET
          </Text>
          <Text style={{ fontFamily: mono, fontSize: 10, color: "#8a8574" }}>{order.ref}</Text>
        </Column>
      </Row>

      <Column style={{ backgroundColor: ink, borderRadius: 16, padding: [30, 32], gap: 22 }}>
        <Row stackOnMobile={false} style={{ justifyContent: "space-between", alignItems: "start" }}>
          <Column style={{ gap: 6 }}>
            <Text style={{ fontFamily: mono, fontSize: 11, letterSpacing: 3, color: amber }}>
              {event.edition.toUpperCase()} — ONE NIGHT ONLY
            </Text>
            {/* The extra bottom padding is deliberate: Anton's own font
                metrics run tight, and the PDF renderer measures display
                headings by them — the padding keeps the mono lines below
                clear of the title in the PDF as well as the HTML. */}
            <Column style={{ gap: 0, padding: [0, 0, 18, 0] }}>
              <Heading
                level={1}
                style={{ fontFamily: display, fontWeight: 400, fontSize: 44, lineHeight: 0.98, color: paper, letterSpacing: 1 }}
              >
                NORTHLIGHT
              </Heading>
              <Heading
                level={1}
                style={{ fontFamily: display, fontWeight: 400, fontSize: 44, lineHeight: 0.98, color: paper, letterSpacing: 1 }}
              >
                SESSIONS
              </Heading>
            </Column>
            <Text style={{ fontFamily: mono, fontSize: 12, color: faintOnInk }}>
              {event.dateShort} · DOORS {event.doors}
            </Text>
            <Text style={{ fontFamily: mono, fontSize: 12, color: faintOnInk }}>
              {event.venue.toUpperCase()}, {event.city.toUpperCase()}
            </Text>
          </Column>
          <Eq heights={[20, 36, 52, 30, 46, 24, 40, 56, 28, 44, 18, 34]} barWidth={7} gap={4} />
        </Row>

        <Divider style={{ borderTop: { width: 1, style: "solid", color: lineOnInk } }} />

        <Row stackOnMobile={false} style={{ gap: 28, alignItems: "start" }}>
          <Column style={{ gap: 16, flex: 1 }}>
            <Detail label="ATTENDEE" value={order.attendee} />
            <Detail label="TICKET" value={`${order.qty} × ${order.tier}`} />
            <Row stackOnMobile={false} style={{ gap: 24 }}>
              <Detail label="FIRST SET" value={event.firstSet} />
              <Detail label="CURFEW" value={event.curfew} />
            </Row>
            <Text style={{ fontSize: 12, color: faintOnInk }}>
              {event.venueNote}
            </Text>
          </Column>
          <Column style={{ alignItems: "center", gap: 8 }}>
            <QrCode value={order.ticketUrl} size={148} />
            <Text style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1, color: paper }}>
              {order.ticketCode}
            </Text>
            <Text style={{ fontFamily: mono, fontSize: 8, letterSpacing: 1, color: faintOnInk }}>
              SCAN ONCE AT THE DOOR
            </Text>
          </Column>
        </Row>

        <Divider style={{ borderTop: { width: 2, style: "dashed", color: lineOnInk } }} />
        <Row stackOnMobile={false} style={{ justifyContent: "space-between" }}>
          <Text style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: faintOnInk }}>
            ADMIT {order.qty} — KEEP UNTIL EXIT
          </Text>
          <Text style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: amber }}>
            {order.ticketCode}
          </Text>
        </Row>
      </Column>

      <Text style={{ fontSize: 12, color: "#6f6a5c", padding: [14, 4, 0, 4] }}>
        This page is your ticket — the PDF itself, a screenshot of the code, or the code typed at the
        door all work. Page two has the running order and how to find the hangar.
      </Text>

      <PageBreak />

      {/* ── Page 2: the night itself ───────────────────────── */}
      <Column style={{ gap: 26 }}>
        <Column style={{ gap: 10 }}>
          <Heading level={2} style={{ fontFamily: display, fontWeight: 400, fontSize: 26, color: ink, letterSpacing: 0.5 }}>
            RUNNING ORDER
          </Heading>
          <LineupList artistSize={16} />
        </Column>

        <Column style={{ gap: 10 }}>
          <Heading level={2} style={{ fontFamily: display, fontWeight: 400, fontSize: 26, color: ink, letterSpacing: 0.5 }}>
            GETTING THERE
          </Heading>
          <MarkerList
            items={[
              "Commuter line or TransJakarta to Kota — the hangar is a six-minute walk from the station, following the runway-light path along the old port wall.",
              "Ride-hailing drop-off and pick-up is at Gate 2 only; the port road closes to cars at 17:30.",
              "Bike and motor parking inside Gate 1, free with a ticket. The night bus home leaves the gate at 01:15.",
            ]}
          />
        </Column>

        <Column style={{ gap: 10 }}>
          <Heading level={2} style={{ fontFamily: display, fontWeight: 400, fontSize: 26, color: ink, letterSpacing: 0.5 }}>
            HOUSE RULES
          </Heading>
          <MarkerList items={houseRules} numbered />
        </Column>

        <Text style={{ fontSize: 12, color: "#6f6a5c" }}>
          {event.tagline} Questions on the night: find any crew member with an amber wristband.
        </Text>
      </Column>
    </Document>
  );
}
