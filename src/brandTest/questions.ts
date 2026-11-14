/* The brand test: ten questions, two for each of five areas. Every answer is
   worth 0 to 3, so an area scores out of 6 and the whole test out of 30,
   shown as a mark out of 100. It is a self-assessment, not an audit, and the
   result says so. */

export interface Pillar {
  id: string
  name: string
  /** What to do when this is one of the weakest areas. */
  advice: string
  /** Which brand gradient the stage wears for this area. */
  gradient: 'plantain-glow' | 'zobo-heat' | 'studio-day' | 'blue-hour'
}

export const PILLARS: Pillar[] = [
  {
    id: 'strategy',
    name: 'Strategy',
    advice:
      'Write down who you are for, what you do for them, and why you over the next option. One sentence each. Everything else in the brand hangs off those three.',
    gradient: 'plantain-glow',
  },
  {
    id: 'identity',
    name: 'Identity',
    advice:
      'Your look should match the level you want to compete at. That means a full system: logo, colour, type and imagery, built to work together.',
    gradient: 'zobo-heat',
  },
  {
    id: 'consistency',
    name: 'Consistency',
    advice:
      'Pick one set of rules and apply it everywhere a customer meets you. Guidelines only help when the team can find them and use them.',
    gradient: 'studio-day',
  },
  {
    id: 'voice',
    name: 'Voice',
    advice:
      'Decide how the brand speaks, and say what you do in plain words. A stranger should understand your offer in seconds.',
    gradient: 'blue-hour',
  },
  {
    id: 'digital',
    name: 'Digital presence',
    advice:
      'Your website is where most people make up their mind. Give it a clear offer, proof, and one obvious next step.',
    gradient: 'zobo-heat',
  },
]

export interface Question {
  pillar: string
  text: string
  /** Best answer first; worth 3, 2, 1, 0 in order. */
  answers: [string, string, string, string]
}

export const QUESTIONS: Question[] = [
  {
    pillar: 'strategy',
    text: 'Can you say what your brand does, and for whom, in one sentence?',
    answers: [
      'Yes, and the whole team says it the same way',
      'Yes, but everyone says it differently',
      'Roughly. It changes with who is asking',
      'Not yet',
    ],
  },
  {
    pillar: 'strategy',
    text: 'What makes you different from your closest competitor?',
    answers: [
      'One clear thing, and customers repeat it back to us',
      'We know it, but customers never mention it',
      'Mostly price or quality, like everyone else',
      'Honestly, not sure',
    ],
  },
  {
    pillar: 'identity',
    text: 'How did your logo and visual identity come about?',
    answers: [
      'Designed as a full system: logo, colour, type, imagery',
      'A professional logo, and the rest grew over time',
      'A quick logo to get started',
      'We do not really have one',
    ],
  },
  {
    pillar: 'identity',
    text: 'Does your brand look like it belongs at the level you want to play at?',
    answers: [
      'Yes. It holds up next to the leaders in our space',
      'Nearly. A few things feel dated',
      'It looks smaller than we are',
      'It holds us back',
    ],
  },
  {
    pillar: 'consistency',
    text: 'Put your website, social pages and sales deck side by side. Do they look like one brand?',
    answers: [
      'Yes, clearly one brand',
      'Mostly, with a few odd ones out',
      'Related, but not the same',
      'They look like different companies',
    ],
  },
  {
    pillar: 'consistency',
    text: 'Do you have brand guidelines that people actually use?',
    answers: [
      'Yes, and the team and partners follow them',
      'Yes, but they are rarely opened',
      'Just a logo file and some colours',
      'No',
    ],
  },
  {
    pillar: 'voice',
    text: 'How does your brand sound in writing?',
    answers: [
      'Distinct. You would know it is us without the logo',
      'Clear, but it could be anyone',
      'It depends on who wrote it',
      'We have not thought about it',
    ],
  },
  {
    pillar: 'voice',
    text: 'Do people understand what you offer the first time they see you?',
    answers: [
      'Yes, within seconds',
      'After some reading',
      'Usually after we explain it',
      'We often get confused questions',
    ],
  },
  {
    pillar: 'digital',
    text: 'What does your website do for the business?',
    answers: [
      'It brings in leads or sales every week',
      'It helps when we send people to it',
      'It exists, but it does not do much',
      'We have none, or we avoid sharing it',
    ],
  },
  {
    pillar: 'digital',
    text: 'When did you last update how your brand shows up online?',
    answers: [
      'In the last 12 months, on purpose',
      '1 to 2 years ago',
      'More than 2 years ago',
      'Cannot remember',
    ],
  },
]

export interface Level {
  min: number
  title: string
  summary: string
}

export const LEVELS: Level[] = [
  {
    min: 85,
    title: 'Ready to compete',
    summary:
      'Your brand is doing its job. The work now is keeping it sharp as you grow, so every new market meets the same brand.',
  },
  {
    min: 65,
    title: 'Solid ground',
    summary:
      'The foundations are there. A few gaps are stopping the brand from working as hard as the business does.',
  },
  {
    min: 40,
    title: 'Finding shape',
    summary:
      'Parts of the brand work, but they do not add up to one clear picture yet. Focused brand work would change a lot here.',
  },
  {
    min: 0,
    title: 'Starting line',
    summary:
      'The business is ahead of the brand. People have to work harder than they should to understand and remember you.',
  },
]

export interface PillarScore {
  pillar: Pillar
  /** Out of 6. */
  score: number
}

export interface Result {
  /** Out of 100. */
  score: number
  level: Level
  pillars: PillarScore[]
  /** The weakest areas, weakest first. Empty when nothing scored under 5. */
  focus: PillarScore[]
}

/** `answers[i]` is the index of the chosen answer to question i. */
export function scoreTest(answers: number[]): Result {
  const pillars = PILLARS.map((pillar) => ({
    pillar,
    score: QUESTIONS.reduce(
      (sum, question, index) =>
        question.pillar === pillar.id ? sum + (3 - (answers[index] ?? 3)) : sum,
      0,
    ),
  }))
  const total = pillars.reduce((sum, p) => sum + p.score, 0)
  const score = Math.round((total / (QUESTIONS.length * 3)) * 100)
  const level = LEVELS.find((l) => score >= l.min) ?? LEVELS[LEVELS.length - 1]
  const focus = [...pillars]
    .filter((p) => p.score < 5)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
  return { score, level, pillars, focus }
}
