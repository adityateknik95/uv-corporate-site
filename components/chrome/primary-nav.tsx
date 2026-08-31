'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import type { NavContent } from '@/content';
import { useDismissOnOutside, useEscape } from '@/lib/hooks';
import { MegaMenu } from './mega-menu';

/**
 * Desktop primary nav.
 *
 * Built as a set of disclosures, not an ARIA menubar: these are links to page
 * regions, and `role="menu"` would promise a keyboard model (arrow-key
 * roving, type-ahead) that a navigation should not need. Each trigger is a
 * plain button with `aria-expanded` / `aria-controls`, which is what screen
 * readers already handle well here.
 *
 * Hover opens the panel only on devices that actually hover -- on touch,
 * pointerenter fires on tap and would open a panel the user then has to
 * dismiss before their tap registers.
 */
export function PrimaryNav({ content }: { content: NavContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  /** Escape closes and hands focus back to the trigger that opened the panel. */
  const closeAndRestoreFocus = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  useDismissOnOutside(navRef, openIndex !== null, close);
  useEscape(openIndex !== null, closeAndRestoreFocus);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(close, 180);
  };

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={navRef}
      onPointerLeave={canHover ? scheduleClose : undefined}
      onPointerEnter={cancelClose}
    >
      <nav aria-label="Primary" className="flex items-center gap-1">
        <ul className="flex items-center">
          {content.items.map((item, index) => {
            const hasPanel = Boolean(item.columns?.length);
            const isOpen = openIndex === index;
            const panelId = `mega-panel-${index}`;
            const triggerId = `mega-trigger-${index}`;

            if (!hasPanel) {
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex h-16 items-center px-3.5 text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.label} onPointerEnter={canHover ? () => setOpenIndex(index) : undefined}>
                <button
                  type="button"
                  id={triggerId}
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`relative inline-flex h-16 items-center gap-1.5 px-3.5 text-sm transition-colors ${
                    isOpen ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                  <Chevron open={isOpen} />
                  {/* The open item is marked by a brass rule sitting on the
                      header's own bottom border, so the trigger and its panel
                      read as one object. */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-2 bottom-0 h-px transition-colors ${
                      isOpen ? 'bg-brass' : 'bg-transparent'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href={content.cta.href}
          className="ml-4 inline-flex h-9 items-center rounded-sm border border-rule px-4 text-sm text-fg transition-colors hover:border-brass hover:text-brass"
        >
          {content.cta.label}
        </a>
      </nav>

      <AnimatePresence>
        {openIndex !== null && content.items[openIndex] ? (
          <MegaMenu
            key={openIndex}
            item={content.items[openIndex]}
            id={`mega-panel-${openIndex}`}
            labelledBy={`mega-trigger-${openIndex}`}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      width="9"
      height="6"
      aria-hidden="true"
      fill="none"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
