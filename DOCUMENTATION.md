# Roxy Web — Architecture & Developer Guide

## 1. High-Level Architecture
- **Frontend:** Next.js (App Router), Tailwind v4, Framer Motion.
- **Backend:** Strapi v5 (Headless CMS).
- **The "Why":** We decouple the frontend to allow marketing teams to update content without touching code, while keeping the site statically optimized/fast.

Request/response flow (simplified):

```
Browser → Next.js (Server Components) → Strapi API → JSON + Media URLs → HTML
```

What this means day-to-day:
- The homepage is rendered by a Next.js Server Component (`src/app/page.tsx`), which can safely fetch from Strapi using server-only credentials.
- Strapi is the source of truth for content. The UI can split/reshape that content into multiple sections without forcing CMS users to manage fragmented content entries.

## 2. Key Data Patterns (CRITICAL)
- **Deep Population:** Strapi v5 does not auto-populate nested components/relations/media. If you don’t explicitly populate nested objects, the API response will look “present” but key fields (especially media) will be `null`/missing.

  Deep populate pattern example:
  ```
  populate[HeroSection][populate][Main][populate]=*
  ```

  Why it’s necessary (the “doors” mental model):
  - `populate=*` often only populates one level deep.
  - Our hero media lives under a nested component: `HeroSection.Main`.
  - Adding `[Main][populate]=*` explicitly tells Strapi: “open the `Main` door, then populate what’s inside”.

- **Shared Data Sources:** The `AboutSection` in Strapi acts as a "Master Container". It feeds three separate frontend components:
  1. `HeroSection` (Text & Stats)
  2. `ProductBillboard` (The brown bottles image)
  3. `VisionMission` (The Vision/Mission text)

  *Value:* This keeps the CMS clean by grouping related business data, even if the UI splits them up.

Practical takeaway:
- Updating content under `AboutSection` can change multiple parts of the homepage. This is a feature, not a bug, and helps keep messaging consistent.

## 3. "Gotchas" & Fixes
- **The Localhost Image Block:** Next.js image optimization often fails between `localhost` (Frontend) and `127.0.0.1` (Strapi) during development. You’ll see JSON fetches succeed, but images fail to render (because the Next.js image optimizer can’t reach the asset host it thinks it should use).

  *Fix:* Use `unoptimized={true}` on `<Image />` components during development.

- **Case Sensitivity:** Strapi v5 returns Capitalized Keys (`Headline`, `Vision`) which must match our TypeScript interfaces exactly.

  Why this matters:
  - TypeScript types do not enforce runtime key casing.
  - If your interface says `Headline` but you code `data.headline`, it will silently be `undefined` and can crash or degrade the UI.

## 4. Component Guide
- **VisionMission:** Uses a 5XL font size and a decorative `+` icon (SVG) for consistent branding.
- **MainHero:** Handles the "White Screen" risk by using defensive coding (`data?.Main?.Headline || "Fallback"`).

Where to look:
- Data fetching and deep populate query: `src/app/page.tsx`
- Strapi response interfaces (case-sensitive): `src/types/index.ts`
