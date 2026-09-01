import type { FeatureBannerContent } from '@/content';
import { Container } from '@/components/layout/container';

/**
 * Full width, one idea, one action -- matching the reference's CTA band: a
 * single message set large, one link, nothing competing with it. This is the
 * page's other pale-mint moment on the reference (#E4F4F1); here it is a
 * raised surface with an accent rule top and bottom, keeping the one-accent
 * rule intact rather than introducing a second background colour for one band.
 */
export function FeatureBanner({ content }: { content: FeatureBannerContent }) {
  return (
    <div className="border-y border-accent/30 bg-surface">
      <Container className="flex flex-col items-start gap-8 py-16 sm:flex-row sm:items-center sm:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-fg">{content.heading}</h2>
          <p className="mt-4 text-lead text-muted measure">{content.body}</p>
        </div>

        <a
          href={content.cta.href}
          className="inline-flex h-[50px] shrink-0 items-center rounded-md bg-accent px-6 text-body font-medium text-ground transition-colors duration-200 ease-in-out hover:bg-fg"
        >
          {content.cta.label}
        </a>
      </Container>
    </div>
  );
}
