import sharp from 'sharp';
import { resolve } from 'node:path';

const publicDir = resolve('public');

const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function socialCard({ eyebrow, question, line2, footer }) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .055 0"/></filter>
    </defs>
    <rect width="1200" height="630" fill="#f0eee7"/>
    <rect width="1200" height="630" filter="url(#noise)" opacity=".42"/>
    <line x1="64" y1="82" x2="1136" y2="82" stroke="#c9c7bd"/>
    <circle cx="74" cy="48" r="11" fill="#ff4d2e"/>
    <text x="74" y="53" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#f0eee7">?</text>
    <text x="96" y="55" font-family="Courier New,monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#151711">ARE WE IN A BUBBLE YET?</text>
    <text x="64" y="162" font-family="Courier New,monospace" font-size="13" font-weight="700" letter-spacing="2.5" fill="#ff4d2e">— ${escapeXml(eyebrow)}</text>
    <text x="60" y="302" font-family="Georgia,serif" font-size="86" letter-spacing="-4" fill="#151711">${escapeXml(question)}</text>
    <text x="60" y="397" font-family="Georgia,serif" font-size="86" letter-spacing="-4" fill="#151711">${escapeXml(line2)}<tspan fill="#ff4d2e">?</tspan></text>
    <circle cx="1035" cy="355" r="94" fill="#ff4d2e"/>
    <circle cx="1001" cy="319" r="21" fill="#fff" fill-opacity=".68"/>
    <text x="1035" y="406" text-anchor="middle" font-family="Georgia,serif" font-size="150" font-weight="700" fill="#f0eee7">?</text>
    <text x="64" y="560" font-family="Courier New,monospace" font-size="14" letter-spacing="1.5" fill="#6d7067">${escapeXml(footer)}</text>
  </svg>`;
}

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="120" fill="#151711"/><circle cx="256" cy="256" r="184" fill="#ff4d2e"/><circle cx="192" cy="184" r="40" fill="#fff" fill-opacity=".58"/><path d="M184 204c6-49 37-74 83-74 50 0 83 29 83 73 0 35-17 53-49 74-25 16-33 30-33 55v9h-49v-13c0-36 12-57 42-76 24-16 34-27 34-46 0-20-13-33-33-33-22 0-35 13-38 39z" fill="#f0eee7"/><circle cx="245" cy="394" r="30" fill="#f0eee7"/></svg>`;

await Promise.all([
  sharp(Buffer.from(icon)).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32.png')),
  sharp(Buffer.from(icon)).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png')),
  sharp(Buffer.from(icon)).resize(192, 192).png().toFile(resolve(publicDir, 'icon-192.png')),
  sharp(Buffer.from(icon)).resize(512, 512).png().toFile(resolve(publicDir, 'icon-512.png')),
  sharp(Buffer.from(socialCard({ eyebrow: 'LIVE MARKET CHECK', question: 'ARE WE IN A STOCK', line2: 'MARKET BUBBLE', footer: 'SIX SIGNALS · ONE CLEAR READ · UPDATED DAILY' }))).png().toFile(resolve(publicDir, 'og-en.png')),
  sharp(Buffer.from(socialCard({ eyebrow: 'DATOS ACTUALIZADOS', question: '¿HAY UNA BURBUJA', line2: 'EN LA BOLSA', footer: 'SEIS SEÑALES · UNA LECTURA CLARA · DATOS DIARIOS' }))).png().toFile(resolve(publicDir, 'og-es.png'))
]);

console.log('Generated favicons, app icons and social cards.');
