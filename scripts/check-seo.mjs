import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const pages = [
  { file: 'dist/index.html', lang: 'en', canonical: 'https://areweinabubleyet.com/', image: 'og-en.png' },
  { file: 'dist/es/index.html', lang: 'es', canonical: 'https://areweinabubleyet.com/es/', image: 'og-es.png' }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function content(html, key, value) {
  const tags = html.match(/<meta\s+[^>]*>/g) ?? [];
  const tag = tags.find((candidate) => candidate.includes(`${key}="${value}"`));
  return tag?.match(/content="([^"]*)"/)?.[1];
}

for (const page of pages) {
  const html = await readFile(resolve(page.file), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const description = content(html, 'name', 'description') ?? '';
  const jsonLd = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)?.[1];

  assert(html.includes(`<html lang="${page.lang}">`), `${page.lang}: missing document language`);
  assert(title.length >= 40 && title.length <= 65, `${page.lang}: title length is ${title.length}`);
  assert(description.length >= 120 && description.length <= 170, `${page.lang}: description length is ${description.length}`);
  assert(html.includes(`rel="canonical" href="${page.canonical}"`), `${page.lang}: canonical URL is incorrect`);
  assert(html.includes('hreflang="en"') && html.includes('hreflang="es"') && html.includes('hreflang="x-default"'), `${page.lang}: incomplete hreflang set`);
  assert(content(html, 'property', 'og:image')?.startsWith('https://'), `${page.lang}: missing absolute Open Graph image`);
  assert(content(html, 'name', 'twitter:card') === 'summary_large_image', `${page.lang}: missing X large-image card`);
  assert(html.includes('<h1 id="verdict-title">'), `${page.lang}: missing primary heading`);
  assert(jsonLd, `${page.lang}: missing JSON-LD`);
  const graph = JSON.parse(jsonLd);
  assert(graph['@graph']?.some((item) => item['@type'] === 'Dataset'), `${page.lang}: missing Dataset schema`);

  const image = await sharp(resolve('public', page.image)).metadata();
  assert(image.width === 1200 && image.height === 630, `${page.lang}: social image must be 1200×630`);
  console.log(`${page.lang.toUpperCase()}: ${title.length}-character title, ${description.length}-character description, metadata valid`);
}

console.log('SEO checks passed for both localized pages.');
