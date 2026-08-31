import { SiteHeader } from '@/components/chrome/site-header';
import { SiteFooter } from '@/components/chrome/site-footer';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { content } from '@/content';

/**
 * PHASE 1 — the shell, rebuilt against the reference audit.
 *
 * Sections are present as empty landmarks so the band alternation, the display
 * markers, the anchors and the vertical rhythm can be judged before any of them
 * has content. Phase 2 fills the hero and the timeline.
 *
 * Band order follows the reference: alternate the base and raised tones so a
 * very long page does not read as one slab. Display markers are reserved for
 * the major sections, as they are on the reference -- using one everywhere
 * would spend the device and flatten the rhythm it exists to create.
 */

const SECTIONS = [
  { id: 'who-we-are', heading: 'Who we are', marker: 'who we are', tone: 'ground', phase: 'Phase 2 — the signature timeline' },
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
        {/* Phase 2 replaces this with the hero. The header is fixed and
            transparent over it, so the hero owns the top padding that clears
            the row rather than main pushing everything down. */}
        <section className="bg-ground pt-[var(--spacing-header)]">
          <Container className="py-20 lg:py-32">
            <p className="mb-2 text-label uppercase text-brass">Phase 1 — shell</p>
            <h1 className="text-h1 text-fg measure">The shell, before the content.</h1>
            <p className="mt-4 text-lead text-muted measure">
              Header, mega menu, mobile navigation, footer and the section primitive, rebuilt to
              the measured reference. Every section below is a real landmark with a real anchor and
              nothing in it yet — which is the point of building the shell first.
            </p>
          </Container>
        </section>

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
