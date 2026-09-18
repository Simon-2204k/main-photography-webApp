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
- [x] **Page 1: Architecture & Interactive System**:
  - **Section 1: 3D Camera Spiral & HUD (`SpiralGalleryCanvas.jsx`, `HeaderHUD.jsx`, `BackgroundTypography.jsx`)**: 3D spiral trajectory with interactive HUD, `SIMON'S FRAMEWORK` branding, and `CustomCursor.jsx` (`+` crosshairs) active exclusively in Section 1.
  - **Lower Editorial Container (`.page1-editorial-container`)**: Solid `#0a0a0c` wrapper enclosing Sections 2 through 10 with `-2px` seamless overlap between `SlantedMarquee` and `FeaturedSeries` completely eliminating subpixel gap artifacts.
  - **Instant 57-Image Cursor Trail (`CursorTrail.jsx` & `imagePreloadCache.js`)**: Pre-decodes all 57 WebP images upfront on app initialization with GPU cache readiness and error fallback, ensuring 0 missing images and 0ms latency on initial entrance.
  - **Studio Manifesto (`StudioManifesto.jsx`)**: Displays exclusively the photo cursor trail with zero `+` crosshair cursor overlay.
- [x] **Universal Performance Optimization & Instant Asset Preloading**:
  - Global `ImagePreloadCache` with `img.decode()` on app initialization pre-decodes 57 trail WebP images and 8 menu GIFs.
  - Converted all 44 spiral gallery images from `.jpg` to `.webp` (75% payload reduction) and preloaded them with `useTexture.preload()`.
  - Converted `trail-images/img_25.jpg` to `img_25.webp`.
  - Localized and optimized 8 menu GIFs in `public/assets/page1/menu-gifs/` for 0ms instant hover response.
  - Wrapped all Page 1 sections in `React.memo()`.
- [x] **Page 2: DARKROOM Full Suite with Exact Redesign Integration**:
  - **Section 1: Hero Video Canvas (`DarkroomCanvas.jsx` & `DarkroomGridGrain.jsx`)**: 5 interactive draggable HUD mask boxes rendering clipped video frames from `darkroom_hero.mp4`, featuring exact `1px solid rgba(255, 255, 255, 0.3)` borders, `.pos-badge` coordinates, inner `GRAB` label, corner brackets (`┌ ┐ └ ┘`), `+` crosshairs, `[X]` targets, tick scale ladder, live date/time, and `LOADING PROJECTS : [01/01]`.
  - **Section 1 Header (`DarkroomHeader.jsx`)**: `position: absolute; top: 20px; left: 50%; transform: translateX(-50%)` inside Section 1 so it scrolls UP naturally with the canvas on scroll.
  - **Section 1 Middle Bar**: 6 modular segmented capsule tile blocks (`.darkroom-segment` with `gap: 4px`, `zIndex: 900`) matching Image 3 with transparent frosted glass blur (`background: rgba(18, 18, 22, 0.42); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.22)`).
  - **Section 2: Scroll-On-Reveal Image Sequence (`HeroCanvas.jsx`)**: Pinned GSAP canvas scrubbing all 49 sequence frames (`/assets/ese-hero-sequence01.webp` – `ese-hero-sequence49.webp`), displaying the glowing portrait opening on scroll, floating subtitle tags (`MODERN`, `HIGH QUALITY`, `FRESH`), and bottom reverse kinetic marquee (`#unified-marquee`).
  - **Section 3: Dedicated 100vh Screen with Strict 50/50 Window Split (`ThisIsESE.jsx`)**: Full `100vh` viewport height (`min-h-screen h-screen flex flex-col justify-center`), negative margin removed, floating top marquee, and vertically centered 50% Left / 50% Right window split: Left 50% features `✦ SIMON PHOTOGRAPHY ARCHIVE`, stacked headline `MASTER OF LIGHT & Perspective`, and 4-card optics specs grid (`MEDIUM`, `OPTICS`, `EMULSION`, `ATMOSPHERE`). Right 50% features the narrative statement (`Concept-driven, atmospheric and cinematic...`) and discipline metadata bar.
  - **Section 4: Complete Parallax Suite (`ParallaxPages.jsx`)**:
    - 6-slide Codegrid carousel with authentic camera viewfinder HUD overlays on all 6 slides (`┌ ┐ └ ┘` corner brackets, blinking `● REC`, `ISO 400`, `WB 5600K`, `BAT 98%`, `F/2.8`, `1/250s`, and center focus crosshair), generous vertical padding (`py-16 sm:py-24 lg:py-28`, `leading-[1.4] py-4` so text is never clipped), and mathematically seamless 2-group infinite wrapping (`gsap.utils.wrap(-50, 0, x)`).
    - `aladesign.cz` high-fashion editorial capability showcase (Image 4): large serif statement and 3 structured 2-column capability rows (`Strategic Creative Direction`, `Medium Format & Analogue Craft`, `Exhibition & Fine Art Printmaking`) with active `<CursorTrail zIndex={40} />` spawning **directly OVER the text**.
    - News card section `#outro-black` completely removed.
  - **Section 5: High-Fashion Capability Showcase (`aladesign.cz` Style)**: Large serif statement and 3 structured 2-column capability rows (`Strategic Creative Direction`, `Medium Format & Analogue Craft`, `Exhibition & Fine Art Printmaking`) with active `<CursorTrail zIndex={40} />` spawning **directly OVER the text**.
  - **Independent Post-Section 5 Suite (Page2.jsx Standalone Sections)**:
    - Moved all 6 new sections out of `ParallaxPages.jsx` into `Page2.jsx` as independent standalone sections following Section 5, with isolated ScrollTrigger pin spacing so they never overlap or collide with the carousel.
    - **New Section 1 (`DulcedoMenu.jsx`)**: High-contrast white background with 5 bold typography options (`CHRONICLE (+)`, `OBSERVATIONAL`, `ENVIRONMENTAL`, `ISOLATION`, `PERSPECTIVE`), active horizontal black bar inverting text to white, and directional `clipPath` image wipe reveal.
    - **New Section 2 (`PhysicsDisciplines.jsx`)**: Complete reference-grade interactive physics section:
      - Top serif headline *"We know what we're good at!"* in warm cream (`#f7f4ea`), centered in a balanced `140vh` section.
      - 3 giant typography words (`PORTRAITURE`, `EDITORIAL`, `DOCUMENTARY`) in crisp coral red (`#ff3823`) inverting to warm cream on hover with zero text-shadow glow.
      - Compact 3-card deck with bottom-to-top GSAP stagger (`overflow: hidden` mask, `power2.out` ease, zero drop shadows) and snug placement (`bottom: 8px-12px`) directly above the letters.
      - Dynamic push-down accordion expansion (`195px`) on hover, smoothly gliding the active word down so cards fit cleanly in the opened space with zero collision on the option above.
      - Unified continuous `w-fit` hit container with 100ms leave debounce buffer, completely eliminating edge hover jitter/flicker.
      - Matter.js 2D physics gravity simulation with ground platform aligned directly to the bottom baseline of the letters, so capsule pills fall through the text and tumble, bounce, and settle naturally across the bottom baseline of the active word.
    - **New Section 3 (`StackedCardsDeck.jsx`)**: Complete reference-grade Pinned 3D Stacked Cards Deck:
      - 6 full-resolution photography cards (`BRAND IDENTITY`, `ARCHITECTURAL FORM`, `WEBSITE`, `PRODUCT INNOVATION`, `CONTENT`, `EDITORIAL ARCHIVE`) with monospace category badges.
      - Sharp 0px rectangular silhouette with zero roundness (`borderRadius: 0px`).
      - Stacked (next) card staged flush against the bottom edge of the current card (`yPercent: 100`) right at the `overflow: hidden` boundary line with zero gap.
      - Ultra-smooth ScrollTrigger scrub (`scrub: 1.5`, `pin: true`).
      - Simultaneous continuous lockstep choreography: as the next card rises, the current card continuously scales down to `0.5`, rotates to an organic tilt between `-10°` and `+10°`, and fades out completely to `opacity: 0` without lingering behind. Zero blur.
    - **New Section 4 (`FolderArchive.jsx`)**: Complete reference-grade WildyRiftian-inspired File Folder Archive:
      - Full-bleed 100vw edge-to-edge, strict 100vh compact height with Row 3 sitting directly flush against the bottom of the screen with zero margin or padding.
      - Asymmetric 3-row physical folder organizer layout with `-28px` vertical overlap:
        - Row 1 (50% / 50%): `01 motion` (yellow `#fed730`) & `02 branding` (light grey `#e2e4e6`).
        - Row 2 (40% / 60% Asymmetric Split): `03 editorial` (narrower `40%`, light grey) & `04 photoworks` (wider `60%`, concrete grey `#a8aaac`).
        - Row 3 (50% / 50%): `05 illustration` (yellow `#fed730`) & `06 3D tech` (light grey `#e2e4e6`).
      - Compact 135px folder height (`minHeight: 130px`) with custom `clipPath` tab notches, micro monospace indices, and lowercase `'Newsreader', serif` titles.
      - Signature `#141416` dark background with `#ffffff` white `Works` and `rgba(255, 255, 255, 0.25)` `Archive` header.
      - Hardware-accelerated bottom-up preview card emergence on hover (`transformOrigin: 'bottom center'`) with wide horizontal card spreads (`-150px`, `-45px`, `+50px`, `+150px`), locked rotation angles (`-14°`, `-5°`, `+5°`, `+14°`), and zero flash/glitch.
      - Active hovered folder elevates to `zIndex: 50`, while all non-hovered folders smoothly turn to muted `#1c1c22` with subtle borders.
    - **New Section 6 (`KeyholeParallaxMask.jsx`) Complete & Modularized**:
      - 20 floating monochrome photograph cards in 4 staggered lanes with generous vertical spacing (`startY: 110vh` to `635vh`) and extended 700% scroll runway (`end: +=700%`), flowing smoothly upwards.
      - Pinned solid white front layer with crisp, unscaled `"IN A WORLD FULL OF NOISE"` center headline (`anticipatePin: 0`, zero pinning jump).
      - Custom Batman SVG silhouette mask (`viewBox="0 0 726 252.17"`) emerging smoothly from scale `0` (`0px auto`) at the 30% trailing image threshold (`time: 3.2s`) and expanding to `15,000px` full-bleed with 100% transparent background, zero text overflow, and zero corner clipping.
      - Unified backside destination page featuring a continuous, rapid 12-image cinematic photo reel from `/images/section5/` looping on a 220ms interval (`setInterval`), with editorial photography line `CAPTURING TIME THROUGH UNCOMPROMISED OPTICS` and `"BE THE ONE TO Stand Out"` clipped inside the mask and revealed on full expansion.
      - Integrated `<Footer />` component directly below the 100vh photo reel in the backside page flow with infinite `MADE BY SIMON` marquee.
    - **New Section 5 (`LaptopFoldingDeck.jsx`)**: Complete reference-grade 3D Laptop-Folding Deck:
      - 15vh margin/padding top before heading and 15vh bottom margin/padding after deck.
      - Fully visible heading in natural flow with a 60px bottom margin.
      - 90% screen height (`90vh`) and 75% screen width (`75vw`) laptop deck container pinned in center viewport (`start: 'center center'`).
      - Clean shadow-free aesthetic (`boxShadow: 'none'`) with 10px roundness (`borderRadius: '10px'`) on all folding cards.
      - 90-degree upwards folding rotation with simultaneous upward elevation (`rotateX: 90`, `y: '-60vh'`).
      - Snappy stepped deck stagger ("tak tak tak") where stacked cards behind step forward in scale unison to full size with zero opacity changes.
  - **Footer Section (`Footer.jsx`)**: Integrated directly into the Section 6 destination page with 100vw full-width zero-jitter infinite marquee (`MADE BY SIMON`).
  - **Comprehensive Multi-Device Calibration & Responsive Completion (Phones, Tablets & Desktop)**:
    - **HeroCanvas (`HeroCanvas.jsx`)**: Portrait cover math anchored at 38% focal width on `<= 1024px`, centering the model's face across all mobile and tablet viewports without left-edge cropping. Floating subtitle tags repositioned cleanly without facial obstruction.
    - **ThisIsESE (`ThisIsESE.jsx`)**: Changed layout to `justify-center items-center`, `my-auto`, and responsive `paddingTop: clamp(80px, 10vh, 120px)`. Eliminates dead space and bottom 500px void, providing balanced `px` and `py` on all phones.
    - **DulcedoMenu (`DulcedoMenu.jsx` & `DulcedoMenu.css`)**: Eliminated vertical dead zones on mobile/tablet by adopting centered 100vh layout; disabled the full-width solid white highlight bar on mobile/tablet (`display: none` on `<= 1024px`) with active text illuminated in `text-amber-400`, completely eliminating the white gap artifact across phones, tablets, and 1024×1366.
    - **PhysicsDisciplines (`PhysicsDisciplines.jsx`)**: Touch/click latching for mobile and tablet touchscreen users with clamped typography.
    - **FolderArchive (`FolderArchive.jsx`)**: Replaced all missing image paths with verified local WebP assets and implemented tap-to-latch folder interactions on touch devices with calibrated fanning deck spreads.
    - **ParallaxPages (`ParallaxPages.jsx` & `ParallaxPages.css`)**: Elevated carousel progress bar on tablets to `bottom: clamp(18vh, 22vh, 24vh)` to match phone placement with zero camera HUD collision. Recalibrated Editorial Statement padding to `px-7 sm:px-12` and `py-16 sm:py-24` with clean typography margins.
    - **LaptopFoldingDeck (`LaptopFoldingDeck.jsx`)**: Activated universal background & text color inversion across desktop, laptop, tablet, and mobile. Starts with `#000000` / white text seamlessly flowing from `FolderArchive`, and smoothly inverts to `#ffffff` / black text at 50% scroll height via ScrollTrigger. Added `maxHeight: 640px` on tablets to maintain balanced vertical proportions.

---

## 🏛️ 3. Page 3: EXHIBITS Multi-Section Showcase Experience

All the following components, data structures, and assets comprise **Page 3 (Exhibits)** of the application:

### 🌀 1. Fullscreen 3D Cylindrical Gallery (`src/components/Page3/CylindricalGallery/`)
- Fullscreen 3D cylinder rotating gallery built with Three.js / React Three Fiber.
- Curved card meshes displaying photographic works with smooth momentum rotation and drag physics.
- Scoped top navigation header with `MENU` button.

### 🌓 2. Half-Circle Arc Step Showcase (`src/components/Page3/ArcStepShowcase/`)
- 11 photographic cards arranged on a curved half-circle arc path.
- Stepped vertical roll with statement outro animation synchronized with scroll.

### 🖼️ 3. 5-Panel Triptych Panoramic Split & 3D Flipping Card Trio (`src/components/Page3/TriptychCardFlip/`)
- 5-panel split triptych panoramic photographic composition.
- Interactive 3D card flips on hover and scroll.

### 🌐 4. Fullscreen Photography Hub (`src/components/Page3/JamareaHub/`)
- Jamarea-style cycling photographic portal with fullscreen ambient backdrops.
- Dynamic project titles and smooth crossfade transitions.

### 🗺️ 5. Infinite Drag Canvas (`src/components/Page3/InfiniteDragCanvas/`)
- Continuous, frictionless multi-directional 2D draggable canvas.
- Photo stamps with polaroid border styling, organic rotation offsets, and interactive momentum physics.

### 🃏 6. Sticky Pushing Photography Discipline Cards (`src/components/Page3/StickyDisciplineCards/`)
- Full-bleed edge-to-edge `100vw × 100vh` sections with 0px corner roundness, 0 gaps, and zero black margins.
- Sticky heading accordion push mechanics: Card 1 sticks at `top: 0`; Card 2 slides up over Card 1 until reaching the bottom edge of Card 1's heading strip; Card 1 then un-sticks and slides up out of view as Card 2 sticks at `top: 0`. Continues seamlessly across all cards.

### ✒️ 7. SVG Path Drawing Hover Cards (`src/components/Page3/SvgPathHoverCards/`)
- Dynamic SVG outline path animation tracing borders on hover.
- Curated photography cards with subtle image zoom and caption reveals.

### ⏱️ 8. Stiff Background Horizontal Parallax Timeline (`src/components/Page3/HorizontalTimeline/`)
- Pinned horizontal scroll track with dual-speed parallax layers.
- Main project timeline cards with continuous, autonomous popping archival proof thumbnails scattered dynamically across upper and lower bands.

### 🏺 9. Multi-Tier 3D Cylindrical Gallery (`src/components/Page3/MultiCylindricalGallery/`)
- **Strict Top-Top Scroll Lock**: ScrollTrigger engages `window.lenis?.stop()` at `start: 'top top'`, locking page scrolling strictly when Section 9's top edge hits the top of the browser window.
- **Zero-Rerender GPU Physics Engine**: Completely eliminated the 60fps React `setState` loop by reading `physicsRef` directly inside R3F `useFrame` transforms on the GPU, removing all CPU re-renders and lag.
- **Full-Bleed 100vw × 100vh Dimensions**: Strictly edge-to-edge with 0 gaps, 0 borders, and 0 margin padding.
- **Minimalist B&W Lock Control**: Sleek darkroom monochrome button (`LOCKED` / `UNLOCKED`) with translucent dark glass, 1px white border, animated SVG padlock with spring shackle, and clean white-to-black hover inversion. Clicking strictly toggles scroll lock without forcing scroll-to-top.
- **Clean Viewport**: Completely free of distracting HUD banners, badges, or layer overlays.

---

## 📷 4. Page 4: SPEC SHEET Technical Optics & Analog Camera Suite

All the following components, data structures, and assets comprise **Page 4 (Spec Sheet)** of the application:

### 🎞️ 1. BetterOffLookback Experience (`src/components/Page4/BetterOffLookback/`)
- Horizontal multi-card cinematic showcase with embedded lookback video clips and analog technical telemetry.
- Seamless top bar and global `MENU` button trigger integration.

### 🖥️ 2. DeskScatter Showcase (`src/components/Page4/DeskScatterShowcase/`)
- Interactive desktop surface with distributed physical photography artifacts, dark mode windows, film reel video reel, and bottom tactile dock.
- Phone responsive adaptation: stream-lined single card flow from left and right with high-efficiency touch scrolling.

### 🖼️ 3. Image Strip Hover Showcase (`src/components/Page4/ImageStripHover/`)
- Vertical full-bleed image accordion strip with smooth GSAP cursor and hover reveal animations.

### 🧲 4. Magnetic Cards Infinite Archive Grid (`src/components/Page4/MagneticCards/`)
- 2D momentum-dragged spatial coordinate plane with infinite camera matrix.
- Calibrated phone viewport (`width: 205px; height: 290px; border-radius: 16px;`) and cell size (`200×140`) initialized at Cell 19 ("SELECTED WORKS PHOTOGRAPHIC ARCHIVE").

### 🔄 5. Rotated Page Scroll & 3D Cylindrical Carousel (`src/components/Page4/RotatedPageScroll/`)
- Three.js WebGL cylinder carousel featuring high-precision angle snapping and drag interaction.

### 🔬 6. Scroll Mindmap Technical Architecture (`src/components/Page4/ScrollMindmap/`)
- SVG wrinkle path drawing engine with traveling ball reticle and 10 interactive darkroom badges (`01 / APERTURE` through `10 / ANALOG ATELIER`).
- **Single-Line Badges**: Enforced `white-space: nowrap !important; width: max-content !important;` so pill text never wraps onto multiple lines.
- Coordinates copied directly from reference `scrolldetailsShowingSVGEffect` for pixel-accurate desktop placement.
- Mobile phone optimization: displays 5 curated pills orbiting the central typography with dynamically computed closed cubic spline curve.

### 🎬 7. Director Reveal Showcase (`src/components/Page4/DirectorReveal/`)
- Full-bleed cinematic darkroom director cards with typography and hover spotlighting.
- Centered mobile layout with phantom spacer removal on mobile viewports.

### 🎭 8. Crafting Comedy Pinned Scroll Suite (`src/components/Page4/CraftingComedy/`)
- Multi-phase pinned scroll sequence with synchronized card entrance and exit choreography.
- Optimized mobile duration (`+=45%`) with 1 card from right and 1 card from left.

### ⚡ 9. CR7 Parallax Showcase (`src/components/Page4/Cr7Parallax/`)
- Multi-layer depth parallax with custom preloader and fixed center display card.

### 🌊 10. WebGL Wave Drag Gallery (`src/components/Page4/WaveDragGallery/`)
- Custom GLSL vertex and fragment shader simulation with kinetic fluid drag distortion.

---

## 🧭 5. Universal Navigation & MenuOverlay System

- **Universal Footer MENU Integration**:
  - Page 1 Footer (`src/components/Page1/Footer/Footer.jsx`): Bottom-right Anton/Oswald `MENU` button.
  - Page 2 Footer (`src/components/Page2/Footer/Footer.jsx`): Bottom-right Anton/Oswald `MENU` button alongside centered copyright.
  - Page 3 & Page 4: Top and bottom `MENU` button triggers wired with `onOpenMenu(rect)`.
- **Fullscreen Morph-Scaled GSAP Menu (`MenuOverlay.jsx` & `MenuOverlay.css`)**:
  - **Identical Height Guarantee (Zero Click Scaling)**: Both `.k72-nav-row` and `.hovered-marquee-active` share the exact same height (`!important`) in all states. On click or hover, the electric-lime marquee activates seamlessly with **zero vertical scaling or jumping**.
  - **Phone & Tablet Height Calibration (up to 1024 x 1366)**:
    - Tablets (`<= 1024px` including iPad Pro 1024 x 1366): `--menu-option-row-height: clamp(100px, 14.5vh, 160px);`
    - Mobile Phones (`<= 600px`): `--menu-option-row-height: clamp(92px, 14.5vh, 138px);`
    - Fills the central vertical space cleanly between top and bottom bars, eliminating excessive empty black voids.