'use client';

import { useId, useState } from 'react';
import type { ContactCtaContent } from '@/content';

/**
 * Two actions: talk to us, and subscribe.
 *
 * The subscribe form has nowhere real to submit -- there is no backend on a
 * static export, and no endpoint was supplied (`TODO_CLIENT_contactRouting`).
 * Rather than either faking a network call or leaving the form inert, it
 * prevents default and shows an honest local acknowledgment: the mechanism
 * and its accessibility are real, the wiring to an actual list is the part
 * still pending.
 */
export function ContactCta({ content }: { content: ContactCtaContent }) {
  const [submitted, setSubmitted] = useState(false);
  const inputId = useId();
  const statusId = useId();

  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="text-h2 text-fg measure">{content.heading}</h2>
        <p className="mt-4 text-lead text-muted measure">{content.body}</p>
        <a
          href={content.primary.href}
          className="mt-8 inline-flex h-[50px] items-center rounded-md bg-accent px-6 text-body font-medium text-ground transition-colors duration-200 ease-in-out hover:bg-fg"
        >
          {content.primary.label}
        </a>
      </div>

      <div className="border-t border-rule pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
        <h3 className="text-h4 text-fg">{content.subscribe.heading}</h3>
        <p className="mt-3 text-small text-muted measure-tight">{content.subscribe.body}</p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            {content.subscribe.inputLabel}
          </label>
          <input
            id={inputId}
            type="email"
            required
            placeholder={content.subscribe.inputLabel}
            className="h-12 flex-1 rounded-md border border-rule bg-transparent px-4 text-body text-fg placeholder:text-muted"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md border border-rule px-5 text-small text-fg transition-colors duration-200 ease-in-out hover:border-accent hover:text-accent"
          >
            {content.subscribe.submitLabel}
          </button>
        </form>

        <p id={statusId} role="status" className="mt-3 text-small text-accent">
          {submitted ? 'Thanks — this is a placeholder form with nowhere to send that yet.' : ''}
        </p>
      </div>
    </div>
  );
}
