/**
 * Prefix a public asset path with the Vite base URL.
 * In development (base = "/"), this is a no-op.
 * In production on GitHub Pages (base = "/gallery/"), this ensures
 * paths like "/IMG_0220.jpg" become "/gallery/IMG_0220.jpg".
 */
export function assetUrl(path: string): string {
    const base = import.meta.env.BASE_URL;
    // Remove leading slash from path to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    // BASE_URL always ends with / in Vite
    return `${base}${cleanPath}`;
}
