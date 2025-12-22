// --- URL Helpers ---

// NOTE: `NEXT_PUBLIC_STRAPI_URL` is safe to expose to the browser (no secrets).
// Why: The frontend needs to know *where* Strapi lives, but not the auth token.
export function getStrapiURL(path = "") {
  // Why: Defaulting to `http://localhost:1337` keeps local dev "zero-config"
  // even when `.env` is missing or not loaded yet.
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  }${path}`;
}

// --- Strapi Fetching ---

// Why: Centralizing Strapi fetch logic prevents subtle bugs (missing auth token,
// inconsistent cache behavior, and copy/paste `populate` mistakes).
export async function fetchAPI(path: string) {
  // 1. Build the full URL (callers only pass the path/query).
  const requestUrl = getStrapiURL(path);

  // 2. Attach the Strapi API token (server-only env var; never `NEXT_PUBLIC_`).
  // Why: Strapi may protect content/relations behind authenticated requests.
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  };

  try {
    // 3. Fetch with `no-store` so content edits show up immediately.
    const response = await fetch(requestUrl, {
      headers,
      cache: "no-store",
    });

    // 4. Parse JSON (Strapi returns `{ data, meta, error }` shapes).
    const data = await response.json();
    return data;
  } catch (error) {
    // 5. Catch network/parsing failures and fail gracefully (callers can render fallbacks).
    console.error("Error fetching Strapi API:", error);
    return null;
  }
}
