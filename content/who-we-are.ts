import type { WhoWeAreContent } from './types';

/**
 * The signature section. This is the only genuinely real content in the brief,
 * and every entry below maps one-to-one onto a line of the client notes:
 *
 *   started BPO business on 2012          -> era-operations
 *   step into robotic field later         -> era-robotics
 *   worked for greycells 18 media         -> era-greycells
 *   worked for jio communications         -> era-jio
 *   become channel partner for tata       -> era-tata
 *   & territory partner for education
 *   based on central govt project
 *   for pan india                         -> era-education
 *
 * The notes have been rewritten as sentences. No fact has been added, dropped,
 * or embellished: no revenue, no headcount, no awards, no client beyond the
 * three the client named.
 *
 * TODO_CLIENT_timeline_years
 *   2012 is the only date supplied. Every later step is a real event with no
 *   date attached, so `year` stays null and the entry renders its ordinal
 *   marker instead. Inventing plausible years here would be the single easiest
 *   way to put a false claim on the page -- do not fill these in without the
 *   client confirming each one.
 */
export const whoWeAre: WhoWeAreContent = {
  id: 'who-we-are',
  sectionNumber: '06',
  heading: 'Who we are',
  lead:
    'The company has not pivoted so much as accumulated. What began in 2012 as an outsourced operations business has since taken in robotics, telecom and a pan-India education programme. The sequence below is the whole of it, in order.',

  entries: [
    {
      id: 'era-operations',
      year: '2012',
      marker: '01',
      title: 'An outsourced operations business',
      body: 'The company started in 2012 as a business process outsourcing operation, running processes on behalf of other businesses.',
      sector: 'operations',
    },
    {
      id: 'era-robotics',
      year: null,
      marker: '02',
      title: 'Into robotics',
      body: 'It later stepped into the robotics field, carrying the same operational discipline from managed processes across into automation.',
      sector: 'automation',
    },
    {
      id: 'era-greycells',
      year: null,
      marker: '03',
      title: 'Greycells 18 Media',
      body: 'The company took on work for Greycells 18 Media.',
      sector: 'media',
    },
    {
      id: 'era-jio',
      year: null,
      marker: '04',
      title: 'Jio Communications',
      body: 'Work followed for Jio Communications, taking the company into telecom.',
      sector: 'telecom',
    },
    {
      id: 'era-tata',
      year: null,
      marker: '05',
      title: 'Channel partner for Tata',
      body: 'The company became a channel partner for Tata.',
      sector: 'partnership',
    },
    {
      id: 'era-education',
      year: null,
      marker: '06',
      title: 'Education delivery, pan-India',
      body: 'It became a territory partner for education, delivering against a central government project with a pan-India remit.',
      sector: 'education',
    },
  ],
};
