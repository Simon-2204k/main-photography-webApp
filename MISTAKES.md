# 📝 Mistake Notepad

This file tracks user-reported mistakes and required architectural corrections. 
**Rule:** When a mistake is reported, document it here and discuss with the user. Do NOT execute code changes until the user explicitly says **"proceed"**.

---

## 📌 Resolved Issues

### ✅ Issue 1: Visual Disciplines Container Z-Index vs. Cursor Trail
- **Resolution**: Visual Disciplines has `zIndex: 20` and solid `#0a0a0c` background. Any cursor trail activity remains strictly underneath / behind the container.

### ✅ Issue 2: Cursor Trail Re-emerges on Studio Manifesto
- **Resolution**: Studio Manifesto embeds `<CursorTrail zIndex={15} />` which renders active and visible on top of the paragraph text (`zIndex: 5`).

### ✅ Issue 3: Universal Cursor Trail Bounding & Scroll Attachment
- **Resolution**: `CursorTrail` is built as an absolute container-bounded component (`position: absolute; inset: 0; overflow: hidden;`). Coordinates are calculated in container space `(clientX - rect.left, clientY - rect.top)`.
  - **Zero Bleed/Overflow**: Section `overflow: hidden` strictly prevents any images from bleeding into Page 1 or adjacent sections.
  - **Scroll-Lock Solved**: All active trail images naturally scroll and move attached to their parent section.

### ✅ Issue 4: Studio Manifesto Formatted as a Single Centered Flowing Paragraph
- **Resolution**: Rebuilt `StudioManifesto.jsx` as a single, cohesive, centered text paragraph (`text-align: center`) in large condensed uppercase typography (`Anton`/`Oswald`) with natural wrapping, underlined keywords, and glowing accent dot.

### ✅ Issue 5: Spotlight Cards Performance Lag & Image/Ticker Optimization
- **Resolution**: 
  - Converted raw 2.3MB 4K/6K JPEGs to crisp `640×800px` WebP images (~18KB-55KB each, 98% reduction in VRAM and payload).
  - Eliminated Layout Thrashing by removing `container.getBoundingClientRect()` from inside the 60-120fps GSAP ticker loop and caching container center on scroll/resize.
  - Added `IntersectionObserver` so the physics ticker only runs when the section is in the viewport.
  - Added resting physics sleep (`isResting`) to bypass redundant DOM updates when cards reach equilibrium.
  - Added GPU hardware acceleration (`force3D: true`, `contain: paint layout`, `backface-visibility: hidden`) and removed per-frame `backdrop-filter` overhead.

### ✅ Issue 6: Spotlight Header Copy & Tag Corrections
- **Resolution**:
  - Removed `// SECTION 06` prefix; tag updated to clean `INTERACTIVE SPOTLIGHT`.
  - Replaced title `MAGNETIC ARCHIVE` with `SILVER HALIDE`.
  - Replaced subtitle `Fluid kinetic repulsion driven by physics velocity` with `Latent image reaction responsive to frame exposure`.

### ✅ Issue 7: Spotlight Cards Z-Index Elevation, Section 6 Cursor Exclusion & Footer Removal
- **Resolution**:
  - Excluded `#magnetic-spotlight-section` specifically in `CustomCursor.jsx` so no fullscreen crosshair grid lines or `+` cursor render over Section 6.
  - Elevated Section 6 header (`zIndex: 35`) and title (`zIndex: 36`).
  - Elevated base cards to `zIndex: 20 + i` and dynamically elevate active/hovered cards to `zIndex: 50`.
  - Removed the bottom instruction prompt (`• MOVE CURSOR OVER CARDS TO DISTURB MAGNETIC EQUILIBRIUM`) and indicator dot.

### ✅ Issue 8: Marquee Customization, Top HUD Removal, Greyish Palette & New Text
- **Resolution**:
  - Removed the top HUD dot-matrix / white pill header (`marquee-top-hud`).
  - Increased base cruising speed from `1.6` to `3.4px/frame` (over 2x faster).
  - Updated ribbon background palette to dark editorial metallic grey (`#24252d` / `#1e1f26`).
  - Updated typography: Big Banner Text `IT'S A RAW SHOT`, Tilted Badge `PRISM OPTICS`, Sub-Text Tag `APERTURE LAB® VISUAL EXPERIMENTAL LOG.`.

### ✅ Issue 9: Opposite Ribbon Tilt Slants
- **Resolution**:
  - Updated top and bottom marquee ribbons to tilt in opposite directions (`rotate(-3deg) skewX(-2deg)` for top, `rotate(3deg) skewX(2deg)` for bottom).
  - Adjusted width to `135%` (`left: -17.5%`) to guarantee zero edge gaps while intersecting dynamically.

---

### ✅ Issue 10: Topbar Removal, Sharp Red Hover Card & Seamless Single Section Integration
- **Resolution**:
  - Removed top-left red brand mark and top-right "Let's Connect" button from `FeaturedSeries.jsx` & `FeaturedSeries.css`.
  - Updated hover card to sharp geometry (`border-radius: 0px;`).
  - Removed black background from tag capsule pill, making it transparent with crisp black border and typography (`background: transparent; border: 1.5px solid #000; color: #000;`).
  - Unified `SlantedMarquee` and `FeaturedSeries` with zero gap by removing the 100vh lock and tight vertical padding.

---

### ✅ Issue 11: Unified Background Color & 10vh Clearance for SlantedMarquee/FeaturedSeries
- **Resolution**:
  - Set `SlantedMarquee` background color to `#0a0a0c` to match `FeaturedSeries` seamlessly.
  - Added bottom clearance padding to `SlantedMarquee` so the +3deg tilted ribbon is never cut off or clipped.
  - Added `10vh` top spacing to `FeaturedSeries` so it displays with clean visual breathing room below the marquee.

---

### ✅ Issue 12: Spotlight Marquee Cursor-Tracking Rectification, Header Meta & Cursor Reset
- **Resolution**:
  - Fixed vertical mouse tracking in `SpotlightMarquee.jsx` by computing dynamic `rect = section.getBoundingClientRect()` and `mouseRelY = e.clientY - rect.top`, eliminating stale bounding offsets on scrolled pages.
  - Increased tracking ease to `0.085` for snappy, immediate cursor following across the full section.
  - Updated top header meta: Left `svasu0014@gmail.com`, Right `Instagram, Twitter`.
  - Removed `cursor: crosshair` and restored clean default system cursor in `SpotlightMarquee.css`.

---

### ✅ Issue 13: Spotlight Marquee Image Source Correction (6 User-Provided Images)
- **Resolution**:
  - Converted the 6 user-provided photography images into optimized WebP assets (`user_spotlight_01.webp` through `user_spotlight_06.webp`).
  - Wired into `SpotlightMarquee.jsx` with quadruple array loop for seamless infinite wrapping across wide viewports.

---

### ✅ Issue 14: Spotlight Marquee Lag Elimination & HD Image Clarity + Monochrome "Simon" Footer
- **Resolution**:
  - Re-encoded the 6 user photography images into razor-sharp `800px` WebP (`q:v 88` + unsharp filtering) for crystal-clear Retina display fidelity (~25-50KB each).
  - Cached `sectionRect` on scroll and resize, eliminating synchronous reflow from `mousemove` for fluid 120 FPS cursor tracking.
  - Added GPU hardware acceleration tokens (`image-rendering: -webkit-optimize-contrast; transform: translateZ(0); decoding="async"`).
  - Built and integrated `src/components/Footer/Footer.jsx` & `Footer.css` with a pure **Monochrome Black and White** aesthetic (`#141416` background, `#ffffff` `Simon` wordmark, tagline, contact links with `svasu0014@gmail.com`, and a custom **Real Camera Icon** badge).

---

### ✅ Task 15: Page 1 Directory Modularization & Asset Organization
- **Resolution**:
  - Re-structured components into `src/components/Page1/` (12 components).
  - Created master page wrapper `src/pages/Page1/Page1.jsx` and `Page1.css`.
  - Re-structured data models into `src/data/page1/` (`projectsData.js`, `expandingGalleryData.js`, `trailImagesData.js`, `featuredSeriesData.js`).
  - Re-structured public assets into `public/assets/page1/` (`editorial/`, `expanding-gallery/`, `images/`, `spotlight-cards/`, `spotlight-marquee/`, `trail-images/`).
  - Re-structured scratch conversion scripts into `scratch/page1/`.
  - Cleaned up `src/App.jsx` to render `<Page1 />`.
  - Updated all import and asset URL paths; verified production build (`vite build` passed with 0 errors).

---

### ✅ Feature 16: Fullscreen Scaled GSAP Menu (K72 Photography Navigation + Film Grain)
- **Resolution**:
  - Embedded `[ ☰ MENU ]` trigger pill button directly under `THE WORLD THROUGH LENSES` in `BackgroundTypography.jsx`.
  - Built `src/components/Page1/MenuOverlay/MenuOverlay.jsx` & `MenuOverlay.css` with smooth GSAP scaling expansion (`scale: 0.1` ➔ `scale: 1`, `power4.inOut`) and staggered line reveals.
  - Replicated K72 aesthetic:
    - `SEE EVERYTHING` with auto-scrolling electric-lime marquee ribbon and sliding oval photograph pill.
    - Photography options: `DARKROOM`, `EXHIBITS`, `ATELIER & CONTACT`.
    - Top bar: `SIMON'S FRAMEWORK` + `EN / FR` + geometric `✕` close button.
    - Bottom bar: Live ticking studio clock (`BERLIN_HH:MM:SS`), legal links, and circular social badges `(FB) (IG) (IN) (BE)`.
    - Integrated procedural GPU analog `FilmGrain` texture layer over the menu.
  - Excluded `#menu-overlay-container` in `CustomCursor.jsx`.

### ✅ Issue 17: Menu Button Morph Scaling, Dynamic Hover Marquee, No Border/Icon & Name Rectification
- **Resolution**:
  - `BackgroundTypography.jsx`: Removed all borders and hamburger icon (`☰`); styled `MENU` as a sleek borderless box that passes its exact bounding box rect (`getBoundingClientRect()`) to the open handler.
  - `MenuOverlay.jsx`: Built GSAP coordinate-anchored morph scaling physics (`top, left, width, height` of button ➔ `0, 0, 100vw, 100vh` with `power4.inOut`), creating a seamless illusion that the button box itself physically expands to fullscreen.
  - `MenuOverlay.jsx`: Added `hoveredIndex` dynamic state across all 4 options (`SEE EVERYTHING`, `DARKROOM`, `EXHIBITS`, `SPEC SHEET`). On hover, the hovered row dynamically transforms into the active electric-lime marquee ribbon (`#d4ff00`) with smooth infinite loop and photo thumbnail pill.
  - Removed `EN / FR` from top bar.
  - Replaced 4th option with `SPEC SHEET`.
  - Maintained procedural GPU 24 FPS `FilmGrain` overlay.

---

### ✅ Issue 18: Layout Alignment (Top Centered SIMON, Center Options, Bottom Centered INDIA Time) & 2 GIFs per Option
- **Resolution**:
  - `MenuOverlay.jsx`: Set time calculation to `timeZone: 'Asia/Kolkata'` formatting live real-time `INDIA_HH:MM:SS`.
  - `MenuOverlay.jsx` & `MenuOverlay.css`: Centered `SIMON'S FRAMEWORK` at the top with `✕` close button on top-right; centered `INDIA_HH:MM:SS` at the bottom.
  - Removed all other bottom links (`PRIVACY POLICY`, `PRIVACY NOTICE`, `ETHICS REPORT`, `SPEC SHEET`) and social badges (`FB`, `IG`, `IN`, `BE`).
  - Increased option row dimensions with `min-height: clamp(90px, 13.5vh, 145px)` and generous vertical padding.
  - Embedded 2 distinct photography GIFs per option alternating along the electric-lime marquee ribbon:
    - `SEE EVERYTHING`: `WsjKOc0cURCtGmjESu` & `iFZzRx0sV3CjFrUo73`
    - `DARKROOM`: `3o7btQOpMhE43bPEUo` & `c71PoFdZD12iepS9b0`
    - `EXHIBITS`: `fHifZooT04kPB7w7hS` & `Cgl2VNjPPq1WE8aM7x`
    - `SPEC SHEET`: `LgJ4qb5xJseqTFAaPO` & `efNt8I9MU3gkB22nZy`
  - Verified production build (`vite build` passed with 0 errors in 2.14s).

### ✅ Issue 19: Menu Vertical Spacing (Visible Bottom India Time), Enlarged GIF Pill & Symmetric Marquee Text Padding (pt/pb)
- **Resolution**:
  - `MenuOverlay.css`: Calibrated row height to `height: clamp(75px, 12vh, 115px)` with `padding: 0;` and adjusted top/bottom bar margins, moving the central options upward so `INDIA_HH:MM:SS` is 100% visible at the bottom of the viewport on all screen sizes with zero clipping or scrolling.
  - `MenuOverlay.css`: Enlarged `.k72-photo-pill` to `height: clamp(52px, 6.5vw, 92px)` and `width: clamp(110px, 13vw, 195px)`, matching and slightly exceeding the typography cap height.
  - `MenuOverlay.css`: Implemented symmetric optical flex centering (`line-height: 1; display: inline-flex; align-items: center; justify-content: center;`) for balanced `pt`/`pb` and alignment between the marquee text and animated GIF pills.
  - Verified production build (`vite build` passed with 0 errors in 2.26s).

---

## ⚠️ Active Issues Under Correction

### 🔴 Issue 20: Responsive Device Restriction (Desktop/Laptop Only), Option Row Height Customization & GitHub Push
- **Reported**:
  1. **Option Row Height Increase & Customization Variable**: Increase the height of the 4 menu options (`SEE EVERYTHING`, `DARKROOM`, `EXHIBITS`, `SPEC SHEET`) to an expansive editorial scale, and create an easily identifiable CSS variable at the top of `MenuOverlay.css` so the user can easily adjust/increase the height manually anytime.
  2. **Device Restriction (Laptop & Above Only)**: Phones and tablets must NOT show the interactive web app. Restrict visibility exclusively to laptops and desktops (`width >= 1024px`). On screens `< 1024px` (phones and tablets), show an editorial darkroom notice screen instructing the user to view on a desktop/laptop display.
  3. **Push to GitHub (`https://github.com/Simon-2204k`)**: Initialize git repository, configure `.gitignore` (ignoring `node_modules`, `dist`, etc.), commit all code cleanly, and configure remote to push to user's GitHub profile `https://github.com/Simon-2204k/main-photography-webApp.git`.
- **Proposed Architectural Correction**:
  1. In `MenuOverlay.css`: Define `--menu-option-row-height: clamp(90px, 14vh, 135px);` prominently at line 1 in `:root`, applying it to `.k72-nav-row` and `.k72-nav-row.hovered-marquee-active`.
  2. Create `src/components/Page1/DesktopOnlyNotice/DesktopOnlyNotice.jsx` and `DesktopOnlyNotice.css`:
     - Hidden on `@media (min-width: 1024px)` (`display: none;`).
     - Displayed full-screen on `@media (max-width: 1023px)` with camera optical reticle, message *"Experience crafted exclusively for desktop & laptop displays"*, live resolution badge, and continuous film grain.
     - Hide the main application container (`.page1-root-wrapper`) on screens `< 1024px`.
  3. Create standard `.gitignore` file in repository root.
  4. Initialize git repository (`git init`), stage all files (`git add .`), commit (`git commit -m "feat: complete Simon's Framework photography web application (Page 1)"`), set branch to `main`, and link remote `origin` to `https://github.com/Simon-2204k/main-photography-webApp.git`.

---

## 📋 Status
- [x] Issue 1 resolved.
- [x] Issue 2 resolved.
- [x] Issue 3 resolved.
- [x] Issue 4 resolved.
- [x] Issue 5 resolved.
- [x] Issue 6 resolved.
- [x] Issue 7 resolved.
- [x] Issue 8 resolved.
- [x] Issue 9 resolved.
- [x] Issue 10 resolved.
- [x] Issue 11 resolved.
- [x] Issue 12 resolved.
- [x] Issue 13 resolved.
- [x] Issue 14 resolved.
- [x] Task 15: Page 1 Directory Modularization & Asset Organization resolved.
- [x] Feature 16 resolved.
- [x] Issue 17: Menu Morph Scaling, Dynamic Hover Marquee & Cleanup resolved.
- [x] Issue 18: Layout Alignment (Top Centered SIMON, Center Options, Bottom Centered INDIA Time) & 2 GIFs per Option resolved.
- [x] Issue 19: Menu Vertical Spacing, Enlarged GIF Pill & Symmetric Padding resolved.
- [ ] Issue 20: Responsive Device Restriction & GitHub Repository Push (Awaiting user approval / "proceed").
- [x] Production build verified (`vite build` passed with 0 errors).
