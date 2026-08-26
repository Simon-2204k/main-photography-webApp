const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '..', 'images');
const destDir = path.join(__dirname, '..', 'public', 'assets', 'spotlight-marquee');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

console.log(`Found ${files.length} user images to convert in ${srcDir}:`, files);

files.forEach((file, index) => {
  const inPath = path.join(srcDir, file);
  const outName = `user_spotlight_0${index + 1}.webp`;
  const outPath = path.join(destDir, outName);
  const cmd = `ffmpeg -y -i "${inPath}" -vf "scale=640:-1" -q:v 82 "${outPath}"`;
  console.log(`Converting ${file} -> ${outName}`);
  execSync(cmd, { stdio: 'ignore' });
});

console.log('Conversion complete!');
