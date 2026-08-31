import type { FaqContent } from './types';

/**
 * Category tabs, each holding a disclosure accordion.
 * The answers below stay inside what the client actually told us. Anything
 * needing a real commitment -- SLAs, coverage, pricing -- is left for them.
 * TODO_CLIENT_faqAnswers -- confirmed answers, especially on coverage and terms.
 */
export const faq: FaqContent = {
  id: 'faq',
  sectionNumber: '15',
  heading: 'Questions we get asked',
  placeholder: true,
  todo: 'TODO_CLIENT_faqAnswers',
  categories: [
    {
      id: 'faq-company',
      label: 'The company',
      items: [
        {
          id: 'faq-founded',
          question: 'When did the company start?',
          answer: 'It began in 2012 as a business process outsourcing operation, and has since moved into robotics, telecom and education delivery.',
        },
        {
          id: 'faq-sectors',
          question: 'What sectors do you work across?',
          answer: 'Four: outsourced operations, robotics and automation, telecom, and education delivery under a central government project.',
        },
      ],
    },
    {
      id: 'faq-working',
      label: 'Working together',
      items: [
        {
          id: 'faq-engage',
          question: 'How does an engagement usually start?',
          answer: 'Answer pending client input.',
        },
        {
          id: 'faq-coverage',
          question: 'Where do you operate?',
          answer: 'The education delivery work carries a pan-India remit. Coverage for the other lines is pending confirmation.',
        },
      ],
    },
    {
      id: 'faq-partnerships',
      label: 'Partnerships',
      items: [
        {
          id: 'faq-channel',
          question: 'Are you a channel partner?',
          answer: 'Yes. The company is a channel partner for Tata, and a territory partner for education against a central government project.',
        },
      ],
    },
  ],
};
