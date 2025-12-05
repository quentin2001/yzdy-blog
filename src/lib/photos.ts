import type { PhotoData } from '~/types'
import cat1 from '~/assets/photos/cats/cat1.webp'
import cat2 from '~/assets/photos/cats/cat2.webp'
import cat3 from '~/assets/photos/cats/cat3.webp'
import cat4 from '~/assets/photos/cats/cat4.webp'
import cat5 from '~/assets/photos/cats/cat5.webp'
import cat6 from '~/assets/photos/cats/cat6.webp'
import cat10 from '~/assets/photos/cats/cat10.webp'
import cat11 from '~/assets/photos/cats/cat11.webp'
import cat9 from '~/assets/photos/cats/cat9.webp'

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
      {
        src: cat5,
        alt: "My Adorable Cate",
        width: cat5.width,
        height: cat5.height,
        variant: '4x3',
      },
      {
        src: cat6,
        alt: "My Adorable Cate",
        width: cat6.width,
        height: cat6.height,
        variant: '4x3',
      },
            {
        src: cat10,
        alt: "My Adorable Cate",
        width: cat10.width,
        height: cat10.height,
        variant: '4x3',
      },
      {
        src: cat11,
        alt: "My Adorable Cate",
        width: cat11.width,
        height: cat11.height,
        variant: '4x3',
      },
      {
        src: cat9,
        alt: "My Adorable Cate",
        width: cat9.width,
        height: cat9.height,
        variant: '4x3',
      },
    ],
  },
]
