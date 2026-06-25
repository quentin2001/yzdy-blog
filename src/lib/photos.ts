import type { ImageMetadata } from 'astro'
import type { Photo, PhotoData, PolaroidVariant } from '~/types'

// Auto-import optimized WebP images from the pre-compressed directory.
// Run `node scripts/optimize-photos.mjs` to regenerate after adding new photos.
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos-optimized/**/*.webp',
  { eager: true },
)

/**
 * Get a sorted list of photos by directory name.
 * @param dir - Directory name, for example 'cats'
 * @param alt - Image alt text
 * @param variants - Variant for each image, mapped by index
 */
function getPhotos(dir: string, alt: string, variants: PolaroidVariant[]): Photo[] {
  return Object.entries(photoModules)
    .filter(([path]) => path.includes(`/${dir}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod], index) => {
      const img = mod.default
      return {
        src: img,
        alt,
        width: img.width,
        height: img.height,
        variant: variants[index] || '4x3',
      }
    })
}

export const PhotosList: PhotoData[] = [
  {
    title: '我的猫咪',
    icon: { type: 'emoji', value: '🐱' },
    description: 'So cute (*^ω^*)!',
    date: '2025-06-21',
    travel: '',
    photos: getPhotos('cats', 'My Adorable Cat', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '长白山',
    icon: { type: 'emoji', value: '🏔️' },
    description: '长白山天池之旅',
    date: '2024-10-10',
    travel: '',
    photos: getPhotos('changbai', '长白山', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '教堂',
    icon: { type: 'emoji', value: '⛪' },
    description: '',
    date: '',
    travel: '',
    photos: getPhotos('church', '教堂', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '大同',
    icon: { type: 'emoji', value: '🏯' },
    description: '大同古城之旅',
    date: '',
    travel: '',
    photos: getPhotos('datong', '大同', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '徒步',
    icon: { type: 'emoji', value: '🥾' },
    description: '',
    date: '',
    travel: '',
    photos: getPhotos('hiking', '徒步', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: 'Lama Temple',
    icon: { type: 'emoji', value: '🛕' },
    description: '',
    date: '',
    travel: '',
    photos: getPhotos('lama', 'Lama Temple', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '日落',
    icon: { type: 'emoji', value: '🌅' },
    description: '',
    date: '',
    travel: '',
    photos: getPhotos('sunset', '日落', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
  {
    title: '威海',
    icon: { type: 'emoji', value: '🌊' },
    description: '威海海滨之旅',
    date: '',
    travel: '',
    photos: getPhotos('weihai', '威海', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  },
]
