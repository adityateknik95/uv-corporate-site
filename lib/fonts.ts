import { Inter_Tight } from 'next/font/google';

/**
 * One family, weights 300-700.
 *
 * The reference audit settled this: kyndryl.com/in/en sets the entire page in
 * a single neutral grotesque and gets its hierarchy from size, weight and
 * space rather than from a second typeface. The brief asks for a faithful
 * rebuild whose only deliberate departure is colour, so the Instrument Serif
 * display face from the first pass is gone -- it was a type departure, not a
 * colour one.
 *
 * Inter Tight rather than the reference's Roboto: it is the same category of
 * neutral grotesque and covers the same 300-700 range, without the build
 * reading as a straight clone of their font stack.
 *
 * Self-hosted by next/font at build time, so there is no render-blocking
 * request to Google and no layout shift on load.
 */
export const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const fontVariables = interTight.variable;
