'use client';

import { useId, useRef, useState } from 'react';
import type { FaqContent } from '@/content';

/**
 * Category tabs, each holding a disclosure accordion.
 *
 * Built to the APG tabs pattern: `role="tablist"` on the row, `role="tab"`
 * with `aria-selected`/`aria-controls` on each trigger, `role="tabpanel"`
 * on each panel. Arrow Left/Right move both focus and selection between
 * tabs (this is a same-page content switch, not a set of links, so
 * activating on arrow is the expected behaviour); Home/End jump to the
 * first/last tab. Only the selected tab is in the natural tab order --
 * the others are reachable by arrow key, which is what keeps a long list of
 * tabs from costing a keyboard user one Tab press each.
 *
 * Inside the active panel, each question is a standard disclosure --
 * `aria-expanded` plus a linked region -- independent of every other
 * question, so opening one does not require closing another.
 */
export function FaqTabs({ content }: { content: FaqContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const count = content.categories.length;

  const selectTab = (index: number, focus: boolean) => {
    const next = ((index % count) + count) % count;
    setActiveTab(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        selectTab(activeTab + 1, true);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        selectTab(activeTab - 1, true);
        break;
      case 'Home':
        event.preventDefault();
        selectTab(0, true);
        break;
      case 'End':
        event.preventDefault();
        selectTab(count - 1, true);
        break;
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
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

      <div role="tablist" aria-label={content.heading} className="flex flex-wrap gap-2 border-b border-rule">
        {content.categories.map((category, i) => {
          const selected = i === activeTab;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(i, false)}
              onKeyDown={onTabKeyDown}
              className={`relative -mb-px inline-flex h-11 items-center border-b-2 px-1 text-small transition-colors duration-200 ease-in-out mr-6 last:mr-0 ${
                selected ? 'border-brass text-fg' : 'border-transparent text-muted hover:text-fg'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {content.categories.map((category, i) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${baseId}-panel-${category.id}`}
          aria-labelledby={`${baseId}-tab-${category.id}`}
          hidden={i !== activeTab}
          className="divide-y divide-rule border-b border-rule"
        >
          {category.items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-answer-${item.id}`}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-body text-fg"
                  >
                    {item.question}
                    <PlusGlyph open={isOpen} />
                  </button>
                </h3>
                <div
                  id={`${baseId}-answer-${item.id}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-body text-muted measure">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function PlusGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="shrink-0 text-muted">
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <line
        x1="8"
        y1="1"
        x2="8"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.3"
        className="origin-center transition-transform duration-200 ease-in-out"
        style={open ? { transform: 'rotate(90deg)' } : undefined}
      />
    </svg>
  );
}
