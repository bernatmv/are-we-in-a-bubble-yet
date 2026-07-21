import { articlePath, articles } from '../articles';
import { localeMeta } from '../i18n';

const site = 'https://areweinabubleyet.com';
const absolute = (path: string) => new URL(path, site).href;

function alternates(items: [string, string][]) {
  return items.map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`).join('\n');
}

export const GET = () => {
  const localeLinks = Object.entries(localeMeta).map(([lang, item]) => [lang, absolute(item.path)] as [string, string]);
  const dashboards = localeLinks.map(([, url]) => `  <url>\n    <loc>${url}</loc>\n${alternates(localeLinks)}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/" />\n  </url>`);
  const articleUrls = articles.flatMap((article) => {
    const en = absolute(articlePath(article, 'en'));
    const es = absolute(articlePath(article, 'es'));
    const links: [string, string][] = [['en', en], ['es', es]];
    return [en, es].map((url) => `  <url>\n    <loc>${url}</loc>\n${alternates(links)}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />\n  </url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...dashboards, ...articleUrls].join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
