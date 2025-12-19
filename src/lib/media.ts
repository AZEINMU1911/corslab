// --- Imports ---

import { getStrapiURL } from "./api";

// --- Media Helpers ---

// Why: Strapi media can come back as either:
// - relative paths (e.g. `/uploads/...`) that need the Strapi base URL prepended
// - absolute URLs (S3/Cloudinary/etc) that should be used as-is
export function getStrapiMedia(url: string | null) {
  // 1. Preserve `null` so UI can render fallbacks instead of crashing.
  if (url == null) {
    return null;
  }

  // 2. If Strapi already returned an absolute URL, do not rewrite it.
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // 3. Otherwise, prefix the Strapi base URL.
  // Why: `getStrapiURL()` defaults to `http://localhost:1337` when env vars are missing,
  // keeping local development working without extra setup.
  return `${getStrapiURL()}${url}`;
}
