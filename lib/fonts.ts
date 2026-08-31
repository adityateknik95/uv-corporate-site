import { Instrument_Serif, Inter_Tight } from 'next/font/google';

/**
 * Two families, deliberately unalike.
 *
 * Instrument Serif appears in exactly two places on the finished page -- the
 * hero headline and the timeline years -- which makes it an accent typeface
 * rather than a theme. The timeline is the signature section and its years are
 * the strongest content in the brief; a serif gives them a documentary,
 * archival register that a grotesque cannot.
 *
 * Inter Tight carries everything else: nav, body, labels, UI. Its tighter
 * default tracking holds up at the small sizes a dense corporate page needs.
 *
 * Both are self-hosted by next/font at build time, so there is no render-
 * blocking request to Google and no layout shift on load.
 */

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  // Roman only. The design never sets display type in italic, and shipping the
  // italic face means preloading a font file nothing on the page uses.
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const fontVariables = `${instrumentSerif.variable} ${interTight.variable}`;
