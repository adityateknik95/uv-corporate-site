/**
 * Single barrel for all page content.
 *
 * Components import from here and receive content as props. Nothing on this
 * site hardcodes copy in JSX, so when the client sends more material it is a
 * `content/` edit and nothing else.
 *
 * Open items: `grep -rn "TODO_CLIENT" content/`
 */
import type { PageContent } from './types';

import { site } from './site';
import { hero } from './hero';
import { promo } from './promo';
import { jumpNav } from './jump-nav';
import { whoWeAre } from './who-we-are';
import { recognition } from './recognition';
import { stories } from './stories';
import { howWeHelp } from './how-we-help';
import { featureBanner } from './feature-banner';
import { insights } from './insights';
import { quotes } from './quotes';
import { partners } from './partners';
import { careers } from './careers';
import { faq } from './faq';
import { contactCta } from './contact-cta';

export const content: PageContent = {
  site,
  hero,
  promo,
  jumpNav,
  whoWeAre,
  recognition,
  stories,
  howWeHelp,
  featureBanner,
  insights,
  quotes,
  partners,
  careers,
  faq,
  contactCta,
};

export * from './types';
export {
  site,
  hero,
  promo,
  jumpNav,
  whoWeAre,
  recognition,
  stories,
  howWeHelp,
  featureBanner,
  insights,
  quotes,
  partners,
  careers,
  faq,
  contactCta,
};
