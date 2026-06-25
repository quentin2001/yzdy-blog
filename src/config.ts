import type {
  AnalyticsConfig,
  CommentConfig,
  GithubConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Readme Page Config ---
export const SITE: Site = {
  title: 'YZDY',
  description:
    'YZDY is a modern blogging theme built on Astro.js, designed for developers. It supports multiple post layouts, photo displays, project displays, and more, providing an elegant user experience and powerful customization capabilities.',
  website: 'https://github.com/quentin2001',
  lang: 'en',
  base: '/',
  author: '卓',
  ogImage: '/og-image.webp',
  transition: false,
  themeAnimation: true,
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'space',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/yourname',
    icon: 'icon-[ri--github-fill]',
    count: 11,
  },
  {
    name: 'twitter',
    url: 'https://x.com/yourname',
    icon: 'icon-[ri--twitter-x-fill]',
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/yourSpaceId',
    icon: 'icon-[ri--bilibili-fill]',
  },
]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'JavaScript',
          icon: 'icon-[skill-icons--javascript]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
          name: 'CSS',
          icon: 'icon-[skill-icons--css]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },
        {
          name: 'HTML',
          icon: 'icon-[skill-icons--html]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[skill-icons--typescript]',
          url: 'https://www.typescriptlang.org/',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Astro',
          icon: 'icon-[skill-icons--astro]',
          url: 'https://astro.build/',
        },
        {
          name: 'Node.js',
          icon: 'icon-[skill-icons--nodejs-dark]',
          url: 'https://nodejs.org/',
        },
        {
          name: 'React',
          icon: 'icon-[skill-icons--react-dark]',
          url: 'https://react.dev/',
        },
        {
          name: 'Next.js',
          icon: 'icon-[skill-icons--nextjs-dark]',
          url: 'https://nextjs.org/',
        },
        {
          name: 'Tailwind CSS',
          icon: 'icon-[skill-icons--tailwindcss-dark]',
          url: 'https://tailwindcss.com/',
        },
        {
          name: 'Iconify',
          icon: 'icon-[line-md--iconify2-static]',
          url: 'https://iconify.design/',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Ubuntu',
          icon: 'icon-[skill-icons--ubuntu-dark]',
          url: 'https://ubuntu.com/',
        },
        {
          name: 'Git',
          icon: 'icon-[skill-icons--git]',
          url: 'https://git-scm.com/',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[skill-icons--mongodb]',
          url: 'https://www.mongodb.com/',
        },
        {
          name: 'Vercel',
          icon: 'icon-[skill-icons--vercel-dark]',
          url: 'https://vercel.com/',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'quentin2001',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by Quentin',
  introduce:
    '对世界充满好奇，边学、边做、边思考。最近沉迷 AI，每天都在探索，这里记录我的学习与实践；随便逛逛，大部分文章底部都有我踩过的坑，希望也能帮到你😄',
  author: 'Quentin',
  homePageConfig: {
    size: 5,
    type: 'time-line',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'left',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'coverTop',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Prev',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to posts',
  nextPostText: 'Next post',
  prevPostText: 'Prev post',
  recommendText: 'REC',
  wordCountView: true,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: false,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'gitalk-comment',
    owner: 'Dnzzk2',
    admin: ['Dnzzk2'],
    language: 'en-US',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: '这里是所有博客的tag, 你可以点击来过滤某tag下的博客~',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'The examples of my projects.',
  introduce: '这里是我的项目，可以看到我做了些什么东西 with AI',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: 'Here I will record some photos taken in daily life.',
  introduce: '这里是我的摄影作品，它们记录着我的生活',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  busuanzi: {
    enabled: true,
  },
  umami: {
    enabled: false,
    websiteId: 'Your websiteId in umami',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}
