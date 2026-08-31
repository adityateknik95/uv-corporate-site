import { SiteHeader } from '@/components/chrome/site-header';
import { SiteFooter } from '@/components/chrome/site-footer';
import { Section } from '@/components/layout/section';
import { content } from '@/content';

/**
 * PHASE 1 — the shell.
 *
 * Header, footer and the section primitive, with the page's sections present
 * as empty landmarks so the anchors, the heading order and the vertical rhythm
 * can be judged before any of them has content. Phase 2 fills the hero and the
 * timeline; Phases 3 and 4 fill the rest.
 */

const PENDING_SECTIONS = [
  { id: 'who-we-are', number: '06', heading: 'Who we are', phase: 'Phase 2 — the signature timeline' },
  { id: 'recognition', number: '07', heading: 'Recognition', phase: 'Phase 3' },
  { id: 'stories', number: '08', heading: 'Customer stories', phase: 'Phase 3' },
  { id: 'how-we-help', number: '09', heading: 'How we help', phase: 'Phase 3' },
  { id: 'insights', number: '11', heading: 'Insights', phase: 'Phase 4' },
  { id: 'expertise', number: '12', heading: 'Expertise', phase: 'Phase 4' },
  { id: 'partners', number: '13', heading: 'Who we work with', phase: 'Phase 4' },
  { id: 'careers', number: '14', heading: 'Careers', phase: 'Phase 4' },
  { id: 'faq', number: '15', heading: 'Questions we get asked', phase: 'Phase 4' },
  { id: 'contact', number: '16', heading: 'Start a conversation', phase: 'Phase 4' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader content={content.site} />

      <main id="main" className="relative z-10">
        {/* Phase 2 replaces this with the hero. */}
        <Section bleed className="border-b-0">
          <div className="py-10 lg:py-16">
            <p className="font-mono text-2xs uppercase text-brass">Phase 1 — shell</p>
            <h1 className="mt-5 font-display text-3xl text-fg measure-tight">
              The shell, before the content.
            </h1>
            <p className="mt-6 text-md text-muted measure">
              Header, mega menu, mobile navigation, footer and the section primitive. Every section
              below is a real landmark with a real anchor and nothing in it yet — which is the point
              of building the shell first.
            </p>
          </div>
        </Section>

        {PENDING_SECTIONS.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            number={section.number}
            heading={section.heading}
          >
            <p className="font-mono text-2xs uppercase text-muted">{section.phase}</p>
          </Section>
        ))}
      </main>

      <SiteFooter content={content.site} />
    </>
  );
}
