import type { CareersContent } from '@/content';

/**
 * Two side-by-side cards. Divided by a hairline, not floating boxes with
 * shadow, matching the promo strip and footer's shared vocabulary.
 * PLACEHOLDER SECTION -- no ATS URL or locations were supplied
 * (`content/careers.ts`).
 */
export function CareersBand({ content }: { content: CareersContent }) {
  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid divide-y divide-rule border-y border-rule sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {content.cards.map((card) => (
          <div key={card.id} className="px-1 py-10 sm:px-10 sm:first:pl-0 sm:last:pr-0">
            <h3 className="text-h3 text-fg">{card.heading}</h3>
            <p className="mt-3 text-body text-muted measure">{card.body}</p>
            <a
              href={card.link.href}
              className="mt-6 inline-flex items-center gap-1.5 text-small text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:decoration-accent"
            >
              {card.link.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
