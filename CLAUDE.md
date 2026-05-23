# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:4321)
npm run build     # Build for production
npm run preview   # Preview production build
npm run astro     # Run Astro CLI directly
```

Type checking: `npx astro check`

## Architecture

Single-page personal homepage built with **Astro 4** + **Tailwind CSS**, deployed to [muhan.wiki](https://muhan.wiki) via Vercel.

### Page structure (`src/pages/index.astro`)

Three-column layout composed of:
- `Sidebar.astro` — left panel (avatar, location, skill tags, timeline); collapses on mobile via `left()` JS function
- `Header.astro` — top-right area with name, bio, social icon row, theme toggle switch, snake SVG decoration
- `MainContent.astro` — tabbed content area: **Projects** (websites + projects + skills SVGs), **Intro**, **FAQ** (accordion)
- Footer inline in `index.astro`

`BaseLayout.astro` is the HTML shell. It imports `global.css` as a global style and loads `/main.js` via `<script is:inline src="/main.js">`.

### JavaScript (`public/main.js`)

Loaded globally at runtime (not bundled by Astro). Contains all interactive logic:
- `openTab(tabName)` — tab switching with `content-active` / `but-active` CSS classes
- `toggleFAQ(el)` — FAQ accordion toggle
- `left()` — sidebar open/close on mobile (`left-main-open`, `left-open` classes)
- `PopUp(imageURL)` — image popup modal
- `copyQQ()` / `showNotification()` — QQ number copy with toast
- `initCursor()` — glow ball cursor effect (desktop only)
- `initScrollAnimations()` — IntersectionObserver fade-in (desktop only)
- `initParticles()` — floating particle background (high-performance devices only)
- Theme system: `changeTheme("Light"|"Dark")` — updates `html[data-theme]`, SVG fill colors, snake image src, and `themeState` cookie (365-day expiry). Auto-switches to dark at 20:00–06:00.

`src/scripts/main.js` is a source mirror of `public/main.js` — **edit `public/main.js`**, not the src copy.

### Theme system

CSS variables in `src/styles/global.css` define both themes:
- `:root` — light theme defaults
- `html[data-theme="dark"]` — dark theme overrides

The `BaseLayout.astro` `<head>` contains an inline script that reads the `themeState` cookie and sets `data-theme` synchronously before render to prevent flash.

### Sound effects

Stored in `public/soundeffects/`: `click.mp3`, `collapsible_open.mp3`, `light-on.mp3`, `light-off.mp3`. Played via `playSound(url)` — note the paths in JS use `../static/soundeffects/` (legacy path) but files live at `/soundeffects/`.

### Assets

- `public/img/` — project card images (SVG)
- `public/svg/` — `skillPc.svg`, `skillWap.svg` (skills diagrams), `snake-Light.svg`, `snake-Dark.svg`
- `public/favicon.ico` — also used as the avatar/logo in Sidebar
