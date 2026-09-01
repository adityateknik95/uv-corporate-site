import type { Media } from '@/content';

/**
 * A reserved, honest space for a photo that doesn't exist yet.
 *
 * Added after comparing against another build of the same brief, which
 * reserved real aspect-ratio boxes for its card images rather than filling
 * them with a decorative pattern. Worth borrowing -- but that site's actual
 * implementation turned out to be broken (`naturalWidth: 0`, pointing at a
 * `/images/placeholder-*.jpg` that 404s; what reads as "a designed empty
 * space" is really a failed `<img>` tag showing its container's background
 * colour through). This is a working version of the same idea: a real
 * `aspect-ratio` box, a flat quiet tone, and the brand's own spine mark at
 * low opacity so an empty slot still looks intentional rather than broken.
 *
 * Swaps to a real `<img>` the moment `media.src` is non-empty -- nothing
 * else about the layout has to change when a real photo arrives.
 */
export function MediaSlot({
  media,
  ratio = '4/3',
  className = '',
}: {
  media?: Media;
  ratio?: '4/3' | '16/9';
  className?: string;
}) {
  const hasPhoto = Boolean(media?.src);

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-rule bg-surface-2 ${className}`}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      {hasPhoto && media ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser
        <img
          src={media.src}
          alt={media.alt}
          className="size-full object-cover [filter:saturate(0.7)_contrast(1.05)_brightness(0.85)]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <SpineGlyph />
        </div>
      )}
    </div>
  );
}

/** The wordmark's own spine mark, quiet and centred, at slot scale. */
function SpineGlyph() {
  return (
    <svg viewBox="0 0 16 24" width="20" height="30" className="opacity-25">
      <line x1="3" y1="2" x2="3" y2="22" stroke="var(--color-rule)" strokeWidth="1" />
      <circle cx="3" cy="4" r="2" fill="var(--color-muted)" />
      <circle cx="3" cy="12" r="2" fill="var(--color-muted)" />
      <circle cx="3" cy="20" r="2" fill="var(--color-muted)" />
      <line x1="7" y1="4" x2="14" y2="4" stroke="var(--color-muted)" strokeWidth="1" />
    </svg>
  );
}
