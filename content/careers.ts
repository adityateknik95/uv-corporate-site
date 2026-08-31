import type { CareersContent } from './types';

/**
 * Two cards side by side. No headcount, office count or role count is quoted,
 * because none was supplied.
 * TODO_CLIENT_careers -- ATS or careers URL, and locations.
 */
export const careers: CareersContent = {
  id: 'careers',
  sectionNumber: '14',
  heading: 'Careers',
  placeholder: true,
  todo: 'TODO_CLIENT_careers',
  cards: [
    {
      id: 'career-roles',
      heading: 'Open roles',
      body: 'Operations, automation, telecom and education delivery.',
      link: { label: 'See open roles', href: '#careers' },
    },
    {
      id: 'career-life',
      heading: 'Working here',
      body: 'What the work looks like day to day, and who it suits.',
      link: { label: 'Life at the company', href: '#careers' },
    },
  ],
};
