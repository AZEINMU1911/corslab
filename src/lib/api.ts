/**
 * Build an absolute Strapi URL from a relative path.
 *
 * Why this helper exists:
 * - Strapi runs as a separate server (often `http://127.0.0.1:1337` in dev).
 * - Most callers only know the API path (e.g. `/api/homepage`), not the host.
 * - Centralizing this logic avoids "magic strings" sprinkled across the app and
 *   makes it easy to switch environments (local → staging → production) by
 *   changing a single environment variable.
 *
 * Notes:
 * - `NEXT_PUBLIC_STRAPI_URL` is prefixed with `NEXT_PUBLIC_` because it is safe
 *   to expose the base URL to the browser. It contains no secrets.
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * Fetch JSON from our Strapi API with the correct base URL and auth headers.
 *
 * Why we use a "fetcher" function:
 * - We want one safe, consistent place to handle Strapi URL building, headers,
 *   and common defaults (cache behavior, error handling).
 * - It reduces copy/paste mistakes (especially around auth + `populate` rules).
 *
 * Authorization header:
 * - Strapi can protect content and media behind an API token.
 * - We send `Authorization: Bearer <token>` so Strapi knows this request is
 *   allowed to read protected fields/relations.
 * - The token is stored in `STRAPI_API_TOKEN` (no `NEXT_PUBLIC_` prefix) so
 *   Next.js will keep it server-only. This fetcher should be used from Server
 *   Components, Route Handlers, or other server-side code — not client bundles.
 *
 * Why `cache: "no-store"`:
 * - In the Next.js App Router, `fetch()` is cached by default in Server
 *   Components, which can make CMS updates appear "stuck".
 * - `no-store` opts out of caching so editors see fresh Strapi content on every
 *   request/refresh during development (and for truly dynamic pages).
 */
export async function fetchAPI(path: string) {
  // 1. Construct the full URL (e.g. `http://127.0.0.1:1337/api/homepage?...`)
  const requestUrl = getStrapiURL(path);

  // 2. Prepare the headers with your server-side Strapi API token.
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  };

  try {
    // 3. Fetch the data
    const response = await fetch(requestUrl, {
      headers,
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Strapi API:", error);
    return null;
  }
}
