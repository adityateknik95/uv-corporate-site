import type { HowWeHelpContent } from '@/content';

/**
 * Four capability blocks, heading + body + one link each.
 *
 * The reference implements this as a sticky-scroll list: four headings
 * stacked in a single column, each pinning a large image on the opposite
 * side as you scroll past it. Deliberately not reproduced. Scroll-pinning is
 * a heavier pattern -- it fights native scroll, has real reduced-motion and
 * layout-shift implications, and needs an image per block to justify pinning
 * anything at all. The brief's own section inventory reduces this component
 * to "a heading, body, and one link" with no image, and no other section on
 * this page pins content, so a static 2x2 grid says the same four things
 * without introducing a pattern nothing else here uses.
 */
export function HowWeHelp({ content }: { content: HowWeHelpContent }) {
  return (
    <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
      {content.blocks.map((block) => (
        <div key={block.id} className="border-t border-rule pt-6">
          <h3 className="text-h4 text-fg">{block.heading}</h3>
          <p className="mt-3 text-body text-muted measure-tight">{block.body}</p>
          <a
            href={block.link.href}
            className="mt-5 inline-flex items-center gap-1.5 text-small text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:decoration-accent"
          >
            {block.link.label}
          </a>
        </div>
      ))}
    </div>
  );
}
