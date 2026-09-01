import { SiteHeader } from '@/components/chrome/site-header';
import { SiteFooter } from '@/components/chrome/site-footer';
import { Section } from '@/components/layout/section';
import { Hero } from '@/components/sections/hero';
import { Timeline } from '@/components/sections/timeline';
import { content } from '@/content';

/**
 * PHASE 2 — hero and the Who We Are timeline.
 *
 * The remaining sections are still empty landmarks so the band alternation,
 * the display markers, the anchors and the vertical rhythm stay judgeable.
 * Phases 3 and 4 fill them.
 *
 * Band order follows the reference: alternate the base and raised tones so a
 * very long page does not read as one slab. Display markers are reserved for
 * the major sections, as they are on the reference -- using one everywhere
 * would spend the device and flatten the rhythm it exists to create.
 */

const SECTIONS = [
  { id: 'recognition', heading: 'Recognition', tone: 'surface', phase: 'Phase 3' },
  { id: 'stories', heading: 'Progress, one customer at a time', marker: 'stories', tone: 'ground', phase: 'Phase 3' },
  { id: 'how-we-help', heading: 'Four capabilities', marker: 'how we help', tone: 'surface', phase: 'Phase 3' },
  { id: 'feature', heading: 'Education delivery, across India', tone: 'ground', phase: 'Phase 3' },
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

        <Section
          id={content.whoWeAre.id}
          tone="ground"
          marker="who we are"
          heading={content.whoWeAre.heading}
        >
          <Timeline content={content.whoWeAre} />
        </Section>

        {SECTIONS.map((section) => (
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
