import type { ExpertiseQuotesContent } from './types';

/**
 * PLACEHOLDER SECTION.
 * No leadership names, roles, photographs or quotes were supplied. Inventing a
 * named executive is the most damaging placeholder on a corporate page, so
 * every attribution below is explicitly pending.
 * TODO_CLIENT_leadership -- name, role, approved quote and profile URL each.
 */
export const quotes: ExpertiseQuotesContent = {
  id: 'expertise',
  sectionNumber: '12',
  heading: 'Expertise',
  placeholder: true,
  todo: 'TODO_CLIENT_leadership',
  quotes: [
    {
      id: 'quote-1',
      quote: 'A short quote from someone who runs one of the four businesses, on how the work is actually done.',
      name: 'Name pending',
      role: 'Role pending',
    },
    {
      id: 'quote-2',
      quote: 'A second quote, from a different part of the company, on what clients ask for most often.',
      name: 'Name pending',
      role: 'Role pending',
    },
  ],
};
