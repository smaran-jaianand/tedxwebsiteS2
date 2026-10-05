# Season 2 — Meraki

This is the active TEDxSIU Hyderabad website and the GitHub Pages deployment project.

For the full architecture, routes, media conventions, and handoff checklist, read the [workspace README](../README.md) first.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

The production workflow runs Node 24 and deploys `dist/` through GitHub Pages after every push to `main`.

## Important pointers

- Routes are query-string based and defined in [`src/sitePath.ts`](./src/sitePath.ts).
- Use `sitePath()` for every internal link and `public/` asset URL.
- `?page=archive` is the modern **Season 1 Glimpse**, not the preserved static Season 1 site under `public/season1/`.
- Global tokens and responsive styles live in [`src/styles/index.css`](./src/styles/index.css).
- The custom domain is configured by [`CNAME`](./CNAME); Vite’s `base` must stay `/` for that deployment model.
