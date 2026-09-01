import type { InsightsContent } from '@/content';
import { MediaSlot } from '@/components/layout/media-slot';

/**
 * Three article cards with a category label and image.
 *
 * PLACEHOLDER SECTION -- no articles or photography were supplied
 * (`content/insights.ts`). Each card reserves a real image slot
 * (`MediaSlot`) rather than filling it with decoration -- see that
 * component for why, and for what it replaced here.
 */
export function InsightsGrid({ content }: { content: InsightsContent }) {
  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-3">
        {content.cards.map((card) => (
          <a key={card.id} href={card.href} className="group block">
            <MediaSlot media={card.media} ratio="4/3" />
            <p className="mt-5 text-label uppercase text-accent">{card.category}</p>
            <p className="mt-2 text-lead text-fg measure-tight transition-colors duration-200 ease-in-out group-hover:text-accent">
              {card.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
