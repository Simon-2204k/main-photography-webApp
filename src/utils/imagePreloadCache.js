import { TRAIL_IMAGES } from '../data/page1/trailImagesData';

const MENU_GIF_URLS = Array.from({ length: 8 }, (_, i) => `/assets/page1/menu-gifs/gif_${i + 1}.gif`);

const SECTION_WEBP_URLS = [

  '/images/section1/pexels-ekam-juneja-61080223-32379941.webp',
  '/images/section1/pexels-elina-araja-1743227-3343318.webp',
  '/images/section1/pexels-fidan-nazim-qizi-134456769-12414434.webp',
  '/images/section1/pexels-ilham-munawar-wijaksana-312593206-13568050.webp',
  '/images/section1/pexels-sevil-yeva-1175061542-29209493.webp',

  '/images/section2/alessandro-rodriguez-Z-hkVVWZiOI-unsplash.webp',
  '/images/section2/eric-soubeyrand-de-saint-prix-wpGHqh_1D84-unsplash.webp',
  '/images/section2/erwi-bZZwOLx7zX0-unsplash.webp',
  '/images/section2/fethi-benattallah-5HIAAj1-XD8-unsplash.webp',
  '/images/section2/juan-ordonez-rdta95kcS78-unsplash.webp',
  '/images/section2/kyle-johnson-i9oQ8auj5hk-unsplash.webp',
  '/images/section2/lev-yarmanov-m5HaYd0NqBM-unsplash.webp',
  '/images/section2/priscilla-du-preez-H5yqXWC-XMk-unsplash.webp',
  '/images/section2/yanny-mishchuk-iJQ-FDykacg-unsplash.webp',

  '/images/section3/baptiste-merel--bYa_kDl_tk-unsplash.webp',
  '/images/section3/brian-lundquist-xJWUhJP-qPc-unsplash.webp',
  '/images/section3/erik-mclean-7jRqtUvNFgA-unsplash.webp',
  '/images/section3/jr-korpa-07mULu__htY-unsplash.webp',
  '/images/section3/mahdi-bafande-niZ0qgwIEUk-unsplash.webp',
  '/images/section3/olegs-jonins-w13BMngq7JM-unsplash.webp',

  '/images/section5/brian-lundquist-aA6NVwzqWJg-unsplash.webp',
  '/images/section5/brooke-balentine-Bs15bCACD_0-unsplash.webp',
  '/images/section5/daniel-khor-rZtdwCZTibY-unsplash.webp',
  '/images/section5/eduardo-kenji-amorim-m6FlHxLBlVs-unsplash.webp',
  '/images/section5/hamza-nouasria-25NzjUbPIcc-unsplash.webp',
  '/images/section5/jan-oblak-O1H4keiH-Io-unsplash.webp',
  '/images/section5/oscar-ramirez-IHYP1yLWEek-unsplash.webp',
  '/images/section5/rock-staar-xYcnWXtURrs-unsplash.webp',
  '/images/section5/steven-weeks-xAHbt6YpAJ4-unsplash.webp',
  '/images/section5/vinicius-amnx-amano-3BvtFNc1MYY-unsplash.webp',
  '/images/section5/windah-limbai-x9y7-4VvS38-unsplash.webp',
  '/images/section5/yunus-emre-mM5tCQ0uJo8-unsplash.webp',
];

class ImagePreloadCache {
  constructor() {
    this.cache = new Map();
    this.loadedUrls = new Set();
    this.isPreloaded = false;
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || this.isPreloaded) return;
    this.isPreloaded = true;

    const immediateTrails = TRAIL_IMAGES.slice(0, 10);
    immediateTrails.forEach((item) => {
      this.preload(item.url);
    });

    const deferPhase2 = () => {
      TRAIL_IMAGES.slice(10).forEach((item) => {
        this.preload(item.url);
      });
      MENU_GIF_URLS.forEach((url) => {
        this.preload(url);
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(deferPhase2, { timeout: 3000 });
    } else {
      setTimeout(deferPhase2, 1500);
    }

    const deferPhase3 = () => {
      SECTION_WEBP_URLS.forEach((url) => this.preload(url));
    };

    if ('requestIdleCallback' in window) {
      setTimeout(() => {
        window.requestIdleCallback(deferPhase3, { timeout: 8000 });
      }, 5000);
    } else {
      setTimeout(deferPhase3, 5000);
    }
  }

  preload(url) {
    if (this.cache.has(url)) return this.cache.get(url);

    const img = new Image();
    img.src = url;

    img.onload = () => {
      this.loadedUrls.add(url);
    };

    if ('decode' in img) {
      img.decode()
        .then(() => {
          this.loadedUrls.add(url);
        })
        .catch(() => {
          this.loadedUrls.add(url);
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

  isReady(url) {
    return this.loadedUrls.has(url);
  }

  preloadAll() {
    TRAIL_IMAGES.forEach((item) => {
      this.preload(item.url);
    });
  }
}

export const globalImageCache = new ImagePreloadCache();
export default globalImageCache;
