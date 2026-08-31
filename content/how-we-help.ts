import type { HowWeHelpContent } from './types';

/**
 * Four blocks, one per sector the client actually named. The bodies describe
 * the kind of work each sector implies and stop there -- no service catalogue
 * has been supplied, so none is invented.
 * TODO_CLIENT_capabilityDetail -- real service descriptions per sector.
 */
export const howWeHelp: HowWeHelpContent = {
  id: 'how-we-help',
  sectionNumber: '09',
  heading: 'How we help',
  lead: 'Four capabilities, built in the order the company acquired them.',
  blocks: [
    {
      id: 'cap-operations',
      heading: 'Outsourced operations',
      body: 'The founding business: running business processes on behalf of other organisations.',
      link: { label: 'Operations', href: '#contact' },
      sector: 'operations',
    },
    {
      id: 'cap-automation',
      heading: 'Robotics and automation',
      body: 'Work in the robotics field, extending process delivery into automated systems.',
      link: { label: 'Automation', href: '#contact' },
      sector: 'automation',
    },
    {
      id: 'cap-telecom',
      heading: 'Telecom',
      body: 'Delivery work in telecom, including work for Jio Communications.',
      link: { label: 'Telecom', href: '#contact' },
      sector: 'telecom',
    },
    {
      id: 'cap-education',
      heading: 'Education delivery',
      body: 'Territory partner for education against a central government project, with a pan-India remit.',
      link: { label: 'Education', href: '#contact' },
      sector: 'education',
    },
  ],
};
