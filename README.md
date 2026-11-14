# Koraa’ studio website

The Koraa’ site: home, work, case studies, about, blog and the brand test.
Vite + React 19 + TypeScript + react-router. Hosted on Vercel (project `kora`);
merging to `main` deploys production.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run lint     # oxlint
```

## Where things are

| Path | What it is |
|---|---|
| `src/pages/` | One file per page (Home, Work, CaseStudy, About, Blog, BrandTest) |
| `src/components/` | Shared pieces: masthead, pill nav, hero reel, footer, intro animation |
| `src/components/ipaybtc/`, `src/components/refreeg/` | Code-built parts of those case studies (app screens, overlays, chips) |
| `src/caseStudies.ts` | **All case study content**: copy, plate order and layout for iPayBTC, 3PROJECTS and Refreeg |
| `src/data.ts` | Home and Work content: projects, hero films, blog cards |
| `src/assets/` | **Only the images and films that are live on the site** |
| `src/system.css`, `src/App.css` | Design system rules and theme tokens (dark default, light toggle) |
| `public/` | Favicon, logos and static files |
| `docs/` | How we work: design style, design system, image workflow |
| `archive/` | Everything we made and did **not** use, zipped per project |
| `vercel.json` | Single-page-app rewrite for Vercel |

## Documentation

- [`docs/DESIGN-STYLE.md`](docs/DESIGN-STYLE.md): how Leo likes his designs. Read before designing anything.
- [`docs/IMAGE-WORKFLOW.md`](docs/IMAGE-WORKFLOW.md): how case study images are made, from reference to live plate.
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) and [`DESIGN.md`](DESIGN.md): colour, type, spacing and motion rules for the site.
- [`archive/README.md`](archive/README.md): what is in each zip of unused work.

## Adding or changing a case study

1. Put the finished images in `src/assets/<client>/`, in two or three widths (e.g. `-1600`, `-2800`, `-full`).
2. Import them at the top of that client's block in `src/caseStudies.ts` and add them to its plate list.
   Each plate is either full width, inset (centred column) or part of a bento row.
3. Anything replaced or rejected goes into `archive/<client>/`, not `src/assets/`.
