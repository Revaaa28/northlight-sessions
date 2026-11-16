/**
 * Render the whole Northlight kit from src/event.ts:
 *
 *   out/email.html / out/email.txt   the confirmation email (+ client previews in out/clients/)
 *   out/ticket.html / out/ticket.pdf the e-ticket
 *   out/poster.png / out/poster.svg  the poster
 *
 * Every template is validated first (the email with the email-clients
 * plugin, so Outlook/Gmail/Apple Mail findings count too). Any error
 * diagnostic stops the build — warnings are printed, never hidden.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import { ElementsError, formatDiagnostics, outline, render, validate } from "@hyper-elements/react";
import { renderImage } from "@hyper-elements/react/image";
import { renderPdf } from "@hyper-elements/react/pdf";
import ConfirmationEmail from "./src/email";
import Poster from "./src/poster";
import Ticket from "./src/ticket";

const fontFiles: [string, string, number][] = [
  ["Anton", "assets/fonts/Anton-400.ttf", 400],
  ["Archivo", "assets/fonts/Archivo-400.ttf", 400],
  ["Archivo", "assets/fonts/Archivo-500.ttf", 500],
  ["Archivo", "assets/fonts/Archivo-700.ttf", 700],
  ["Archivo", "assets/fonts/Archivo-900.ttf", 900],
  ["Space Mono", "assets/fonts/SpaceMono-400.ttf", 400],
  ["Space Mono", "assets/fonts/SpaceMono-700.ttf", 700],
];

async function loadFonts() {
  return Promise.all(
    fontFiles.map(async ([family, path, weight]) => ({
      family,
      src: await readFile(path),
      weight,
    })),
  );
}

function report(name: string, diagnostics: { severity?: string }[] | undefined) {
  if (diagnostics?.length) {
    console.log(`\n${name}:\n${formatDiagnostics(diagnostics as never)}`);
  }
  return diagnostics?.some((d) => d.severity === "error") ?? false;
}

async function main() {
  await mkdir("out/clients", { recursive: true });
  const fonts = await loadFonts();
  let failed = false;

  // ── Email ────────────────────────────────────────────────
  const email = <ConfirmationEmail />;
  const emailReport = validate(email, { plugins: [await emailClients()] });
  failed = report("email validate", emailReport.diagnostics) || failed;
  if (emailReport.valid) {
    const { html, text, diagnostics } = await render(email);
    failed = report("email render", diagnostics) || failed;
    await writeFile("out/email.html", html);
    await writeFile("out/email.txt", text);
    const { previews, diagnostics: previewDiags } = await renderInEmailClients(email);
    report("email client previews", previewDiags);
    for (const preview of previews) {
      await writeFile(`out/clients/${preview.filename}`, preview.html);
    }
    console.log(`email: out/email.html + ${previews.length} client previews`);
  }

  // ── Ticket (Document → print HTML + PDF) ─────────────────
  const ticket = <Ticket />;
  const ticketReport = validate(ticket);
  failed = report("ticket validate", ticketReport.diagnostics) || failed;
  if (ticketReport.valid) {
    const { html, diagnostics } = await render(ticket);
    failed = report("ticket render", diagnostics) || failed;
    await writeFile("out/ticket.html", html);
    const { pdf, diagnostics: pdfDiags } = await renderPdf(ticket, { fonts });
    failed = report("ticket pdf", pdfDiags) || failed;
    await writeFile("out/ticket.pdf", pdf);
    console.log("ticket: out/ticket.html + out/ticket.pdf");
  }

  // ── Poster (Canvas → PNG + SVG) ──────────────────────────
  const poster = <Poster />;
  const posterReport = validate(poster);
  failed = report("poster validate", posterReport.diagnostics) || failed;
  if (posterReport.valid) {
    const png = await renderImage(poster, { fonts });
    failed = report("poster png", png.diagnostics) || failed;
    await writeFile("out/poster.png", png.image);
    const svg = await renderImage(poster, { fonts, format: "svg" });
    await writeFile("out/poster.svg", svg.image);
    console.log(`poster: out/poster.png (${png.width}×${png.height}) + out/poster.svg`);
  }

  console.log("\n── ticket outline ──\n" + outline(ticket));
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  if (e instanceof ElementsError) {
    console.error(formatDiagnostics(e.diagnostics));
  } else {
    console.error(e);
  }
  process.exitCode = 1;
});
