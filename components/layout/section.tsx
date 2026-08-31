import type { ReactNode } from 'react';
import { Container } from './container';

/**
 * The layout primitive every section inherits.
 *
 * Rebuilt against the reference audit. The previous pass used an asymmetric
 * left rail carrying section numbers; the reference has no rail. What it has
 * instead is a **display marker**: a 126px, weight-700, lowercase heading set
 * tone-on-tone -- beige on white, white on beige -- running the full container
 * width and bleeding slightly past the left edge. Near-zero contrast, so it
 * reads as a typographic band rather than as text you stop and read.
 *
 * That device is what stops a very long page from becoming an undifferentiated
 * stack, and it is the thing the black translation most needed. Here it
 * becomes `surface` on `ground` and `ground` on `surface`.
 *
 * The second half of the rhythm is the band alternation. On the reference that
 * is #FFFFFF against #F2F1EE -- only a ~5% luminance step. So `tone` here is a
 * small elevation change used consistently, not a dark/darker flip.
 */
export function Section({
  id,
  tone = 'ground',
  marker,
  eyebrow,
  heading,
  lead,
  children,
  className = '',
  headingLevel: Heading = 'h2',
  bleed = false,
}: {
  id?: string;
  /** Which band this section sits on. Alternate them down the page. */
  tone?: 'ground' | 'surface';
  /** The oversized lowercase section marker. Reserved for major sections. */
  marker?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  headingLevel?: 'h2' | 'h3';
  /** Opts out of the container, for full-bleed media or tracks. */
  bleed?: boolean;
}) {
  const isRaised = tone === 'surface';

  return (
    <section
      id={id}
      className={`${isRaised ? 'bg-surface' : 'bg-ground'} ${className}`}
    >
      {marker ? (
        <div className="overflow-hidden pt-20 lg:pt-28" aria-hidden="true">
          <Container>
            {/* Bleeds left by the optical side-bearing so the glyphs, not the
                box, line up with the content edge. Reference does the same. */}
            <span
              className={`block -translate-x-[0.06em] whitespace-nowrap text-display lowercase ${
                isRaised ? 'text-ground' : 'text-surface'
              }`}
            >
              {marker}
            </span>
          </Container>
        </div>
      ) : null}

      <Container
        className={`${marker ? 'pb-24 pt-10 lg:pb-36 lg:pt-14' : 'py-20 lg:py-32'}`}
      >
        {bleed ? (
          children
        ) : (
          <>
            {eyebrow ? (
              /* Reference micro-rhythm: eyebrow to heading is 8px. */
              <p className="mb-2 text-label uppercase text-muted">{eyebrow}</p>
            ) : null}
            {heading ? <Heading className="text-h2 text-fg measure">{heading}</Heading> : null}
            {lead ? <p className="mt-4 text-lead text-muted measure">{lead}</p> : null}
            {children ? (
              <div className={heading || lead || eyebrow ? 'mt-14' : ''}>{children}</div>
            ) : null}
          </>
        )}
      </Container>
    </section>
  );
}
