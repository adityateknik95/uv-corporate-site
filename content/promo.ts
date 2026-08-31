import type { PromoStripContent } from './types';

/** Three cards under the hero. Each points at a real section of this page. */
export const promo: PromoStripContent = {
  cards: [
    {
      id: 'promo-story',
      category: 'The company',
      heading: 'How a 2012 back office became four businesses',
      link: { label: 'Our story', href: '#who-we-are' },
    },
    {
      id: 'promo-capability',
      category: 'Capability',
      heading: 'Operations, automation, telecom, education',
      link: { label: 'How we help', href: '#how-we-help' },
    },
    {
      id: 'promo-education',
      category: 'Public sector',
      heading: 'Education delivery under a central government project',
      link: { label: 'Read more', href: '#who-we-are' },
    },
  ],
};
