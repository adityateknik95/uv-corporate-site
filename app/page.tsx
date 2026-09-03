import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

import WhoWeAre from "@/components/sections/WhoWeAre";
import Capabilities from "@/components/sections/Capabilities";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { Expertise } from "@/components/sections/Expertise";
import { Insights } from "@/components/sections/Insights";
import { Partners } from "@/components/sections/Partners";
import { Careers } from "@/components/sections/Careers";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      {/* =========================================================
          HERO
      ========================================================= */}
      <Section id="home" className="hero">
        <Container>
          <div className="hero-content">
            <p className="text-label hero-label">
              Technology Services
            </p>

            <h1 className="text-display hero-title">
              Building what
              <br />
              comes next.
            </h1>

            <p className="text-body-lg hero-description">
              A technology services company evolving through operations,
              automation, telecommunications and education delivery.
            </p>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <WhoWeAre />

      {/* =========================================================
          WHAT WE DO
      ========================================================= */}
      <Capabilities />

      {/* =========================================================
          CUSTOMER STORIES
      ========================================================= */}
      <CustomerStories />

      {/* =========================================================
          EXPERTISE
      ========================================================= */}
      <Expertise />

      {/* =========================================================
          INSIGHTS
      ========================================================= */}
      <Insights />

      {/* =========================================================
          PARTNERS
      ========================================================= */}
      <Partners />

      {/* =========================================================
          CAREERS
      ========================================================= */}
      <Careers />

      {/* =========================================================
          FAQ
      ========================================================= */}
      <FAQ />

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <Contact />
    </main>
  );
}