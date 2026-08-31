import type { JumpNavContent } from './types';

/** Anchors must match the id of a rendered section element. */
export const jumpNav: JumpNavContent = {
  label: 'Jump to section',
  links: [
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'How we help', href: '#how-we-help' },
    { label: 'Stories', href: '#stories' },
    { label: 'Insights', href: '#insights' },
    { label: 'Careers', href: '#careers' },
    { label: 'FAQ', href: '#faq' },
  ],
};
