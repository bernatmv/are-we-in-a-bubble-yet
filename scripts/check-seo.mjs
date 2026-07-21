import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const pages = [
  { file: 'dist/index.html', lang: 'en', canonical: 'https://areweinabubleyet.com/', image: 'og-en.png' },
  { file: 'dist/es/index.html', lang: 'es', canonical: 'https://areweinabubleyet.com/es/', image: 'og-es.png' }
];
const articlePages = [
  ['dist/learn/how-to-spot-a-stock-market-bubble/index.html', 'en', 'https://areweinabubleyet.com/learn/how-to-spot-a-stock-market-bubble/'],
  ['dist/learn/what-is-the-shiller-cape-ratio/index.html', 'en', 'https://areweinabubleyet.com/learn/what-is-the-shiller-cape-ratio/'],
  ['dist/learn/margin-debt-and-stock-market-bubbles/index.html', 'en', 'https://areweinabubleyet.com/learn/margin-debt-and-stock-market-bubbles/'],
  ['dist/es/aprender/como-detectar-una-burbuja-bursatil/index.html', 'es', 'https://areweinabubleyet.com/es/aprender/como-detectar-una-burbuja-bursatil/'],
  ['dist/es/aprender/que-es-el-ratio-cape-de-shiller/index.html', 'es', 'https://areweinabubleyet.com/es/aprender/que-es-el-ratio-cape-de-shiller/'],
  ['dist/es/aprender/deuda-de-margen-y-burbujas-bursatiles/index.html', 'es', 'https://areweinabubleyet.com/es/aprender/deuda-de-margen-y-burbujas-bursatiles/']
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
  assert(html.includes('G-YQYRE594D9'), `${page.lang}: missing Google Analytics`);
  assert(jsonLd, `${page.lang}: missing JSON-LD`);
  const graph = JSON.parse(jsonLd);
  assert(graph['@graph']?.some((item) => item['@type'] === 'Dataset'), `${page.lang}: missing Dataset schema`);

  const image = await sharp(resolve('public', page.image)).metadata();
  assert(image.width === 1200 && image.height === 630, `${page.lang}: social image must be 1200×630`);
  console.log(`${page.lang.toUpperCase()}: ${title.length}-character title, ${description.length}-character description, metadata valid`);
}

for (const [file, lang, canonical] of articlePages) {
  const html = await readFile(resolve(file), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const description = content(html, 'name', 'description') ?? '';
  assert(new RegExp(`<html[^>]*lang="${lang}"`).test(html), `${file}: missing document language`);
  assert(title.length >= 40 && title.length <= 70, `${file}: title length is ${title.length}`);
  assert(description.length >= 110 && description.length <= 170, `${file}: description length is ${description.length}`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${file}: canonical URL is incorrect`);
  assert(html.includes('hreflang="en"') && html.includes('hreflang="es"'), `${file}: incomplete hreflang set`);
  assert(content(html, 'property', 'og:type') === 'article', `${file}: missing article Open Graph type`);
  assert(content(html, 'name', 'twitter:card') === 'summary_large_image', `${file}: missing X card`);
  assert(html.includes('G-YQYRE594D9'), `${file}: missing Google Analytics`);
}

console.log(`SEO checks passed for both dashboards and ${articlePages.length} localized article pages.`);
