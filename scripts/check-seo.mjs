import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const pages = [
  { file: 'dist/index.html', lang: 'en', canonical: 'https://www.areweinabubbleyet.com/', image: 'og-en.png' },
  { file: 'dist/es/index.html', lang: 'es', canonical: 'https://www.areweinabubbleyet.com/es/', image: 'og-es.png' },
  { file: 'dist/ca/index.html', lang: 'ca', canonical: 'https://www.areweinabubbleyet.com/ca/', image: 'og-en.png' },
  { file: 'dist/de/index.html', lang: 'de', canonical: 'https://www.areweinabubbleyet.com/de/', image: 'og-en.png' },
  { file: 'dist/fr/index.html', lang: 'fr', canonical: 'https://www.areweinabubbleyet.com/fr/', image: 'og-en.png' },
  { file: 'dist/it/index.html', lang: 'it', canonical: 'https://www.areweinabubbleyet.com/it/', image: 'og-en.png' },
  { file: 'dist/ja/index.html', lang: 'ja', canonical: 'https://www.areweinabubbleyet.com/ja/', image: 'og-en.png' }
];
const dashboardLanguages = ['en', 'es', 'ca', 'de', 'fr', 'it', 'ja'];
const articlePages = [
  ['dist/learn/how-to-spot-a-stock-market-bubble/index.html', 'en', 'https://www.areweinabubbleyet.com/learn/how-to-spot-a-stock-market-bubble/'],
  ['dist/learn/what-is-the-shiller-cape-ratio/index.html', 'en', 'https://www.areweinabubbleyet.com/learn/what-is-the-shiller-cape-ratio/'],
  ['dist/learn/margin-debt-and-stock-market-bubbles/index.html', 'en', 'https://www.areweinabubbleyet.com/learn/margin-debt-and-stock-market-bubbles/'],
  ['dist/learn/how-our-bubble-indicator-works/index.html', 'en', 'https://www.areweinabubbleyet.com/learn/how-our-bubble-indicator-works/'],
  ['dist/es/aprender/como-detectar-una-burbuja-bursatil/index.html', 'es', 'https://www.areweinabubbleyet.com/es/aprender/como-detectar-una-burbuja-bursatil/'],
  ['dist/es/aprender/que-es-el-ratio-cape-de-shiller/index.html', 'es', 'https://www.areweinabubbleyet.com/es/aprender/que-es-el-ratio-cape-de-shiller/'],
  ['dist/es/aprender/deuda-de-margen-y-burbujas-bursatiles/index.html', 'es', 'https://www.areweinabubbleyet.com/es/aprender/deuda-de-margen-y-burbujas-bursatiles/'],
  ['dist/es/aprender/como-funciona-el-indicador-de-burbuja/index.html', 'es', 'https://www.areweinabubbleyet.com/es/aprender/como-funciona-el-indicador-de-burbuja/']
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
  assert(page.lang === 'ja' ? title.length >= 15 && title.length <= 40 : title.length >= 35 && title.length <= 75, `${page.lang}: title length is ${title.length}`);
  assert(page.lang === 'ja' ? description.length >= 40 && description.length <= 100 : description.length >= 100 && description.length <= 180, `${page.lang}: description length is ${description.length}`);
  assert(html.includes(`rel="canonical" href="${page.canonical}"`), `${page.lang}: canonical URL is incorrect`);
  assert(dashboardLanguages.every((lang) => html.includes(`hreflang="${lang}"`)) && html.includes('hreflang="x-default"'), `${page.lang}: incomplete hreflang set`);
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
assert((await readFile(resolve('dist/index.html'), 'utf8')).includes('navigator.languages'), 'English root must include browser-language detection');

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
  const jsonLd = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert(jsonLd, `${file}: missing JSON-LD`);
  const graph = JSON.parse(jsonLd);
  assert(graph['@graph']?.some((item) => item['@type'] === 'BreadcrumbList'), `${file}: missing breadcrumb schema`);
}

const robots = await readFile(resolve('dist/robots.txt'), 'utf8');
const sitemap = await readFile(resolve('dist/sitemap.xml'), 'utf8');
const feed = await readFile(resolve('dist/feed.xml'), 'utf8');
assert(robots.includes('Sitemap: https://www.areweinabubbleyet.com/sitemap.xml'), 'robots.txt must advertise the sitemap');
for (const [, , canonical] of [...pages.map((page) => [page.file, page.lang, page.canonical]), ...articlePages]) {
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap is missing ${canonical}`);
}
for (const lang of dashboardLanguages) assert(sitemap.includes(`hreflang="${lang}"`), `sitemap is missing ${lang} dashboard alternates`);
assert(feed.includes('<rss version="2.0"') && feed.includes('<item>'), 'RSS feed is missing or invalid');

console.log(`SEO checks passed for ${pages.length} dashboards and ${articlePages.length} localized article pages.`);
