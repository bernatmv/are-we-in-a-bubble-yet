import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dashboards = [
  'dist/index.html',
  'dist/ca/index.html',
  'dist/de/index.html',
  'dist/es/index.html',
  'dist/fr/index.html',
  'dist/it/index.html',
  'dist/ja/index.html'
];

const stylesheetPattern = /<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)">/g;

for (const dashboard of dashboards) {
  const pagePath = resolve(dashboard);
  let html = await readFile(pagePath, 'utf8');
  const stylesheets = [...html.matchAll(stylesheetPattern)];

  if (stylesheets.length === 0) {
    throw new Error(`${dashboard}: no generated stylesheet found to inline`);
  }

  for (const [tag, href] of stylesheets) {
    const css = await readFile(resolve('dist', href.slice(1)), 'utf8');
    html = html.replace(tag, `<style data-inline-dashboard-css>${css}</style>`);
  }

  await writeFile(pagePath, html);
  console.log(`${dashboard}: inlined ${stylesheets.length} stylesheet${stylesheets.length === 1 ? '' : 's'}`);
}
