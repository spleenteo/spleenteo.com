// All site copy. Source of truth: content/copy.md. Strings are verbatim.

export type Accent = 'quadra' | 'maestro' | 'flow' | 'datobar' | 'condates' | 'grafo' | 'slacky';
export type Mark = 'quadra' | 'maestro' | 'datobar' | 'grafo' | 'slacky' | 'flow';

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
  href?: string;
  /** href without protocol and trailing slash, plus " →". Provisional default. */
  linkLabel?: string;
  repo?: string;
  accent: Accent;
  mark?: Mark;
}

export interface MadeForMeItem {
  name: string;
  desc: string;
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
  count: '06 usable · 02 made for me',
};

export const contraptions: Contraption[] = [
  {
    index: '01',
    name: 'Grafo',
    kind: 'DATOCMS PLUGIN',
    oneLiner: 'Grafo draws the records of a DatoCMS project and the links between them.',
    why: 'Pick a record, see what it links to and what links back, open it in the editor.',
    meta: 'free · MIT · open source',
    href: 'https://spleenteo.github.io/grafo-datocms-plugin/',
    linkLabel: 'spleenteo.github.io/grafo-datocms-plugin →',
    repo: 'https://github.com/spleenteo/grafo-datocms-plugin',
    accent: 'grafo',
    mark: 'grafo',
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
    name: 'Slacky',
    kind: 'PRIVATE TOOL',
    oneLiner: 'A task manager that notices when I procrastinate and says so.',
    // [CHECK] "runs my week" — to be confirmed by Matteo
    why: 'Private, runs my week.',
    meta: 'private · not for sale, not for sign-up',
    accent: 'slacky',
    mark: 'slacky',
  },
  {
    index: '06',
    name: 'Flow',
    kind: 'CLAUDE CODE PLUGIN',
    oneLiner: 'Take a piece of work from idea to done, one small slice at a time.',
    why: '/flow:dev takes code to a merged branch, /flow:project runs projects that last for months. The state stays on disk, so a work picks up days later in a new session.',
    meta: 'plugin · open source',
    href: 'https://spleenteo.github.io/flow/',
    linkLabel: 'spleenteo.github.io/flow →',
    repo: 'https://github.com/spleenteo/flow',
    accent: 'flow',
    mark: 'flow',
  },
  {
    index: '07',
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
