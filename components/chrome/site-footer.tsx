import type { SiteContent } from '@/content';
import { Wordmark } from './wordmark';
import { Container } from '@/components/layout/container';

/**
 * Multi-column links, social, legal row, back to top.
 *
 * The footer is where dark sites usually give up on contrast -- muted text on
 * a slightly different dark. Here it stays on the page ground with the same
 * `muted` token measured at 6.57:1, and structure comes from hairlines.
 */
export function SiteFooter({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_repeat(4,minmax(0,auto))] lg:gap-12 lg:py-20">
          <div>
            <Wordmark />
            <p className="mt-5 text-small text-muted measure-tight">{content.shortDescription}</p>
          </div>

          {content.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-label uppercase text-muted">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-small text-fg underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:decoration-brass"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-5">
            {content.footer.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="text-small text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                  {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-fg"
          >
            {content.footer.backToTopLabel}
            <svg viewBox="0 0 10 12" width="9" height="11" aria-hidden="true" fill="none">
              <line x1="5" y1="11" x2="5" y2="1" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-utility text-muted">
            © {year} {content.companyName}. {content.footer.copyright}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {content.footer.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-utility text-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
