import type { UtilityBarContent } from '@/content';

/**
 * Secondary wayfinding, kept out of the primary nav's way. It is the quietest
 * type on the page and the first thing to go when the header condenses --
 * which is the argument for having it at all: it costs nothing once you are
 * reading.
 */
export function UtilityBar({ content }: { content: UtilityBarContent }) {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto flex h-9 max-w-[var(--container-page)] items-center justify-end gap-5 px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg"
        >
          <SearchIcon />
          <span>{content.searchLabel}</span>
        </button>

        <span aria-hidden className="h-3 w-px bg-rule" />

        <ul className="flex items-center gap-5">
          {content.links.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {content.locales && content.locales.length > 0 ? (
          <>
            <span aria-hidden className="hidden h-3 w-px bg-rule sm:block" />
            <ul className="hidden items-center gap-3 sm:flex">
              {content.locales.map((locale) => (
                <li key={locale.label}>
                  <a
                    href={locale.href}
                    aria-current={locale.current ? 'true' : undefined}
                    className="text-xs text-muted transition-colors hover:text-fg aria-[current]:text-fg"
                  >
                    {locale.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
