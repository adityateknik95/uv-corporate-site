/**
 * WCAG contrast gate for the token layer.
 *
 * Dark sites fail contrast quietly: a muted grey that looks fine on a designer
 * monitor lands at 3.1:1 on a laptop in daylight. This reads the tokens
 * straight out of app/globals.css -- so it cannot drift from what ships -- and
 * exits non-zero if any required pair is under threshold.
 *
 *   npm run contrast
 *
 * The maths lives in lib/contrast.ts and is imported directly; Node 24 strips
 * the types, so there is exactly one implementation shared with the specimen
 * page in the browser.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { contrastRatio, AA_NORMAL } from '../lib/contrast.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'app', 'globals.css'), 'utf8');

const tokens = {};
for (const [, name, hex] of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  tokens[name] = hex;
}

/* 4.5 = body text (AA). Hairlines are non-informational, so they only have to
   be perceptible, not legible. */
const checks = [
  ['fg', 'ground', AA_NORMAL, 'body text on page'],
  ['fg', 'surface', AA_NORMAL, 'body text on raised surface'],
  ['fg', 'surface-2', AA_NORMAL, 'body text on hover surface'],
  ['muted', 'ground', AA_NORMAL, 'secondary text on page'],
  ['muted', 'surface', AA_NORMAL, 'secondary text on raised surface'],
  ['muted', 'surface-2', AA_NORMAL, 'secondary text on hover surface'],
  ['brass', 'ground', AA_NORMAL, 'accent text and focus ring on page'],
  ['brass', 'surface', AA_NORMAL, 'accent text on raised surface'],
  ['brass', 'surface-2', AA_NORMAL, 'accent text on hover surface'],
  ['ground', 'brass', AA_NORMAL, 'dark label on a brass button'],
  ['rule', 'ground', 1.2, 'hairline perceptible against page'],
];

let failed = 0;
const rows = [];

for (const [fgName, bgName, min, note] of checks) {
  const fg = tokens[fgName];
  const bg = tokens[bgName];
  if (!fg || !bg) {
    console.error(`  MISSING token: --color-${fg ? bgName : fgName}`);
    failed++;
    continue;
  }
  const r = contrastRatio(fg, bg);
  const pass = r >= min;
  if (!pass) failed++;
  rows.push({ pair: `${fgName} on ${bgName}`, r, min, pass, note });
}

const width = Math.max(...rows.map((row) => row.pair.length));
console.log('\n  Contrast \u2014 token layer\n');
for (const row of rows) {
  console.log(
    `  ${row.pass ? 'ok  ' : 'FAIL'}  ${row.pair.padEnd(width)}  ` +
      `${row.r.toFixed(2).padStart(6)}:1  (min ${row.min.toFixed(2)})  ${row.note}`,
  );
}

if (failed > 0) {
  console.error(`\n  ${failed} contrast check(s) failed. Fix the token, not the check.\n`);
  process.exit(1);
}
console.log(`\n  All ${rows.length} checks pass.\n`);
