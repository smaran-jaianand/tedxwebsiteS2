# TEDxSIU Hyderabad — Season 2 / Meraki

The active TEDxSIU Hyderabad event website. It is a React + TypeScript single-page application deployed to GitHub Pages at `tedxsiuhyderabad.siu.edu.in`.

This README is intentionally self-contained: a developer working from this repository should not need context from the legacy Season 1 project to set up, change, verify, or deploy Season 2.

## Stack

- React 19 + TypeScript
- Vite 8
- GSAP / ScrollTrigger for scroll-led motion
- Anime.js, Motion, OGL, and canvas-confetti for selected visual experiences
- Vanilla CSS design system and Lucide icons
- GitHub Pages deployment via GitHub Actions

## Prerequisites

- Node.js **24**
- npm (included with Node)

The deployment workflow uses Node 24. Use the same major version locally to avoid build drift.

## Local development

```bash
npm ci
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

For device testing on the same network:

```bash
npm run dev -- --host 0.0.0.0
```

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run lint` | Run Oxlint across the project |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |

Before a handoff or deployment, run:

```bash
npm run lint
npm run build
npm run preview
```

> The linter reads preserved vendor files inside `public/season1/lib/`. Warnings there are legacy-archive noise unless the change intentionally touches the legacy static site. Build errors and warnings in `src/` should be addressed.

## Project map

```text
season2/
├── src/
│   ├── App.tsx                 # App shell, lazy sections, and page selection
│   ├── sitePath.ts             # Safe internal/public paths and query-route detection
│   ├── components/             # Page sections and interactive experiences
│   └── styles/index.css        # Tokens, global styles, responsive rules, motion fallbacks
├── public/
│   ├── theme/                  # Meraki artwork and brand imagery
│   ├── speakers/               # Season 2 speaker photographs
│   ├── brand/                  # Venue/campus imagery
│   └── season1/                # Preserved legacy website and media used by the Glimpse
├── .github/workflows/
│   └── deploy-pages.yml        # Production deployment workflow
├── CNAME                       # tedxsiuhyderabad.siu.edu.in
├── vite.config.ts              # Vite configuration; base is intentionally `/`
└── package.json
```

## Routes

The app uses query-string routing, not React Router. The route mapping lives in [`src/sitePath.ts`](./src/sitePath.ts); [`src/App.tsx`](./src/App.tsx) renders the matching page.

| URL | Page | Public navigation state |
| --- | --- | --- |
| `/` | Season 2 home / Meraki | Main event experience |
| `/?page=speakers` | Season 2 speakers | Public |
| `/?page=archive` | Season 1 Glimpse | Public |
| `/?page=team` | Season 2 working team | Direct route only; intentionally hidden from public navigation |

### Season 1 Glimpse vs. the legacy Season 1 site

These are separate products and should stay separate.

- **Season 1 Glimpse** (`?page=archive`) is the curated, cinematic archive in the React app. Its primary component is [`src/components/SeasonOneArchive.tsx`](./src/components/SeasonOneArchive.tsx). All active Season 1 calls to action should point here.
- **Legacy Season 1 site** (`public/season1/index.html`) is the original static website. It is preserved for historical reference. Avoid altering it unless a task explicitly asks for a legacy-site change.

The timeline/slideshow transfer between Season 2 and the Glimpse is implemented in [`PageTransition.tsx`](./src/components/PageTransition.tsx). Regular page changes are intentionally just a quick fade.

## Common change locations

| Task | Files to start with |
| --- | --- |
| Home-page order and top-level rendering | `src/App.tsx` |
| Header, footer, dock | `Navbar.tsx`, `Footer.tsx`, `MacDock.tsx` |
| Season 2 hero, schedule, countdown | `Hero.tsx`, `Schedule.tsx`, `CountdownSection.tsx` |
| Season 2 speaker cards/data | `Speakers.tsx`, `public/speakers/` |
| Season 1 Glimpse | `SeasonOneArchive.tsx`, `LegacyBanner.tsx`, `PageTransition.tsx` |
| Team page | `Team.tsx` |
| Global visual language and breakpoints | `src/styles/index.css` |
| Asset/route helpers | `src/sitePath.ts` |

## Code and design conventions

### Paths and assets

Always use `sitePath()` for internal links and anything under `public/`:

```tsx
import { sitePath } from '../sitePath';

<a href={sitePath('?page=speakers')}>Speakers</a>
<img src={sitePath('speakers/name.jpg')} alt="Speaker Name" />
```

This keeps URLs valid on the custom domain and in any future subpath deployment. Do not prefix public asset paths with `/` or `public/` manually.

### Media

- Keep Season 2 images in the appropriate `public/` folder: `theme/`, `speakers/`, or `brand/`.
- Use lower-case, hyphenated filenames for new media.
- Optimise files before committing; avoid replacing a lightweight image with a multi-megabyte original when a compressed version works.
- Add useful `alt` text to content images. Decorative imagery may use `alt=""`.
- Lazy-load below-the-fold imagery. Keep only important initial-view imagery eager.
- Confirm image casing in the production build—GitHub Pages is case-sensitive even when Windows is not.

### Motion and performance

- Preserve `prefers-reduced-motion` fallbacks for new persistent motion.
- Avoid adding global unthrottled `scroll` or `pointermove` handlers.
- The heaviest visual sections are lazy-loaded or deferred in `App.tsx`; preserve that behaviour when extending them.
- Prefer CSS transforms and opacity animation over layout-affecting animation.
- Keep page transitions scoped: temporal treatment is for Season 2 ↔ Season 1 Glimpse only; regular routes should remain a simple fade.

### Content changes

Event copy is public-facing. Verify speaker names, roles, talk titles, dates, venue details, and external links before publishing them. Do not fabricate direct talk links when only a recap or search result is available.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml):

1. GitHub installs Node 24.
2. It runs `npm ci`.
3. It runs `npm run build`.
4. It uploads `dist/` and deploys it to GitHub Pages.

The custom domain lives in [`CNAME`](./CNAME). [`vite.config.ts`](./vite.config.ts) uses `base: '/'` because this production site is served from the custom-domain root. Keep those deployment settings aligned with GitHub Pages. A mismatched Vite base is a common cause of a page whose title loads but whose JavaScript/CSS does not.

## Handoff checklist

- [ ] `npm run lint` completed; any remaining legacy-vendor warnings were identified.
- [ ] `npm run build` completed successfully.
- [ ] Smoke-tested home, speakers, Season 1 Glimpse, and the changed route(s).
- [ ] Checked desktop and mobile layouts.
- [ ] Verified every altered internal link, external link, and media file.
- [ ] Clearly stated whether the change affects the Glimpse, the preserved legacy Season 1 site, or both.

## License

This independent TEDx event is operated under license from TED.
