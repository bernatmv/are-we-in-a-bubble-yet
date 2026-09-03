import sharp from 'sharp';
import { resolve } from 'node:path';
import { halftoneDots, halftonePath } from './halftone.mjs';

const publicDir = resolve('public');

const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Henry palette — warm monochrome only
const paper = '#fafafa';
const ink = '#2a2722';

// The display serif (Fraunces) is a web font; librsvg only sees system fonts, so the social
// card falls back to the closest high-contrast serif installed on the build machine.
const serif = "Didot, 'Bodoni 72', Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const plate = halftonePath(halftoneDots({ size: 480, step: 14 }));

function socialCard({ ticker, eyebrow, headline, footer }) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${paper}"/>
    <line x1="0" y1="0.5" x2="1200" y2="0.5" stroke="${ink}"/>
    <line x1="0" y1="44.5" x2="1200" y2="44.5" stroke="${ink}"/>
    <text x="48" y="28" font-family="${sans}" font-size="13" letter-spacing="-.12" fill="${ink}">${escapeXml(ticker)}</text>
    <line x1="760" y1="45" x2="760" y2="630" stroke="${ink}"/>
    <g transform="translate(780 105) scale(0.83)"><path d="${plate}" fill="${ink}"/></g>
    <text x="48" y="230" font-family="${serif}" font-style="italic" font-size="52" fill="${ink}">${escapeXml(eyebrow)}</text>
    <text x="44" y="380" font-family="${serif}" font-size="134" letter-spacing="-3" fill="${ink}">${escapeXml(headline)}</text>
    <text x="48" y="585" font-family="${sans}" font-size="13" letter-spacing="-.12" fill="${ink}">${escapeXml(footer)}</text>
  </svg>`;
}

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${ink}"/>
  <circle cx="32" cy="32" r="19" fill="none" stroke="${paper}" stroke-width="3"/>
  <circle cx="24.5" cy="24.5" r="4" fill="${paper}"/>
</svg>`;

await Promise.all([
  sharp(Buffer.from(icon)).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32.png')),
  sharp(Buffer.from(icon)).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png')),
  sharp(Buffer.from(icon)).resize(192, 192).png().toFile(resolve(publicDir, 'icon-192.png')),
  sharp(Buffer.from(icon)).resize(512, 512).png().toFile(resolve(publicDir, 'icon-512.png')),
  sharp(Buffer.from(socialCard({ ticker: 'DATA CHECKED DAILY — SIX SIGNALS. ONE HONEST READ. — NOT INVESTMENT ADVICE', eyebrow: 'Are we in a stock market', headline: 'bubble yet?', footer: '° ARE WE IN A BUBBLE YET? — SHILLER CAPE — MARKET VALUE / GDP — MARGIN DEBT — ALLOCATION — CREDIT — VIX' }))).png().toFile(resolve(publicDir, 'og-en.png')),
  sharp(Buffer.from(socialCard({ ticker: 'DATOS REVISADOS A DIARIO — SEIS SEÑALES. UNA LECTURA HONESTA. — NO ES ASESORAMIENTO', eyebrow: '¿Estamos ya en una', headline: 'burbuja?', footer: '° ¿ESTAMOS EN UNA BURBUJA? — CAPE DE SHILLER — VALOR / PIB — DEUDA DE MARGEN — ASIGNACIÓN — CRÉDITO — VIX' }))).png().toFile(resolve(publicDir, 'og-es.png'))
]);

console.log('Generated favicons, app icons and social cards.');
