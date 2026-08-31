const STEPS = [
  { token: '4xl', cls: 'text-4xl', family: 'display', sample: '2012', note: 'Timeline years. The signature moment.' },
  { token: '3xl', cls: 'text-3xl', family: 'display', sample: 'One operations business, four sectors.', note: 'Hero headline. Nothing else.' },
  { token: '2xl', cls: 'text-2xl', family: 'sans', sample: 'Who we are', note: 'Section headings.' },
  { token: 'xl', cls: 'text-xl', family: 'sans', sample: 'Robotics and automation', note: 'Sub-headings, card titles.' },
  { token: 'lg', cls: 'text-lg', family: 'sans', sample: 'Channel partner for Tata', note: 'Timeline entry titles.' },
  { token: 'md', cls: 'text-md', family: 'sans', sample: 'The company has not pivoted so much as accumulated.', note: 'Lead paragraphs.' },
  { token: 'base', cls: 'text-base', family: 'sans', sample: 'The company started in 2012 as a business process outsourcing operation, running processes on behalf of other organisations.', note: 'Body copy. Measure capped at 68ch.' },
  { token: 'sm', cls: 'text-sm', family: 'sans', sample: 'How we help', note: 'Navigation, metadata, link labels.' },
  { token: 'xs', cls: 'text-xs', family: 'sans', sample: 'Pan-India', note: 'Category labels, captions.' },
  { token: '2xs', cls: 'text-2xs', family: 'sans', sample: 'OPERATIONS', note: 'Rail numbers and the one eyebrow the page is allowed.' },
] as const;

const FAMILY_CLASS = {
  display: 'font-display',
  sans: 'font-sans',
} as const;

/**
 * The full scale, rendered. A table of numbers proves nothing about a type
 * system; seeing 4xl sit next to 2xs at the same viewport does.
 */
export function TypeScale() {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {STEPS.map((step) => (
        <div key={step.token} className="grid gap-3 py-7 lg:grid-cols-[10rem_1fr] lg:gap-8">
          <div className="lg:pt-2">
            <p className="font-mono text-xs text-brass">text-{step.token}</p>
            <p className="font-mono text-2xs text-muted">
              {step.family === 'display' ? 'Instrument Serif' : 'Inter Tight'}
            </p>
            <p className="mt-2 text-xs text-muted measure-tight">{step.note}</p>
          </div>

          <p className={`${FAMILY_CLASS[step.family]} ${step.cls} text-fg measure`}>
            {step.sample}
          </p>
        </div>
      ))}
    </div>
  );
}
