const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, '..', 'public', 'assets', 'spotlight-marquee');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} images to convert in ${dir}`);

for (const file of files) {
  const inPath = path.join(dir, file);
  const outPath = path.join(dir, file.replace('.jpg', '.webp'));
  const cmd = `ffmpeg -y -i "${inPath}" -vf "scale=640:-1" -q:v 82 "${outPath}"`;
  console.log(`Converting ${file} -> ${path.basename(outPath)}`);
  execSync(cmd, { stdio: 'ignore' });
}

console.log('Conversion complete!');
