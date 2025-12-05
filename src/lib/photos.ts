import type { PhotoData } from '~/types'
import cat1 from '~/assets/photos/cats/cat1.webp'
import cat2 from '~/assets/photos/cats/cat2.webp'
import cat3 from '~/assets/photos/cats/cat3.webp'
import cat4 from '~/assets/photos/cats/cat4.webp'


export const PhotosList: PhotoData[] = [
  {
    title: '我的猫咪',
    icon: {
      type: 'emoji',
      value: '🐱',
    },
    description: 'So cute (*^ω^*)!',
    date: '2025-06-21',
    travel: '',
    photos: [
      {
        src: cat1,
        alt: "My Adorable Cate",
        width: cat1.width,
        height: cat1.height,
        variant: '4x3',
      },
      {
        src: cat2,
        alt: "My Adorable Cate",
        width: cat2.width,
        height: cat2.height,
        variant: '4x3',
      },
      {
        src: cat3,
        alt: "My Adorable Cate",
        width: cat3.width,
        height: cat3.height,
        variant: '4x3',
      },
      {
        src: cat4,
        alt: "My Adorable Cate",
        width: cat4.width,
        height: cat4.height,
        variant: '4x3',
      },
    ],
  },
]
