/**
 * Content schemas for every section on the page.
 *
 * Two rules hold this layer together:
 *
 *  1. Components receive content as props. Nothing is hardcoded in JSX. When
 *     the client sends more copy it should be a `content/` edit and nothing
 *     else.
 *  2. Anything the client has not supplied is marked, never invented. A
 *     section carrying `placeholder: true` renders an honest generic state;
 *     any individual unknown string is prefixed `TODO_CLIENT_`. So
 *     `grep -rn "TODO_CLIENT" content/` is the full list of open questions.
 */

/* -------------------------------------------------------------------------
   Shared primitives
   ------------------------------------------------------------------------- */

export interface Link {
  label: string;
  href: string;
  /** Opens in a new tab and announces itself to screen readers. */
  external?: boolean;
}

export interface Media {
  src: string;
  /** Required, always. Decorative media passes an empty string deliberately. */
  alt: string;
  width?: number;
  height?: number;
}

/** Mixed into any section whose copy is standing in for client content. */
export interface Placeholder {
  /**
   * Set while the section is running on placeholder copy. Components use it
   * to render an honest empty state instead of fabricated names or metrics.
   */
  placeholder?: boolean;
  /** The `TODO_CLIENT_*` key describing what is still needed. */
  todo?: string;
}

export type Sector =
  | 'operations'
  | 'automation'
  | 'telecom'
  | 'media'
  | 'education'
  | 'partnership';

/* -------------------------------------------------------------------------
   1. Utility bar  |  2. Primary nav  |  17. Footer
   ------------------------------------------------------------------------- */

export interface UtilityBarContent {
  /** Accessible label for the search trigger; search itself is a Phase 3 concern. */
  searchLabel: string;
  links: Link[];
  /** Optional language control. Omitted entirely rather than faked. */
  locales?: { label: string; href: string; current?: boolean }[];
}

export interface MegaMenuColumn {
  heading: string;
  links: Link[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Present means this renders as a mega-menu trigger. Absent means a flat link. */
  columns?: MegaMenuColumn[];
  /** Optional promoted panel on the right of the mega menu. */
  feature?: { heading: string; body: string; link: Link };
}

export interface NavContent {
  items: NavItem[];
  cta: Link;
}

export interface FooterColumn {
  heading: string;
  links: Link[];
}

export interface FooterContent {
  columns: FooterColumn[];
  social: Link[];
  legal: Link[];
  copyright: string;
  backToTopLabel: string;
}

export interface SiteContent {
  /** TODO_CLIENT_companyName -- placeholder wordmark until the real name lands. */
  companyName: string;
  companyNameIsPlaceholder: boolean;
  shortDescription: string;
  utilityBar: UtilityBarContent;
  nav: NavContent;
  footer: FooterContent;
}

/* -------------------------------------------------------------------------
   3. Hero
   ------------------------------------------------------------------------- */

export interface HeroSlide {
  id: string;
  /** Used as the label on the pagination control for this slide. */
  kicker: string;
  headline: string;
  subline: string;
  cta: Link;
  sector: Sector;
  /**
   * Background media. An absent or empty `src` is the signal to render the
   * generated field for this slide's sector instead of reaching for a stock
   * photo. When real photography arrives it drops in here and inherits the
   * same scrim treatment -- see NOTES.md, imagery rule.
   */
  media?: Media;
}

export interface HeroContent {
  slides: HeroSlide[];
  /** Milliseconds between auto-advances. Auto-advance is off under reduced motion. */
  interval: number;
  pauseLabel: string;
  playLabel: string;
}

/* -------------------------------------------------------------------------
   4. Promo strip  |  5. Jump-to nav
   ------------------------------------------------------------------------- */

export interface PromoCard {
  id: string;
  category: string;
  heading: string;
  link: Link;
}

export interface PromoStripContent extends Placeholder {
  cards: PromoCard[];
}

export interface JumpNavContent {
  label: string;
  /** Each href must match the id of a rendered section element. */
  links: Link[];
}

/* -------------------------------------------------------------------------
   6. Who we are -- the signature section
   ------------------------------------------------------------------------- */

export interface TimelineEntry {
  id: string;
  /**
   * Only 2012 was supplied. Every later step is a real event with no date
   * attached, so `year` is null and the entry renders with its ordinal marker
   * instead. Do not fill these in without client confirmation:
   * TODO_CLIENT_timeline_years
   */
  year: string | null;
  /** Shown in place of a year while `year` is null. */
  marker: string;
  title: string;
  body: string;
  sector: Sector;
}

export interface WhoWeAreContent {
  id: string;
  sectionNumber: string;
  heading: string;
  lead: string;
  entries: TimelineEntry[];
}

/* -------------------------------------------------------------------------
   7. Recognition  |  8. Customer stories
   ------------------------------------------------------------------------- */

export interface RecognitionItem {
  id: string;
  /** Rendered as the large numeral, e.g. "01". */
  index: string;
  statement: string;
  source: string;
}

export interface RecognitionContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  items: RecognitionItem[];
}

export interface CustomerStory {
  id: string;
  client: string;
  sector: Sector;
  summary: string;
  /** Revealed by the per-story toggle. */
  full: string;
  media?: Media;
}

export interface CustomerStoriesContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  stories: CustomerStory[];
  expandLabel: string;
  collapseLabel: string;
}

/* -------------------------------------------------------------------------
   9. How we help  |  10. Feature banner
   ------------------------------------------------------------------------- */

export interface CapabilityBlock {
  id: string;
  heading: string;
  body: string;
  link: Link;
  sector: Sector;
}

export interface HowWeHelpContent {
  id: string;
  sectionNumber: string;
  heading: string;
  lead: string;
  blocks: CapabilityBlock[];
}

export interface FeatureBannerContent extends Placeholder {
  heading: string;
  body: string;
  cta: Link;
}

/* -------------------------------------------------------------------------
   11. Insights  |  12. Expertise quotes  |  13. Partners
   ------------------------------------------------------------------------- */

export interface InsightCard {
  id: string;
  category: string;
  title: string;
  href: string;
  media: Media;
}

export interface InsightsContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  cards: InsightCard[];
}

export interface ExpertiseQuote {
  id: string;
  quote: string;
  name: string;
  role: string;
  social?: Link;
}

export interface ExpertiseQuotesContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  quotes: ExpertiseQuote[];
}

export interface PartnerLogo {
  id: string;
  name: string;
  /** Inline SVG path data. No remote logo files, no fabricated brands. */
  mark?: string;
}

export interface PartnersContent extends Placeholder {
  heading: string;
  logos: PartnerLogo[];
}

/* -------------------------------------------------------------------------
   14. Careers  |  15. FAQ  |  16. Contact CTA
   ------------------------------------------------------------------------- */

export interface CareerCard {
  id: string;
  heading: string;
  body: string;
  link: Link;
}

export interface CareersContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  cards: CareerCard[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export interface FaqContent extends Placeholder {
  id: string;
  sectionNumber: string;
  heading: string;
  categories: FaqCategory[];
}

export interface ContactCtaContent {
  id: string;
  heading: string;
  body: string;
  primary: Link;
  subscribe: {
    heading: string;
    body: string;
    inputLabel: string;
    submitLabel: string;
  };
}

/* -------------------------------------------------------------------------
   Page composition
   ------------------------------------------------------------------------- */

export interface PageContent {
  site: SiteContent;
  hero: HeroContent;
  promo: PromoStripContent;
  jumpNav: JumpNavContent;
  whoWeAre: WhoWeAreContent;
  recognition: RecognitionContent;
  stories: CustomerStoriesContent;
  howWeHelp: HowWeHelpContent;
  featureBanner: FeatureBannerContent;
  insights: InsightsContent;
  quotes: ExpertiseQuotesContent;
  partners: PartnersContent;
  careers: CareersContent;
  faq: FaqContent;
  contactCta: ContactCtaContent;
}
