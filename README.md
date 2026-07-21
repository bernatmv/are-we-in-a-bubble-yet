# Are we in a bubble yet?

A deliberately simple US equity-market risk dashboard built with Astro.

## Run locally

```sh
npm install
npm run dev
```

## Data updates

`npm run update-data` refreshes `src/data/indicators.json` from FINRA, FRED, and Shiller data published by Multpl.

Vercel runs `/api/refresh` every day at 06:17 UTC. The protected function triggers a production Deploy Hook, and `npm run vercel-build` refreshes every data source before rebuilding the static site.

Configure these production environment variables in Vercel:

- `CRON_SECRET`: a random secret of at least 16 characters. Vercel sends it automatically to scheduled functions.
- `VERCEL_DEPLOY_HOOK_URL`: a Deploy Hook created under Project Settings → Git for the production branch.

The dashboard is an educational market-risk summary, not investment advice. Thresholds are documented in `src/data/indicators.json` and should be reviewed periodically as market structure changes.

## Localization and SEO

The English page lives at `/` and the Spanish version at `/es/`. Both publish self-referencing canonicals, reciprocal `hreflang` links, localized Open Graph and X cards, Dataset JSON-LD, and entries in `public/sitemap.xml`.

Run `npm run seo:check` after `npm run build` to validate titles, descriptions, canonicals, language links, structured data, headings, and social image dimensions. Run `npm run assets` after editing the favicon or social-card generator.
