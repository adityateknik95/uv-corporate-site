import type { JumpNavContent } from './types';

/**
 * Anchors must match the id of a rendered section element. Order here is
 * editorial, not structural -- useActiveSection sorts by actual document
 * position before tracking, so this list does not have to match render
 * order to behave correctly. Kept roughly page-order anyway for readability.
 */
export const jumpNav: JumpNavContent = {
  label: 'Jump to section',
  links: [
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'Stories', href: '#stories' },
    { label: 'How we help', href: '#how-we-help' },
    { label: 'Insights', href: '#insights' },
    { label: 'Careers', href: '#careers' },
    { label: 'FAQ', href: '#faq' },
  ],
};
