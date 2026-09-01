'use client';

import { useEffect, useRef, useState } from 'react';

/** True once the page has scrolled past `threshold`. Used to condense the header. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Calls `onOutside` for a pointer press or a focus landing outside `ref`.
 *
 * Focus is included deliberately: a mega menu that only watches clicks stays
 * open behind a keyboard user who has tabbed past it.
 */
export function useDismissOnOutside(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!active) return;

    const isOutside = (target: EventTarget | null) =>
      target instanceof Node && ref.current !== null && !ref.current.contains(target);

    const onPointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) onOutside();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) onOutside();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [ref, active, onOutside]);
}

/** Escape key handler, bound only while `active`. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, onEscape]);
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps Tab inside `ref` and locks body scroll while `active`.
 *
 * The mobile panel covers the page, so leaving focus loose behind it would let
 * a keyboard user tab into content they cannot see.
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    // Compensating for the scrollbar stops the page jolting sideways on open.
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused.current?.focus();
    };
  }, [ref, active]);
}

/**
 * Which of `ids` counts as the "active" section right now, for a jump-to nav.
 *
 * Geometry-driven, like the timeline reveal, rather than IntersectionObserver
 * alone -- the active section is "whichever one's top has most recently
 * crossed the line", which is a relationship *between* sections, not a
 * boolean on one of them, so a plain observer threshold does not model it
 * cleanly. Picking the last section whose top is at or above `offset` does.
 *
 * Deliberately not rAF-throttled. A rAF gate that never gets a frame (a
 * throttled tab, some embedded webviews) leaves the "already scheduled" flag
 * stuck true forever, so the nav freezes on whatever was active first -- the
 * exact failure the timeline reveal had to be rewritten around. Ten
 * getBoundingClientRect() reads per scroll event is cheap enough that the
 * throttle was solving a problem that did not exist.
 *
 * `ids` is sorted by actual document position before each computation,
 * never trusted to already be in top-to-bottom order. It usually comes from
 * a content array (nav link order), which is an editorial ordering, not a
 * layout one -- and the two silently disagreed here once once Phase 3 landed
 * "Stories" before "How we help" in the DOM while the nav copy still listed
 * them the other way. Sorting by position makes "last one past the line"
 * correct regardless of what order the caller's list happens to be in.
 */
export function useActiveSection(ids: string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const compute = () => {
      const inDocumentOrder = ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null)
        .sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);

      let current: string | null = null;
      for (const { id, el } of inDocumentOrder) {
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids is stable content, not identity
  }, [ids.join('|'), offset]);

  return active;
}
