# Wilberforce Mubiru — Graphic Design Portfolio

Portfolio site for selected graphic design, visual identity, print, apparel and branded merchandise work.

## Local development

Requirements: Node.js 20.19 or later and npm.

```sh
npm ci
npm run dev
```

## Production build

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

The static build is written to `dist/`. Vercel can deploy this Vite project with its default build settings. `vercel.json` configures SPA deep links, response security headers and cache freshness for public image and portfolio files.

## Main pages

- `/` — portfolio overview and design experience
- `/graphics-and-logos` — graphic design portfolio
- `/branded-items` — apparel and merchandise portfolio
