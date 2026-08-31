import type { CustomerStoriesContent } from './types';

/**
 * PLACEHOLDER SECTION.
 * The client named three organisations it has worked for -- Greycells 18 Media,
 * Jio Communications and Tata -- but supplied no story detail for any of them.
 * Writing engagement narratives around those names would be fabrication, so the
 * stories below are unattributed and generic.
 * TODO_CLIENT_customerStories -- per story: client, permission to name them,
 * what the work was, and what changed.
 */
export const stories: CustomerStoriesContent = {
  id: 'stories',
  sectionNumber: '08',
  heading: 'Customer stories',
  placeholder: true,
  todo: 'TODO_CLIENT_customerStories',
  expandLabel: 'Read the full story',
  collapseLabel: 'Close',
  stories: [
    {
      id: 'story-1',
      client: 'Client pending',
      sector: 'operations',
      summary: 'A summary of one operations engagement, two or three lines long.',
      full: 'The full account of the engagement goes here: the situation, what the company was asked to run, and what the client got back. Roughly two hundred words.',
    },
    {
      id: 'story-2',
      client: 'Client pending',
      sector: 'automation',
      summary: 'A summary of one automation engagement, two or three lines long.',
      full: 'The full account of the engagement goes here: the situation, what was automated, and what the client got back. Roughly two hundred words.',
    },
    {
      id: 'story-3',
      client: 'Client pending',
      sector: 'telecom',
      summary: 'A summary of one telecom engagement, two or three lines long.',
      full: 'The full account of the engagement goes here: the situation, the delivery work involved, and what the client got back. Roughly two hundred words.',
    },
  ],
};
