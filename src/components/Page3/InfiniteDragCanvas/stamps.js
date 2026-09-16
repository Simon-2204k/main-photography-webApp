// Clean metadata for 20 stamp assets with randomized vintage paper background colors

const countries = [
  "POLSKA", "DANMARK", "GREAT BRITAIN", "DEUTSCHLAND", "FRANCE", "NIPPON",
  "ITALIA", "HELVETIA", "MAGYAR POSTA", "SUOMI", "US POSTAGE",
  "ÉIRE", "ÖSTERREICH", "NEDERLAND", "ESPAÑA", "BELGIQUE",
  "CANADA", "SVERIGE", "NORGE", "PORTUGAL"
];

const prices = [
  "1.50", "23", "0,95", "1.20", "50", "84", "5¢", "3.40",
  "12", "70", "0,60", "2.80", "45", "150", "8.50", "2.10",
  "0,80", "65", "1.75", "100"
];

const paperTints = [
  '#dce8d5',
  '#f5dede',
  '#f7e8c8',
  '#dbe6f2',
  '#e8def5',
  '#f5e4d7',
  '#d6eedf',
  '#fae3d9',
  '#f5eedc',
  '#e0ece4'
];

function pseudoRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export const STAMPS = Array.from({ length: 20 }, (_, index) => {
  const styleType = (index % 3) + 1;
  const country = countries[index % countries.length];
  const price = prices[index % prices.length];
  const bgTint = paperTints[index % paperTints.length];
  const imageName = `stamp-${index + 1}.jpg`;

  return {
    id: `stamp-${index + 1}`,
    filename: imageName,
    thumbSrc: `/thumbs/${imageName}`,
    src: `/3d-spiral-images/${imageName}`,
    styleType,
    country,
    price,
    bgTint,
    index
  };
});
