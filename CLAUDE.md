# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (Cloudflare Workers)
npm run preview      # Preview production build locally
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
```

No test runner is configured.

## Architecture

This is a personal portfolio site built with **SvelteKit 2 + Svelte 5**, deployed to **Cloudflare Workers** via `@sveltejs/adapter-cloudflare`.

### Routing

- `src/routes/+layout.svelte` — Root layout: initializes cursor, theme, and WebGL canvas on mount; wraps all pages with Header/Footer and a `fadeBlur` page transition
- `src/routes/+page.svelte` — Homepage
- `src/routes/about/+page.svelte` — About page

### Core Utilities (`src/lib/utils/`)

Three modules initialized in `+layout.svelte`:

- **`cursor.ts`** — Replaces the native cursor with an animated circle. Elements with `.target` class trigger expansion and GSAP-driven text displacement. Also intercepts anchor clicks for SvelteKit navigation.
- **`theme.ts`** — Light/dark toggle persisted in `localStorage`. Updates CSS custom properties and the WebGL canvas color on change.
- **`lightRayCanvas.ts`** — Full-viewport WebGL canvas (fixed, behind content) rendering animated light rays using custom shaders from `src/lib/shaders/`. Colors adapt to the active theme.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js` — all configuration lives in `src/app.css` inside `@theme {}`)
- Dark variant is toggled via a `.dark` class on the root element (`@variant dark (.dark &)`)

**Color palette** (Tailwind token → hex):

| Token | Hex | Role |
|---|---|---|
| `darkInk` | `#0B0C10` | Dark mode background |
| `darkSlate` | `#E0E0E0` | Dark mode text |
| `lightInk` | `#FAFAFA` | Light mode background |
| `lightSlate` | `#1A1A1A` | Light mode text |
| `highlight` | `#BB5500` | Accent / orange-brown |
| `shine` | `#F5A623` | Animated gradient highlight (amber) |
| `focus` | `#22D3EE` | Focus ring / cyan |

**Typography:**
- `font-ui` — Inter → Roboto → Helvetica (body/UI text)
- `font-grotesk` — Space Grotesk → SF Pro Display → system sans (headings/display)
- `--tracking-hero: -0.01em` — tighter letter-spacing for hero headings
- `--max-width-narrow: 1100px` — content column cap

**Utility classes:**
- `.target` — marks interactive elements for cursor hover behavior
- `.shiny` — animated gradient sweep across text (base color → `shine` amber → base), driven by GSAP
- `.synthetic-hover` / `.is-hovered` — programmatic hover state used by the cursor system instead of `:hover`

### Animation

GSAP v3 handles cursor movement, hover text displacement, and the `.shiny` gradient ping-pong. All animations check `prefers-reduced-motion` before running.

### Deployment

Configured via `wrangler.jsonc` (worker: `hugofvs-deploy-worker`). Build output goes to `.svelte-kit/cloudflare/`. Deploy with Cloudflare's Wrangler CLI.
