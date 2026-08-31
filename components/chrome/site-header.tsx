'use client';

import { useEffect, useRef } from 'react';
import type { SiteContent } from '@/content';
import { useScrolled } from '@/lib/hooks';
import { Container } from '@/components/layout/container';
import { UtilityItems, SearchTrigger } from './utility-bar';
import { PrimaryNav } from './primary-nav';
import { MobileNav } from './mobile-nav';
import { Wordmark } from './wordmark';

/**
 * One fixed 76px row, matching the reference.
 *
 * The earlier build stacked a separate 36px utility strip on a 64px nav. The
 * reference has neither: it is a single row, transparent over the hero, with
 * utility items inline on the right. Transparent-over-hero is why the header
 * cannot simply be `bg-ground` -- the hero media has to run underneath it --
 * so the background and hairline fade in only once the page has scrolled.
 *
 * That also retires the `inert` collapsing bar from the previous pass: there
 * is no longer a strip to collapse, so nothing can hide focusable links.
 *
 * The height is published as `--header-height` for anything that has to sit
 * directly beneath it: the mobile panel now, the jump-to nav in Phase 3.
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
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ease-in-out ${
        scrolled ? 'border-rule bg-ground' : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-[var(--spacing-header)] items-center gap-6">
        <Wordmark />

        <div className="hidden lg:block">
          <PrimaryNav content={content.nav} />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:gap-4">
          <UtilityItems content={content.utilityBar} />
          <SearchTrigger label={content.utilityBar.searchLabel} />

          {/* Reference primary button: 44px tall, full pill, accent fill with
              dark text. The only pill on the page -- everything else is 4px. */}
          <a
            href={content.nav.cta.href}
            className="hidden h-11 items-center rounded-pill bg-brass px-5 text-small font-medium text-ground transition-colors duration-200 ease-in-out hover:bg-fg sm:inline-flex"
          >
            {content.nav.cta.label}
          </a>

          <MobileNav nav={content.nav} utility={content.utilityBar} />
        </div>
      </Container>
    </header>
  );
}
