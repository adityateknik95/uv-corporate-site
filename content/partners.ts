import type { PartnersContent } from './types';

/**
 * PLACEHOLDER SECTION.
 * The three organisations below are the ones the client named: a channel
 * partnership with Tata, and delivery work for Jio Communications and
 * Greycells 18 Media. No logo files were supplied and none are fabricated --
 * the track renders each as a typographic wordmark in the site face until
 * approved assets arrive.
 * TODO_CLIENT_partnerAssets -- approved logo files and permission to display.
 */
export const partners: PartnersContent = {
  heading: 'Who we work with',
  placeholder: true,
  todo: 'TODO_CLIENT_partnerAssets',
  logos: [
    { id: 'partner-tata', name: 'Tata' },
    { id: 'partner-jio', name: 'Jio Communications' },
    { id: 'partner-greycells', name: 'Greycells 18 Media' },
  ],
};
