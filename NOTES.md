# 📋 Project Notes & Architecture (Main Photography WebApp)

---

## 🛠️ 1. Tech Stack
- **Core**: React 19 + Vite
- **Styling**: Vanilla CSS + Tailored Design Tokens + Google Fonts (`Anton`, `Oswald`, `Newsreader`, `Playfair Display`, `Space Grotesk`, `Inter`)
- **Animations & Interaction**:
  - GSAP (GreenSock Animation Platform)
  - Lenis (Smooth Momentum Scrolling)
  - Three.js / @react-three/fiber / @react-three/drei (3D WebGL Spiral Gallery)
  - Procedural 24 FPS GPU Film Grain Canvas (`FilmGrain.jsx`)

---

## 📌 2. Page 1: Main Photography Archive Experience

All the following components, data structures, and assets comprise **Page 1** of the application:

### 🌀 1. Hero 3D Spiral Gallery (`src/components/SpiralGallery/`)
- WebGL 3D cylinder spiral rotating and rising along the camera curve synchronized with Lenis scroll progress.
- Page 1 custom crosshair HUD cursor (`CustomCursor.jsx`).
- Minimalist floating HUD header and background typography.

### 📰 2. Perspectives Editorial Grid (`src/components/PerspectivesGrid/`)
- 3-column asymmetric editorial layout with dynamic multi-speed parallax scrolling (columns 1, 2, 3 move at calibrated speeds and lock into uniform alignment).
- Scoped container-bounded cursor trail (`CursorTrail.jsx`) flowing behind cards.

### 🎨 3. Visual Disciplines 12-Item Showcase (`src/components/VisualDisciplines/`)
- 12 photography disciplines rendered in tight condensed uppercase typography with 0px extra row gaps.
- Active item lights up bold white (`#ffffff`) as it crosses 50% window height (`50vh`).
- 1:1 color graphic preview card **pinned at dead-center (`50vh`)** with smooth continuous color morphing between disciplines.
- **Strict Boundary Trigger**: Disappears instantly with 0ms delay the microsecond scroll exits above the 1st word or below the 12th word.
- Parent container has `zIndex: 20` and solid `#0a0a0c` background so cursor trail stays strictly underneath.

### 📜 4. Studio Manifesto (`src/components/StudioManifesto/`)
- High-impact photography statement rendered as a **single, cohesive, centered text paragraph** (`text-align: center`, `maxWidth: 1000px`, `lineHeight: 1.42`).
- Underlined key words (`frame`, `perspective`, `experiences`, `extraordinary`) styled with editorial serif italic font (`Newsreader` / `Playfair Display`) and `15px` horizontal margins.
- Scoped container-bounded cursor trail (`CursorTrail.jsx`) active at `zIndex: 15` flowing prominently on top of the text.

### 🎞️ 5. Expanding Scroll Multi-Row Gallery (`src/components/ExpandingGallery/`)
- 8 rows × 8 columns = 64 high-resolution photography cards.
- **Archive Film Cassette Tabbed Silhouette (Option 1/Image 2)**: Stepped top tab (`EXP 01/64` • `CATEGORY`) with smooth rounded card chassis and hover scale effects.
- Dynamic GSAP scroll expansion from compact 125% width to 480% wide panoramic spread synchronized with Lenis momentum scroll.
- Page 1 Crosshair HUD Cursor active and visible over the entire section.

### 🧲 6. Silver Halide Spotlight Cards (`src/components/SpotlightCards/`)
- SpencerGabor kinetic magnetic cards physics engine powered by GSAP ticker.
- **Title**: `SILVER HALIDE` • **Subtitle**: `Latent image reaction responsive to frame exposure` • **Tag**: `INTERACTIVE SPOTLIGHT`.
- **Z-Index Hierarchy**: Section 6 Header & Title elevated to `zIndex: 35+`, base cards set to `zIndex: 20 + i`, and hovered active cards dynamically ascend to `zIndex: 50`.
- **Clean Cursor Experience**: Specifically excluded `#magnetic-spotlight-section` in `CustomCursor.jsx` to disable crosshair lines and `+` pointer on Section 6.
- **Zero Layout Thrashing**: Container center is cached on scroll/resize, eliminating synchronous DOM reflows during the 60-120fps physics loop.
- **Viewport Culling & Rest Sleep**: `IntersectionObserver` pauses ticker offscreen, and `isResting` logic sleeps DOM updates when cards reach equilibrium.
- **Optimized Texture Pipeline**: 4 high-resolution photography cards converted to lightweight `640×800px` WebP (~18KB-55KB each, 98% VRAM reduction).
- Real-time spring-damping velocity physics (`SPRING = 0.08`, `DAMPING = 0.86`, `PUSH = 14`, `TILT = 0.08`, `PROXIMITY = 320`).
- Responsive coordinate scaling and pointer tracking for high-performance interaction.
- Positioned immediately following `ExpandingGallery` as the concluding interactive spotlight showcase.

### 🎪 7. Dual Slanted Kinetic Ribbon Marquee (`src/components/SlantedMarquee/`)
- Dynamic slanted kinetic marquee with sleek dark editorial metallic grey ribbons (`#24252d` / `#1e1f26`).
- **Opposite Slant Angles**: Top ribbon tilted `-3deg`, bottom ribbon tilted opposite `+3deg` (`135%` width, `left: -17.5%` with dynamic scissor intersection).
- **Bi-directional Motion**: Top ribbon moves **Right ➔**, Bottom ribbon moves **Left ⬅️** with solid greyish lower block extension.
- **Speed & Physics**: Cruising base velocity increased to `3.4px/frame` + real-time scroll velocity momentum acceleration (`Math.abs(deltaY) * 0.65`) decaying smoothly (`damping = 0.90`).
- **Updated Typography**:
  - Big Banner Text: `IT'S A RAW SHOT` (`Anton`/`Oswald`).
  - Tilted Badge: `PRISM OPTICS` (`-9deg` white outline frame).
  - Sub-Text Tag: `APERTURE LAB® VISUAL EXPERIMENTAL LOG.` (`Space Grotesk` 3-line lockup).
- **Viewport Culling**: `IntersectionObserver` attaches GSAP ticker only when section is visible in the viewport.

### 🏛️ 8. "Featured Series" Editorial Directory (`src/components/FeaturedSeries/`)
- Griflan-inspired editorial grid directory with 3-column × 10-row matrix (30 project series), unified seamlessly with `SlantedMarquee` as one continuous section.
- **Left Sidebar**: Stacked navigation links (`Gallery (35)`, `Darkroom`, `Exhibits`, `Spec Sheet`) and massive editorial serif title `"Featured Series"`.
- **Right Table Matrix**: 30 photographic series items in 3 columns with fine divider borders (`1px solid rgba(255, 255, 255, 0.12)`).
- **Interactive Floating Hover Card**:
  - Vibrant `#ff3b30` **sharp square box (0px roundness)** (`220px × 220px`) smoothly tracks mouse movement with `gsap.quickTo`.
  - Embeds transparent capsule pill (`border: 1.5px solid #000; color: #000;`) displaying tailored photography tags (e.g. `Monochrome 35mm`, `Film Grain Study`, `Brutalist Geometry`, `Gelatin Silver`, `Ansel Tonal Scale`).
  - Hovered cell text highlights in `#ff3b30`.
- **Clean Cursor Experience**: Excluded from global crosshair overlay in `CustomCursor.jsx`.

### 🧲 9. Magnetic Spotlight Marquee Strip (`src/components/SpotlightMarquee/`)
- CodeGrid "divLike Cursor" magnetic displacement image marquee strip.
- **Top Header Meta**: `svasu0014@gmail.com` (left) & `Instagram, Twitter` (right).
- **User HD Photographic Assets**: 6 user-provided images converted to razor-sharp `800px` WebP (`user_spotlight_01.webp` – `user_spotlight_06.webp`, ~25-50KB each).
- **Horizontal Continuous Track**: Infinite Quadruple image loop auto-scrolling with `decoding="async"`, `loading="eager"`, and `image-rendering: -webkit-optimize-contrast`.
- **Zero-Reflow Vertical Mouse-Tracking Strip**: Caches bounding rect on scroll/resize, executing purely algebraic mouse tracking (`ease: 0.085`) with 0ms DOM reflow overhead at 120 FPS.
- **Difference Blend Mode**: High-contrast difference overlay (`mix-blend-mode: difference; color: #fff`) inverting text color as images glide behind.
- **Kinetic Magnetic Wake Displacement**:
  - Gaussian velocity wake formula: $\text{wake} = v_Y \cdot 2.6 \cdot \exp(-\text{gap}^2 / (2 \cdot 130^2))$.
  - Text lines physically lift and ripple around the passing marquee strip with spring damping.
- **Clean Cursor Experience**: Excluded from global crosshair cursor in `CustomCursor.jsx`, standard default cursor.

### 🖤 10. "Simon" Editorial Footer (`src/components/Page1/Footer/`)
- Griflan-inspired editorial footer built with a pure **Monochrome Black & White** palette (`#141416` charcoal black canvas).
- **Brand Wordmark**: Massive bold white typography **`Simon`** (`#ffffff`, `font-weight: 800`).
- **Artisan Emblem**: Minimalist white hand-heart icon beside the wordmark.
- **Tagline**: `"Partnering with ambitious brands & inspiring people."` in crisp `#f0f0f5` Space Grotesk.
- **Contact & Socials Columns**:
  - Phone: `856.816.6159` • `610.952.1398`
  - Email: `svasu0014@gmail.com`
  - Socials: `Instagram` • `Linkedin` • `X`
- **Bottom Metadata & Real Camera Badge**:
  - Left: `Copyright 2026 Simon Design Inc. All Rights Reserved` (`#888890`).
  - Right: **Real Camera Icon Badge** with mechanical chassis, lens rings, and optical viewfinder inside a sleek white-bordered squircle container.
- **Clean Cursor Experience**: Excluded from global crosshair cursor overlay in `CustomCursor.jsx`.

### ✨ 11. Universal Bounded Cursor Trail Engine (`src/components/Page1/CursorTrail/`)
- Bounded to parent section (`position: absolute; inset: 0; overflow: hidden;`).
- Spawns HD WebP images in local container document space `(clientX - rect.left, clientY - rect.top)`.
- **Zero Bleed**: Cannot bleed or overflow into adjacent sections (e.g. Page 1 Hero).
### 🧭 12. Fullscreen Morph-Scaled GSAP Menu (`src/components/Page1/MenuOverlay/`)
- K72-inspired fullscreen navigation overlay triggered by the borderless, icon-free `MENU` box below `THE WORLD THROUGH LENSES`.
- **GSAP Direct Morph Scaling**: The exact `MENU` button box physically scales from its coordinates on the page (`top, left, width, height`) to full viewport (`100vw × 100vh`, `power4.inOut`, `0.65s`) and collapses back smoothly on exit.
- **Continuous Procedural Film Grain**: Embeds the GPU 24 FPS `FilmGrain` canvas layer across the fullscreen menu modal.
- **Dynamic Hover-Activated Marquee Ribbon with 2 Large GIFs per Option**:
  1. `SEE EVERYTHING` (Page 1 Archive): `WsjKOc0cURCtGmjESu` (BBC Glow Up) & `iFZzRx0sV3CjFrUo73` (Utopia Flash).
  2. `DARKROOM` (Page 2: Analog Chemistry & Raw Negatives): `3o7btQOpMhE43bPEUo` (Model Flash) & `c71PoFdZD12iepS9b0` (Photobooth).
  3. `EXHIBITS` (Page 3: Spatial Curations & Gallery Shows): `fHifZooT04kPB7w7hS` (Clio Light Photo) & `Cgl2VNjPPq1WE8aM7x` (Bounce TV Photoshoot).
  4. `SPEC SHEET` (Page 4: Technical Specifications & Optics): `LgJ4qb5xJseqTFAaPO` (Hollyoaks Zoom) & `efNt8I9MU3gkB22nZy` (USA Hockey Flash).
  - Hovering ANY option dynamically turns it into the electric-lime scrolling marquee (`#d4ff00` / black text) with both enlarged GIFs (`height: clamp(52px, 6.5vw, 92px); width: clamp(110px, 13vw, 195px);`) alternating continuously along the track.
- **Configurable Row Height via CSS Variable (`MenuOverlay.css` Line 1)**:
  - `--menu-option-row-height: clamp(92px, 13.5vh, 138px);` — allows instant manual tuning of option row dimensions.
- **Aligned Spatial Layout & Symmetric Typography Padding**:
  - **Top**: `SIMON'S FRAMEWORK` centered at top with geometric `✕` close button on top-right.
  - **Center**: 4 options driven by `--menu-option-row-height`, with symmetric optical top/bottom (`pt`/`pb`) alignment.
  - **Bottom**: 🌐 `INDIA_HH:MM:SS` (Live real-time IST clock `Asia/Kolkata`) 100% visible and centered at bottom.
- **Clean Cursor Experience**: Excluded from global crosshair in `CustomCursor.jsx`.

### 📱 13. Responsive Device Restriction (Desktop & Laptop Only — `< 1024px`) (`src/components/Page1/DesktopOnlyNotice/`)
- Restricts interactive 3D WebGL experience to screens `1024px` and wider.
- Below `1024px` (phones and tablets), displays a fullscreen cinematic darkroom blocker:
  - Header: `SIMON'S FRAMEWORK`
  - Animated aperture wireframe camera reticle with pulse ring.
  - Heading: `EXPERIENCE DESIGNED FOR DESKTOP & LAPTOP`
  - Live resolution indicator badge: `CURRENT DISPLAY: ${width}px · REQUIRED: 1024px+`
  - Continuous procedural 24 FPS `FilmGrain` overlay.

---

## 📦 3. Page 1 Directory Structure

```
src/
├── pages/
│   └── Page1/
│       ├── Page1.jsx          (Master Page 1 container)
│       └── Page1.css
├── components/
│   └── Page1/
│       ├── CursorTrail/
│       ├── ExpandingGallery/
│       ├── FeaturedSeries/
│       ├── FilmGrain/
│       ├── Footer/
│       ├── MenuOverlay/
│       ├── PerspectivesGrid/
│       ├── SlantedMarquee/
│       ├── SpiralGallery/
│       ├── SpotlightCards/
│       ├── SpotlightMarquee/
│       ├── StudioManifesto/
│       └── VisualDisciplines/
└── data/
    └── page1/
        ├── projectsData.js
        ├── expandingGalleryData.js
        ├── trailImagesData.js
        └── featuredSeriesData.js

public/assets/
└── page1/
    ├── editorial/
    ├── expanding-gallery/
    ├── images/
    ├── spotlight-cards/
    ├── spotlight-marquee/
    └── trail-images/

scratch/
└── page1/
    ├── convert_images.cjs
    ├── convert_images.js
    ├── convert_user_images.cjs
    └── convert_hd_user_images.cjs
```

---

## 🚀 4. Current Status & Verification
- [x] **Page 1 Complete & Modularized**: All 10 interactive sections, typography, physics engines, custom cursors, datasets, and assets organized in dedicated `Page1` directories.
- [x] Master page view `src/pages/Page1/Page1.jsx` wired cleanly into `App.jsx`.
- [x] **Fullscreen Scaled GSAP Menu (`MenuOverlay`)** integrated with K72 style, lime marquee ribbon, photo pill, and continuous film grain.
- [x] 64 user-provided photography images ported to `public/assets/page1/expanding-gallery/` and mapped with authentic metadata.
- [x] 4 high-res photography cards ported to `public/assets/page1/spotlight-cards/` and wired to physics engine.
- [x] 6 user photography images encoded to HD WebP in `public/assets/page1/spotlight-marquee/`.
- [x] `ExpandingGallery` component integrated with Archive Tabbed silhouette and smooth Lenis + GSAP row expansion.
- [x] `SpotlightCards` interactive physics component integrated after `ExpandingGallery`.
- [x] `SlantedMarquee` dual kinetic ribbon marquee with scroll velocity momentum integrated after `SpotlightCards`.
- [x] `FeaturedSeries` editorial directory grid with floating red preview card integrated after `SlantedMarquee`.
- [x] `SpotlightMarquee` magnetic displacement marquee strip integrated after `FeaturedSeries`.
- [x] `Footer` ("Simon" Monochrome Black & White with Real Camera Badge) integrated after `SpotlightMarquee`.
- [x] Global scrollbar reset active across all browsers.
- [x] `MISTAKES.md` tracking log maintained.
- [x] Production build tested and verified (`vite build` passed with 0 errors).
- [x] Dev server running locally at `http://localhost:5173/`.