// Site-wide configuration and SEO defaults
export const siteConfig = {
  name: 'SpaceSmart',
  tagline: 'Make More of Your Space.',
  description:
    'Practical small-home organization ideas, smart storage solutions, and affordable ways to make every corner count in compact apartments, rental homes, and bedrooms.',
  siteUrl:
    (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
    'https://spacesmart.vercel.app',
  publisher: {
    name: 'SpaceSmart Editorial',
    logo: 'https://spacesmart.vercel.app/favicon.svg',
  },
  social: {
    twitterHandle: '@spacesmarthome',
  },
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'Small Bedroom Ideas', path: '/small-bedroom-ideas' },
    { name: 'Storage Solutions', path: '/storage-solutions' },
    { name: 'Decluttering', path: '/decluttering' },
    { name: 'Budget-Friendly Ideas', path: '/budget-friendly-ideas' },
    { name: 'All Articles', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
};
