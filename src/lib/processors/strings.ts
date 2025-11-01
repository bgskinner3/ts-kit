// function sanitizeHTML(str: string): string {
//   return str
//     // remove all <script>...</script> blocks
//     .replace(/<script[\s\S]*?<\/script>/gi, '')
//     // remove all HTML comments
//     .replace(/<!--[\s\S]*?-->/g, '')
//     // remove tags not in SAFE_TAGS
//     .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
//       tagName = tagName.toLowerCase();
//       return SAFE_TAGS.includes(tagName) ? match : '';
//     })
//     // remove inline event handlers like onclick="..."
//     .replace(/\s(on\w+)=["'][\s\S]*?["']/gi, '');
// }

//   static extractFirstImageSrc = (html: string): string | null => {
//     const match = html.match(/<img[^>]+src="([^">]+)"/i);
//     return match ? match[1] : null;
//   };

//   static extractTitle = (input: string): string => {
//     const match = input.match(/^(.*?):/);
//     return match ? match[1].trim() : input;
//   };

//   static countAlphabeticCharacters(str: string): number {
//     if (!str) return 0;
//     return Array.from(str).filter((char) => /^[a-zA-Z]$/.test(char)).length;
//     // return str.replace(/[^A-Za-z]/g, '').length;
//   }

//   static extractRelativePath(url?: unknown): string {
//     if (!TypeGuardUtils.isStringOrRelativeUrl(url) || !url.trim()) return '/';

//     // Already relative
//     if (url.startsWith('/')) return url;

//     try {
//       const base = EnvService.isServer()
//         ? 'http://example.com'
//         : location.origin;

//       const parsed = new URL(url!, base);
//       return parsed.pathname;
//     } catch {
//       // Fallback for relative-ish paths without leading /
//       return url!.startsWith('/') ? url : `/${url}`;
//     }
//   }
