'use client';

import { useState } from 'react';
import type { RecognitionContent } from '@/content';

/**
 * Numbered items with source attribution, matching the reference's
 * recognition carousel: Previous/Next arrows plus numbered tab pagination
 * (01, 02, 03…), one item shown at a time.
 *
 * Same no-layout-shift technique as the hero: every item is stacked in one
 * grid cell and switched with opacity, so the section height is fixed at the
 * tallest item rather than jumping as items of different length swap in.
 * Inactive items are `inert` so their content is not reachable by keyboard
 * or a screen reader while hidden.
 *
 * The content is still placeholder copy (see content/recognition.ts) but the
 * mechanism is real, which is the point: when real citations arrive this
 * needs no further work, just a content/ edit.
 */
export function RecognitionCarousel({ content }: { content: RecognitionContent }) {
  const [index, setIndex] = useState(0);
  const count = content.items.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <div>
      {content.placeholder ? (
        <p className="mb-8 text-label uppercase text-muted">Placeholder content — {content.todo}</p>
      ) : null}

      <div className="grid">
        {content.items.map((item, i) => (
          <div
            key={item.id}
            className="col-start-1 row-start-1 border-t border-rule pt-8 transition-opacity duration-300 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <p className="text-h1 text-accent tabular-nums">{item.index}</p>
            <p className="mt-4 text-h4 text-fg measure">{item.statement}</p>
            <p className="mt-4 text-small text-muted">{item.source}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-rule text-muted transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            <span className="sr-only">Previous</span>
            <ArrowGlyph direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-rule text-muted transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            <span className="sr-only">Next</span>
            <ArrowGlyph direction="right" />
          </button>
        </div>

        <ul className="flex items-center gap-4">
          {content.items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? 'true' : undefined}
                // Hit area is a real 36px square (the hero's pagination uses
                // the same trick); only the glyph inside stays small. A
                // numbered pager is a control, not body text, so it doesn't
                // get WCAG 2.5.8's inline-text exemption from the 24x24
                // minimum target size.
                className={`inline-flex size-9 items-center justify-center text-small tabular-nums transition-colors duration-200 ease-in-out ${
                  i === index ? 'text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {item.index}
              </button>
            </li>
          ))}
        </ul>
      </div>
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
