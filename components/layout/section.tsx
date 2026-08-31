import type { ReactNode } from 'react';

/**
 * The layout primitive every section inherits.
 *
 * The spine: a persistent left rail carrying the section number, with content
 * starting at the next column and never centring. Stating it once here is the
 * point -- it means no section re-derives its own alignment, which is how a
 * long page starts looking assembled rather than designed.
 *
 * Below lg the rail collapses and its number sits above the heading, because
 * a 6.5rem gutter at 360px is most of the screen.
 */
export function Section({
  id,
  number,
  heading,
  lead,
  children,
  className = '',
  headingLevel: Heading = 'h2',
  bleed = false,
}: {
  id?: string;
  number?: string;
  heading?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  headingLevel?: 'h2' | 'h3';
  /** Full-bleed sections opt out of the rail grid but keep the page gutter. */
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`border-b border-rule ${className}`}>
      <div className="mx-auto max-w-[var(--container-page)] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        {bleed ? (
          children
        ) : (
          <div className="lg:grid lg:grid-cols-[var(--spacing-rail)_1fr] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              {number ? <p className="font-mono text-2xs text-muted">{number}</p> : null}
            </div>

            <div className="min-w-0">
              {heading ? (
                <Heading className="mt-1 text-2xl text-fg lg:mt-0">{heading}</Heading>
              ) : null}
              {lead ? <p className="mt-5 text-md text-muted measure">{lead}</p> : null}
              {children ? <div className={heading || lead ? 'mt-12' : ''}>{children}</div> : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
