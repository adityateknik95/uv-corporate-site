# Design notes

Running log of decisions, and of things tried and rejected. This becomes the README at Phase 5,
and it is the answer when the reviewer asks why.

**Reference**: `kyndryl.com/in/en` — for information architecture and density only. No brand, colour,
wordmark, imagery or copy is taken from it. Nothing in this repo renders the word "Kyndryl".

---

## Phase 0 — foundation and design plan

### The company, in one line

An Indian technology services company that started in 2012 in outsourced operations and has since
taken in robotics, telecom, and education delivery under a central government project.

Everything on the page traces to six facts the client supplied. There are no others, and none have
been invented — no revenue, no headcount, no awards, no office count, no client beyond the three
they named.

### The problem this design is solving

Dark corporate sites have a default look that reads as generated: near-black around `#0B0B0B`, one
acid accent, identical rounded cards with soft grey shadows, an all-caps tracked eyebrow above
every heading, gradient washes as decoration, an arrow glyph on every link, and fade-up on every
section. The brief calls this out explicitly. Avoiding it — while still being dark, restrained and
corporate — is the actual design problem.

---

## Colour

| Token | Hex | Role | Measured |
|---|---|---|---|
| `--color-ground` | `#14120E` | Page ground. Warm ink, hue ~45°. | — |
| `--color-surface` | `#1D1A15` | First raise: mega menu, promo strip. | — |
| `--color-surface-2` | `#272219` | Second raise: hover and active states. | — |
| `--color-rule` | `#332C22` | Hairlines. | 1.36:1 on ground |
| `--color-fg` | `#F2EDE4` | Primary text. Warm off-white. | 16.04:1 on ground |
| `--color-muted` | `#A29886` | Secondary text. | 6.57:1 on ground |
| `--color-brass` | `#D9A441` | The only accent. Also the focus ring. | 8.32:1 on ground |

**Why a warm ground.** The cold blue-black is the enterprise-tech default, and it is also the
wrong register for this company. The oldest business here is a BPO — a business made of people on
shifts, not of server racks. A ground with a real hue at `#14120E` sits close enough to black to
read as a serious dark site, but it is warm, and warm is more honest about what the company is.

**Why brass, in one sentence.** Amber is the status colour of a live monitored system, which is
exactly what telecom and outsourced operations are; its brass register also reads institutional
enough to sit under a central-government education partnership. Acid green would read
consumer-startup, and vermilion would read as Kyndryl's own colour.

**One accent, not two.** A second accent is how a restrained palette becomes a decorated one. The
timeline distinguishes its six eras by sequence and typography, not by giving each a colour.

**Contrast is measured, not assumed.** `npm run contrast` parses the tokens straight out of
`app/globals.css` and fails the build below 4.5:1. The token specimen page performs the same
calculation in the browser against the live custom properties, sharing one implementation in
`lib/contrast.ts`. This is the check dark sites quietly fail; the tightest pair here is muted on
surface-2 at 5.55:1.

---

## Type

Two families, deliberately unalike.

- **Instrument Serif** — display, roman only. Appears in exactly two places on the finished page:
  the hero headline and the timeline years.
- **Inter Tight** — everything else: nav, body, labels, UI.
- **System mono** — token names, hex values and measured ratios only. Never body copy.

**Why a serif is worth the risk.** The timeline is the signature section and the years are the
strongest content in the brief. Setting them large in a serif gives the timeline a documentary,
archival register a grotesque cannot. Because it appears twice, it functions as an accent typeface
rather than a theme — the page is not "a serif site".

**Scale.** Fluid between 360px and 1440px, ratio widening 1.25 → 1.333 so the page becomes more
hierarchical as it widens rather than merely larger. Verified at both ends: `text-4xl` measures
56.9px at 360 and 120px at 1440; body holds 16 → 17px.

| Step | 360px | 1440px | Tracking | Used for |
|---|---|---|---|---|
| `4xl` | 56 | 120 | −0.03em | Timeline years |
| `3xl` | 40 | 76 | −0.025em | Hero headline |
| `2xl` | 30 | 44 | −0.02em | Section headings |
| `xl` | 24 | 32 | −0.015em | Sub-headings, card titles |
| `lg` | 20 | 24 | −0.01em | Timeline entry titles |
| `md` | 18 | 21 | −0.005em | Lead paragraphs |
| `base` | 16 | 17 | 0 | Body, line-height 1.6 |
| `sm` | 14 | 15 | 0 | Nav, metadata |
| `xs` | 12 | 13 | +0.02em | Category labels |
| `2xs` | 11 | 12 | +0.08em | Rail numbers, the one eyebrow |

Body copy is capped at 68 characters (`.measure`); narrow columns at 46 (`.measure-tight`).

---

## Layout — the spine

Asymmetric 12-column grid with a **persistent left rail**. Section numbers live in the rail;
content begins at column 3 and never centres. This gives the page an engineered spine rather than
the centred-marketing stack, and it is what reads as craft when someone scrolls fast.

Below 1024px the rail collapses and its number sits above the heading. Alignment logic is stated
per section.

```
UTILITY BAR + PRIMARY NAV  (sticky, condenses on scroll)
┌──────────────────────────────────────────────────────────────┐
│ search              contact  careers      India — EN         │  thin strip
├──────────────────────────────────────────────────────────────┤
│ [wordmark]   What we do  Who we are  Insights  Careers  ···  │
└──────────────────────────────────────────────────────────────┘
Alignment: wordmark on the page's left edge, nav items left-aligned
immediately after it, CTA hard right. Not a centred nav.

HERO
 rail │ content
      │ ┌────────────────────────────────────────────────────┐
  ··  │ │ Who we are                                         │  kicker
      │ │ One operations business,                           │  serif, 3xl
      │ │ four sectors.                                      │
      │ │ Started in 2012 in outsourced operations…          │  md, muted
      │ │ [ Read our story ]        ○ ● ○   ⏸                │  cta + controls
      │ └────────────────────────────────────────────────────┘
Alignment: text block starts at column 3 and stops at 46ch. Slide controls
sit on the same baseline as the CTA so the eye has one line to track.

PROMO STRIP
      │ ┌──────────────┬──────────────┬──────────────┐
      │ │ The company  │ Capability   │ Public sector│  category, xs
      │ │ How a 2012…  │ Operations…  │ Education…   │  lg
      │ └──────────────┴──────────────┴──────────────┘
Alignment: three equal columns divided by 1px rules, no card borders and no
shadow — the strip is one surface cut into three, not three floating cards.

JUMP-TO NAV  (sticky under the header)
      │  Who we are · How we help · Stories · Insights · Careers · FAQ
Alignment: single row, left-aligned to the content column. Active section
marked with a brass underline, not a pill.

06  WHO WE ARE  ── the signature section
 rail │ content
  06  │ Who we are
      │ The company has not pivoted so much as accumulated…       lead
      │
      │  2012 ●───────────────────────────────────────────
      │       │  An outsourced operations business
      │       │  The company started in 2012 as a business…
      │  02 ●───────────────────────────────────────────
      │       │  Into robotics
      │       │  It later stepped into the robotics field…
      │  03 ●───────────────────────────────────────────
      │       │  Greycells 18 Media
      │  ⋮
Alignment: years in a fixed-width column set in the serif, right-aligned to
the spine so the dots form one unbroken vertical line. Body text starts at a
single left edge shared by all six entries.

09  HOW WE HELP
      │ ┌────────────────────┬────────────────────┐
      │ │ Outsourced ops     │ Robotics & autom.  │
      │ ├────────────────────┼────────────────────┤
      │ │ Telecom            │ Education delivery │
      │ └────────────────────┴────────────────────┘
Alignment: 2×2 on desktop, divided by rules. Each block's link sits on the
block's own bottom edge so all four links share a baseline.

15  FAQ
      │ [ The company ] [ Working together ] [ Partnerships ]   tabs
      │ ─────────────────────────────────────────────────────
      │ ▸ When did the company start?
      │ ▾ What sectors do you work across?
      │     Four: outsourced operations, robotics…
Alignment: tabs left-aligned above a full-width accordion. Chevron on the
left, not the right, so questions and answers share one text edge.

17  FOOTER
      │ What we do    Company    Resources    Get in touch
      │ ─────────────────────────────────────────────────────
      │ © …          Privacy · Terms · Accessibility   ↑ Top
```

Sections not drawn above (recognition, stories, feature banner, insights, quotes, partners,
careers, contact) follow the same rule: rail number left, content from column 3, separation by
1px rules and spacing.

---

## Motion

**One orchestrated moment: the Who We Are timeline.**

A vertical spine draws downward as the section enters. Each era unmasks horizontally *from* the
spine — `clip-path`, not fade-up — as the line reaches it. The year sets into place last. This is
the only scroll-triggered animation on the page, and the only thing allowed over 400ms.

Everything else is quiet. Sections appear at rest. Motion elsewhere exists only to show what
changed in response to a user action: accordion opening, tab switching, carousel advancing, menu
opening. That kind of motion is always welcome because it carries information; ambient motion does
not.

**Reduced motion** is wired in from the first commit, not audited in at Phase 5. `globals.css`
carries the global floor, and components additionally branch on `useReducedMotion()` so the
timeline renders in its *resolved* state — spine fully drawn, all entries visible — rather than an
unanimated broken one. Hero auto-advance does not start at all.

---

## Three principles

1. **The page is a sequence, because the company is a sequence.** One BPO became four businesses,
   and the timeline is the argument the whole page is built around.
2. **Nothing decorative that isn't load-bearing.** An operations company should not sell itself
   with gradient washes.
3. **Every sentence traces to a client-supplied fact, or is visibly marked.**
   `grep -rn "TODO_CLIENT" content/` is the full list of what is still missing.

---

## Self-critique: what changed after checking against the default list

The plan was written, then read back against the brief's list of tells. What changed:

| Default | Replaced with | Why |
|---|---|---|
| Neutral `#0B0B0B` base | `#14120E`, warm hue, lifted luminance | A hue makes the ground a decision instead of an absence of one |
| Acid green / vermilion accent | Brass amber | Justified against telecom uptime and institutional education; the other two are borrowed identities |
| Identical rounded cards, soft grey shadow | 4px radius cap, **zero shadows**, separation by 1px rules + surface level + spacing | Shadow on a dark ground is mud; a rule is legible |
| All-caps tracked eyebrow above every heading | Section numbers in the left rail | The eyebrow is used at most once on the whole page |
| Gradient washes as decoration | Flat surfaces + 2.5% grain | Flat dark grounds band on cheap panels; grain fixes that without decorating |
| Arrow glyph on every link | `text-underline-offset` links; arrow reserved for the single primary CTA | An arrow on everything means an arrow means nothing |
| Fade-and-slide-up on every section | Only the timeline animates on scroll | Spend the boldness once |

**Also reconsidered during Phase 0:**

- *The serif.* Instrument Serif for display was nearly cut as too editorial for a corporate
  services site. Kept, but confined to two places, which turns the risk into an accent. This is
  the decision most worth challenging at review.
- *Token naming.* The plan called the tokens `base` / `text` / `line` / `accent`. Renamed to
  `ground` / `fg` / `rule` / `brass` because `--color-base` and `--color-text` collide with
  Tailwind's `text-base` font-size utility. Same palette, unambiguous utilities.

---

## Tried and rejected

- **Lenis (smooth scroll) and GSAP ScrollTrigger.** Both optional in the brief. The timeline is
  achievable with `motion` alone, and a smooth-scroll library that fights native scrolling costs
  Lighthouse points and hurts anyone using a trackpad or a screen reader. Not installed. If a
  scroll timeline in Phase 2 genuinely needs ScrollTrigger, this gets revisited and recorded here.
- **A second accent colour** for distinguishing the four sectors. Rejected: sectors are
  distinguished by sequence and heading, and a second accent is how one-accent palettes die.
- **`Instrument_Serif` italic.** Declared, then dropped — the design never sets display type in
  italic, and shipping it meant preloading a font file nothing on the page uses. Caught from a
  browser preload warning.
- **Inline `font-size: var(--text-*)` in the specimen.** Tailwind attaches the companion
  `--text-*--line-height` and `--letter-spacing` only through the utility class, so an inline
  font-size silently dropped tracking and leading. Each step now carries its literal class name,
  which is also what Tailwind's scanner needs.

---

## Implementation decisions

- **Tailwind v4, CSS-first `@theme`.** The token layer is `app/globals.css`. Tailwind's default
  palette, type scale, font and radius namespaces are **cleared** (`--color-*: initial` etc.), so a
  component physically cannot reach for `slate-800` or `text-7xl`. That is what keeps this off raw
  utility soup — the tokens are the only vocabulary available.
- **`@theme static`.** Tailwind emits only the theme variables a used utility references, so
  `--color-surface-2` was missing from `:root` before any hover state existed — invisible to the
  specimen and to runtime code. `static` emits all of them. This is a design system, not a
  per-build subset.
- **Static export** (`output: 'export'`). Verified building clean from Phase 0, so there is no
  surprise at Phase 5.
- **One contrast implementation** in `lib/contrast.ts`, imported by both the browser specimen and
  the Node build gate (Node 24 strips the types). The number on screen and the number that fails
  the build cannot disagree.
- **Content layer.** Typed schemas for all 17 sections in `content/types.ts` before any section is
  built, so later phases only fill data. Components receive content as props; nothing hardcodes
  copy in JSX.

---

## Open items

`grep -rn "TODO_CLIENT" content/` — currently:

| Key | What is needed |
|---|---|
| `TODO_CLIENT_companyName` | The real name. Placeholder wordmark until then; one-line swap in `content/site.ts` |
| `TODO_CLIENT_timeline_years` | Dates for steps 2–6. Only 2012 was supplied |
| `TODO_CLIENT_recognition` | Awards or citations, each with a verifiable source |
| `TODO_CLIENT_customerStories` | Per story: client, permission to name them, what the work was |
| `TODO_CLIENT_insights` | Real articles, or drop the section |
| `TODO_CLIENT_leadership` | Name, role, approved quote, profile URL |
| `TODO_CLIENT_partnerAssets` | Approved logo files and permission to display |
| `TODO_CLIENT_capabilityDetail` | Real service descriptions per sector |
| `TODO_CLIENT_faqAnswers` | Confirmed answers, especially on coverage and terms |
| `TODO_CLIENT_careers` | Careers/ATS URL and locations |
| `TODO_CLIENT_contactRouting` | Where "talk to us" goes; whether a mailing list exists |
| `TODO_CLIENT_socialHandles` | Real profile URLs |
| `TODO_CLIENT_registeredEntity` | Legal entity name and year for the copyright line |

### On the placeholder name

The brief forbids copying Kyndryl's brand, and a public link labelled with a real company's name
would read as impersonating them. The wordmark therefore renders a bracketed placeholder driven by
a single constant. Kyndryl stays where the brief puts it: a structural reference in this file.

---

## Phase 0 verification

- `npm run contrast` — 11/11 pairs pass; tightest is muted on surface-2 at 5.55:1
- `npm run typecheck` — clean
- `npm run build` — static export completes, 3 routes prerendered
- Rendered at 360 / 375 / 640 / 1440 — no horizontal overflow at any width (measured, zero
  elements exceeding the viewport at 360)
- Fluid scale confirmed at both ends of its range
- Browser console — no errors

Not yet provable: the focus ring. The specimen page has no interactive elements. `:focus-visible`
is defined in the token layer and gets demonstrated in Phase 1 with the nav.
