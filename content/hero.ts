import type { HeroContent } from './types';

/**
 * Three slides, one per genuine claim the client made. Every line traces to a
 * fact in the brief: the 2012 start, the move into robotics, and the pan-India
 * education remit. No scale, no metrics, no superlatives -- there are none to
 * quote, and a hero is where invented ones usually get in.
 */
export const hero: HeroContent = {
  interval: 7000,
  pauseLabel: 'Pause slideshow',
  playLabel: 'Play slideshow',

  slides: [
    {
      id: 'slide-arc',
      kicker: 'Who we are',
      headline: 'One operations business, four sectors.',
      subline:
        'Started in 2012 in outsourced operations. Since then, robotics, telecom, and government-backed education delivery.',
      cta: { label: 'Read our story', href: '#who-we-are' },
      sector: 'operations',
    },
    {
      id: 'slide-automation',
      kicker: 'Automation',
      headline: 'From managed processes to machines.',
      subline:
        'The company stepped into the robotics field, applying the discipline of running other people’s processes to running automation.',
      cta: { label: 'How we help', href: '#how-we-help' },
      sector: 'automation',
    },
    {
      id: 'slide-education',
      kicker: 'Education',
      headline: 'A pan-India remit.',
      subline:
        'Territory partner for education delivery under a central government project, covering the country.',
      cta: { label: 'See the partnerships', href: '#who-we-are' },
      sector: 'education',
    },
  ],
};
