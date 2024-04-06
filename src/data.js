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
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  // socialLinks: [
    // { ariaLabel: 'Twitter', icon: 'brand-twitter', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'rss', href: getAsset('/rss') },
    // { ariaLabel: 'Github', icon: 'brand-github', href: 'https://github.com/JamieVaughn' },
  // ],
};
