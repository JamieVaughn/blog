import { getPermalink, getPostsPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Landing',
    //   links: [
    //   ],
    // },
    // {
    //   text: 'Pages',
    //   links: [
    //     {
    //       text: 'Terms',
    //       href: getPermalink('/terms'),
    //     },
    //     {
    //       text: 'Privacy policy',
    //       href: getPermalink('/privacy'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Widgets',
    //   href: '#',
    // },
    {
      text: 'Blog',
      href: getPostsPermalink(),
    },
  ],
  // actions: [
  //   { type: 'button', text: 'Go', href: '' }
  // ],
};
  
export const footerData = {
  links: [
    {
      // title: 'Courses',
      links: [
        { text: 'Courses', href: 'https://monroecc.dev' },
      ],
    },
    {
      // title: 'Author',
      links: [
        { text: 'Author', href: 'https://wjv.io' },
      ],
    },
    {
      // title: 'Portfolio',
      links: [
        { text: 'Portfolio', href: 'https://wjv.io/portfolio' },
      ],
    },
    {
      // title: 'Other',
      links: [
        { ariaLabel: 'Github', icon: 'brand-github', href: 'https://github.com/JamieVaughn' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Made with:', href: 'https://astro.build/' },
    { ariaLabel: 'Astro', icon: 'astro', href: 'https://astro.build/' },
    { ariaLabel: 'SolidJS', icon: 'solidjs', href: 'https://www.solidjs.com/' },
  ],
  socialLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    
  ],
};
