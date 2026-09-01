import { site } from '@/content';

/**
 * The mark is the timeline spine: one line, three nodes, unevenly spaced.
 *
 * It is the page's central argument compressed to 16px -- a company that
 * arrived at what it is in steps -- so the identity and the signature section
 * are saying the same thing. It also survives the name being unknown, which
 * the wordmark currently is.
 */
function SpineMark() {
  return (
    <svg
      viewBox="0 0 16 24"
      width="16"
      height="24"
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      <line x1="3" y1="2" x2="3" y2="22" stroke="var(--color-rule)" strokeWidth="1" />
      <circle cx="3" cy="4" r="2" fill="var(--color-accent)" />
      <circle cx="3" cy="12" r="2" fill="var(--color-muted)" />
      <circle cx="3" cy="20" r="2" fill="var(--color-muted)" />
      <line x1="7" y1="4" x2="14" y2="4" stroke="var(--color-accent)" strokeWidth="1" />
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`group flex items-center gap-2.5 text-fg ${className}`}
      aria-label={`${site.companyName} — home`}
    >
      <SpineMark />
      <span
        className={
          site.companyNameIsPlaceholder
            ? // Bracketed and muted on purpose: the real name is pending, and a
              // stand-in that looks like a finished wordmark invites nobody to
              // notice it is missing.
              'font-mono text-small tracking-tight text-muted transition-colors group-hover:text-fg'
            : 'text-h4 font-semibold tracking-tight'
        }
      >
        {site.companyName}
      </span>
    </a>
  );
}
