/**
 * WCAG 2.1 relative luminance and contrast ratio.
 *
 * Shared by scripts/contrast.mjs (build-time gate over app/globals.css) and by
 * the token specimen page (runtime, reading the same custom properties out of
 * the DOM). One implementation, so the number on screen and the number that
 * fails the build cannot disagree.
 */

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Accepts `#rgb`, `#rrggbb`, or `rgb(r g b)` / `rgb(r, g, b)`. */
export function parseColor(input: string): [number, number, number] | null {
  const value = input.trim();

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      const r = hex[0];
      const g = hex[1];
      const b = hex[2];
      if (!r || !g || !b) return null;
      return [
        parseInt(r + r, 16),
        parseInt(g + g, 16),
        parseInt(b + b, 16),
      ];
    }
    if (hex.length === 6) {
      const n = parseInt(hex, 16);
      if (Number.isNaN(n)) return null;
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    return null;
  }

  const match = value.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (!match) return null;
  const [, r, g, b] = match;
  if (r === undefined || g === undefined || b === undefined) return null;
  return [Number(r), Number(g), Number(b)];
}

export function luminance(color: string): number {
  const rgb = parseColor(color);
  if (!rgb) return Number.NaN;
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

/** Contrast ratio between two colours, 1 to 21. Order does not matter. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  if (Number.isNaN(la) || Number.isNaN(lb)) return Number.NaN;
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/** WCAG AA thresholds. Large text is >=24px, or >=18.66px bold. */
export const AA_NORMAL = 4.5;
export const AA_LARGE = 3;
