const STEPS = [
  { token: 'display', cls: 'text-display lowercase', sample: 'who we are', note: 'Section marker. 126px / 700 / lh 0.75, set tone-on-tone.' },
  { token: 'h1', cls: 'text-h1', sample: 'One operations business, four sectors.', note: 'Hero. Light weight at large size, as the reference.' },
  { token: 'h2', cls: 'text-h2', sample: 'Who we are', note: 'Section headings. 44px / 400.' },
  { token: 'h3', cls: 'text-h3', sample: 'Robotics and automation', note: 'Large card headings. 32px / 400.' },
  { token: 'h4', cls: 'text-h4', sample: 'Channel partner for Tata', note: 'Card headings. 24px / 400.' },
  { token: 'quote', cls: 'text-quote', sample: 'The company has not pivoted so much as accumulated.', note: 'Pull quotes. Same size as h4, weight 300.' },
  { token: 'lead', cls: 'text-lead', sample: 'Started in 2012 in outsourced operations.', note: 'Lead paragraphs. 18px / 400.' },
  { token: 'body', cls: 'text-body', sample: 'The company started in 2012 as a business process outsourcing operation, running processes on behalf of other organisations.', note: 'Body. 16px / 1.5, measure capped at 68ch.' },
  { token: 'small', cls: 'text-small', sample: 'How we help', note: 'Nav links and metadata. 14px.' },
  { token: 'utility', cls: 'text-utility', sample: 'India — EN', note: 'Header utility items. 12px.' },
  { token: 'label', cls: 'text-label uppercase', sample: 'Operations', note: 'Eyebrow. The only uppercase, tracked-out step.' },
] as const;

/**
 * The full scale, rendered. A table of numbers proves nothing about a type
 * system; seeing display sit next to label at the same viewport does.
 *
 * Every size, weight, line-height and tracking here is the measured reference
 * value -- see the audit at the top of NOTES.md.
 */
export function TypeScale() {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {STEPS.map((step) => (
        <div key={step.token} className="grid gap-3 py-7 lg:grid-cols-[10rem_1fr] lg:gap-8">
          <div className="lg:pt-2">
            <p className="font-mono text-utility text-brass">text-{step.token}</p>
            <p className="mt-2 text-utility text-muted measure-tight">{step.note}</p>
          </div>

          <p className={`${step.cls} overflow-hidden text-fg measure`}>{step.sample}</p>
        </div>
      ))}
    </div>
  );
}
