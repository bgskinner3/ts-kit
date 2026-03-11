// global/link.docs.d.ts
declare global {
  class LinkUtilsDocs {
    /**
     * Normalize various URL inputs to a string.
     *
     * @param href - The input URL, which can be a string, URL instance, or object with pathname/query/hash.
     * @returns A normalized string URL.
     *
     * @example
     * LinkUtils.normalizeUrl('https://example.com/path?query=1#hash');
     * // 'https://example.com/path?query=1#hash'
     *
     * @example
     * LinkUtils.normalizeUrl({ pathname: '/path', query: { q: '1' }, hash: '#section' });
     * // '/path?q=1#section'
     */
    static normalizeUrl(): void;

    /**
     * ## 🧩 extractRelativePath — Extracts Relative Paths
     *
     * Extracts the relative path from an internal URL or absolute URL pointing
     * to the same origin. Ensures that the returned path always starts with `/`.
     *
     * ---
     *
     * ### ⚙️ Core Purpose
     * - 🔹 Converts internal absolute URLs to relative paths.
     * - 🔹 Preserves already relative paths.
     * - 🔹 Safely handles invalid or external URLs by returning `/`.
     *
     * ---
     *
     * ### 📘 Example Usage
     * ```ts
     * LinkUtils.extractRelativePath('/about');
     * // '/about'
     *
     * LinkUtils.extractRelativePath('https://example.com/about?query=1');
     * // '/about'
     *
     * LinkUtils.extractRelativePath('https://external.com/page');
     * // '/'
     * ```
     *
     * ---
     *
     * @param url - The input URL string or unknown value.
     * @returns A string representing the relative path, always starting with `/`.
     */

    static extractRelativePath(): void;
  }
}

// This ensures TypeScript treats the file as a module
export {};
