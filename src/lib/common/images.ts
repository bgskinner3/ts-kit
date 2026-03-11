// import HTMLImageElement

// const PRELOAD_CACHE = new Map<string, HTMLImageElement>();
// const MAX_CACHE_SIZE = 200;

// export async function preloadImages(
//   urls: string | string[],
//   options: { fetchPriority?: 'high' | 'low' | 'auto' } = {}
// ): Promise<PromiseSettledResult<void>[]> {
//   if (typeof window === 'undefined') return [];

//   const { fetchPriority = 'low' } = options;
//   const urlArray = Array.isArray(urls) ? urls : [urls];

//   const tasks = urlArray.map((src) => {
//     // Return early if already in cache
//     if (PRELOAD_CACHE.has(src)) return Promise.resolve();

//     return new Promise<void>((resolve, reject) => {
//       const img = new Image();
//       img.fetchPriority = fetchPriority;
      
//       img.onload = () => {
//         // Maintain a simple FIFO cache size limit
//         if (PRELOAD_CACHE.size >= MAX_CACHE_SIZE) {
//           const firstKey = PRELOAD_CACHE.keys().next().value;
//           PRELOAD_CACHE.delete(firstKey);
//         }
//         PRELOAD_CACHE.set(src, img);
//         resolve();
//       };

//       img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      
//       // Setting src triggers the network request
//       img.src = src;

//       // Use .decode() for smoother main-thread performance if available
//       if ('decode' in img) {
//         img.decode().catch(() => { /* handled by onerror */ });
//       }
//     });
//   });

//   return Promise.allSettled(tasks);
// }