/* The blog: every post's words, with no imports, so the build can read the
   titles and descriptions too (per-page meta tags and the sitemap).
   Card pictures are paired up by slug in data.ts. */

export type Block =
  | { h: string }
  | { p: string }
  | { q: string }
  | { list: string[] }

export interface Article {
  slug: string
  title: string
  /** One or two sentences for search results and link previews. */
  description: string
  category: string
  /** Shown on cards, e.g. "Jun 2026". */
  date: string
  /** ISO date for search engines. */
  published: string
  body: Block[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'bold-wins-in-fintech',
    title: 'Bold wins in fintech',
    description:
      'Why money brands in Africa can stop dressing like banks, and what a bold fintech identity actually needs to carry: clarity, character and trust.',
    category: 'Branding',
    date: 'Jun 2026',
    published: '2026-06-12',
    body: [
      {
        p: 'Open any app store and search for a payments app. You will scroll past rows of blue gradients, rounded shields and the same three-dot loading spinner. Fintech has a uniform, and most brands put it on because it feels safe. It looks like a bank, so it must be as careful as a bank.',
      },
      {
        p: 'The trouble is that looking like everyone else is not the same as being trusted. It only makes you forgettable. When a customer cannot tell your app apart from the next one, the only thing left to compete on is price.',
      },
      { h: 'Safe is not the same as clear' },
      {
        p: 'People do not trust a money app because it is blue. They trust it because they understand it. They know what will happen when they press send, where their money is, and who to talk to when something goes wrong. That is a clarity problem first and a colour problem a distant second.',
      },
      {
        p: 'A bold identity can carry that clarity better than a timid one. Big, plain type for amounts. One loud colour that always means “this is the action”. A tone of voice that says what the fee is before the customer has to ask. Boldness is not decoration. It is the confidence to say things simply.',
      },
      { h: 'What we did with iPayBTC' },
      {
        p: 'When we worked on iPayBTC, the brief was to make Bitcoin feel like everyday money. The category is full of charts, rockets and dark screens that speak to traders. iPayBTC’s customers were people paying bills, buying airtime and sending money home.',
      },
      {
        p: 'So the identity went the other way: electric blue and a warm yellow, a tilted coin shape that turns up across the app and the merchandise, and campaign lines written the way people actually talk. “Pay NEPA in sats.” “Buy Bitcoin before your tea gets cold.” Nobody needs a glossary to understand those.',
      },
      { q: 'Bold is not loud for the sake of it. Bold is being so clear that you can afford to have a personality.' },
      { h: 'Three questions before you go bold' },
      {
        list: [
          'Can a new customer tell what your product does from one screen, with the logo covered?',
          'Is there one colour or shape that always means the same thing across the app, the site and the street?',
          'Does your copy name fees, limits and timings plainly, before anyone has to ask?',
        ],
      },
      {
        p: 'If the answer to all three is yes, you have earned the right to be loud. If not, start there. A brave identity on top of a confusing product only makes the confusion easier to remember.',
      },
    ],
  },
  {
    slug: 'designing-for-trust',
    title: 'Designing for trust',
    description:
      'Trust is designed in small moments: the receipt, the empty state, the error message. Lessons from building Refreeg, a giving platform where every naira has to be visible.',
    category: 'Case Study',
    date: 'May 2026',
    published: '2026-05-20',
    body: [
      {
        p: 'Most brand work about trust starts with the logo. It should start with the receipt. People decide whether to trust a product in a handful of small moments: the first time they put money in, the first time something fails, and the first time they want to see where their money went.',
      },
      { h: 'Giving you can see' },
      {
        p: 'Refreeg is a giving platform. Its whole promise is that donors can follow their money from the moment they give to the moment it is spent. The line we built the brand around was simple: giving you can see, from the first naira to the last.',
      },
      {
        p: 'That line set the rules for everything else. If the promise is visibility, then the product cannot hide anything. Every campaign shows what has been raised and what it is for. Every update is tied to a real cause. The identity is open and light, with plenty of room, because a crowded screen feels like it has something to hide.',
      },
      { h: 'Trust lives in the boring screens' },
      {
        p: 'The screens that build trust are rarely the ones in the pitch deck. They are the confirmation after a donation, the page that explains what happens if a campaign does not reach its goal, and the error that tells you, in plain words, that your card was not charged.',
      },
      {
        list: [
          'Say what just happened, in one sentence, with the amount.',
          'Say what happens next, and when.',
          'Give people a way to reach a human, without hunting for it.',
        ],
      },
      {
        p: 'None of that needs a big budget. It needs someone to care about the parts of the product nobody shows off.',
      },
      { h: 'Consistency is a promise kept' },
      {
        p: 'Every time a product behaves the way it did last time, it keeps a small promise. The same colour for the same action, the same words for the same idea, the same tone in the app and in the email that follows. Inconsistency feels careless, and careless is the last thing anyone wants from a company holding their money.',
      },
      {
        q: 'A brand earns trust the same way a person does: by being clear, by being consistent, and by telling you the truth when something goes wrong.',
      },
      {
        p: 'Refreeg went on to raise ₦50 million in funding. A brand does not do that on its own, but a clear promise, kept on every screen, makes the story much easier to believe.',
      },
    ],
  },
  {
    slug: 'identity-in-web3',
    title: 'Identity in Web3',
    description:
      'Crypto and Web3 brands are drowning in the same neon and the same jargon. How to build an identity that feels useful to normal people, not only to insiders.',
    category: 'Insights',
    date: 'Apr 2026',
    published: '2026-04-16',
    body: [
      {
        p: 'Web3 has a look. Dark backgrounds, neon gradients, glowing grids, a 3D coin turning slowly in the middle of the screen. It was exciting once. Now it mostly tells people that this product was made by insiders, for insiders.',
      },
      {
        p: 'That is a problem if you want anyone else to use it. The next wave of users will not arrive because they love the technology. They will arrive because something got easier, cheaper or faster for them.',
      },
      { h: 'Lead with the use, not the technology' },
      {
        p: 'Nobody explains how a card network works before you tap your card. The best Web3 brands we see do the same: they talk about what you can do, and leave the chain in the background. Send money home in minutes. Pay a bill from your wallet. Save in something that is yours.',
      },
      {
        p: 'That shift changes the visual language too. Instead of abstract networks and floating tokens, show people, places and everyday moments. Instead of a vocabulary that needs a glossary, write the way your customer talks.',
      },
      { h: 'Make the abstract feel physical' },
      {
        p: 'Digital money is hard to picture, so give it a shape people can hold onto. For iPayBTC we used one tilted coin form across the logo, the app, the merchandise and the campaign. It is the same idea every time, so it starts to stand for the brand on its own.',
      },
      {
        p: 'Physical touchpoints matter here more than in most categories. A tote bag, a cap, a staff pass with the brand on it: these tell people the company is real, with real people behind it.',
      },
      { h: 'A short checklist' },
      {
        list: [
          'Can someone who has never owned crypto understand your homepage headline?',
          'Do your images show people using the product, or only the technology?',
          'Is there one shape, colour or line that is unmistakably yours?',
          'Would your brand still make sense if the word “blockchain” disappeared from it?',
        ],
      },
      {
        q: 'The goal is not to look like the future. It is to make the future feel normal.',
      },
    ],
  },
  {
    slug: 'local-roots-global-reach',
    title: 'Local roots, global reach',
    description:
      'Building brands from Abuja for markets everywhere: why local insight is a strength, and how to design an identity that travels without losing where it comes from.',
    category: 'Studio Notes',
    date: 'Mar 2026',
    published: '2026-03-18',
    body: [
      {
        p: 'Koraa’ is based in Abuja, and we work with teams in Nigeria and around the world. One question comes up in nearly every first call: should a brand from here try to look like it is from somewhere else?',
      },
      {
        p: 'Our answer is no. The goal is not to hide where you come from. It is to be clear enough that anyone, anywhere, understands what you do, and specific enough that they remember who you are.',
      },
      { h: 'Specific travels better than generic' },
      {
        p: 'Generic brands do not travel well. They blend in at home and disappear abroad. Specific brands carry a point of view, and a point of view is what people remember. A line like “Pay NEPA in sats” only makes full sense to someone in Nigeria, and that is exactly why it works at home. Next to it, a simpler line like “Your Naira can’t travel. Your Bitcoin can.” explains the idea to everyone else.',
      },
      {
        p: 'Good identities hold both: a core that anyone can read, and local expressions that make the brand feel like it belongs in each place it shows up.',
      },
      { h: 'Built to compete globally' },
      {
        p: 'We help ambitious startups and businesses build brands and digital products that are ready to compete globally. In practice that means holding our work to the same standard as the best studios anywhere: clear systems, careful type, considered motion, and products that work as well as they look.',
      },
      {
        list: [
          'Design systems that scale from an app icon to a billboard.',
          'Typography and colour that hold up in any language and any market.',
          'Copy written for people, with local flavour where it helps and plain words everywhere else.',
        ],
      },
      { h: 'Harmony, not uniformity' },
      {
        p: 'Our name means harmony. For us that is the whole job: bringing strategy, design and motion together so a brand feels like one clear voice, wherever it is heard.',
      },
      {
        q: 'Start from where you are. Build something clear enough to travel.',
      },
      {
        p: 'If you are building something from here for everywhere, we would like to hear about it.',
      },
    ],
  },
]

export const articleFor = (slug: string | undefined) => ARTICLES.find((a) => a.slug === slug)
