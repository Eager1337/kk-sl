import sharp from "sharp";
import { readdirSync } from "fs";
import path from "path";

const ASSETS = path.resolve("src/assets");
const TARGETS = readdirSync(ASSETS).filter((f) => /^bottle-.*\.png$/.test(f));

// Tolerance for "white-ish" background pixels.
const NEAR_WHITE = 232; // channel >= this counts as background candidate
const EDGE_TOL = 38; // flood-fill tolerance from a seed white pixel

async function process(file) {
  const inPath = path.join(ASSETS, file);
  const img = sharp(inPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const idx = (x, y) => (y * width + x) * channels;

  const isWhite = (i) =>
    data[i] >= NEAR_WHITE && data[i + 1] >= NEAR_WHITE && data[i + 2] >= NEAR_WHITE;

  // Flood fill from all four borders so white *inside* labels is preserved.
  const visited = new Uint8Array(width * height);
  const stack = [];
  const pushSeed = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    if (isWhite(idx(x, y))) {
      visited[p] = 1;
      stack.push(p);
    }
  };
  for (let x = 0; x < width; x++) {
    pushSeed(x, 0);
    pushSeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushSeed(0, y);
    pushSeed(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    const i = idx(x, y);
    // make transparent
    data[i + 3] = 0;
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const np = ny * width + nx;
      if (visited[np]) continue;
      const ni = idx(nx, ny);
      // expand into pixels that are still light enough (anti-alias halo)
      if (
        data[ni] >= NEAR_WHITE - EDGE_TOL &&
        data[ni + 1] >= NEAR_WHITE - EDGE_TOL &&
        data[ni + 2] >= NEAR_WHITE - EDGE_TOL
      ) {
        visited[np] = 1;
        stack.push(np);
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(inPath);
  console.log(`cutout: ${file} (${width}x${height})`);
}

for (const f of TARGETS) {
  await process(f);
}
console.log("done");
