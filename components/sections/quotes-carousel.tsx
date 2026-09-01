'use client';

import { useState } from 'react';
import type { ExpertiseQuotesContent } from '@/content';

/**
 * Leadership quote carousel with name, role, and social link.
 *
 * PLACEHOLDER SECTION -- no leadership names, roles or quotes were supplied
 * (`content/quotes.ts`). Inventing a named executive is the most damaging
 * placeholder a corporate page can carry, so every attribution here says
 * "pending" rather than a fabricated person. The mechanism is real; the
 * content/ edit that adds real quotes needs no component work.
 *
 * Same no-layout-shift carousel technique as recognition and stories: one
 * grid cell, opacity switch, inactive quotes `inert`.
 */
export function QuotesCarousel({ content }: { content: ExpertiseQuotesContent }) {
  const [index, setIndex] = useState(0);
  const count = content.quotes.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid">
        {content.quotes.map((quote, i) => (
          <figure
            key={quote.id}
            className="col-start-1 row-start-1 transition-opacity duration-300 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <blockquote>
              <p className="text-h3 text-fg measure font-light">“{quote.quote}”</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="min-w-0">
                <p className="text-body text-fg">{quote.name}</p>
                <p className="text-small text-muted">{quote.role}</p>
              </div>
              {quote.social ? (
                <a
                  href={quote.social.href}
                  {...(quote.social.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="ml-2 shrink-0 text-small text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:decoration-accent"
                >
                  {quote.social.label}
                  {quote.social.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {count > 1 ? (
        <div className="mt-10 flex items-center gap-2">
          {content.quotes.map((quote, i) => (
            <button
              key={quote.id}
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? 'true' : undefined}
              className="group inline-flex h-9 items-center px-1"
            >
              <span className="sr-only">{`Show quote ${i + 1} of ${count}: ${quote.name}`}</span>
              <span
                aria-hidden
                className={`block h-px transition-all duration-300 ease-in-out ${
                  i === index ? 'w-10 bg-accent' : 'w-5 bg-rule group-hover:bg-muted'
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
