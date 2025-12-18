# Roxy Web — Project Documentation

## Overview
This repository contains a marketing/landing site for **Roxy CosLab** built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

The home page is a stack of “sections” (hero, stats, billboard, FAQ, etc.) composed in `src/app/page.tsx`.

## Tech Stack
- Framework: Next.js (`src/app/*` App Router)
- UI: React 19 + TypeScript
- Styling: Tailwind CSS v4 (via `@import "tailwindcss"`) + design tokens in `src/app/globals.css`
- Animation: Framer Motion (including scroll-driven animations via `useScroll` + `useTransform`)
- Icons: `lucide-react`

## Getting Started
### Prerequisites
- Node.js (LTS recommended)
- npm (this repo includes `package-lock.json`)

### Install & Run
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build` (configured to use Webpack via `--webpack`)
- Start production server: `npm run start`

## Project Structure
- `src/app/layout.tsx` — Root layout (fonts, global CSS, `Navbar`, `Footer`)
- `src/app/page.tsx` — Home page composition (section order)
- `src/app/globals.css` — Tailwind v4 theme tokens (brand colors + fonts)
- `src/components/layouts/Navbar.tsx` — Sticky header; changes style after scroll
- `src/components/layouts/Footer.tsx` — Footer layout
- `src/components/ui/Container.tsx` — Shared max-width + horizontal padding wrapper
- `src/components/sections/*` — Individual landing page sections
- `src/types/index.ts` — Shared TypeScript types for sections (e.g., `Product`, `FAQItemData`)
- `public/` — Static assets served from the site root
  - `public/assets/*` — Images and videos used by sections
  - `public/CoslabWhite.png` — Brand logo used in multiple sections

## Section Components (Home Page)
The section order is defined in `src/app/page.tsx`:
- `MainHeroSection` — Full-screen hero with background image + logo + CTA
- `HeroSection` — Secondary hero statement
- `StatsSection` — Animated counters (Framer Motion spring + in-view trigger)
- `ProductBillboard` — Parallax billboard image
- `VisionMission` — Two-column “Vision / Mission” copy block
- `WaveSection` — Scroll-driven “wave” video background with staged logo → headline transition
- `ShowcaseSection` — Sticky stacked product cards; scroll drives text parallax + fade-in
- `ProcessSection` — 4-step process list with per-item in-view animation
- `FAQSection` — Accordion + unfurling parallax image reveal
- `CertificationSection` — Infinite-loop certification carousel
- `ContactSection` — Validated contact form with ReCAPTCHA + success modal

## Section Maintenance Guide (Quick Edits)
All section components live in `src/components/sections/` and most are client components (`"use client"`) because they use Framer Motion hooks.

### How Section Files Are Organized
Most section files follow the same internal structure (mirrors the labels you’ll see in code comments):
- **Content data** — hardcoded arrays used to render lists (`products`, `steps`, `faqs`, etc.)
- **Subcomponents** — helper components used only by that section (`ProductCard`, `FAQItem`, `Counter`, etc.)
- **Main component** — the exported section component rendered by `src/app/page.tsx`

### Where to Change What
- `src/components/sections/MainHeroSection.tsx` — Background image (`/assets/1.jpg`), logo (`/CoslabWhite.png`), hero headline/subcopy, CTA button label.
- `src/components/sections/HeroSection.tsx` — Big headline + paragraph copy (no shared data arrays).
- `src/components/sections/StatsSection.tsx` — Update the `stats` array; adjust count-up feel in `Counter` (`useSpring` config).
- `src/components/sections/ProductBillboard.tsx` — Billboard image (`/assets/4.jpg`); adjust parallax strength via `imageY` transform range.
- `src/components/sections/VisionMission.tsx` — Update the Vision/Mission copy; adjust the grid columns/spacing if layout changes.
- `src/components/sections/WaveSection.tsx` — Video (`/assets/wave.mp4`), logo, and headline copy; timing is controlled by the `useTransform` ranges tied to `scrollYProgress`.
- `src/components/sections/ShowcaseSection.tsx` — Update the `products` array (IDs, titles, subtitles, image paths); per-card text motion lives in `ProductCard`.
- `src/components/sections/ProcessSection.tsx` — Update the `steps` array; animation tuning is in `itemVariants` + per-row `viewport` settings.
- `src/components/sections/FAQSection.tsx` — Update the `faqs` array; the image interlude is `UnfurlingImage` (`/assets/6.jpg`); accordion expand/collapse animation is in `FAQItem`.
- `src/components/sections/CertificationSection.tsx` — Update `certificationLogos` (ensure assets exist under `public/assets/`); marquee speed is `transition.duration`.
- `src/components/sections/ContactSection.tsx` — Replace `BACKGROUND_IMAGE_URL`, update the ReCAPTCHA `sitekey`, and replace the simulated submission inside `handleSubmit`.

### Common Patterns Used in Sections
- **In-view reveals:** `whileInView` + `viewport={{ once: true }}` for one-time entrance animations.
- **Scroll progress animations:** `useScroll({ target, offset })` + `useTransform(scrollYProgress, ...)` to map scroll progress to CSS transforms/opacity.
- **Sticky scroll storytelling:** a tall container (e.g. `h-[250vh]`) + a sticky child (`sticky top-0 h-screen`) to create a pinned stage.

## Contact Form Notes
`ContactSection` is currently client-only and simulates an API call on submit.

Recommended production wiring:
1. Create an API route (e.g. `src/app/api/contact/route.ts`) to receive form data.
2. Verify the ReCAPTCHA token server-side before accepting the request.
3. Send the message (email/CRM) and return success/failure to drive the modal + error UI.

## Styling & Design Tokens
Brand tokens live in `src/app/globals.css` under `@theme`:
- Colors: `--color-roxy-*` (used via Tailwind classes like `bg-roxy-black`)
- Fonts: `--font-sans`, `--font-mono`

Most components use utility classes directly; layout spacing is typically handled with `Container`.

### Fonts
Fonts are loaded via a Google Fonts CSS `@import` in `src/app/globals.css`. This avoids build-time font fetching (useful for restricted build environments), but does require network access in the browser to download fonts unless you switch to locally hosted fonts.

## Assets
Assets are referenced by absolute paths (served from `public/`), for example:
- Images: `"/assets/1.jpg"`, `"/assets/6.jpg"`
- Video: `"/assets/wave.mp4"`
- Logo: `"/CoslabWhite.png"`

To replace an image/video, drop a new file under `public/assets/` and update the relevant `src` in the section component.

## Common Tasks
### Add a New Section to the Home Page
1. Create a new component in `src/components/sections/YourSection.tsx`.
2. Import it into `src/app/page.tsx`.
3. Place it in the JSX in the desired order.

### Update a Scroll Animation
Most scroll-driven sections follow this pattern:
- `const { scrollYProgress } = useScroll({ target, offset })`
- `const x/y/opacity = useTransform(scrollYProgress, ...)`
- Pass transforms into `motion.*` via `style={{ ... }}`.

## Code Conventions
- Path alias: `@/*` maps to `src/*` (configured in `tsconfig.json`)
- Types are colocated in `src/types/index.ts` and imported as `type ... from "@/types"`
