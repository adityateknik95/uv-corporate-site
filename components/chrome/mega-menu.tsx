'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { NavItem } from '@/content';
import { Container } from '@/components/layout/container';

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * The panel behind one primary nav item.
 *
 * Columns are divided by vertical hairlines rather than sat in cards -- the
 * panel is one surface cut into parts, which is the same rule the promo strip
 * and the footer follow. No shadow: on a dark ground a drop shadow is just mud.
 */
export function MegaMenu({ item, id, labelledBy }: { item: NavItem; id: string; labelledBy: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      id={id}
      aria-labelledby={labelledBy}
      // Transform only, never opacity. This panel exists to cover the page;
      // fading it in lets content show through it mid-transition, which on a
      // dark ground looks like a rendering fault rather than a transition. It
      // also means a dropped or throttled frame leaves an opaque panel a few
      // pixels out of place, instead of a translucent one.
      initial={reduced ? false : { y: -6 }}
      animate={{ y: 0 }}
      exit={reduced ? {} : { y: -6, opacity: 0 }}
      transition={{ duration: reduced ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-b border-rule bg-surface"
    >
      <Container>
        <div className="grid gap-px py-10 lg:grid-cols-4">
          {item.columns?.map((column) => (
            <div key={column.heading} className="lg:border-r lg:border-rule lg:pr-8 lg:last:border-r-0">
              {/* A label for the list, not a document heading. The nav sits
                  before <h1> in the DOM, so real headings here would put an h3
                  ahead of the page title in the outline. aria-labelledby gets
                  the grouping announced without that. */}
              <p id={`${id}-${slug(column.heading)}`} className="text-label uppercase text-muted">
                {column.heading}
              </p>
              <ul aria-labelledby={`${id}-${slug(column.heading)}`} className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-small text-fg underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:decoration-brass"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {item.feature ? (
            <div className="mt-6 border-t border-rule pt-6 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="text-h4 text-fg measure-tight">{item.feature.heading}</p>
              <p className="mt-2 text-small text-muted measure-tight">{item.feature.body}</p>
              <a
                href={item.feature.link.href}
                className="mt-4 inline-block text-small text-brass underline decoration-brass/40 underline-offset-4 transition-colors hover:decoration-brass"
              >
                {item.feature.link.label}
              </a>
            </div>
          ) : null}
        </div>
      </Container>
    </motion.div>
  );
}
