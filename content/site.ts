import type { SiteContent } from './types';

/**
 * Site chrome: wordmark, utility bar, primary nav, footer.
 *
 * The nav is built out of the four sectors the client actually named --
 * operations, automation, telecom, education -- rather than a generic
 * enterprise menu. Nothing here claims a service the client did not describe.
 *
 * TODO_CLIENT_companyName
 *   The real name is pending. Until it lands, the wordmark renders a bracketed
 *   placeholder. This is deliberate: dropping a real company's name in as a
 *   stand-in would put a live page on the internet under someone else's brand.
 *   Swapping it is a one-line edit to `companyName` below -- nothing else in
 *   the codebase hardcodes a name.
 */
export const site: SiteContent = {
  companyName: '[ Company Name ]',
  companyNameIsPlaceholder: true,
  shortDescription:
    'An Indian technology services company working across outsourced operations, automation, telecom and government-backed education delivery.',

  utilityBar: {
    searchLabel: 'Search this site',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#careers' },
    ],
    locales: [
      { label: 'India — EN', href: '#', current: true },
    ],
  },

  nav: {
    items: [
      {
        label: 'What we do',
        href: '#how-we-help',
        columns: [
          {
            heading: 'Operations',
            links: [
              { label: 'Business process outsourcing', href: '#how-we-help' },
              { label: 'Back-office delivery', href: '#how-we-help' },
              { label: 'Process design', href: '#how-we-help' },
            ],
          },
          {
            heading: 'Automation',
            links: [
              { label: 'Robotics', href: '#how-we-help' },
              { label: 'Process automation', href: '#how-we-help' },
              { label: 'Systems integration', href: '#how-we-help' },
            ],
          },
          {
            heading: 'Connectivity and education',
            links: [
              { label: 'Telecom services', href: '#how-we-help' },
              { label: 'Channel partnerships', href: '#who-we-are' },
              { label: 'Education delivery', href: '#how-we-help' },
            ],
          },
        ],
        feature: {
          heading: 'Pan-India education delivery',
          body: 'Territory partner for an education programme under a central government project.',
          link: { label: 'Read the story', href: '#who-we-are' },
        },
      },
      {
        label: 'Who we are',
        href: '#who-we-are',
        columns: [
          {
            heading: 'The company',
            links: [
              { label: 'Our story', href: '#who-we-are' },
              { label: 'How we help', href: '#how-we-help' },
              { label: 'Recognition', href: '#recognition' },
            ],
          },
          {
            heading: 'Partnerships',
            links: [
              { label: 'Channel partnerships', href: '#who-we-are' },
              { label: 'Government programmes', href: '#who-we-are' },
              { label: 'Partner network', href: '#partners' },
            ],
          },
          {
            heading: 'People',
            links: [
              { label: 'Leadership', href: '#expertise' },
              { label: 'Working here', href: '#careers' },
              { label: 'Open roles', href: '#careers' },
            ],
          },
        ],
      },
      {
        label: 'Insights',
        href: '#insights',
        columns: [
          {
            heading: 'Latest',
            links: [
              { label: 'All insights', href: '#insights' },
              { label: 'Customer stories', href: '#stories' },
            ],
          },
          {
            heading: 'By sector',
            links: [
              { label: 'Operations', href: '#insights' },
              { label: 'Automation', href: '#insights' },
              { label: 'Telecom', href: '#insights' },
            ],
          },
          {
            heading: 'From the team',
            links: [
              { label: 'Expertise', href: '#expertise' },
              { label: 'Questions we get asked', href: '#faq' },
            ],
          },
        ],
      },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Talk to us', href: '#contact' },
  },

  footer: {
    columns: [
      {
        heading: 'What we do',
        links: [
          { label: 'Operations', href: '#how-we-help' },
          { label: 'Automation', href: '#how-we-help' },
          { label: 'Telecom', href: '#how-we-help' },
          { label: 'Education delivery', href: '#how-we-help' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Who we are', href: '#who-we-are' },
          { label: 'Recognition', href: '#recognition' },
          { label: 'Partners', href: '#partners' },
          { label: 'Careers', href: '#careers' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Insights', href: '#insights' },
          { label: 'Customer stories', href: '#stories' },
          { label: 'FAQ', href: '#faq' },
        ],
      },
      {
        heading: 'Get in touch',
        links: [
          { label: 'Talk to us', href: '#contact' },
          { label: 'Subscribe', href: '#contact' },
        ],
      },
    ],
    // TODO_CLIENT_socialHandles -- real profile URLs pending.
    social: [
      { label: 'LinkedIn', href: '#', external: true },
      { label: 'X', href: '#', external: true },
      { label: 'YouTube', href: '#', external: true },
    ],
    legal: [
      { label: 'Privacy notice', href: '#' },
      { label: 'Terms of use', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
    // TODO_CLIENT_registeredEntity -- legal entity name and year for the notice.
    copyright: 'All rights reserved.',
    backToTopLabel: 'Back to top',
  },
};
