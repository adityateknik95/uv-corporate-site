# Corporate site — front-end showcase

**Live:** https://uv-corporate-site.vercel.app
**Repo:** https://github.com/adityateknik95/uv-corporate-site

A single-page marketing site for an Indian technology services company, built as a front-end
skills showcase. The structure is a faithful, deliberate rebuild of `kyndryl.com/in/en` —
information architecture, layout, spacing, and interaction patterns copied from measurement, not
guesswork. The one intentional departure is colour: the reference is white-and-red, this is black.
No Kyndryl logo, wordmark, imagery, or copy appears anywhere in the project.

This file is the short version. [`NOTES.md`](NOTES.md) is the full working log — every decision,
every measurement, every bug found while testing, in the order it happened.

---

## What's real, and what's a placeholder

The client gave seven lines of notes about the company's history — a BPO founded in 2012 that grew
into robotics, telecom, and government-backed education delivery — and named three organisations it
has worked with. That's it. Nothing else was supplied: no revenue, no headcount, no awards, no
client logos, no leadership names.

**Real, from the client's own words:** the company history (the "Who we are" timeline), the four
sectors it works across, the three named partners.

**Honest placeholders, clearly marked:** recognition, customer stories, insights articles,
leadership quotes, careers copy, and the FAQ's less certain answers. Each one says so on the page
("Placeholder content — TODO_CLIENT_...") rather than inventing a name, a number, or a quote to
fill the gap. Run this to see every open item:

```bash
grep -rn "TODO_CLIENT" content/
```

When the client sends real copy, it's a `content/*.ts` file edit — nothing in the components
changes. That was a hard requirement from day one: swapping in real content should never mean
touching JSX.

**The company name itself is a placeholder too** — `[ Company Name ]` — because the real name
hasn't been confirmed. It lives in exactly one place (`content/site.ts`), so it's a one-line
change when it arrives.

---

## The design, in plain terms

- **Colour:** a near-neutral black (`#0A0A0B`), revised after an early version used a warmer,
  ink-toned base — client preference, after comparing against an alternative build side by side.
  One accent colour throughout, a brass/amber, chosen because it's the colour of a status light on
  a monitored system — which is literally what telecom and outsourced operations are.
- **Type:** one typeface (Inter Tight), several weights and sizes, with bold, assertive headline
  weights rather than a light touch — also a direct-comparison call.
- **The big lowercase words** ("who we are", "stories", "how we help") that appear between
  sections are a direct copy of a device the reference site uses: barely-visible background text,
  same colour as the page around it, that breaks up a long page without needing a second accent
  colour or a photo.
- **Motion:** almost the whole page is still. The one moment that isn't is the company history
  timeline — a line draws down the page as you scroll to it, and each step in the company's story
  unfolds from that line in order. That's deliberate: it's the only part of the page telling a real
  story, so it's the only part that gets to move.
- **If you turn off animations** (an OS-level accessibility setting), everything above still shows
  up immediately, fully drawn — nothing on this page requires motion to be readable.

---

## Built and verified, not just built

- **Every page works down to a 360px-wide phone screen** — checked at 360, 768, 1024, and 1440px,
  with zero horizontal scrolling at any of them.
- **The whole page is operable from a keyboard alone** — every menu, carousel, tab, and form
  works without a mouse, and shows a visible outline when you tab to it.
- **Screen-reader tested,** not just visually reviewed: menus announce themselves correctly,
  carousels announce what changed, decorative elements are hidden from assistive tech instead of
  being read aloud as noise.
- **Contrast is measured, not eyeballed** — every text colour against every background it
  actually sits on is checked by a script against WCAG AA, and that script runs as part of the
  build. One exception, made deliberately and documented: the large background words are lower
  contrast on purpose, because they're pure decoration (hidden from screen readers, and every
  fact they name is repeated a few lines below in fully legible text).
- **Lighthouse, on the live deployed site:** 97 performance, 97 accessibility, 100 best practices.
  (Search-engine score is intentionally low — the page is marked "don't index me yet" while it's
  still running on a placeholder company name.)

---

## Stack

Next.js (static export — this ships as plain HTML/CSS/JS, no server required), TypeScript,
Tailwind CSS with a hand-built colour and type system (not the default Tailwind palette), and
Motion for the handful of places that actually animate. No UI kit, no template.

```bash
npm install
npm run dev        # local dev server
npm run build       # static export to /out
npm run check       # typecheck + contrast gate
```

---

## More detail

[`NOTES.md`](NOTES.md) has the rest: the line-by-line measurements taken from the reference site,
every design decision with its reasoning, a log of things that were tried and rejected, and every
bug that testing caught along the way (including a couple of interesting false alarms caused by
quirks in the testing environment itself, told apart from the real ones).
