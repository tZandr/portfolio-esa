/* ────────────────────────────────────────────────────────────────
   THIS IS THE FILE TO EDIT.

   Everything the homepage shows comes from here. Changing the site
   means changing this file — nothing else needs touching.

   To add a project: copy one block inside `projects` and fill it in.
   To reorder the rack: move blocks up or down.
   To remove one: delete its block.
   ──────────────────────────────────────────────────────────────── */

export type Project = {
  /** Shown under the disc, and large on screen while it plays. */
  title: string;
  /** One short line: role, tool, length. e.g. "Wwise · combat layer" */
  meta: string;
  /** One sentence about the work. Shown while it plays. */
  note: string;
  /** Still image. Put the file in /public/posters/ and write "/posters/name.jpg" */
  poster: string;
  /** Video file. Put it in /public/video/ and write "/video/name.mp4".
   *  Leave as "" until the video exists — the poster shows on its own. */
  video: string;
};

export const site = {
  name: 'ESA',
  /** What the initials stand for. Shown tiny, right under the name. */
  fullName: 'Emelie Strand Adolfsson',
  statement: 'Sound design and implementation for games',
  /** The tech stack line, shown just under the statement. */
  stack: 'Wwise · FMOD · Unreal',
  award: 'Nominated for Best Audio and game of the year at the Swedish Game Awards 2026 ',

  email: 'hej@esa.se',
  linkedin: 'https://www.linkedin.com/in/',

  /** Plays low behind the rack while browsing — before any disc has
   *  actually been clicked. Put the file in /public/music/ and write
   *  "/music/name.mp3". Leave `src` as "" to go without music. `title` is
   *  shown under the header as "Now playing"; leave it "" to hide that. */
  music: {
    src: '/music/BTR - Sewers.wav',
    title: 'Bony Tony: The Revenge — Sewers',
  },

  /** Links in the top bar. `cta` gets the filled button. */
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'emelie@creekroad.se', href: 'mailto:emelie@creekroad.se' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/emelie-strand-adolfsson-6057b0401/',
    },
    { label: 'Contact', href: '#contact', cta: true },
  ],
};

export const projects: Project[] = [
  {
    title: 'Showreel 2026',
    meta: 'Reel · 2:14',
    note: 'Two minutes of the work, cut for people with thirty seconds.',
    poster: '/discs/BonyTony.png',
    video: '/video/showreel.mp4',
  },
  {
    title: 'Projekttitel',
    meta: 'Wwise · combat layer',
    note: 'Event layout and the player-health RTPC responding in engine.',
    poster: '/posters/projekt.jpg',
    video: '',
  },
  {
    title: 'Forest ambience',
    meta: 'Unreal · MetaSounds',
    note: 'The MetaSounds graph on screen as the ambience shifts with time of day.',
    poster: '/posters/forest.jpg',
    video: '',
  },
  {
    title: 'UI suite',
    meta: 'Menu · 24 cues',
    note: 'Every cue heard in context, driven through the real menu.',
    poster: '/posters/ui.jpg',
    video: '',
  },
  {
    title: 'Creature foley',
    meta: 'Field rec · layered',
    note: 'Before and after against picture, plus the raw recordings.',
    poster: '/posters/foley.jpg',
    video: '',
  },
  {
    title: 'Impact set',
    meta: 'FMOD · randomised',
    note: 'The randomisation container firing repeatedly — no two hits identical.',
    poster: '/posters/impact.jpg',
    video: '',
  },
];
