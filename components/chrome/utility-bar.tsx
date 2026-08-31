import type { UtilityBarContent } from '@/content';

/**
 * Utility items — search, secondary links, locale.
 *
 * These sit INLINE in the single header row, right-aligned before the CTA,
 * not in a separate strip above it. That is what the reference does: one
 * 76px row carrying everything, with utility items at 12px against the nav's
 * 14px. The brief's section inventory lists a "thin top strip", but the page
 * it was derived from has no such strip, and the brief's overriding
 * instruction is to match the reference. Kept as its own component so
 * restoring a separate strip is a layout change in one file.
 */
export function UtilityItems({ content }: { content: UtilityBarContent }) {
  return (
    <div className="hidden items-center gap-5 xl:flex">
      <ul className="flex items-center gap-5">
        {content.links.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              className="text-utility text-muted transition-colors duration-200 ease-in-out hover:text-fg"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {content.locales && content.locales.length > 0 ? (
        <ul className="flex items-center gap-3">
          {content.locales.map((locale) => (
            <li key={locale.label}>
              <a
                href={locale.href}
                aria-current={locale.current ? 'true' : undefined}
                className="text-utility font-medium text-muted transition-colors duration-200 ease-in-out hover:text-fg aria-[current]:text-fg"
              >
                {locale.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SearchTrigger({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex size-10 items-center justify-center text-muted transition-colors duration-200 ease-in-out hover:text-fg"
    >
      <span className="sr-only">{label}</span>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
