'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { WhoWeAreContent } from '@/content';

/**
 * The signature moment. The only scroll-triggered animation on the page.
 *
 * A vertical spine draws downward as the section enters; each era unmasks
 * horizontally *from* the spine rather than fading up, so the motion reads as
 * the line arriving at each step in sequence. The year sets into place last.
 *
 * Two decisions worth defending:
 *
 * 1. **It is progressive enhancement, not a motion dependency.** The markup
 *    server-renders fully visible. The hidden starting state is applied in a
 *    layout effect -- before paint, so there is no flash -- and only when
 *    animation is actually going to run. If JS fails, if the browser throttles
 *    frames, if `prefers-reduced-motion` is set, the content is simply there.
 *    Content that needs an animation to finish before it can be read is a bug,
 *    not a feature, and it is the usual way scroll reveals break.
 *
 * 2. **Sequence, not decoration.** The company's history is the only real
 *    content in the brief and it is genuinely ordered, so the animation says
 *    something true about it. That is what earns a timeline here and what
 *    earns spending the page's one bold moment on it.
 *
 * This is the only thing allowed over 400ms.
 */
export function Timeline({ content }: { content: WhoWeAreContent }) {
  const reduced = useReducedMotion();
  const [animate, setAnimate] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Before paint: decide whether this instance animates at all. Doing it here
  // rather than in useEffect avoids a visible flash from shown to hidden.
  useLayoutEffect(() => {
    if (reduced) return;
    if (typeof IntersectionObserver === 'undefined') return;
    setAnimate(true);
  }, [reduced]);

  useEffect(() => {
    if (!animate) return;
    const element = ref.current;
    if (!element) return;

    let done = false;

    /**
     * The single source of truth: is the section actually on screen?
     *
     * Geometry rather than trusting the observer's own reporting. An earlier
     * version treated "the observer called back at least once" as proof it was
     * working, which is wrong -- IntersectionObserver always delivers once
     * synchronously at observe() time, so that test passes even when the
     * observer then never reports again. Checking the rectangle cannot be
     * fooled that way.
     */
    const check = () => {
      if (done) return;
      const box = element.getBoundingClientRect();
      const inView = box.top < window.innerHeight * 0.9 && box.bottom > 0;
      if (!inView) return;
      done = true;
      setRevealed(true);
      cleanup();
    };

    const observer = new IntersectionObserver(check, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    });

    // Three independent triggers, because each fails somewhere. The observer
    // is the cheap primary. The passive scroll listener covers renderers that
    // register an observer but never deliver to it again -- throttled
    // background tabs, some embedded webviews, headless environments. The
    // timeout covers the case where the section is already on screen at mount
    // and so nothing ever scrolls.
    observer.observe(element);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    const initial = setTimeout(check, 200);

    function cleanup() {
      clearTimeout(initial);
      observer.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }

    return cleanup;
  }, [animate]);

  // `animate` false means every element renders in its resolved state.
  const hidden = animate && !revealed;

  return (
    <div ref={ref} data-revealed={revealed ? 'true' : 'false'}>
      <p className="text-lead text-muted measure">{content.lead}</p>

      <ol className="relative mt-16 lg:mt-20">
        {/* The spine. Draws top-down; the entries key off the same clock. */}
        <span
          aria-hidden
          className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-rule"
          style={{
            transform: `scaleY(${hidden ? 0 : 1})`,
            transition: animate ? 'transform 900ms var(--ease-spine)' : undefined,
          }}
        />

        {content.entries.map((entry, i) => {
          // Each era waits for the spine to reach it.
          const step = 90;
          const base = 180 + i * step;

          return (
            <li key={entry.id} className="relative pb-12 pl-10 last:pb-0 lg:pb-16 lg:pl-16">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 block size-[11px] rounded-full border border-rule bg-ground"
                style={{
                  transform: `scale(${hidden ? 0.3 : 1})`,
                  opacity: hidden ? 0 : 1,
                  transition: animate
                    ? `transform 320ms var(--ease-spine) ${base}ms, opacity 320ms linear ${base}ms`
                    : undefined,
                }}
              />

              <div
                style={{
                  // The unmask: a horizontal wipe out from the spine, not a
                  // fade-and-slide-up. It shows where the content came from.
                  clipPath: hidden ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)',
                  transition: animate
                    ? `clip-path 620ms var(--ease-spine) ${base + 60}ms`
                    : undefined,
                }}
              >
                <p
                  className="text-h3 text-brass tabular-nums"
                  style={{
                    opacity: hidden ? 0 : 1,
                    transition: animate ? `opacity 400ms linear ${base + 320}ms` : undefined,
                  }}
                >
                  {entry.year ?? entry.marker}
                </p>

                <h3 className="mt-3 text-h4 text-fg">{entry.title}</h3>
                <p className="mt-3 text-body text-muted measure">{entry.body}</p>

                {entry.year === null ? (
                  <p className="mt-3 text-label uppercase text-muted">
                    no date supplied
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
