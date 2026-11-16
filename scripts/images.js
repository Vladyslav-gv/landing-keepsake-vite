import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src/assets/source';
const OUT = 'src/assets/images';

const WIDTHS = {
    work: [360, 720],
    journal: [150, 300],
};

const FORMATS = {
    avif: (img) => img.avif({ quality: 50 }),
    webp: (img) => img.webp({ quality: 75 }),
    jpg: (img) => img.jpeg({ quality: 78, mozjpeg: true }),
};

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));

for (const file of files) {
    const name = path.parse(file).name;
    const group = name.split('-')[0];
    const widths = WIDTHS[group];

    if (!widths) {
        console.warn(`Skipped ${file}: unknown group "${group}"`);
        continue;
    }

    for (const width of widths) {
        for (const [ext, encode] of Object.entries(FORMATS)) {
            const image = sharp(path.join(SRC, file)).resize({ width, withoutEnlargement: true });
            await encode(image).toFile(path.join(OUT, `${name}-${width}.${ext}`));
        }
    }
    console.log(`✓ ${file}`);
}