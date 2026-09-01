'use client';

import type { JumpNavContent } from '@/content';
import { Container } from '@/components/layout/container';
import { useActiveSection } from '@/lib/hooks';

/**
 * Section 5 of the brief's inventory: "Anchor links to the main sections.
 * Highlights the active section on scroll." Not present on the India
 * homepage itself as measured -- it appears to be a pattern from Kyndryl's
 * longer solution pages rather than this one -- so this is built to the
 * brief's explicit spec rather than to something observed on the reference.
 *
 * Sticky directly under the header, consuming the same `--header-height`
 * the header publishes for exactly this purpose. An accent underline marks the
 * active link rather than a filled pill, matching the rest of the page's
 * rule-not-pill vocabulary (see the hero's pagination).
 */
export function JumpNav({ content }: { content: JumpNavContent }) {
  const ids = content.links.map((link) => link.href.replace('#', ''));
  const active = useActiveSection(ids, 140);

  return (
    <nav
      aria-label={content.label}
      className="sticky top-[var(--header-height,4.75rem)] z-30 border-b border-rule bg-ground/95 backdrop-blur"
    >
      <Container>
        <ul className="flex gap-6 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {content.links.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = id === active;
            return (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative inline-flex h-6 items-center text-small transition-colors duration-200 ease-in-out ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-[13px] h-px transition-colors duration-200 ease-in-out ${
                      isActive ? 'bg-accent' : 'bg-transparent'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
