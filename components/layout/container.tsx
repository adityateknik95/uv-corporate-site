import type { ElementType, ReactNode } from 'react';

/**
 * The page's horizontal frame, stated once.
 *
 * Reference audit: container caps at 1460px and the page gutter is 40px at
 * desktop (the wordmark sits at x=40). Below that the gutter steps down so
 * content still breathes at 360px.
 */
export function Container({
  as: Tag = 'div' as ElementType,
  className = '',
  children,
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--container-page)] px-5 sm:px-8 lg:px-[var(--spacing-gutter)] ${className}`}
    >
      {children}
    </Tag>
  );
}
