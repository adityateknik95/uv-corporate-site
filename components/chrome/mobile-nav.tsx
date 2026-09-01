'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { NavContent, UtilityBarContent } from '@/content';
import { useEscape, useFocusTrap } from '@/lib/hooks';

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * Below lg the mega menu becomes a full-height panel of disclosures.
 *
 * The same content, re-expressed: three columns cannot survive 360px, but the
 * grouping they encode still matters, so each nav item becomes an accordion
 * rather than being flattened into one long list.
 */
export function MobileNav({
  nav,
  utility,
}: {
  nav: NavContent;
  utility: UtilityBarContent;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEscape(open, () => setOpen(false));
  useFocusTrap(panelRef, open);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="inline-flex size-10 items-center justify-center text-fg lg:hidden"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <MenuGlyph open={open} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            // Slides rather than fades, for the same reason as the mega menu:
            // a full-page cover that fades shows the page through itself.
            initial={reduced ? false : { y: -8 }}
            animate={{ y: 0 }}
            exit={reduced ? {} : { y: -8, opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            // Sits below the header's *measured* height, not a guessed one -- the
            // utility bar collapses on scroll, so a fixed offset covers the
            // panel's own close button in one of the two states.
            className="fixed inset-x-0 bottom-0 top-[var(--header-height,4rem)] z-40 overflow-y-auto overscroll-contain border-t border-rule bg-ground lg:hidden"
          >
            <nav aria-label="Primary" className="px-5 py-6 sm:px-8 lg:px-[var(--spacing-gutter)]">
              <ul className="divide-y divide-rule border-y border-rule">
                {nav.items.map((item, index) => {
                  const hasPanel = Boolean(item.columns?.length);
                  const isExpanded = expanded === index;

                  if (!hasPanel) {
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-14 items-center text-lead text-fg"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : index)}
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-section-${index}`}
                        className="flex min-h-14 w-full items-center justify-between gap-4 text-left text-lead text-fg"
                      >
                        {item.label}
                        <Plus open={isExpanded} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.div
                            id={`mobile-section-${index}`}
                            initial={reduced ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-6 pb-6">
                              {item.columns?.map((column) => (
                                <div key={column.heading}>
                                  {/* Labels the list rather than entering the
                                      heading outline -- see mega-menu.tsx. */}
                                  <p
                                    id={`mobile-${index}-${slug(column.heading)}`}
                                    className="text-label uppercase text-muted"
                                  >
                                    {column.heading}
                                  </p>
                                  <ul
                                    aria-labelledby={`mobile-${index}-${slug(column.heading)}`}
                                    className="mt-3 space-y-3"
                                  >
                                    {column.links.map((link) => (
                                      <li key={link.href + link.label}>
                                        <a
                                          href={link.href}
                                          onClick={() => setOpen(false)}
                                          className="block text-small text-fg"
                                        >
                                          {link.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="mt-8 flex h-12 items-center justify-center rounded-sm bg-accent px-5 text-small font-medium text-ground"
              >
                {nav.cta.label}
              </a>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {utility.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-utility text-muted"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** Two rules that cross into an X. The change is the affordance. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <line
        x1="2"
        y1="7"
        x2="18"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.4"
        className="origin-center transition-transform duration-200"
        style={open ? { transform: 'translateY(3px) rotate(45deg)' } : undefined}
      />
      <line
        x1="2"
        y1="13"
        x2="18"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.4"
        className="origin-center transition-transform duration-200"
        style={open ? { transform: 'translateY(-3px) rotate(-45deg)' } : undefined}
      />
    </svg>
  );
}

function Plus({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="shrink-0">
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <line
        x1="8"
        y1="1"
        x2="8"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.3"
        className="origin-center transition-transform duration-200"
        style={open ? { transform: 'rotate(90deg)' } : undefined}
      />
    </svg>
  );
}
