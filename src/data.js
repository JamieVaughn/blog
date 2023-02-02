import { getPermalink, getPostsPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Landing',
    //   links: [
    //     {
    //       text: 'Sass',
    //       href: getPermalink('/landing/saas'),
    //     },
    //     {
    //       text: 'Startup',
    //       href: getPermalink('/landing/startup'),
    //     },
    //     {
    //       text: 'Mobile App',
    //       href: getPermalink('/landing/mobile-app'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Pages',
    //   links: [
    //     {
    //       text: 'Features',
    //       href: '#',
    //     },
    //     {
    //       text: 'Pricing',
    //       href: '#',
    //     },
    //     {
    //       text: 'About us',
    //       href: '#',
    //     },
    //     {
    //       text: 'Contact',
    //       href: '#',
    //     },
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
  //   { type: 'button', text: 'Download', href: 'https://github.com/onwidget/astrowind' }
  // ],
};
  
export const footerData = {
  links: [
    {
      // title: 'Portfolio',
      links: [
        { text: 'Portfolio', href: 'https://wjv.io/portfolio' },
        // { text: 'Enterprise', href: '#' },
        // { text: 'Customer stories', href: '#' },
        // { text: 'Pricing', href: '#' },
        // { text: 'Resources', href: '#' },
      ],
    },
    {
      // title: 'Author',
      links: [
        { text: 'Author', href: 'https://wjv.io' },
        // { text: 'Developer API', href: '#' },
        // { text: 'Partners', href: '#' },
        // { text: 'Atom', href: '#' },
        // { text: 'Electron', href: '#' },
        // { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      // title: 'Support',
      links: [
        { text: 'Courses', href: 'https://monroecc.dev' },
        // { text: 'Docs', href: '#' },
        // { text: 'Community Forum', href: '#' },
        // { text: 'Professional Services', href: '#' },
        // { text: 'Skills', href: '#' },
        // { text: 'Status', href: '#' },
      ],
    },
    {
      // title: 'Company',
      links: [
        // { text: 'About', href: '#' },
        // { text: 'Blog', href: '#' },
        // { text: 'Careers', href: '#' },
        // { text: 'Press', href: '#' },
        // { text: 'Inclusion', href: '#' },
        // { text: 'Social Impact', href: '#' },
        // { text: 'Shop', href: '#' },
      ],
    },
  ],
  // secondaryLinks: [
    // { text: 'graphics from designs.ai', href: 'https://designs.ai/graphicmaker' },
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  // ],
  socialLinks: [
    // { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/JamieVaughn' },
  ],
  footNote: `
    graphics from <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://designs.ai/graphicmaker"> designs.ai</a>
  `,
};
