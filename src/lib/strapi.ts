// --- Re-Exports (Strapi Client) ---

// Why: Some codebases prefer `@/lib/strapi` as the canonical Strapi entrypoint.
// This file keeps that convention available without changing existing imports.

export { fetchAPI, getStrapiURL } from "./api";

