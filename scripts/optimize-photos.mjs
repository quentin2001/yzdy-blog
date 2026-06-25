/**
 * Batch-optimize photo gallery images using sharp.
 * Resizes JPG/PNG originals to max 1200px width WebP @ quality 80.
 * Output goes to src/assets/photos-optimized/ preserving directory structure.
 *
 * Usage: node scripts/optimize-photos.mjs
 */

import { mkdir, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, extname, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SOURCE = join(ROOT, 'src', 'assets', 'photos')
const TARGET = join(ROOT, 'src', 'assets', 'photos-optimized')

const MAX_WIDTH = 1200
const QUALITY = 80

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

async function optimize() {
  let count = 0
  let totalBefore = 0
  let totalAfter = 0

  for await (const srcPath of walk(SOURCE)) {
    const ext = extname(srcPath).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

    const rel = relative(SOURCE, srcPath)
    const outPath = join(TARGET, rel.replace(ext, '.webp'))

    if (existsSync(outPath)) {
      // Skip already-optimized files (check if source is newer)
      const srcStat = await stat(srcPath)
      const outStat = await stat(outPath)
      if (outStat.mtime > srcStat.mtime) {
        continue
      }
    }

    await mkdir(dirname(outPath), { recursive: true })

    const srcSize = (await stat(srcPath)).size
    totalBefore += srcSize

    try {
      await sharp(srcPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath)

      const outSize = (await stat(outPath)).size
      totalAfter += outSize
      count++

      const ratio = ((1 - outSize / srcSize) * 100).toFixed(0)
      console.log(`  ${rel}  ${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB (${ratio}%)`)
    } catch (err) {
      console.error(`  FAILED: ${rel} — ${err.message}`)
    }
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(0)
  const afterMB = (totalAfter / 1024 / 1024).toFixed(0)
  console.log(`\nDone: ${count} images, ${beforeMB}MB → ${afterMB}MB`)
}

optimize().catch(console.error)
