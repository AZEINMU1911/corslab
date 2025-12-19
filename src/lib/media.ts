import { getStrapiURL } from "./api";

/**
 * Convert a Strapi media URL into a browser-loadable URL.
 *
 * Why we need this helper:
 * - Strapi often returns media as a relative path, for example:
 *   `/uploads/my_image.png`
 * - The browser cannot load that path from the Next.js domain because the file
 *   actually lives on the Strapi server (e.g. `http://127.0.0.1:1337/uploads/...`).
 * - By prefixing the Strapi base URL, we ensure images/videos render correctly
 *   across environments without hardcoding `localhost:1337` all over the UI.
 *
 * Safety behavior:
 * - If the URL is already absolute (S3/Cloudinary/etc), we return it unchanged.
 * - If Strapi returns `null`, we return `null` so components can gracefully
 *   render fallbacks instead of crashing.
 */
export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if it's already a remote link (e.g. AWS S3)
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise, prepend the Strapi URL (localhost:1337)
  return `${getStrapiURL()}${url}`;
}
