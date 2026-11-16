/**
 * Font faces for the HTML outputs (the email's webmail view, the
 * ticket's print HTML). The PDF and the poster image take the same
 * fonts as bytes instead — see render.tsx and assets/fonts/.
 */
const base = "https://cdn.jsdelivr.net/npm/@fontsource";

type FontFace = { family: string; src: string; format: "woff"; weight: number };

export const fontFaces: FontFace[] = [
  { family: "Anton", src: `${base}/anton@5/files/anton-latin-400-normal.woff`, format: "woff", weight: 400 },
  { family: "Archivo", src: `${base}/archivo@5/files/archivo-latin-400-normal.woff`, format: "woff", weight: 400 },
  { family: "Archivo", src: `${base}/archivo@5/files/archivo-latin-500-normal.woff`, format: "woff", weight: 500 },
  { family: "Archivo", src: `${base}/archivo@5/files/archivo-latin-700-normal.woff`, format: "woff", weight: 700 },
  { family: "Archivo", src: `${base}/archivo@5/files/archivo-latin-900-normal.woff`, format: "woff", weight: 900 },
  { family: "Space Mono", src: `${base}/space-mono@5/files/space-mono-latin-400-normal.woff`, format: "woff", weight: 400 },
  { family: "Space Mono", src: `${base}/space-mono@5/files/space-mono-latin-700-normal.woff`, format: "woff", weight: 700 },
];
