import {
  Button,
  Column,
  Divider,
  Email,
  Heading,
  Link,
  MergeTag,
  Row,
  Section,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { Eq, LineupList, Wordmark, ink, paper } from "./components";
import { event, order } from "./event";
import { northlight } from "./theme";

/**
 * The confirmation email — sent the moment a ticket is bought.
 *
 * Personalisation is merge tags (`first_name`), so the same template is
 * the send-ready file for whatever provider sends it. Everything else —
 * the night, the lineup, the order — comes from src/event.ts and the
 * shared components, exactly like the poster and the ticket.
 *
 * There is no Svg in an email (Hyper Elements forbids it there, and
 * email clients would strip it anyway): the artwork is the equalizer,
 * built from plain Columns, and colour bands.
 */
export default function ConfirmationEmail() {
  return (
    <Email
      theme={northlight}
      lang="en"
      width={600}
      previewText={`Your tickets for Northlight Sessions ${event.edition} — ${event.date}, ${event.venue}`}
      title={`Your Northlight Sessions tickets — order ${order.ref}`}
      style={{ gap: 0 }}
    >
      {/* Header band */}
      <Section style={{ backgroundColor: ink, padding: [30, 36, 26, 36], gap: 20 }}>
        <Row stackOnMobile={false} style={{ alignItems: "start" }}>
          <Column style={{ flex: 1 }}>
            <Wordmark dark size={28} />
          </Column>
          <Column style={{ alignItems: "end", gap: 3, textAlign: "right" }}>
            <Text
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: token("colors.amber"),
                letterSpacing: 2,
              }}
            >
              {event.edition.toUpperCase()}
            </Text>
            <Text
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: token("colors.faintOnInk"),
                letterSpacing: 1,
              }}
            >
              {event.dateShort}
            </Text>
          </Column>
        </Row>
        <Eq />
      </Section>

      {/* Body */}
      <Column style={{ padding: [30, 36], gap: 22 }}>
        <Column style={{ apply: ["card"], gap: 16 }}>
          <Text style={{ apply: ["eyebrow"], color: token("colors.coralDeep") }}>
            Ticket confirmation — order {order.ref}
          </Text>
          <Heading level={1}>
            You&rsquo;re in, <MergeTag name="first_name" />.
          </Heading>
          <Text>
            {order.qty} × {order.tier} for {event.name} {event.edition} are yours. The e-ticket with
            your entry code is attached to this email as a PDF — and it is the same file the poster
            and this email were rendered from, so nothing about the night can disagree with itself.
          </Text>
          <Table
            style={{
              cellPadding: [9, 0],
              rowBorder: { width: 1, style: "solid", color: token("colors.border") },
            }}
          >
            <TableRow>
              <TableCell style={{ width: 110, color: token("colors.muted") }}>Date</TableCell>
              <TableCell style={{ fontWeight: 700 }}>{event.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: token("colors.muted") }}>Venue</TableCell>
              <TableCell style={{ fontWeight: 700 }}>
                {event.venue}, {event.city}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: token("colors.muted") }}>Tickets</TableCell>
              <TableCell style={{ fontWeight: 700 }}>
                {order.qty} × {order.tier}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: token("colors.muted") }}>Total paid</TableCell>
              <TableCell style={{ fontWeight: 700 }}>{order.total}</TableCell>
            </TableRow>
          </Table>
          <Button href={order.ticketUrl}>Open your e-ticket</Button>
          <Text style={{ fontSize: 13, color: token("colors.muted") }}>
            Entry code <MergeTag name="ticket_code" /> — one scan per ticket, at the hangar door.
          </Text>
        </Column>

        <Column style={{ gap: 12 }}>
          <Heading level={2} style={{ color: ink, fontSize: 15, letterSpacing: 1.2 }}>
            THE RUNNING ORDER
          </Heading>
          <LineupList />
        </Column>

        <Row style={{ gap: 12 }}>
          {[
            ["DOORS", event.doors],
            ["FIRST SET", event.firstSet],
            ["CURFEW", event.curfew],
          ].map(([label, value]) => (
            <Column
              key={label}
              style={{
                backgroundColor: ink,
                borderRadius: 10,
                padding: [14, 16],
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: token("colors.amber"),
                }}
              >
                {label}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 900, color: paper }}>{value}</Text>
            </Column>
          ))}
        </Row>

        <Divider />
        <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
          Northlight Sessions, Hangar 9, Old Port Arts District, Jakarta. You are receiving this
          email because you bought a ticket with this address.{" "}
          <Link href="https://northlightsessions.example/unsubscribe">Unsubscribe</Link>
        </Text>
      </Column>
    </Email>
  );
}
