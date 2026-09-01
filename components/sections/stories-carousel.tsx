'use client';

import { useState } from 'react';
import type { CustomerStoriesContent } from '@/content';
import { MediaSlot } from '@/components/layout/media-slot';

/**
 * Carousel with a summary and a full-story toggle per story, matching the
 * reference's "Read full story" pattern.
 *
 * Two independent pieces of state, deliberately not coupled: which story is
 * showing (`index`) and which stories are expanded (`expanded`, a set of
 * ids). Switching stories does not collapse an expansion, so a story you
 * opened stays open if you page away and back -- the state is "did I open
 * this", not "is this the current one".
 *
 * The disclosure uses the same 0fr/1fr grid-row technique as the header's
 * condense, sized by its own content rather than a guessed max-height. Global
 * `prefers-reduced-motion` handling in globals.css already collapses every
 * transition on this page to nothing, so no extra branch is needed here.
 */
export function StoriesCarousel({ content }: { content: CustomerStoriesContent }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const count = content.stories.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid">
        {content.stories.map((story, i) => {
          const isOpen = expanded.has(story.id);
          return (
            <article
              key={story.id}
              className="col-start-1 row-start-1 border-t border-rule pt-8 transition-opacity duration-300 ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <MediaSlot media={story.media} ratio="16/9" className="max-w-2xl" />

              <p className="mt-8 text-label uppercase text-accent">{story.client}</p>
              <p className="mt-4 text-h3 text-fg measure">{story.summary}</p>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p
                    id={`story-full-${story.id}`}
                    className="mt-5 text-body text-muted measure"
                  >
                    {story.full}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(story.id)}
                aria-expanded={isOpen}
                aria-controls={`story-full-${story.id}`}
                className="mt-6 inline-flex items-center gap-1.5 text-small text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:decoration-accent"
              >
                {isOpen ? content.collapseLabel : content.expandLabel}
              </button>
            </article>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-rule text-muted transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            <span className="sr-only">Previous story</span>
            <ArrowGlyph direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-rule text-muted transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            <span className="sr-only">Next story</span>
            <ArrowGlyph direction="right" />
          </button>

          <p className="ml-1 text-utility text-muted tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ArrowGlyph({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 12 10"
      width="11"
      height="9"
      aria-hidden="true"
      fill="none"
      className={direction === 'left' ? 'rotate-180' : ''}
    >
      <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
