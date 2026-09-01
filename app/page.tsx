import { SiteHeader } from '@/components/chrome/site-header';
import { SiteFooter } from '@/components/chrome/site-footer';
import { Section } from '@/components/layout/section';
import { Hero } from '@/components/sections/hero';
import { Timeline } from '@/components/sections/timeline';
import { JumpNav } from '@/components/sections/jump-nav';
import { RecognitionCarousel } from '@/components/sections/recognition-carousel';
import { StoriesCarousel } from '@/components/sections/stories-carousel';
import { HowWeHelp } from '@/components/sections/how-we-help';
import { FeatureBanner } from '@/components/sections/feature-banner';
import { content } from '@/content';

/**
 * PHASE 3 — jump-to nav, how we help, feature banner, customer stories and
 * recognition carousels.
 *
 * The remaining sections (promo strip, insights, expertise, partners,
 * careers, FAQ, contact) are still empty landmarks so the band alternation
 * and vertical rhythm stay judgeable. Phase 4 fills them.
 *
 * Band order follows the reference: alternate the base and raised tones so a
 * very long page does not read as one slab. Display markers are reserved for
 * the major sections, as they are on the reference -- using one everywhere
 * would spend the device and flatten the rhythm it exists to create.
 */

const PENDING_SECTIONS = [
  { id: 'insights', heading: 'Insights', tone: 'surface', phase: 'Phase 4' },
  { id: 'expertise', heading: 'Trusted. Experienced. Skilled.', marker: 'expertise', tone: 'ground', phase: 'Phase 4' },
  { id: 'partners', heading: 'Who we work with', tone: 'surface', phase: 'Phase 4' },
  { id: 'careers', heading: 'Careers', tone: 'ground', phase: 'Phase 4' },
  { id: 'faq', heading: 'Questions we get asked', tone: 'surface', phase: 'Phase 4' },
  { id: 'contact', heading: 'Start a conversation', tone: 'ground', phase: 'Phase 4' },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader content={content.site} />

      <main id="main" className="relative z-10">
        <Hero content={content.hero} />

        <JumpNav content={content.jumpNav} />

        <Section
          id={content.whoWeAre.id}
          tone="ground"
          marker="who we are"
          heading={content.whoWeAre.heading}
        >
          <Timeline content={content.whoWeAre} />
        </Section>

        <Section
          id={content.recognition.id}
          tone="surface"
          heading={content.recognition.heading}
        >
          <RecognitionCarousel content={content.recognition} />
        </Section>

        <Section
          id={content.stories.id}
          tone="ground"
          marker="stories"
          heading={content.stories.heading}
        >
          <StoriesCarousel content={content.stories} />
        </Section>

        <Section
          id={content.howWeHelp.id}
          tone="surface"
          marker="how we help"
          heading={content.howWeHelp.heading}
          lead={content.howWeHelp.lead}
        >
          <HowWeHelp content={content.howWeHelp} />
        </Section>

        {/* Not wrapped in Section: the band's background has to run the full
            viewport width, and Section's Container would confine it to the
            1460px content column. Hero is full-bleed for the same reason. */}
        <FeatureBanner content={content.featureBanner} />

        {PENDING_SECTIONS.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            tone={section.tone}
            marker={'marker' in section ? section.marker : undefined}
            heading={section.heading}
          >
            <p className="text-label uppercase text-muted">{section.phase}</p>
          </Section>
        ))}
      </main>

      <SiteFooter content={content.site} />
    </>
  );
}
