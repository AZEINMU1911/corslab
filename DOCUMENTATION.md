# Roxy Web — Architecture & Developer Guide

## 1. High-Level Architecture
- **Frontend:** Next.js (App Router), Tailwind v4, Framer Motion.
- **Backend:** Strapi v5 (Headless CMS).
- **The "Why":** We decouple the frontend to allow marketing teams to update content without touching code, while keeping the site statically optimized/fast.

Request/response flow (simplified):
`Browser → Next.js (Server Components) → Strapi API → JSON + Media URLs → HTML`

What this means day-to-day:
- The homepage is rendered by a Next.js Server Component (`src/app/page.tsx`), which can safely fetch from Strapi using server-only credentials.
- Strapi is the source of truth for content. The UI can split/reshape that content into multiple sections without forcing CMS users to manage fragmented content entries.

## 2. Key Data Patterns (CRITICAL)
- **Deep Population:** Strapi v5 does not auto-populate nested components. If you don’t explicitly populate nested objects, the API response will look “present” but key fields (especially media) will be `null`/missing.
  *Pattern:* `populate[HeroSection][populate][Main][populate]=*`
  *Concept:* You must "open the door" (Main) before you can see what's inside.

- **Shared Data Sources:** `AboutSection` acts as a "Master Container" feeding three components:
  1. `HeroSection` (Text & Stats)
  2. `ProductBillboard` (Image)
  3. `VisionMission` (Text)
  *Value:* Keeps the CMS clean by grouping related business data.

## 3. "Gotchas" & Fixes
- **The Localhost Image Block:** Next.js cannot optimize images from `127.0.0.1` easily.
  *Fix:* Use `unoptimized={true}` on `<Image />` components during development.
- **Case Sensitivity:** Strapi Keys are Capitalized (`Headline`, `Vision`). Types must match exactly.

## 4. Component Guide
- **VisionMission:** Uses a 5XL font size and a decorative `+` icon.
- **MainHero:** Handles "White Screen" risk via defensive coding.

Where to look:
- Data fetching: `src/app/page.tsx`
- Types: `src/types/index.ts`

---
