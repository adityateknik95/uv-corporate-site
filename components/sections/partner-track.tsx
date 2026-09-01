'use client';

import { useReducedMotion } from 'motion/react';
import type { PartnersContent } from '@/content';

/**
 * Continuous horizontal logo track. Pauses on hover and on reduced motion.
 *
 * PLACEHOLDER SECTION -- no logo files were supplied for the three
 * organisations the client actually named (`content/partners.ts`). The
 * brief's rule for this component is "colour logos on white do not survive
 * on black; render monochrome white at reduced opacity, brightening on
 * hover" -- applied here to the typographic wordmark standing in for each
 * logo, since there is no image to desaturate yet.
 *
 * The loop is a CSS animation translating a doubled list by exactly -50%,
 * so the seam between the end of the first set and the start of the second
 * is invisible. The doubled list only exists when motion is actually
 * running: under `prefers-reduced-motion` the animation is switched off in
 * globals.css (shortening its duration is not enough for an infinite loop --
 * see the token layer comment), and here the list renders once, undoubled,
 * as a plain static row rather than two identical rows sitting side by side.
 */
export function PartnerTrack({ content }: { content: PartnersContent }) {
  const reduced = useReducedMotion();
  const items = reduced ? content.logos : [...content.logos, ...content.logos];

  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="overflow-hidden">
        <ul
          className={reduced ? 'flex flex-wrap gap-x-14 gap-y-6' : 'partner-track flex w-max gap-14'}
          aria-label="Partners"
        >
          {items.map((logo, i) => (
            <li
              key={`${logo.id}-${i}`}
              // The duplicate set exists only to make the loop seamless; a
              // screen reader should hear each partner once, not twice.
              aria-hidden={i >= content.logos.length}
              className="flex shrink-0 items-center"
            >
              <span className="text-h4 text-muted opacity-70 transition-opacity duration-200 ease-in-out hover:text-fg hover:opacity-100">
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
