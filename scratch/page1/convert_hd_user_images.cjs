const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '..', 'images');
const destDir = path.join(__dirname, '..', 'public', 'assets', 'spotlight-marquee');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

console.log(`Re-encoding ${files.length} images to HD WebP...`);

files.forEach((file, index) => {
  const inPath = path.join(srcDir, file);
  const outName = `user_spotlight_0${index + 1}.webp`;
  const outPath = path.join(destDir, outName);
  // 800px scale with unsharp mask and quality 88 for razor-sharp clarity
  const cmd = `ffmpeg -y -i "${inPath}" -vf "scale=800:-1,unsharp=5:5:0.8:5:5:0.0" -q:v 88 "${outPath}"`;
  console.log(`HD Encoding: ${file} -> ${outName}`);
  execSync(cmd, { stdio: 'ignore' });
});

console.log('HD Image encoding complete!');
