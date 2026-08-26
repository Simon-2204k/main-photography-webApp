export const TRAIL_IMAGES = Array.from({ length: 57 }, (_, i) => {
  const id = i + 1;
  const ext = id === 25 ? 'jpg' : 'webp';
  return {
    id,
    fileName: `img_${id}.${ext}`,
    url: `/assets/page1/trail-images/img_${id}.${ext}`
  };
});
