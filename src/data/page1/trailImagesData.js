export const TRAIL_IMAGES = Array.from({ length: 57 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    fileName: `img_${id}.webp`,
    url: `/assets/page1/trail-images/img_${id}.webp`
  };
});
