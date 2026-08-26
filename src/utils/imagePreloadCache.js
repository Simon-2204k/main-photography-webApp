/**
 * Global Eager Image & GIF Preload Cache
 * Pre-decodes all cursor trail images and menu GIFs into GPU memory upfront
 * so interactions have 0ms spawn latency and 0 missing frames.
 */
import { TRAIL_IMAGES } from '../data/page1/trailImagesData';

const MENU_GIF_URLS = Array.from({ length: 8 }, (_, i) => `/assets/page1/menu-gifs/gif_${i + 1}.gif`);

class ImagePreloadCache {
  constructor() {
    this.cache = new Map();
    this.isPreloaded = false;
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    // 1. Preload and decode all 57 cursor trail WebPs
    TRAIL_IMAGES.forEach((item) => {
      this.preload(item.url);
    });

    // 2. Preload all 8 local menu GIFs
    MENU_GIF_URLS.forEach((url) => {
      this.preload(url);
    });
  }

  preload(url) {
    if (this.cache.has(url)) return this.cache.get(url);

    const img = new Image();
    img.src = url;
    
    // Use HTMLImageElement.decode() if supported for zero-jank frame rendering
    if ('decode' in img) {
      img.decode().catch(() => {
        // Fallback gracefully on decode failure
      });
    }

    this.cache.set(url, img);
    return img;
  }

  get(url) {
    if (!this.cache.has(url)) {
      return this.preload(url);
    }
    return this.cache.get(url);
  }
}

export const globalImageCache = new ImagePreloadCache();
export default globalImageCache;
