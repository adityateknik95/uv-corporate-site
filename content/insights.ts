import type { InsightsContent } from './types';

/**
 * PLACEHOLDER SECTION.
 * No articles and no photography were supplied. An empty `media.src` is the
 * signal for the card to render a generated geometric block keyed to its
 * category rather than reach for a stock photo.
 * TODO_CLIENT_insights -- real articles, or drop the section.
 */
export const insights: InsightsContent = {
  id: 'insights',
  sectionNumber: '11',
  heading: 'Insights',
  placeholder: true,
  todo: 'TODO_CLIENT_insights',
  cards: [
    {
      id: 'insight-1',
      category: 'Operations',
      title: 'An article about running processes for other businesses',
      href: '#insights',
      media: { src: '', alt: '' },
    },
    {
      id: 'insight-2',
      category: 'Automation',
      title: 'An article about moving from process work into robotics',
      href: '#insights',
      media: { src: '', alt: '' },
    },
    {
      id: 'insight-3',
      category: 'Education',
      title: 'An article about delivering a programme across India',
      href: '#insights',
      media: { src: '', alt: '' },
    },
  ],
};
