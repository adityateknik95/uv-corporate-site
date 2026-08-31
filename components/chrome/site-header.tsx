'use client';

import { useEffect, useRef } from 'react';
import type { SiteContent } from '@/content';
import { useScrolled } from '@/lib/hooks';
import { UtilityBar } from './utility-bar';
import { PrimaryNav } from './primary-nav';
import { MobileNav } from './mobile-nav';
import { Wordmark } from './wordmark';

/**
 * Sticky header that condenses on scroll: the utility bar collapses to nothing
 * and the nav row stays. Collapsing is done with a 0fr/1fr grid row rather
 * than an animated max-height, so the transition is driven by the content's
 * own measured size and there is no magic number to keep in sync.
 *
 * Its height is published as `--header-height` because the header is not a
 * fixed size: the utility bar collapses on scroll. Anything that has to sit
 * directly beneath it -- the mobile panel now, the jump-to nav in Phase 3 --
 * reads the measured value instead of hardcoding a guess that is wrong in one
 * of the two states.
 */
export function SiteHeader({ content }: { content: SiteContent }) {
  const scrolled = useScrolled(24);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const publishHeight = () =>
      document.documentElement.style.setProperty('--header-height', `${element.offsetHeight}px`);

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-ground">
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quiet)]"
        style={{ gridTemplateRows: scrolled ? '0fr' : '1fr' }}
        // `inert`, not just aria-hidden. The collapsed bar still occupies the
        // tab order otherwise, so a keyboard user tabs into links they cannot
        // see. inert removes it from both the a11y tree and focus order.
        inert={scrolled}
      >
        <div className="overflow-hidden">
          <UtilityBar content={content.utilityBar} />
        </div>
      </div>

      <div className="relative border-b border-rule">
        <div className="mx-auto flex h-[var(--spacing-header)] max-w-[var(--container-page)] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Wordmark />

          <div className="hidden lg:block">
            <PrimaryNav content={content.nav} />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={content.nav.cta.href}
              className="hidden h-9 items-center rounded-sm border border-rule px-4 text-sm text-fg transition-colors hover:border-brass hover:text-brass sm:inline-flex"
            >
              {content.nav.cta.label}
            </a>
            <MobileNav nav={content.nav} utility={content.utilityBar} />
          </div>
        </div>
      </div>
    </header>
  );
}
