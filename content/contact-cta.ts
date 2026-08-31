import type { ContactCtaContent } from './types';

/**
 * TODO_CLIENT_contactRouting -- where "talk to us" should actually go
 * (mailto, form endpoint, phone) and whether a mailing list exists.
 */
export const contactCta: ContactCtaContent = {
  id: 'contact',
  heading: 'Start a conversation.',
  body: 'Tell us what you need run, automated, connected or delivered.',
  primary: { label: 'Talk to us', href: '#contact' },
  subscribe: {
    heading: 'Keep in touch',
    body: 'Occasional notes on the work. No more than that.',
    inputLabel: 'Email address',
    submitLabel: 'Subscribe',
  },
};
