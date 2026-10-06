// All site copy. Source of truth: content/copy.md. Strings are verbatim.

export type Accent = 'quadra' | 'maestro' | 'devflow' | 'datobar' | 'condates';
export type Mark = 'quadra' | 'maestro' | 'datobar';
export type Icon = 'slacky';

export interface NavLink {
  label: string;
  href: string;
}

export interface Contraption {
  index: string;
  name: string;
  kind: string;
  oneLiner: string;
  why: string;
  meta: string;
  href: string;
  /** href without protocol and trailing slash, plus " →". Provisional default. */
  linkLabel: string;
  repo?: string;
  accent: Accent;
  mark?: Mark;
}

export interface MadeForMeItem {
  name: string;
  desc: string;
  icon?: Icon;
}

export interface Contact {
  label: string;
  href: string;
}

export const nav: { brand: string; links: NavLink[] } = {
  brand: 'spleenteo.com',
  links: [
    { label: 'Contraptions', href: '#contraptions' },
    { label: 'About', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/spleenteo' },
  ],
};

export const hero = {
  kicker: 'A WORKSHOP LOG · 2026',
  title: 'Contraptions',
  lede: 'Small tools I built for my own problems. Some of them might fix yours.',
  byline: 'by Matteo Papadopoulos · Firenze',
};

export const listHeader = {
  title: 'THE CONTRAPTIONS',
  count: '05 usable · 02 made for me',
};

export const contraptions: Contraption[] = [
  {
    index: '01',
    name: 'Quadra',
    kind: 'MACOS APP',
    oneLiner: 'Straighten a crooked photo by drawing one line.',
    why: "My daughter needed to fix tilted pictures. Every app I found wanted a subscription for a two-second job, so I made one that doesn't.",
    meta: 'v0.6.0 · macOS · open source',
    href: 'https://spleenteo.github.io/quadra/',
    linkLabel: 'spleenteo.github.io/quadra →',
    repo: 'https://github.com/spleenteo/quadra',
    accent: 'quadra',
    mark: 'quadra',
  },
  {
    index: '02',
    name: 'Maestro',
    kind: 'CLAUDE CODE PLUGIN',
    oneLiner: 'A personal orchestrator for Claude Code, with a name, a memory and its own files.',
    why: 'One assistant that remembers what happened, for real, locally.',
    meta: 'template + plugin · open source',
    href: 'https://spleenteo.github.io/maestro/',
    linkLabel: 'spleenteo.github.io/maestro →',
    repo: 'https://github.com/spleenteo/maestro',
    accent: 'maestro',
    mark: 'maestro',
  },
  {
    index: '03',
    name: 'devflow / projectflow',
    kind: 'CLAUDE CODE SKILLS',
    oneLiner: 'Take a piece of work from idea to done, one small slice at a time.',
    why: 'Brainstorming, framing, shaping and planning: devflow for code, projectflow for life projects. Both keep the thread on disk between sessions.',
    meta: 'skills · open source',
    href: 'https://github.com/spleenteo/devflow',
    linkLabel: 'github.com/spleenteo/devflow →',
    accent: 'devflow',
  },
  {
    index: '04',
    name: 'DatoCMS dev bar',
    kind: 'NPM PACKAGE',
    oneLiner: 'A local dev bar for DatoCMS sites: drafts, published content and visual editing in one click.',
    why: "I kept rebuilding the same toggles in every project. Now it's one package that works in any framework.",
    meta: 'v0.1.0 · npm',
    href: 'https://spleenteo.github.io/datocms-dev-bar/',
    linkLabel: 'spleenteo.github.io/datocms-dev-bar →',
    repo: 'https://github.com/spleenteo/datocms-dev-bar',
    accent: 'datobar',
    mark: 'datobar',
  },
  {
    index: '05',
    name: 'Condates',
    kind: 'DATOCMS PLUGIN',
    oneLiner: 'Dates you only half know: a year, a month, or the full day.',
    why: 'History rarely comes with exact dates. This lets editors say so instead of inventing a day.',
    meta: 'v0.1.1 · DatoCMS marketplace',
    href: 'https://www.datocms.com/marketplace/plugins/i/datocms-plugin-conditional-dates',
    linkLabel: 'datocms.com/marketplace →',
    repo: 'https://github.com/spleenteo/conditional-dates-datocms-plugin',
    accent: 'condates',
  },
];

export const madeForMe: { header: string; items: MadeForMeItem[] } = {
  header: 'MADE FOR ME · NOT FOR SALE, NOT FOR SIGN-UP',
  items: [
    {
      name: 'Slacky',
      // [CHECK] "runs my week" — to be confirmed by Matteo
      desc: 'A task manager that notices when I procrastinate and says so. Private, runs my week.',
      icon: 'slacky',
    },
    {
      name: 'Trama',
      desc: 'Hierarchical timelines of historical processes, built on DatoCMS.',
    },
  ],
};

export const slot = {
  kicker: 'RESERVED · NEXT EXPERIMENT',
  note: 'Empty on purpose. Something here will ask for more than a click.',
};

export const about: {
  kicker: string;
  text: string;
  link: { word: string; href: string };
  contacts: Contact[];
} = {
  kicker: 'ABOUT',
  text: "Ciao, I'm Matteo. I've been making things for the web for about thirty years. By day I run the partner program at DatoCMS; these are the side projects I play with, pairing my skills with Claude Code.",
  /** The first occurrence of `word` in `text` becomes a link. */
  link: { word: 'DatoCMS', href: 'https://www.datocms.com' },
  contacts: [
    { label: 'ciao@spleenteo.com →', href: 'mailto:ciao@spleenteo.com' },
    { label: 'github.com/spleenteo →', href: 'https://github.com/spleenteo' },
  ],
};

export const footer = {
  left: 'spleenteo · Firenze',
  right: '© 2026 Matteo Papadopoulos',
};
