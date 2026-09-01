import type { PromoStripContent } from '@/content';

/**
 * Three small cards directly under the hero, each with a category label.
 * Matches the reference's promo strip: a flat row divided by hairlines, no
 * card borders and no shadow -- the strip is one surface cut into three, not
 * three floating cards, which is the same rule the footer and mega menu use.
 */
export function PromoStrip({ content }: { content: PromoStripContent }) {
  return (
    <div className="grid divide-y divide-rule border-y border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {content.cards.map((card) => (
        <a
          key={card.id}
          href={card.link.href}
          className="group block px-1 py-8 transition-colors duration-200 ease-in-out sm:px-8 sm:first:pl-0 sm:last:pr-0"
        >
          <p className="text-label uppercase text-brass">{card.category}</p>
          <p className="mt-3 text-lead text-fg measure-tight">{card.heading}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-small text-muted transition-colors duration-200 ease-in-out group-hover:text-fg">
            {card.link.label}
          </p>
        </a>
      ))}
    </div>
  );
}
