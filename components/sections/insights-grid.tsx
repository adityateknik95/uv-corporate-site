import type { InsightsContent } from '@/content';

/**
 * Three article cards with a category label and image.
 *
 * PLACEHOLDER SECTION -- no articles or photography were supplied
 * (`content/insights.ts`). Each card's `media.src` is empty, which is the
 * signal to render a generated tonal block instead of reaching for a stock
 * photo, following the same imagery rule as the hero: consistent treatment,
 * never a fake photograph standing in for a real one.
 */
export function InsightsGrid({ content }: { content: InsightsContent }) {
  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-3">
        {content.cards.map((card, i) => (
          <a key={card.id} href={card.href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-rule bg-surface">
              {card.media.src ? (
                // eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser
                <img
                  src={card.media.src}
                  alt={card.media.alt}
                  className="size-full object-cover [filter:saturate(0.7)_contrast(1.05)_brightness(0.85)]"
                />
              ) : (
                <CardField seed={i} />
              )}
            </div>
            <p className="mt-5 text-label uppercase text-brass">{card.category}</p>
            <p className="mt-2 text-lead text-fg measure-tight transition-colors duration-200 ease-in-out group-hover:text-brass">
              {card.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

const ANGLES = [18, 74, 42];

/** A quiet tonal field, not a fake photograph. One per card, not identical. */
function CardField({ seed }: { seed: number }) {
  const angle = ANGLES[seed % ANGLES.length];
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${angle}deg, var(--color-surface-2), var(--color-surface))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cpath d='M72 0H0v72' fill='none' stroke='%23d9a441' stroke-width='0.5' stroke-opacity='0.18'/%3E%3C/svg%3E\")",
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  );
}
