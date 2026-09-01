'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { HeroContent } from '@/content';
import { Container } from '@/components/layout/container';
import { HeroField } from './hero-field';

/**
 * Rotating hero, matching the reference: full-bleed media with a transparent
 * header over it, a left-aligned light-weight headline on a short measure, one
 * action, and pagination dots bottom-left of the content column.
 *
 * Built to the APG carousel pattern rather than as a bare slider:
 *
 * - The region carries `aria-roledescription="carousel"` and each slide
 *   `aria-roledescription="slide"` with an "N of M" label, so a screen reader
 *   user knows what kind of thing this is and where they are in it.
 * - Auto-rotation stops on hover, on focus entering the region, and whenever
 *   the tab is hidden. A carousel that keeps moving while you are reading it
 *   is the single most common failure of this component.
 * - The live region is `off` while rotating and `polite` once paused, which is
 *   what the pattern asks for: announcing every automatic change would be
 *   noise, announcing a user-driven one is useful.
 * - Auto-rotation never starts under `prefers-reduced-motion`, and the pause
 *   control is still rendered so the state is explicit rather than absent.
 *
 * The slides cross-fade rather than slide horizontally. All three are stacked
 * in the same grid cell, so the section height is the tallest slide and
 * changing slide causes no layout shift.
 */
export function Hero({ content }: { content: HeroContent }) {
  const [index, setIndex] = useState(0);
  // Two separate reasons rotation stops, because they behave differently.
  // `suspended` is transient -- the pointer is over the hero, or focus is
  // inside it -- and lifts when that ends. `stopped` is the user taking
  // control, by pressing pause or picking a slide, and it does not lift on its
  // own: resuming rotation under someone who just chose a slide is the whole
  // problem with carousels.
  const [suspended, setSuspended] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLElement>(null);

  const count = content.slides.length;
  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setStopped(true);
    },
    [count],
  );

  // Auto-rotation. Reduced motion opts out entirely rather than going faster.
  const rotating = !stopped && !suspended && !reduced && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), content.interval);
    return () => clearInterval(id);
  }, [rotating, count, content.interval]);

  // A slideshow running in a tab nobody is looking at is wasted work.
  useEffect(() => {
    const onVisibility = () => setSuspended(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const active = content.slides[index];
  if (!active) return null;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate bg-ground"
      onPointerEnter={() => setSuspended(true)}
      onPointerLeave={() => setSuspended(false)}
      onFocusCapture={() => setSuspended(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSuspended(false);
      }}
    >
      <div className="grid min-h-[36rem] pt-[var(--spacing-header)] lg:min-h-[42rem]">
        {content.slides.map((slide, i) => {
          const current = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.kicker}`}
              // Every slide occupies the same cell: no layout shift on change,
              // and the section is always as tall as its tallest slide.
              className="col-start-1 row-start-1 grid transition-opacity duration-300 ease-in-out"
              style={{ opacity: current ? 1 : 0 }}
              inert={!current}
            >
              <HeroField sector={slide.sector} media={slide.media} />

              <Container className="relative z-10 flex flex-col justify-end pb-14 pt-16 lg:pb-20 lg:pt-24">
                <p className="mb-2 text-label uppercase text-accent">{slide.kicker}</p>
                <h1 className="text-h1 text-fg measure-tight">{slide.headline}</h1>
                <p className="mt-5 text-lead text-muted measure">{slide.subline}</p>

                <div className="mt-9">
                  <a
                    href={slide.cta.href}
                    className="inline-flex h-[50px] items-center rounded-md border border-fg/70 px-5 text-body text-fg transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
                  >
                    {slide.cta.label}
                  </a>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      {/* Controls sit on the content column, not floating centre-screen, so
          they align with the headline the way the reference's do. */}
      <Container className="relative z-10 pb-12 lg:pb-16">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setStopped((value) => !value)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-rule text-muted transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            <span className="sr-only">
              {rotating ? content.pauseLabel : content.playLabel}
            </span>
            {rotating ? <PauseGlyph /> : <PlayGlyph />}
          </button>

          <ul className="flex items-center gap-2">
            {content.slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className="group inline-flex h-9 items-center px-1"
                >
                  <span className="sr-only">{`Show slide ${i + 1} of ${count}: ${slide.kicker}`}</span>
                  {/* A rule that widens, not a dot that fills. Dots read as
                      decoration; a measured rule reads as position. */}
                  <span
                    aria-hidden
                    className={`block h-px transition-all duration-300 ease-in-out ${
                      i === index ? 'w-10 bg-accent' : 'w-5 bg-rule group-hover:bg-muted'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="ml-1 text-utility text-muted tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </div>
      </Container>

      {/* Announces the current slide only once rotation has stopped. */}
      <div aria-live={rotating ? 'off' : 'polite'} aria-atomic="true" className="sr-only">
        {`Slide ${index + 1} of ${count}: ${active.kicker}`}
      </div>
    </section>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" fill="currentColor">
      <rect x="2" y="1.5" width="2.6" height="9" />
      <rect x="7.4" y="1.5" width="2.6" height="9" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" fill="currentColor">
      <path d="M3 1.5l7 4.5-7 4.5z" />
    </svg>
  );
}
