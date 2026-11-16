/**
 * Northlight Sessions — the single source of truth for the whole kit.
 *
 * The poster (Canvas), the e-ticket (Document) and the confirmation
 * email (Email) all read from this file. Change the night here and
 * every surface changes with it: that is the point of the kit.
 */

export const event = {
  name: "NORTHLIGHT SESSIONS",
  edition: "Vol. 04",
  tagline: "One night. Five sets. No headliner worship — the room is the show.",
  date: "Saturday, 20 March 2027",
  dateShort: "SAT 20 MAR 2027",
  doors: "18:00",
  firstSet: "19:00",
  curfew: "01:00",
  venue: "Hangar 9, Old Port Arts District",
  city: "Jakarta, Indonesia",
  venueNote:
    "A converted seaplane hangar on the old port. One room, one stage, a bar built from the runway lights.",
  ticketsUrl: "https://northlightsessions.example/tickets",
  siteUrl: "https://northlightsessions.example",
} as const;

export interface Set {
  time: string;
  artist: string;
  note: string;
}

export const lineup: Set[] = [
  { time: "19:00", artist: "Pijar", note: "slow-burn post-rock to open the room" },
  { time: "20:00", artist: "Mata Kiri", note: "left-field dangdut electronics" },
  { time: "21:15", artist: "June & The Frequencies", note: "dream pop, all analog synths" },
  { time: "22:30", artist: "The Fernweh Club", note: "krautrock for dancing" },
  { time: "23:45", artist: "Kala Rupa", note: "the full seven-piece, closing set" },
];

export const order = {
  ref: "NLS-2027-0482",
  tier: "General Admission — Early Bird",
  qty: 2,
  unitPrice: "IDR 185.000",
  total: "IDR 370.000",
  /** Sample attendee used by the printed ticket. The email personalises
   *  itself with merge tags instead — see src/email.tsx. */
  attendee: "Ada Prameswari",
  ticketCode: "NLS27-0482-KRPA-2203",
  ticketUrl: "https://northlightsessions.example/t/NLS-2027-0482",
} as const;

export const houseRules: string[] = [
  "Doors at 18:00. The first set starts at 19:00 sharp — the hangar doors close during each set's first song.",
  "This ticket is a single entry for one person. The code is scanned once; screenshots of the code work, forwards don't.",
  "18+ after 21:00. Bring ID if you plan to stay for the late sets.",
  "No professional cameras. Phones are fine — the bands get the good photos from the pit photographer, free, the next day.",
];
