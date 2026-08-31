'use client';

import { useEffect, useState } from 'react';
import { contrastRatio, AA_NORMAL, AA_LARGE } from '@/lib/contrast';

type Kind = 'surface' | 'text' | 'line';

const SWATCHES: readonly { token: string; kind: Kind; role: string }[] = [
  { token: 'ground', kind: 'surface', role: 'Page ground. Warm ink, hue ~45°, not neutral black.' },
  { token: 'surface', kind: 'surface', role: 'First raise: mega menu, promo strip.' },
  { token: 'surface-2', kind: 'surface', role: 'Second raise: hover and active states.' },
  { token: 'rule', kind: 'line', role: 'Hairlines. Separation is done with lines, never shadow.' },
  { token: 'fg', kind: 'text', role: 'Primary text. Warm off-white, never pure white.' },
  { token: 'muted', kind: 'text', role: 'Secondary text.' },
  { token: 'brass', kind: 'text', role: 'The only accent. Also the focus ring.' },
];

const BACKGROUNDS = ['ground', 'surface', 'surface-2'] as const;

/**
 * Reads the tokens back out of the DOM and measures them, rather than
 * restating hex values a designer would have to keep in sync by hand. If a
 * token changes in globals.css this table changes with it -- and so does the
 * build gate in scripts/contrast.mjs, which shares the same maths.
 */
export function ColorTable() {
  const [values, setValues] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const read: Record<string, string> = {};
    for (const { token } of SWATCHES) {
      read[token] = styles.getPropertyValue(`--color-${token}`).trim();
    }
    setValues(read);
  }, []);

  return (
    <div className="space-y-px border border-rule">
      {SWATCHES.map(({ token, kind, role }) => {
        const value = values?.[token];
        return (
          <div
            key={token}
            className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 bg-surface p-4 sm:grid-cols-[3.5rem_11rem_1fr] sm:items-start sm:p-5"
          >
            <span
              aria-hidden
              className="size-14 shrink-0 border border-rule"
              style={{ backgroundColor: `var(--color-${token})` }}
            />

            <div className="min-w-0">
              <p className="font-mono text-sm text-fg">--color-{token}</p>
              <p className="font-mono text-xs text-muted">{value || ' '}</p>
            </div>

            <div className="col-span-2 min-w-0 sm:col-span-1">
              <p className="text-sm text-muted measure">{role}</p>
              {values && kind === 'text' ? <RatioRow token={token} values={values} /> : null}
              {kind === 'line' ? (
                <p className="mt-3 font-mono text-2xs uppercase text-muted">
                  non-text — perceptibility only, no AA threshold
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** AA ratios for a text token against each surface it is allowed to sit on. */
function RatioRow({ token, values }: { token: string; values: Record<string, string> }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
      {BACKGROUNDS.map((bg) => {
        const fgValue = values[token];
        const bgValue = values[bg];
        if (!fgValue || !bgValue) return null;

        const ratio = contrastRatio(fgValue, bgValue);
        const passesBody = ratio >= AA_NORMAL;
        const passesLarge = ratio >= AA_LARGE;

        return (
          <li key={bg} className="font-mono text-xs">
            <span className="text-muted">on {bg} </span>
            <span className={passesBody ? 'text-brass' : 'text-fg'}>{ratio.toFixed(2)}:1</span>
            <span className="text-muted">
              {' '}
              {passesBody ? 'AA' : passesLarge ? 'AA large only' : 'fails'}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
