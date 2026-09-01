# Design notes

Running log of decisions, and of things tried and rejected. This becomes the README at Phase 5,
and it is the answer when the reviewer asks why.

**Reference**: `kyndryl.com/in/en` — for information architecture and density only. No brand, colour,
wordmark, imagery or copy is taken from it. Nothing in this repo renders the word "Kyndryl".

---

## Reference audit — kyndryl.com/in/en

Measured in-browser at a 1280px viewport on 2026-08-31, not eyeballed from screenshots. These
numbers are the spec; the black build is checked against them.

### Container and grid

| Property | Reference |
|---|---|
| Container max-width | **1460px** |
| Page gutter | **40px** at 1280 (wordmark sits at x=40) |
| Content width at 1280 | 1265px — near edge-to-edge until the cap engages |
| Full-bleed | Hero, display-marker bands, partner track, footer |
| Constrained | Everything else, inside the 1460 container |

### Vertical rhythm

Section padding lands on a **16px scale**. Observed values, top/bottom:
`48/64`, `64/64`, `96/128`, `128/80`, `144/144`, `144/96`, and `0/180` on the display-marker bands.

Working rule: major sections get **96–144px** top and bottom on desktop; bands carrying a display
marker get much more bottom (180px) than top.

Micro-rhythm inside a card: **eyebrow → heading = 8px**. Heading → body ≈ 16px.

### Type scale

Single family throughout: Roboto, at weights 300 / 400 / 500 / 700. There is no serif on the page.

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Display section marker | **126.5px** | 700 | 94.9 (**0.75**) | normal, lowercase |
| Section heading | 44px | 400 | 46.6 (1.06) | −0.22px |
| Hero H1 | **40px** | **300** | 51.2 (1.28) | −0.4px |
| Large sub-heading | 40px | 300 | 48 | −0.2px |
| Card heading (large) | 32px | 400 | 33.9 (1.06) | −0.16px |
| Card heading | 24px | 400 | 30 (1.25) | −0.12px |
| Pull quote | 24px | 300 | 32 | +0.16px |
| Lead body | 18px | 400 | 26 (1.44) | normal |
| Body | 16px | 400 | 24 (1.5) | normal |
| Eyebrow label | **12px** | 500 | 18 | **+0.6px**, uppercase |

Two things worth naming. The hero is **light weight at 40px**, not heavy — the page gets its
authority from size and space, not from bold. And the eyebrow is the only uppercase, tracked-out
element in the system.

### The display marker — the device I had missed

Three major sections are introduced by a **126px, weight 700, lowercase** heading that runs the
full container width and bleeds 8px past the left edge. It is set **tone-on-tone**: beige
(`#F2F1EE`) on white, white on beige. Near-zero contrast, functioning as a typographic band rather
than as text you read.

This is what stops a 10,600px page from reading as an undifferentiated stack, and it is the single
most characteristic thing about the layout. It translates to black almost perfectly: `surface` on
`ground`, and `ground` on `surface`.

### Colour and the light/dark alternation

The brief describes Kyndryl as alternating white with dark. Measured, it is subtler than that:

| Band | Value |
|---|---|
| White sections | `#FFFFFF` |
| Beige sections | `#F2F1EE` |
| Off-white variant | `#F9F9F9` |
| One accent band | `#E4F4F1` pale mint |
| Primary text | `#3D3C3C` — not black |
| Accent (primary CTA) | `#4CDD84` mint, with `#042315` text |

Band order down the page: hero image → white → beige → white → mint → beige → footer beige, plus
image-backed dark sections for the recognition and stories carousels.

**The alternation is a ~5% luminance step, not a light/dark flip.** That is the finding that
matters most for the translation: I do not need dramatic dark/darker sections, I need a *small*
elevation step used consistently. `ground #14120E` → `surface #1D1A15` is almost exactly the same
relative step, so the existing token pair is right — it just has to actually get used.

### Buttons

| Type | Height | Radius | Fill | Type |
|---|---|---|---|---|
| Primary | 44px | **66px (full pill)** | mint `#4CDD84`, dark text | 14px / 500 |
| Secondary | 50px | 4px | transparent, 0.8px border | 16px / 400 |

### Header

- **One fixed row, 76px tall**, `z-index: 10`, **transparent over the hero** — no background fill.
- **There is no separate utility strip.** Utility items (investors link, locale, bookmark, search)
  sit in the same row, right-aligned, at 12px. Nav links are 14px/400.
- Wordmark x=40, nav starts x=143, CTA pill right-aligned.

### Motion

Everything measured is short and interaction-driven:

- `color`, `background-color`, `border-color` — **200ms ease-in-out**
- `opacity` — **300ms ease**
- `background-size` — **350ms ease** (image zoom on card hover)

No scroll-triggered entrance animation on section content. Carousels advance, the nav condenses,
the FAQ expands. Nothing over 400ms. This confirms the brief: reproduce these, add one signature
moment on the timeline, and keep everything else quiet.

### Where this build must change

Recorded against what Phases 0–1 already shipped:

| Built | Reference | Action |
|---|---|---|
| Separate 36px utility strip + 64px nav = 102px | One 76px row, utility items inline | Merge into one row |
| Header solid `ground` | Transparent over hero, fills on scroll | Rebuild |
| Container 1344px (84rem) | 1460px | Change token |
| Gutter 20/32/48px | 40px | Change token |
| Instrument Serif display + Inter Tight | One grotesque, weights 300–700 | Drop the serif |
| Left-rail spine with section numbers | No rail; display markers instead | Replace |
| Hero headline at 3xl/400 serif | 40px / weight 300 | Re-spec |
| No display markers | 126px lowercase tone-on-tone | Add |


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

---

## Phase 1 — shell

Utility bar, primary nav with mega menu, mobile navigation, footer, section primitive.

The Phase 0 specimen moved to `/specimen` rather than being deleted. It is the reference when a
later phase needs to check a token, and the thing to screenshot when someone asks what the design
system is.

### What each piece is for

- **Utility bar** — secondary wayfinding kept out of the primary nav's way. The quietest type on
  the page, and the first thing to go when the header condenses: it costs nothing once you are
  reading.
- **Primary nav** — the IA made visible. Three dropdowns for the areas that branch, two flat links
  for the ones that are a single destination.
- **Mega menu** — built as **disclosures, not an ARIA menubar**. These are links to page regions;
  `role="menu"` would promise a keyboard model (roving tabindex, type-ahead) that a site
  navigation should not need and that screen reader users do not expect here. Each trigger is a
  plain button with `aria-expanded` / `aria-controls`.
- **Mobile nav** — the same content re-expressed. Three columns cannot survive 360px, but the
  grouping they encode still matters, so each item becomes an accordion rather than being
  flattened into one long list.
- **Section primitive** — the spine stated once, so no section re-derives its own alignment. That
  is how a long page ends up looking designed rather than assembled.

### Decisions

- **The wordmark is the timeline spine**: one line, three nodes, unevenly spaced. The page's
  central argument at 16px — a company that arrived at what it is in steps — so the identity and
  the signature section say the same thing. It also survives the name being unknown, which it
  currently is.
- **Header condenses via a 0fr/1fr grid row**, not an animated max-height, so the transition is
  driven by the content's measured size with no magic number to keep in sync.
- **The header publishes `--header-height`** from a ResizeObserver. The header is not a fixed size
  — the utility bar collapses — so anything sitting directly beneath it reads the measured value.
  The jump-to nav in Phase 3 needs exactly this.
- **Hover-to-open is gated on `(hover: hover) and (pointer: fine)`**. On touch, `pointerenter`
  fires on tap and would open a panel the user then has to dismiss before their tap registers.

### Bugs found by testing, and fixed

1. **The focus ring was being overridden by `transition-colors`.** Tailwind v4 includes
   `outline-color` in that utility's transition-property list, so a ring declared in `@layer base`
   lost to it: the outline rendered in the element's own text colour and *faded in* over 150ms. A
   focus indicator that animates is not there when the user needs it. Fixed by moving the rule out
   of `@layer base` entirely — **unlayered author styles outrank every Tailwind layer** — and
   setting `transition-property: none` on it. The ring is an accessibility guarantee; it should
   not be something a utility class can quietly win against. Verified: brass, 2px, instant.
2. **The collapsed utility bar kept its links in the tab order.** It was `aria-hidden` while
   scrolled, which hides it from assistive tech but leaves it focusable — so a keyboard user
   tabbed into invisible controls. Replaced with `inert`, which removes it from both the
   accessibility tree and the focus order. Verified: 13 reachable controls in the header expanded,
   9 when condensed.
3. **The mobile panel was offset by a hardcoded `4rem`** while the header is 102px with the
   utility bar expanded — so the panel covered its own close button. Fixed by consuming the
   measured `--header-height`.
4. **Nav column headings were `h3`s sitting before the `h1`.** The nav precedes `<main>` in the
   DOM, so those headings broke the document outline. They are labels for adjacent lists, not
   document headings, so they became `<p id>` + `<ul aria-labelledby>`: the grouping is still
   announced, the outline is clean.
5. **Occluding panels no longer animate opacity.** Fading in a surface whose job is to cover the
   page lets content show through it mid-transition, which on a dark ground reads as a rendering
   fault. Both the mega menu and the mobile panel now animate transform only. A dropped or
   throttled frame leaves an opaque panel a few pixels out of place instead of a translucent one.

### Verified

- Mega menu, 13 checks: opens on click; `aria-expanded` / `aria-controls` / `aria-labelledby`
  wired; only one panel open at a time; Escape closes **and returns focus to its trigger**;
  outside pointerdown closes; focus leaving the header closes; second click closes; flat links
  stay links; no `role="menu"` misuse; nav has an accessible name.
- Mobile nav, 8 checks: `role="dialog"` + `aria-modal`; focus moves into the panel and is trapped;
  body scroll locked and restored; accordions expand one at a time with linked regions; Escape
  closes.
- Header: condenses on scroll and is reversible; utility controls leave the tab order when
  collapsed.
- Document: one `h1`, no skipped heading levels, header/main/footer landmarks, every in-page
  anchor resolves to a real element, no horizontal overflow at 360px.
- Skip link is the first focusable element and is hidden until focused.

### Note on the verification environment

The browser pane used for testing does not run `requestAnimationFrame` and its
`document.timeline` does not advance, so CSS transitions and WAAPI animations freeze mid-flight
and `AnimatePresence` exit animations never unmount their element. Several apparent failures were
this, not the code: assertions were rewritten to check state (`aria-expanded`) rather than DOM
presence. Motion end-states could not be visually confirmed here and should be checked in a real
browser before shipping. This is also part of why occluding panels no longer animate opacity —
the components now degrade correctly when frames are dropped.

---

## Rebuild against the reference audit

The brief changed from "structural reference" to **faithful rebuild**, with colour as the only
deliberate departure. Phases 0 and 1 were re-cut against the measured audit above. What changed
and why:

| Was | Now | Because |
|---|---|---|
| Separate 36px utility strip over a 64px nav (102px) | One fixed 76px row, utility items inline | The reference has no strip. See the note below. |
| Header solid `ground`, sticky | Fixed, **transparent**, fills on scroll | The reference runs hero media under a transparent header. A solid header cannot do that. |
| Container 1344px (84rem) | **1460px** | Measured. |
| Gutter 20/32/48px | 20/32/**40px** | Measured — the wordmark sits at x=40. |
| Instrument Serif + Inter Tight | One grotesque, weights 300–700 | The reference sets the whole page in a single neutral grotesque. A serif is a *type* departure, and only colour was permitted. |
| T-shirt type scale (`2xs`…`4xl`) | Role-named steps at measured values | `text-h1` cannot be mistaken for `text-h2`; sizes/weights/tracking are the reference's. |
| Left-rail spine with section numbers | **Display markers** | The reference has no rail. The 126px lowercase tone-on-tone marker is the device actually carrying its rhythm. |
| Every section on one ground | Alternating `ground` / `surface` bands | Rebuilds the white/beige alternation as elevation, which is the whole point of the black translation. |
| Radius capped at 4px | 4px, plus a **pill** for the primary CTA | The reference rounds buttons only: primary is a full pill, secondary 4px. |
| Hairline `#332C22` (~14% white) | `#2E2A24` (~10% white) | The brief specifies 8–12% white. Still passes the perceptibility check at 1.31:1. |

### The utility bar — a conflict between the brief and the reference

The brief's section inventory lists a "Utility bar — thin top strip" as section 1. The page it was
derived from has no such strip: utility items sit inline in the single 76px row, right-aligned, at
12px against the nav's 14px. The brief's overriding instruction is to match the reference, so the
build follows the reference. It stays its own component (`UtilityItems`), so restoring a separate
strip is a one-file change if that reading was wrong.

### Verified against the reference

Measured in my build at 1440px and compared to the reference's measured values:

| Step | Reference | This build |
|---|---|---|
| Display marker | 126.5px / 700 / lh 94.9 | 126px / 700 / lh 94.5 |
| Hero h1 | 40px / 300 / 51.2 / −0.4px | 40px / 300 / 51.2 / −0.4px |
| Section h2 | 44px / 400 / 46.6 / −0.22px | 44px / 400 / 46.6 / −0.22px |
| Eyebrow | 12px / 500 / 18 / +0.6px | 12px / 500 / 18 / +0.6px |
| Nav link | 14px / 400 | 14px / 400 |
| Container | 1460px | 1460px |
| Gutter | 40px | 40px |
| Header | 76px, fixed, transparent | 76px, fixed, transparent |

Also checked after the refactor: one header row, one CTA (a duplicate was introduced when the
header took ownership of it and caught here), no `inert` leftovers from the retired collapsing
strip, bands alternate between exactly two values, all four display markers are `aria-hidden` so
the decorative type stays out of the heading outline, one `h1`, no skipped heading levels, mega
menu still opens and closes on Escape, and no horizontal overflow at 360px.

### Still to do against the audit

- **Imagery treatment.** The audit calls for one consistent scrim/desaturation rule for
  photography. Nothing on the page uses imagery yet; this lands with the hero in Phase 2.
- **Partner logos** as monochrome white at reduced opacity, brightening on hover — Phase 4.
- The reference's own section order beyond the shell (recognition before stories, feature banner
  after how-we-help) is reflected in the page skeleton and gets filled in Phases 3–4.

---

## Phase 2 — hero and Who We Are

### Against the reference, stated before building

**Hero.** Reference: full-bleed media with the header transparent over it, a left-aligned
light-weight headline on a short measure, a subline, one action, and pagination bottom-left of the
content column, auto-rotating through three slides. Mine matches that structure and differs only
in colour and in using a generated field instead of photography, because no assets were supplied.

**Who we are.** The reference has no timeline; its nearest equivalent is a statement block. This
is the one deliberate **content** departure, and the brief explicitly earns it: the history is the
only real content supplied and it is a genuine sequence. It keeps the reference's structural
language — container, band, display marker, type scale, rhythm — and spends the departure only on
the timeline's internal treatment and the single motion moment.

### The imagery rule

The audit calls for one consistent treatment, because bright media pasted onto a black page looks
pasted on. Two layers, applied identically to a real photograph or the generated field:

1. The media, desaturated to 0.7 and slightly contrast-lifted.
2. A two-part scrim — horizontal from the ground colour on the reading edge so the headline sits
   on near-solid ground, then vertical from the bottom so the section meets the next band without
   a seam.

No photography exists yet, so `media.src` is empty and a low-contrast tonal field keyed to the
slide's sector renders instead. Deliberately not a fake photograph. When real images arrive they
drop into `media` and inherit the treatment unchanged.

### Hero carousel

Built to the APG carousel pattern, not as a bare slider. The decision worth naming is the split
between **two different reasons rotation stops**:

- `suspended` — transient. The pointer is over the hero, focus is inside it, or the tab is hidden.
  Lifts by itself when that ends.
- `stopped` — the user took control, by pressing pause or choosing a slide. Does **not** lift on
  its own.

Collapsing these into one flag is the standard bug: choose a slide, move the mouse away, and the
carousel rotates off the slide you just picked. Splitting them also drives the live region
correctly — `off` while auto-rotating so it does not narrate every automatic change, `polite` once
the user is in control so their choice is announced.

Slides are stacked in one grid cell, so the section is as tall as the tallest slide and changing
slide causes no layout shift. Inactive slides are `inert`, so their links are not focusable.

### The signature moment

A vertical spine draws downward; each era unmasks horizontally *from* the spine with a `clip-path`
wipe rather than fading up, so the motion says the line is arriving at each step in order; the year
sets last. ~900ms for the spine, staggered 90ms per entry. The only thing on the page over 400ms
and the only scroll-triggered animation.

**It is progressive enhancement, not a motion dependency.** The markup server-renders fully
visible — the built HTML contains `clip-path:inset(0 0 0 0)`, the resolved state. The hidden
starting state is applied in a layout effect, before paint, and only when animation will actually
run. No JS, reduced motion, or a stalled renderer all mean the content is simply there. Content
that needs an animation to finish before it can be read is a bug, and it is the usual way scroll
reveals fail.

### Bugs found by testing, and fixed

1. **The reveal watchdog was disarmed by the observer's own first callback.** The first version
   treated "IntersectionObserver has called back at least once" as proof it was working. It is
   not: IO always delivers once synchronously at `observe()` time. In a renderer that registers an
   observer but never reports again, that initial delivery disarmed the fallback and the timeline
   stayed clipped permanently. Replaced with a **geometry check** — read the rectangle, which
   cannot be fooled — driven by three independent triggers: the observer, a passive scroll
   listener, and a mount timeout for when the section is already on screen. Verified: hidden at
   load, revealed on scroll, spine at `scaleY(1)`, all years at opacity 1.
2. **Choosing a slide left auto-rotation running**, so the live region stayed `off` and the slide
   was never announced — and rotation would then advance off the user's choice. Fixed by the
   suspended/stopped split above.
3. **`text-muted/80` on the "no date supplied" label** drifted off the measured token set — an
   opacity modifier is a colour the contrast gate never sees. Returned to `text-muted`, which is
   measured at 6.57:1.

### Verified

- Hero: 3 slides, each labelled "N of M"; inactive slides `inert` and the active one not;
  pagination reflects and drives state; pause control present and its label flips; live region
  `off` while rotating and `polite` once the user takes control; chosen slide is still current
  after waiting out an interval.
- Timeline: 6 entries; hidden at load, revealed on scroll; resolved state present in the built
  HTML for the no-JS and reduced-motion paths.
- 360px: zero overflowing elements, H1 30px / weight 300.
- `npm run contrast` 11/11, typecheck clean, static export builds.

Still not verifiable in this environment: how the motion actually *looks* mid-flight. The pane
does not run `requestAnimationFrame`, so every transition is measured at its endpoints only. The
timeline reveal and the hero cross-fade need a real browser before this is sent.

---

## Phase 3 — jump-to nav, how we help, feature banner, stories and recognition

### Against the reference, stated before building

**Jump-to nav.** Not present on the India homepage as measured -- the "sticksections"
components there have no visible in-page nav, so it appears to be a pattern from Kyndryl's longer
solution pages rather than this one. Built to the brief's explicit spec (section 5) rather than to
something observed on the reference: anchor links, sticky under the header, active section
highlighted on scroll.

**Recognition.** Reference: Previous/Next arrows plus numbered tabs (01, 02, 03…), one item shown
at a time, a large statement with a source line. Mine matches that mechanism exactly; only the
copy is placeholder, since no citations were supplied (`content/recognition.ts`).

**Customer stories.** Reference: a "Read full story" control per story. Mine adds the story-to-
story carousel the brief's inventory calls for (`Previous story` / `Next story`) and keeps the
per-story expand independent of which story is currently showing.

**How we help.** Reference implements this as a sticky-scroll list -- four headings in one column
scrolling past a pinned image on the other side. Deliberately not reproduced; see the component's
own doc comment for the reasoning. Built as a static two-column grid of heading/body/link instead,
which is what the brief's own section inventory reduces this component to.

**Feature banner.** Reference: a full-width CTA band, one message, one action. Matched, using the
one accent colour rather than introducing the reference's separate pale-mint background for a
single band.

### The bug that wasn't, and the one that was

Two things looked broken in this environment and needed to be told apart.

**Real bug:** `useActiveSection` picked the *last* id in the caller's array whose section had
scrolled past the line -- which assumes the array is already in top-to-bottom document order. It
usually is not; it is editorial order. `content/jump-nav.ts` still listed "How we help" before
"Stories" from Phase 0, but Phase 3 rendered Stories first in the DOM. Scrolled to the How We Help
section, both anchors had scrolled past the line, and Stories -- later in the array -- won,
reporting the wrong active link. Fixed by sorting `ids` by actual `getBoundingClientRect().top`
before picking, so the hook is correct regardless of what order its caller's list happens to be
in. Also reordered the content file to match, for readability, though the hook no longer depends
on it. Same root cause, different shape, as the `rAF`-throttle bug removed from this same hook
minutes earlier -- both were the hook trusting something about its environment that turned out
not to hold.

**Not a bug:** the stories carousel's Next control appeared to do nothing on the first test --
`getComputedStyle().opacity` read the same before and after a click. Two more clicks in two more
separate script calls landed on the same tab and the index had visibly advanced by two, which
meant the first click *had* worked; the read of it had raced React's commit in this pane's stalled
compositor, the same class of false negative documented in Phase 1 and Phase 2. Re-tested with a
longer settle and the raw `style.opacity` attribute rather than the computed value, on a freshly
loaded tab: single click, single advance, exactly as written. Recorded here because it is the
second time in three phases a real click has looked broken purely because this test environment
does not paint on the same clock as everything else -- worth remembering before trusting the next
one.

### Verified

- Jump-nav: active link tracks the actual section on screen, in real document order, correctly at
  Who we are / Stories / How we help / Insights.
- Recognition: Previous/Next and numbered tabs both work; inactive items are `inert`; no layout
  shift switching between items of different length (565px before and after, confirmed on the
  actual `[aria-hidden]` items, not their decorative SVG icons which share the attribute).
- Stories: story-to-story navigation advances and reverses correctly; per-story expand/collapse is
  independent of which story is current, confirmed by expanding story 2, navigating away and back,
  and finding it still expanded while story 1 stayed untouched.
- 360px: zero document-level horizontal overflow. The jump-nav's own internal `overflow-x-auto`
  strip is the only thing that reports as "overflowing" a naive bounding-box scan, which is by
  design -- it is a deliberately horizontally-scrollable strip, not a page overflow.
- `npm run contrast` 11/11, typecheck clean, static export builds.

---

## Phase 4 — supporting sections: the page is content-complete

Promo strip, insights grid, expertise quotes, partner logo track, careers band, FAQ, contact CTA.

### Against the reference, stated before building

**Promo strip.** Reference: three small cards directly under the hero, category label above a
heading. Matched, using the same rule-divided-single-surface treatment as the footer and mega
menu -- no card borders, no shadow.

**Insights grid.** Reference: three article cards, category label plus image. No articles or
photography were supplied, so each card's `media.src` is empty and a generated tonal block renders
in its place -- the same imagery rule as the hero, applied consistently rather than reaching for a
stock photo to fill the gap.

**Expertise quotes.** Reference: a leadership quote carousel with name, role, social link. Same
mechanism, placeholder attribution -- inventing a named executive is the most damaging placeholder
a corporate page can carry, so every name here says "pending."

**Partner logo track.** Reference: presumably a continuous horizontal track (unable to inspect its
actual markup on this homepage -- the section renders logos as lazy-loaded images that were not in
the DOM at measurement time). Built to the brief's explicit spec instead: continuous horizontal
track, pauses on hover and under reduced motion. No logo files exist for the three organisations
the client actually named, so each renders as a typographic wordmark at reduced opacity that
brightens on hover -- the brief's own rule for monochrome logos on black, applied to text since
there is no image yet to desaturate.

**Careers band.** Reference: two cards. Matched using the same divided-surface treatment as the
promo strip.

**FAQ.** Not present on the India homepage as measured -- no tab or accordion markup exists on
this specific page. Same situation as Phase 3's jump-to nav: likely a pattern from Kyndryl's longer
solution pages. Built to the brief's explicit spec (category tabs, an accordion inside each tab)
using the APG tabs pattern rather than improvising one.

**Contact CTA.** Reference: two actions, an inquiry path and a subscribe form. Matched. The
subscribe form has nowhere real to submit -- no backend on a static export, no endpoint supplied --
so it prevents default and shows an honest local acknowledgment rather than either faking a
network call or leaving the control inert.

### Decisions worth naming

**The reduced-motion fix for the marquee is at the CSS layer, not just the global one.**
`globals.css` already shortens every transition/animation to `0.01ms` under
`prefers-reduced-motion`, which is fine for a one-shot transition but wrong for an infinite-loop
marquee: at 0.01ms the animation still runs, just snapping through its full `translateX` every
0.01ms -- a flicker, not a freeze. Added an explicit `.partner-track { animation: none }` inside
the same media block. Verified in the compiled CSS that this rule sits after the `!important`
global overrides and there is exactly one un-media-gated `.partner-track` animation rule, so the
override is real and not shadowed.

**FAQ tabs use the APG pattern, not native `<details>`.** Only the selected tab sits in the
natural tab order; Left/Right move both focus and selection between tabs (a same-page content
switch, activating on arrow is correct here, unlike a set of links); Home/End jump to the first and
last tab. Verified: 15 separate assertions across selection state, ARIA wiring, and all four
keyboard paths, all passing. The accordion inside each panel is a second, independent layer --
opening one question does not affect any other, verified by opening two, closing one, and checking
the other stayed open.

**Careful about a specific class of false negative in this test environment, again.** The stories
carousel in Phase 3 and now nothing new here repeated that exact failure -- but the discipline it
taught carried over directly: every assertion in this phase that could be affected by a stalled
paint (opacity checks, height checks) was either re-verified after a full reload with a longer
settle, or checked against a raw DOM property (`aria-expanded`, `.style.opacity`, `hidden`) rather
than a computed one where possible.

### Verified

- FAQ: 15 assertions across the tablist -- correct initial selection, roving tab order, all four
  keyboard paths (Right, Left, Home, End) moving both focus and selection, `aria-controls` /
  `aria-labelledby` wired correctly. Accordion: starts collapsed, opens/closes independently per
  question, two open at once with no interaction between them.
- Partner track: 3 real logos + 3 `aria-hidden` duplicates for the seamless loop, `animation:
  marquee 32s infinite`, hover/focus-within pause rule present, reduced-motion override confirmed
  in the compiled CSS to sit inside the media block rather than being shadowed by it.
- Expertise quotes: pagination switches the active quote with zero layout shift, inactive quotes
  `inert`.
- Contact form: required email input with a real label, submits without navigating away, shows an
  honest status message rather than pretending to succeed.
- Promo strip, insights grid, careers band: correct card counts, insight cards confirmed to render
  the generated field rather than an `<img>` when `media.src` is empty, promo links resolve to real
  in-page anchors.
- 360px: zero horizontal overflow anywhere on the now-complete page.
- `npm run contrast` 11/11, typecheck clean, static export builds.
- All 13 `TODO_CLIENT_*` keys from Phase 0 remain intact and greppable -- nothing built in Phase 4
  quietly filled a gap with invented content.

The page is now content-complete. What remains is Phase 5: a responsive audit at the brief's four
breakpoints, a Lighthouse pass, image optimisation, a focus-state audit, a reduced-motion audit,
deployment, and this file's conversion into a README a non-engineer can read.
