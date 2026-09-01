import { SiteHeader } from '@/components/chrome/site-header';
import { SiteFooter } from '@/components/chrome/site-footer';
import { Section } from '@/components/layout/section';
import { Hero } from '@/components/sections/hero';
import { PromoStrip } from '@/components/sections/promo-strip';
import { Timeline } from '@/components/sections/timeline';
import { JumpNav } from '@/components/sections/jump-nav';
import { RecognitionCarousel } from '@/components/sections/recognition-carousel';
import { StoriesCarousel } from '@/components/sections/stories-carousel';
import { HowWeHelp } from '@/components/sections/how-we-help';
import { FeatureBanner } from '@/components/sections/feature-banner';
import { InsightsGrid } from '@/components/sections/insights-grid';
import { QuotesCarousel } from '@/components/sections/quotes-carousel';
import { PartnerTrack } from '@/components/sections/partner-track';
import { CareersBand } from '@/components/sections/careers-band';
import { FaqTabs } from '@/components/sections/faq-tabs';
import { ContactCta } from '@/components/sections/contact-cta';
import { content } from '@/content';

/**
 * PHASE 4 — the page is now content-complete.
 *
 * Promo strip, insights, expertise quotes, partner logo track, careers band,
 * FAQ, contact CTA. Band order follows the reference: alternate the base
 * and raised tones so a very long page does not read as one slab. Display
 * markers are reserved for major sections -- who we are, stories, how we
 * help, expertise -- as they are on the reference; using one everywhere
 * would spend the device and flatten the rhythm it exists to create.
 */

export default function HomePage() {
  return (
    <>
      <SiteHeader content={content.site} />

      <main id="main" className="relative z-10">
        <Hero content={content.hero} />

        <Section bleed tone="ground" className="border-b border-rule">
          <PromoStrip content={content.promo} />
        </Section>

        <JumpNav content={content.jumpNav} />

        <Section
          id={content.whoWeAre.id}
          tone="ground"
          marker="who we are"
          heading={content.whoWeAre.heading}
        >
          <Timeline content={content.whoWeAre} />
        </Section>

        <Section id={content.recognition.id} tone="surface" heading={content.recognition.heading}>
          <RecognitionCarousel content={content.recognition} />
        </Section>

        <Section
          id={content.stories.id}
          tone="ground"
          marker="stories"
          heading={content.stories.heading}
        >
          <StoriesCarousel content={content.stories} />
        </Section>

        <Section
          id={content.howWeHelp.id}
          tone="surface"
          marker="how we help"
          heading={content.howWeHelp.heading}
          lead={content.howWeHelp.lead}
        >
          <HowWeHelp content={content.howWeHelp} />
        </Section>

        {/* Not wrapped in Section: the band's background has to run the full
            viewport width, and Section's Container would confine it to the
            1460px content column. Hero is full-bleed for the same reason. */}
        <FeatureBanner content={content.featureBanner} />

        <Section id={content.insights.id} tone="ground" heading={content.insights.heading}>
          <InsightsGrid content={content.insights} />
        </Section>

        <Section
          id={content.quotes.id}
          tone="surface"
          marker="expertise"
          heading={content.quotes.heading}
        >
          <QuotesCarousel content={content.quotes} />
        </Section>

        <Section tone="ground" heading={content.partners.heading}>
          <PartnerTrack content={content.partners} />
        </Section>

        <Section id={content.careers.id} tone="surface" heading={content.careers.heading}>
          <CareersBand content={content.careers} />
        </Section>

        <Section id={content.faq.id} tone="ground" heading={content.faq.heading}>
          <FaqTabs content={content.faq} />
        </Section>

        <Section id={content.contactCta.id} tone="surface">
          <ContactCta content={content.contactCta} />
        </Section>
      </main>

      <SiteFooter content={content.site} />
    </>
  );
}
