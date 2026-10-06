import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_IMG = path.join(ROOT, 'public/img');

/**
 * Pure Node.js WebP Dimension reader
 */
function getWebPDimensions(filePath) {
  try {
    const buf = Buffer.alloc(32);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buf, 0, 32, 0);
    fs.closeSync(fd);

    if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
      return null;
    }
    const chunkType = buf.toString('ascii', 12, 16);
    if (chunkType === 'VP8X') {
      const width = 1 + buf.readUIntLE(24, 3);
      const height = 1 + buf.readUIntLE(27, 3);
      return { width, height };
    } else if (chunkType === 'VP8L') {
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height };
    } else if (chunkType === 'VP8 ') {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
    return null;
  } catch {
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Sync Gallery JSON from public/img/gallery files
 */
export function syncGallery() {
  const galleryDir = path.join(PUBLIC_IMG, 'gallery');
  if (!fs.existsSync(galleryDir)) {
    console.error('Gallery directory not found:', galleryDir);
    return [];
  }

  const files = fs.readdirSync(galleryDir);
  const itemsMap = new Map();

  for (const file of files) {
    if (!file.endsWith('.webp')) continue;
    const match = file.match(/^(.+)-(640|1600)\.webp$/);
    if (!match) continue;

    const [, id, size] = match;
    if (!itemsMap.has(id)) {
      itemsMap.set(id, { id, has640: false, has1600: false });
    }
    const item = itemsMap.get(id);
    if (size === '640') item.has640 = true;
    if (size === '1600') item.has1600 = true;
  }

  const validItems = [];
  for (const [id, info] of itemsMap.entries()) {
    if (info.has1600) {
      const fullPath = path.join(galleryDir, `${id}-1600.webp`);
      const dims = getWebPDimensions(fullPath);
      validItems.push({
        id,
        w: dims ? dims.width : 2000,
        h: dims ? dims.height : 3000
      });
    }
  }

  // Sort deterministically
  validItems.sort((a, b) => a.id.localeCompare(b.id));

  const jsonPath = path.join(galleryDir, 'gallery.json');
  fs.writeFileSync(jsonPath, JSON.stringify(validItems, null, 2), 'utf-8');
  console.log(`✓ Synchronized ${validItems.length} photos into ${path.relative(ROOT, jsonPath)}`);
  return validItems;
}

/**
 * Generate pictures manifest JSON in public/img/pictures.json
 */
export function generatePicturesManifest() {
  const manifest = {
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    sections: {
      hero: {
        title: 'Hero Cover Section',
        folder: '/img/hero',
        aspectRatio: '16:9 or 3:2 (Desktop) / 9:16 or 3:4 (Mobile)',
        files: [
          { name: 'hero-2000.webp', role: 'Desktop Large', width: 2000 },
          { name: 'hero-1280.webp', role: 'Desktop Standard', width: 1280 },
          { name: 'hero-m-2000.webp', role: 'Mobile Retina', width: 2000 },
          { name: 'hero-m-1280.webp', role: 'Mobile Standard', width: 1280 },
          { name: 'hero-m-640.webp', role: 'Mobile Compact', width: 640 }
        ]
      },
      couple: {
        title: 'Couple Portrait & Envelope Gate Backdrop',
        folder: '/img/couple',
        aspectRatio: '4:5 (Scalloped frame)',
        files: [
          { name: 'cozy-2000.webp', role: 'Retina Backdrop / Portrait', width: 2000 },
          { name: 'cozy-1280.webp', role: 'Standard Backdrop / Portrait', width: 1280 },
          { name: 'cozy-640.webp', role: 'Mobile Portrait', width: 640 }
        ]
      },
      words: {
        title: 'Invitation Words Section (Arch Frame)',
        folder: '/img/words',
        aspectRatio: '3:4.3 (Arch)',
        files: [
          { name: 'words-1280.webp', role: 'Standard Arch Photo', width: 1280 },
          { name: 'words-640.webp', role: 'Mobile Arch Photo', width: 640 }
        ]
      },
      story: {
        title: 'Love Story / Photo Sessions Timeline',
        folder: '/img/story',
        aspectRatio: '3:2 (landscape) & 2:3 (portrait)',
        prefix: 's1..s12 (each in -640.webp and -1280.webp)'
      },
      pond: {
        title: 'Wishing Pond Section',
        folder: '/img/pond',
        files: [
          { name: 'pond-w-2000.webp', role: 'Water Shader Surface 2000px' },
          { name: 'pond-w-1280.webp', role: 'Water Shader Surface 1280px' },
          { name: 'pond-2000.webp', role: 'Fallback Lotus Canvas 2000px' },
          { name: 'pond-1280.webp', role: 'Fallback Lotus Canvas 1280px' },
          { name: 'pond-640.webp', role: 'Fallback Lotus Canvas 640px' }
        ]
      },
      gallery: {
        title: 'Photo Album Gallery',
        folder: '/img/gallery',
        config: '/img/gallery/gallery.json',
        namingRule: '{PHOTO_ID}-640.webp (thumbnail) and {PHOTO_ID}-1600.webp (lightbox)'
      },
      gift: {
        title: 'Digital Gift Bank QR Cards',
        folder: '/img/gift',
        files: [
          { name: 'aba.webp', role: 'ABA Bank QR Pay Card' },
          { name: 'khqr.webp', role: 'Bakong / KHQR Pay Card' }
        ]
      },
      textures: {
        title: 'Traditional Paper Textures',
        folder: '/img/textures',
        files: [
          { name: 'paper-olive.webp', role: 'Olive cardstock for envelope' },
          { name: 'paper-cream.webp', role: 'Cream cardstock for inner card' },
          { name: 'paper-lining.webp', role: 'Lining cardstock for envelope flap' }
        ]
      }
    }
  };

  const targetPath = path.join(PUBLIC_IMG, 'pictures.json');
  fs.writeFileSync(targetPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✓ Generated picture catalog: ${path.relative(ROOT, targetPath)}`);
}

/**
 * Run full validation audit
 */
export function checkPictures() {
  console.log('\n========================================');
  console.log('   Public Pictures Asset Audit Report');
  console.log('========================================\n');

  const categories = [
    { name: 'Hero Cover', dir: path.join(PUBLIC_IMG, 'hero') },
    { name: 'Couple Portrait', dir: path.join(PUBLIC_IMG, 'couple') },
    { name: 'Invitation Words', dir: path.join(PUBLIC_IMG, 'words') },
    { name: 'Love Story (Timeline)', dir: path.join(PUBLIC_IMG, 'story') },
    { name: 'Wishing Pond', dir: path.join(PUBLIC_IMG, 'pond') },
    { name: 'Gallery Photos', dir: path.join(PUBLIC_IMG, 'gallery') },
    { name: 'Gift QR Cards', dir: path.join(PUBLIC_IMG, 'gift') },
    { name: 'Paper Textures', dir: path.join(PUBLIC_IMG, 'textures') }
  ];

  let totalFiles = 0;
  let totalBytes = 0;

  for (const cat of categories) {
    if (!fs.existsSync(cat.dir)) {
      console.log(`✗ [${cat.name}] Directory missing: ${cat.dir}`);
      continue;
    }
    const files = fs.readdirSync(cat.dir).filter((f) => !f.startsWith('.') && f !== 'gallery.json' && f !== 'pictures.json');
    let catBytes = 0;
    for (const f of files) {
      catBytes += fs.statSync(path.join(cat.dir, f)).size;
    }
    totalFiles += files.length;
    totalBytes += catBytes;
    console.log(`✓ [${cat.name.padEnd(23)}] ${String(files.length).padStart(3)} files (${formatBytes(catBytes)})`);
  }

  console.log('----------------------------------------');
  console.log(`Total Pictures: ${totalFiles} files (${formatBytes(totalBytes)})\n`);
}

// CLI entry
const mode = process.argv[2] || 'check';
if (mode === 'sync') {
  syncGallery();
  generatePicturesManifest();
  checkPictures();
} else {
  checkPictures();
}
