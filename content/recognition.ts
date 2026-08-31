import type { RecognitionContent } from './types';

/**
 * PLACEHOLDER SECTION.
 * No awards, analyst mentions or citations were supplied. Rather than invent
 * any, the items below describe what belongs here and carry no attribution.
 * The component reads `placeholder` and renders a designed pending state.
 * TODO_CLIENT_recognition -- statements plus a real, citable source for each.
 */
export const recognition: RecognitionContent = {
  id: 'recognition',
  sectionNumber: '07',
  heading: 'Recognition',
  placeholder: true,
  todo: 'TODO_CLIENT_recognition',
  items: [
    {
      id: 'rec-1',
      index: '01',
      statement: 'Third-party recognition will be listed here, one per entry.',
      source: 'Source pending',
    },
    {
      id: 'rec-2',
      index: '02',
      statement: 'Each entry needs a verifiable citation before it goes live.',
      source: 'Source pending',
    },
    {
      id: 'rec-3',
      index: '03',
      statement: 'Certifications and accreditations can sit here too.',
      source: 'Source pending',
    },
  ],
};
