import { ColorTable } from '@/components/specimen/color-table';
import { TypeScale } from '@/components/specimen/type-scale';
import { site, whoWeAre } from '@/content';
import { Container } from '@/components/layout/container';

export const metadata = { title: 'Token specimen' };

/**
 * The foundation rendered as evidence, not the marketing page: it proves the
 * base colour, the type scale and the font pairing are real and measurable.
 *
 * Kept at /specimen after Phase 1 took over /. It is the reference when a
 * later phase needs to check a token, and the thing to screenshot when someone
 * asks what the design system actually is.
 */
export default function TokenSpecimenPage() {
  return (
    <Container className="relative z-10 pt-[var(--spacing-header)]">
      <header className="border-b border-rule py-16 lg:py-24">
        <p className="font-mono text-label uppercase text-brass">Phase 0 — foundation</p>
        <h1 className="mt-5 text-h1 text-fg">Token specimen</h1>
        <p className="mt-6 text-lead text-muted measure">
          The colour, type and motion foundation for {site.companyName}. Nothing on this page is
          the finished site — it exists so the tokens can be judged on their own before any
          section is built on them.
        </p>
      </header>

      <Section number="01" title="Colour">
        <p className="text-body text-muted measure">
          A warm ink ground rather than the neutral near-black most dark sites land on, and one
          accent. Brass is the status colour of a live monitored system, which is what telecom and
          outsourced operations are; it also reads institutional enough to sit under a central
          government education partnership. Ratios below are measured in the browser from these
          exact tokens, and the same maths gates the build.
        </p>
        <div className="mt-10">
          <ColorTable />
        </div>
      </Section>

      <Section number="02" title="Type">
        <p className="text-body text-muted measure">
          Two families, deliberately unalike. Instrument Serif appears in exactly two places on the
          finished page — the hero headline and the timeline years — which makes it an accent
          typeface rather than a theme. Inter Tight carries everything else. The scale is fluid
          between 360px and 1440px, and body copy is capped at 68 characters.
        </p>
        <div className="mt-10">
          <TypeScale />
        </div>
      </Section>

      <Section number="03" title="The content layer">
        <p className="text-body text-muted measure">
          Every section has a typed schema and no component hardcodes copy. The timeline below is
          real client content, already in <code className="font-mono text-small text-fg">content/</code>,
          waiting for Phase 2 to build the section around it.
        </p>

        <ol className="mt-10 divide-y divide-rule border-y border-rule">
          {whoWeAre.entries.map((entry) => (
            <li key={entry.id} className="grid gap-2 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <p className=" text-h3 text-brass tabular-nums">
                {entry.year ?? entry.marker}
              </p>
              <div>
                <h3 className="text-h4 text-fg">{entry.title}</h3>
                <p className="mt-1 text-body text-muted measure">{entry.body}</p>
                {entry.year === null ? (
                  <p className="mt-2 font-mono text-label uppercase text-muted">
                    no date supplied — shown by sequence
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-small text-muted measure">
          Only 2012 was given. The other five steps are real events with no dates attached, so they
          carry ordinal markers instead of invented years.
        </p>
      </Section>

      <footer className="border-t border-rule py-16 text-small text-muted">
        <p className="measure">
          Foundation only. Phase 1 builds the shell, Phase 2 the hero and the timeline.
        </p>
      </footer>
    </Container>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-rule py-16 lg:py-24">
      <p className="mb-2 font-mono text-label text-muted">{number}</p>
      <h2 className="text-h3 text-fg">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
