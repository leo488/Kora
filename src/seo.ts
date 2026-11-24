/* Search and link-preview metadata for every page. No asset imports, so the
   build (vite.config.ts) can read it too: it writes a real HTML file per page
   with these tags baked in, plus sitemap.xml and robots.txt. */

import { ARTICLES } from './blog/posts.ts'

export const SITE = {
  name: 'Koraa’',
  url: 'https://wearekoraa.com',
  email: 'hello@wearekoraa.com',
  image: '/og-image.jpg',
  locale: 'en_NG',
}

export interface PageMeta {
  path: string
  title: string
  description: string
  /** og:type; pages default to website. */
  type?: 'website' | 'article'
  published?: string
  /** Link-only page: gets its preview tags, but noindex and no sitemap entry. */
  unlisted?: boolean
}

const CASES: PageMeta[] = [
  {
    path: '/work/ipaybtc',
    title: 'iPayBTC: making Bitcoin feel like everyday money | Koraa’ case study',
    description:
      'How Koraa’ rebuilt the iPayBTC brand, app and campaign so paying, saving and sending in sats feels as familiar as any bank app.',
  },
]

export const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Koraa’ | Brand and digital product studio in Abuja, Nigeria',
    description:
      'Koraa’ helps ambitious startups and businesses build brands and digital products that are ready to compete globally. Brand identity, websites, product design and motion.',
  },
  {
    path: '/work',
    title: 'Work | Koraa’ brand identity, product and motion projects',
    description:
      'Selected brand identity, rebrand, product design and motion work by Koraa’, a creative studio in Abuja working with teams in Nigeria and worldwide.',
  },
  ...CASES,
  {
    path: '/about',
    title: 'About | Koraa’ creative studio, Abuja',
    description:
      'Koraa’ is a global creative studio in Abuja that brings brands, stories and experiences to life through strategy, design and motion.',
  },
  {
    path: '/blog',
    title: 'Blog | Notes on branding and product design from Koraa’',
    description:
      'Notes on branding, fintech, trust, Web3 identity and building brands from Nigeria for the world, from the Koraa’ studio.',
  },
  ...ARTICLES.map(
    (a): PageMeta => ({
      path: `/blog/${a.slug}`,
      title: `${a.title} | Koraa’ blog`,
      description: a.description,
      type: 'article',
      published: a.published,
    }),
  ),
  {
    path: '/contact',
    title: 'Contact Koraa’ | Start a brand or product project',
    description:
      'Tell Koraa’ what you are building. A few short questions about what you need, your budget and your timing, and we reply within one working day.',
  },
  {
    path: '/brand-test',
    title: 'Brand test | How strong is your brand? | Koraa’',
    description:
      'A short, honest test of how clear, consistent and memorable your brand is, with what to fix first. From the Koraa’ studio.',
  },
  {
    path: '/rill',
    title: 'Rill by Koraa’ | All your money. None of the effort.',
    description:
      'Rill reads your bank alerts and email receipts, logs every payment and keeps an eye on your subscriptions. Coming soon from Koraa’.',
    unlisted: true,
  },
]

export const metaFor = (path: string): PageMeta =>
  PAGES.find((p) => p.path === path.replace(/\/+$/, '') || (path === '/' && p.path === '/')) ?? PAGES[0]

/** The studio itself, for search engines (schema.org). */
export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Koraa’',
  alternateName: 'Koraa',
  url: SITE.url,
  logo: `${SITE.url}/logo.svg`,
  image: `${SITE.url}${SITE.image}`,
  email: SITE.email,
  description: PAGES[0].description,
  slogan: 'We help brands find their true north.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10C Momoh Close, Freedom Avenue',
    addressLocality: 'Abuja',
    addressCountry: 'NG',
  },
  areaServed: 'Worldwide',
  knowsAbout: ['Brand identity', 'Rebranding', 'Website design', 'Product design', 'Motion design', 'Packaging'],
}
