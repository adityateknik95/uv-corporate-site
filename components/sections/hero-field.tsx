import type { Media, Sector } from '@/content';

/**
 * The imagery rule, in one place.
 *
 * The audit calls for a single consistent treatment for hero media, because
 * bright full-bleed photography pasted onto a black page looks pasted on. Two
 * layers do that work here and are applied identically whether the media is a
 * real photograph or the generated field:
 *
 *   1. The media itself, desaturated and slightly contrast-lifted.
 *   2. A two-part scrim: horizontal from the ground colour on the reading
 *      edge, and vertical from the bottom, so the headline sits on near-solid
 *      ground while the far edge keeps some depth.
 *
 * No photography was supplied, so `src` is empty and the generated field
 * renders instead. It is a low-contrast tonal field keyed to the slide's
 * sector -- deliberately not a fake photograph, and not decoration competing
 * with the headline. When real images arrive they drop into `media` and
 * inherit this treatment unchanged.
 */

// Neutral greys, not the warm browns the earlier warm-ink palette used --
// revised alongside the ground/surface tokens so the hero's decorative
// field doesn't clash with the now-neutral-black page around it.
const FIELD: Record<Sector, string> = {
  operations:
    'radial-gradient(120% 90% at 78% 18%, #201f22 0%, transparent 60%), radial-gradient(90% 70% at 95% 80%, #1a1a1c 0%, transparent 55%)',
  automation:
    'radial-gradient(110% 85% at 82% 26%, #212023 0%, transparent 58%), radial-gradient(80% 60% at 62% 92%, #19191b 0%, transparent 60%)',
  telecom:
    'radial-gradient(130% 95% at 70% 12%, #1e1e21 0%, transparent 62%), radial-gradient(70% 70% at 98% 62%, #1c1b1e 0%, transparent 55%)',
  media:
    'radial-gradient(110% 80% at 85% 22%, #1d1c1f 0%, transparent 60%)',
  education:
    'radial-gradient(120% 90% at 74% 20%, #222124 0%, transparent 60%), radial-gradient(85% 65% at 92% 88%, #18181a 0%, transparent 58%)',
  partnership:
    'radial-gradient(115% 85% at 80% 24%, #1f1e21 0%, transparent 60%)',
};

/** A faint lattice, sized so it reads as texture rather than as a grid. */
const LATTICE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cpath d='M72 0H0v72' fill='none' stroke='%23d7ff00' stroke-width='0.5' stroke-opacity='0.16'/%3E%3C/svg%3E\")";

export function HeroField({ sector, media }: { sector: Sector; media?: Media }) {
  const hasPhoto = Boolean(media?.src);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={!media?.alt}>
      {hasPhoto && media ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no optimiser
        <img
          src={media.src}
          alt={media.alt}
          className="size-full object-cover [filter:saturate(0.7)_contrast(1.05)_brightness(0.85)]"
        />
      ) : (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: FIELD[sector] }} />
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: LATTICE, backgroundSize: '72px 72px' }}
          />
        </>
      )}

      {/* The scrim. Horizontal first so the headline edge is near-solid... */}
      <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/85 to-ground/30" />
      {/* ...then vertical, so the section meets the next band without a seam. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-transparent to-ground/40" />
    </div>
  );
}
