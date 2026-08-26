gsap.registerPlugin(SplitText);

const section = document.querySelector(".spotlight");
const strip = document.querySelector(".spotlight-marquee");
const track = document.querySelector(".spotlight-marquee-track");

// Compact config
const cfg = {
  spd: 100,
  ease: 0.05,
  inset: 175,
  rise: 0.85,
  gap: 100,
  lift: 125,
  wakeS: 2.5,
  wakeR: 125,
  settle: 0.09,
};

// 1. Setup Marquee (Simplified clone loop)
const items = [...track.children];
const w = items.reduce((s, i) => s + i.offsetWidth, 0);
for (let i = 0; i <= window.innerWidth / w; i++)
  items.forEach((el) => track.appendChild(el.cloneNode(true)));

gsap.to(track, {
  x: `-=${w}`,
  duration: w / cfg.spd,
  ease: "none",
  repeat: -1,
  modifiers: { x: (x) => `${gsap.utils.wrap(-w, 0, parseFloat(x))}px` },
});

// 2. Setup SplitText & Geometry
let moved = false,
  bounds,
  stripBase,
  stripH,
  contentTop,
  targetY = 0,
  currY = 0,
  prevY = 0;

const split = new SplitText(
  ".spotlight-content-wrapper h1, .spotlight-content-wrapper h3, .spotlight-copy p",
  { type: "lines" },
);
const lines = split.lines.map((el) => ({ el, currY: 0, baseY: 0 }));

const measure = () => {
  bounds = section.getBoundingClientRect();
  stripBase = strip.offsetTop;
  stripH = strip.offsetHeight;

  // Replaced heavy while() offset traversal with getBoundingClientRect()
  const top = Math.min(
    ...lines.map((l) => {
      l.baseY =
        l.el.getBoundingClientRect().top - bounds.top + l.el.offsetHeight / 2;
      return l.baseY - l.el.offsetHeight / 2;
    }),
  );
  contentTop = top === Infinity ? bounds.height * 0.4 : top;

  if (!moved) targetY = currY = prevY = cfg.inset - stripBase - stripH / 2;
};

window.addEventListener("resize", measure);
measure();

// 3. Interactions
section.addEventListener("mousemove", (e) => {
  moved = true;
  const yOffset = stripBase + stripH / 2;
  targetY = gsap.utils.clamp(
    cfg.inset - yOffset,
    bounds.height - cfg.inset - yOffset,
    e.clientY - bounds.top - yOffset,
  );
});

// 4. Render Loop (Consolidated math)
gsap.ticker.add(() => {
  currY += (targetY - currY) * cfg.ease;
  gsap.set(strip, { y: currY });

  const cY = stripBase + currY + stripH / 2;
  const vY = currY - prevY;
  prevY = currY;

  const rise = -Math.min(
    Math.max(0, cY - cfg.inset) * cfg.rise,
    Math.max(0, contentTop - cfg.gap),
  );

  lines.forEach((l) => {
    const gap = l.baseY - cY;
    const wake = vY * cfg.wakeS * Math.exp(-(gap * gap) / (2 * cfg.wakeR ** 2));

    l.currY +=
      ((cY + cfg.lift >= l.baseY ? rise : 0) + wake - l.currY) * cfg.settle;
    gsap.set(l.el, { y: l.currY });
  });
});
