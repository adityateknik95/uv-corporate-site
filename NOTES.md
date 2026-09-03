# Design & Reference Notes

## Reference

Primary reference:

Kyndryl India:
https://www.kyndryl.com/in/en

The reference is used for information architecture, section ordering,
layout density and interaction patterns.

Brand identity, marketing copy, imagery and logos are not reused.

---

# Phase 0 — Reference Audit

## Overall page structure

The page uses a corporate enterprise structure with:

1. Utility navigation
2. Primary navigation
3. Large hero
4. Promotional content
5. Section/jump navigation
6. Company/about content
7. Recognition
8. Customer stories
9. Capabilities/services
10. Feature banner
11. Insights
12. Leadership/expertise
13. Partners
14. Careers
15. FAQ
16. Contact
17. Footer

The rebuild follows this overall information architecture.

---

## Layout

### Container

The main content uses a constrained enterprise-style content container
while selected media sections extend closer to the viewport edges.

Our initial container token:

--container-max: 1280px

Mobile horizontal padding:

16px

Desktop horizontal padding:

24px

This can be adjusted after the reference audit is performed against
the live page.

---

## Vertical rhythm

The design uses large section spacing rather than tightly packed
marketing cards.

Our initial section rhythm:

Desktop:
72px–144px

Mobile:
64px

Compact sections:
48px–80px

The exact values will be tuned during visual comparison.

---

## Typography

Initial type system:

Display:
48px–108px responsive

H1:
44px–80px responsive

H2:
36px–64px responsive

H3:
24px–36px responsive

Large body:
20px

Body:
16px

Small:
14px

Label:
12px uppercase

Headings use tight letter spacing and compact line heights.

---

# Black Theme Translation

The original reference alternates between light and dark surfaces.

A fully black implementation would lose this visual rhythm.

Instead, this project uses elevation.

Base:
#0B0D0F

Raised surface:
#121518

Border:
#292D31

Primary text:
#F1F2F3

Secondary text:
#A2A7AD

Accent:
#D6FF3F

---

## Design rationale

### Base

A near-black blue/green-neutral tone is used instead of pure black
to reduce visual fatigue across a long page.

### Raised surface

A slightly brighter surface replaces the visual rhythm normally
created by alternating white and dark sections.

### Borders

Low-contrast borders create separation without introducing heavy
cards.

### Text

Primary text is slightly off-white rather than pure white.

Secondary text is intentionally muted but must remain WCAG AA compliant
where used for meaningful content.

### Accent

A restrained lime accent is used to create separation from the
reference site's red while remaining visible against the dark palette.

The accent should not become a decorative colour used everywhere.

---

# Imagery

Images will use one consistent dark treatment.

Initial direction:

Dark-toned source imagery with a subtle black gradient scrim.

No Kyndryl CDN assets will be reused.

---

# Partner logos

Partner logos will eventually be rendered as monochrome assets.

They will use reduced opacity by default and increase brightness on hover.

Only client-approved logos should be added.

---

# Motion

Motion will remain restrained.

Expected behaviours:

- Hero carousel
- Navigation condensation
- FAQ expansion
- Carousel transitions
- Timeline reveal

The Who We Are timeline receives the primary signature motion treatment.

Other sections should avoid generic "fade everything up" animation.

Animation duration target:

<= 400ms

Reduced motion must disable non-essential animation.

---

# Accessibility

Requirements:

- WCAG AA contrast
- Keyboard-visible focus
- Semantic landmarks
- Correct heading hierarchy
- Accessible carousel controls
- Accessible disclosure pattern
- Meaningful alt text
- Reduced-motion support
- Responsive down to 360px

---

# Content Rules

No invented:

- Clients
- Revenue
- Headcount
- Awards
- Metrics
- Dates

Unknown client-provided information uses:

TODO_CLIENT

---

# Decisions / Rejected

## Pure black

Rejected.

Reason:
A long page using #000000 everywhere would lose surface hierarchy
and create visual fatigue.

## Pure white text

Rejected.

Reason:
Slightly softened primary text creates a more refined dark interface.

## Generic scroll animations

Rejected.

Reason:
The reference uses restrained interaction patterns and the brief
explicitly calls for clean animation.

## UI library

Rejected.

Reason:
The design requires close control over spacing, interaction and
visual treatment.

## Bootstrap

Rejected.

Reason:
Tailwind with a custom token layer gives better control over the
design system.

---

# Open Questions

- Final company name
- Final company logo
- Approved partner logos
- Approved customer stories
- Recognition information
- Leadership names and quotes
- Final service/capability list
- Career information
- Contact email
- Social links
